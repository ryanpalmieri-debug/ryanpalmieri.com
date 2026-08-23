/*
 * Edit Agent — Phase 1 Capability Probe (no-build UXP panel).
 *
 * Everything is wrapped defensively: each check records {ok, detail|error} into a
 * report object, so even if individual calls fail on this Premiere build, the
 * saved report tells us exactly which APIs exist and which don't.
 */

const ppro = require("premierepro");
const uxp = require("uxp");
const lfs = uxp.storage.localFileSystem;

const report = {
  meta: { probeVersion: "0.2.0", ranAt: null },
  environment: {},
  pproTopLevel: [],
  staticChecks: {},
  instanceChecks: {},
  spikes: {},
};

let outEl = null;

function print(msg) {
  console.log(msg);
  if (outEl) {
    outEl.value += "\n" + msg;
    outEl.scrollTop = outEl.scrollHeight;
  }
}

function clearOut() {
  if (outEl) outEl.value = "";
}

// Resolve a dotted path like "Transcript.transcribeClipProjectItem" on an object.
function resolvePath(root, path) {
  let cur = root;
  for (const part of path.split(".")) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[part];
  }
  return cur;
}

function checkStatic(path) {
  try {
    const v = resolvePath(ppro, path);
    const kind = typeof v;
    report.staticChecks[path] = { ok: v !== undefined, kind };
    return v !== undefined;
  } catch (e) {
    report.staticChecks[path] = { ok: false, error: String(e) };
    return false;
  }
}

function checkInstance(label, obj, methodNames) {
  const results = {};
  for (const m of methodNames) {
    try {
      results[m] = obj ? typeof obj[m] : "no-object";
    } catch (e) {
      results[m] = "error: " + String(e);
    }
  }
  report.instanceChecks[label] = results;
  return results;
}

async function getProject() {
  return await ppro.Project.getActiveProject();
}

async function getSelectedItems(project) {
  const sel = await ppro.ProjectUtils.getSelection(project);
  return await sel.getItems();
}

// Breadth-first search for the first media clip in the project (same approach as
// Adobe's sample panel).
async function firstMediaClip(project) {
  const rootItem = await project.getRootItem();
  const items = await rootItem.getItems();
  for (const item of items) {
    const clip = ppro.ClipProjectItem.cast(item);
    if (!clip) {
      const folder = ppro.FolderItem.cast(item);
      if (folder) items.push(...(await folder.getItems()));
      continue;
    }
    try {
      if ((await clip.getContentType()) === ppro.Constants.ContentType.MEDIA) return clip;
    } catch (e) {
      return clip; // getContentType missing on this build — accept the clip anyway
    }
  }
  return null;
}

async function selectedOrFirstClip(project) {
  try {
    const items = await getSelectedItems(project);
    for (const item of items) {
      const clip = ppro.ClipProjectItem.cast(item);
      if (!clip) continue;
      try {
        if (await clip.isSequence()) continue; // never use a sequence as the source clip
      } catch (e) {
        /* isSequence unavailable — accept the clip */
      }
      return { clip, from: "selection" };
    }
  } catch (e) {
    /* fall through to BFS */
  }
  const clip = await firstMediaClip(project);
  return { clip, from: clip ? "first-in-project" : "none" };
}

// Dump own property names of key static namespaces so renamed/moved APIs are
// discoverable from the report (e.g. Transcript.transcribeClipProjectItem missing
// on Premiere 26.x — what does Transcript expose instead?).
const MEMBER_DUMP_TARGETS = [
  "Transcript", "SequenceEditor", "ProjectConverter", "ClipProjectItem",
  "Project", "Markers", "Marker", "TickTime", "ProjectUtils", "Constants",
];

function dumpStaticMembers() {
  report.memberDumps = {};
  for (const name of MEMBER_DUMP_TARGETS) {
    try {
      const obj = ppro[name];
      if (!obj) {
        report.memberDumps[name] = "absent";
        continue;
      }
      const names = new Set(Object.getOwnPropertyNames(obj));
      if (obj.prototype) {
        for (const p of Object.getOwnPropertyNames(obj.prototype)) names.add(p);
      }
      report.memberDumps[name] = Array.from(names).sort();
    } catch (e) {
      report.memberDumps[name] = "error: " + String(e);
    }
  }
}

// ---------------------------------------------------------------- Step 1: report

const STATIC_PATHS = [
  "Project.getActiveProject",
  "Project.open",
  "ProjectUtils.getSelection",
  "ClipProjectItem.cast",
  "FolderItem.cast",
  "SequenceEditor.getEditor",
  "Transcript.hasTranscript",
  "Transcript.transcribeClipProjectItem",
  "Transcript.exportToJSON",
  "Transcript.importFromJSON",
  "Transcript.createImportTextSegmentsAction",
  "ProjectConverter.exportAsOpenTimelineIO",
  "ProjectConverter.exportAsFinalCutProXML",
  "ProjectConverter.exportAAF",
  "Markers.getMarkers",
  "Marker.MARKER_TYPE_COMMENT",
  "TickTime.createWithSeconds",
  "TickTime.createWithTicks",
  "TickTime.TIME_ZERO",
  "FrameRate.createWithValue",
  "Constants.MediaType",
  "Constants.ContentType",
  "Constants.TrackItemType",
  "Constants.ProjectItemColorLabel",
  "Metadata.getProjectColumnsMetadata",
  "EncoderManager",
  "SourceMonitor",
];

async function runCapabilityReport() {
  clearOut();
  report.meta.ranAt = new Date().toISOString();
  print("=== Edit Agent Capability Report ===");

  // Environment
  try {
    report.environment = {
      hostName: uxp.host && uxp.host.name,
      hostVersion: uxp.host && uxp.host.version,
      uxpVersion: uxp.versions && uxp.versions.uxp,
      pluginVersion: uxp.versions && uxp.versions.plugin,
      os: (uxp.os && uxp.os.platform) || navigator.platform,
    };
  } catch (e) {
    report.environment = { error: String(e) };
  }
  print("Host: " + JSON.stringify(report.environment));

  // Top-level API surface
  try {
    report.pproTopLevel = Object.getOwnPropertyNames(ppro).sort();
    print("premierepro exports " + report.pproTopLevel.length + " top-level names.");
  } catch (e) {
    print("Could not enumerate ppro: " + e);
  }

  // Static checks
  let okCount = 0;
  for (const p of STATIC_PATHS) if (checkStatic(p)) okCount += 1;
  print("Static checks: " + okCount + "/" + STATIC_PATHS.length + " present.");
  for (const [p, r] of Object.entries(report.staticChecks)) {
    if (!r.ok) print("  MISSING: " + p);
  }

  // Member dumps for key namespaces (find renamed APIs)
  dumpStaticMembers();
  const tMembers = report.memberDumps.Transcript;
  print("Transcript members: " + (Array.isArray(tMembers) ? tMembers.join(", ") : tMembers));

  // Instance checks (needs an open project)
  try {
    const project = await getProject();
    if (!project) {
      print("No active project — open a test project for instance checks.");
    } else {
      report.instanceChecks.projectName = project.name;
      checkInstance("project", project, [
        "createSequence", "createSequenceFromMedia", "importFiles", "importSequences",
        "getActiveSequence", "setActiveSequence", "getRootItem", "getSequence",
        "lockedAccess", "executeTransaction", "getInsertionBin", "save", "saveAs",
      ]);
      const rootItem = await project.getRootItem();
      checkInstance("rootItem", rootItem, [
        "getItems", "createBinAction", "createSmartBinAction", "createRemoveItemAction",
        "createRenameBinAction", "createMoveItemAction",
      ]);
      const { clip, from } = await selectedOrFirstClip(project);
      report.instanceChecks.clipSource = from;
      if (clip) {
        report.instanceChecks.clipName = clip.name;
        checkInstance("clipProjectItem", clip, [
          "createSetInPointAction", "createSetOutPointAction", "createSetInOutPointsAction",
          "getContentType", "isSequence", "getMediaFilePath", "getFootageInterpretation",
          "createSetNameAction", "getParentBin",
        ]);
      } else {
        print("No media clip found — import one clip for full instance checks.");
      }
      const sequence = await project.getActiveSequence();
      if (sequence) {
        report.instanceChecks.activeSequence = sequence.name;
        checkInstance("sequence", sequence, [
          "getVideoTrack", "getAudioTrack", "getVideoTrackCount", "getAudioTrackCount",
          "getSelection", "getSettings", "setSettings", "createSubsequence",
          "getSequenceVideoTimeDisplayFormat", "getEndTime", "getInPointAsTickTime",
        ]);
        try {
          const editor = ppro.SequenceEditor.getEditor(sequence);
          checkInstance("sequenceEditor", editor, [
            "createOverwriteItemAction", "createInsertProjectItemAction",
            "createCloneTrackItemAction", "createRemoveItemsAction", "insertMogrtFromPath",
          ]);
        } catch (e) {
          report.instanceChecks.sequenceEditor = { error: String(e) };
        }
        try {
          const markers = await ppro.Markers.getMarkers(sequence);
          checkInstance("sequenceMarkers", markers, [
            "createAddMarkerAction", "createRemoveMarkerAction", "getMarkers",
          ]);
        } catch (e) {
          report.instanceChecks.sequenceMarkers = { error: String(e) };
        }
        try {
          const vt = await sequence.getVideoTrack(0);
          checkInstance("videoTrack", vt, ["getTrackItems", "getMediaType", "getIndex", "setMute"]);
        } catch (e) {
          report.instanceChecks.videoTrack = { error: String(e) };
        }
      } else {
        print("No active sequence — open/create one for sequence checks (or run Spike 3 first).");
      }
    }
  } catch (e) {
    print("Instance checks failed: " + e);
    report.instanceChecks.fatal = String(e);
  }

  print("\nDone. Missing items above (if any) are what we need to know about.");
  print("Now run Spikes 2–4, then 'Save full report to file…' and send it back.");
}

// ------------------------------------------------------------ Step 2: transcribe

async function spikeTranscribe() {
  const s = (report.spikes.transcription = { startedAt: new Date().toISOString() });
  try {
    const project = await getProject();
    const { clip, from } = await selectedOrFirstClip(project);
    if (!clip) throw new Error("No clip found — select the production WAV in the Project panel.");
    s.clip = clip.name;
    s.clipSource = from;
    print("\n=== Spike 2: transcription of \"" + clip.name + "\" (" + from + ") ===");

    if (await clip.isSequence()) throw new Error("Selected item is a sequence — select a media clip.");

    s.hadTranscript = ppro.Transcript.hasTranscript(clip);
    if (!s.hadTranscript && typeof ppro.Transcript.transcribeClipProjectItem !== "function") {
      s.transcribeApiMissing = true;
      throw new Error(
        "This build has no transcribe API and the clip has no transcript yet. " +
        "Transcribe it manually first (select the clip, open the Text panel, Transcribe), " +
        "then press this button again to test the JSON export."
      );
    }
    if (!s.hadTranscript) {
      print("Starting transcription… (may take a while; leave Premiere open)");
      const t0 = Date.now();
      const ok = await ppro.Transcript.transcribeClipProjectItem(clip);
      s.transcribeMs = Date.now() - t0;
      s.transcribeReturned = ok;
      print("transcribeClipProjectItem returned " + ok + " after " + s.transcribeMs + " ms");
    } else {
      print("Clip already has a transcript; skipping to export.");
    }

    const json = await ppro.Transcript.exportToJSON(clip);
    s.exportedChars = json ? json.length : 0;
    const parsed = JSON.parse(json);
    const words = (parsed.segments || []).reduce((n, seg) => n + (seg.words || []).length, 0);
    const fillers = (parsed.segments || []).reduce(
      (n, seg) => n + (seg.words || []).filter((w) => (w.tags || []).includes("filler")).length,
      0
    );
    s.summary = {
      language: parsed.language,
      speakers: (parsed.speakers || []).map((sp) => sp.name),
      segmentCount: (parsed.segments || []).length,
      wordCount: words,
      fillerTaggedWords: fillers,
      firstWords: (parsed.segments && parsed.segments[0] && parsed.segments[0].words || [])
        .slice(0, 12).map((w) => w.text).join(" "),
    };
    print("Transcript summary: " + JSON.stringify(s.summary, null, 2));

    // Save the raw transcript for offline inspection
    const file = await lfs.getFileForSaving("transcript_" + clip.name + ".json");
    if (file) {
      await file.write(json);
      s.savedTo = file.nativePath;
      print("Raw transcript saved to " + file.nativePath);
    }
    s.ok = true;
  } catch (e) {
    s.ok = false;
    s.error = String(e);
    print("Spike 2 FAILED: " + e);
  }
}

// -------------------------------------------------------------- Step 3: assembly

const ASSEMBLY_EDITS = 50;

async function spikeAssembly() {
  const s = (report.spikes.assembly = { startedAt: new Date().toISOString(), edits: ASSEMBLY_EDITS });
  try {
    const project = await getProject();
    const { clip, from } = await selectedOrFirstClip(project);
    if (!clip) throw new Error("No clip found — select a camera clip in the Project panel.");
    if (await clip.isSequence()) throw new Error("Got a sequence — select a camera media clip in the Project panel.");
    s.clip = clip.name;
    print("\n=== Spike 3: " + ASSEMBLY_EDITS + "-edit assembly from \"" + clip.name + "\" (" + from + ") ===");

    const seqName = "SPIKE_ASSEMBLY_" + Date.now();
    const sequence = await project.createSequence(seqName);
    if (!sequence) throw new Error("project.createSequence returned nothing");
    await project.setActiveSequence(sequence);
    s.sequence = seqName;

    const editor = ppro.SequenceEditor.getEditor(sequence);
    const markers = await ppro.Markers.getMarkers(sequence);
    const segLen = 1.5;
    let failures = 0;
    const t0 = Date.now();

    for (let i = 0; i < ASSEMBLY_EDITS; i++) {
      try {
        const srcIn = (i % 20) * 0.7; // wander through the source
        const inT = ppro.TickTime.createWithSeconds(srcIn);
        const outT = ppro.TickTime.createWithSeconds(srcIn + segLen);
        const at = ppro.TickTime.createWithSeconds(i * segLen);
        project.lockedAccess(() => {
          project.executeTransaction((ca) => {
            ca.addAction(clip.createSetInOutPointsAction(inT, outT));
          }, "spike set in/out " + i);
          project.executeTransaction((ca) => {
            ca.addAction(editor.createOverwriteItemAction(clip, at, 0, 0));
            if (i % 10 === 0) {
              ca.addAction(
                markers.createAddMarkerAction(
                  "SPIKE_" + i, ppro.Marker.MARKER_TYPE_COMMENT, at,
                  ppro.TickTime.TIME_ZERO, "edit " + i + " marker"
                )
              );
            }
          }, "spike edit " + i);
        });
      } catch (e) {
        failures += 1;
        if (failures <= 3) print("  edit " + i + " failed: " + e);
      }
    }
    s.totalMs = Date.now() - t0;
    s.failures = failures;
    s.msPerEdit = Math.round(s.totalMs / ASSEMBLY_EDITS);

    // Verify by reading the track back
    try {
      const vt = await sequence.getVideoTrack(0);
      let items = null;
      try {
        items = await vt.getTrackItems(ppro.Constants.TrackItemType.CLIP, false);
      } catch (e1) {
        try {
          items = await vt.getTrackItems();
        } catch (e2) {
          s.readbackError = String(e1) + " / " + String(e2);
        }
      }
      if (items) s.trackItemsPlaced = items.length;
    } catch (e) {
      s.readbackError = String(e);
    }

    print("Assembly done: " + (ASSEMBLY_EDITS - failures) + "/" + ASSEMBLY_EDITS +
      " edits in " + s.totalMs + " ms (" + s.msPerEdit + " ms/edit); placed=" +
      (s.trackItemsPlaced !== undefined ? s.trackItemsPlaced : "unknown"));
    print("Now check " + seqName + " visually: contiguous 1.5s cuts, markers every 10th. Try undo (should be grouped, not 100 steps).");
    s.ok = failures === 0;
  } catch (e) {
    s.ok = false;
    s.error = String(e);
    print("Spike 3 FAILED: " + e);
  }
}

// ------------------------------------------------------- Step 4: OTIO / FCPXML

async function exportActiveSequence(kindLabel, fn, suggestedName) {
  const s = (report.spikes[kindLabel] = { startedAt: new Date().toISOString() });
  try {
    const project = await getProject();
    const sequence = await project.getActiveSequence();
    if (!sequence) throw new Error("No active sequence.");
    s.sequence = sequence.name;
    const file = await lfs.getFileForSaving(suggestedName);
    if (!file) throw new Error("No output file chosen.");
    print("\n=== Spike 4 (" + kindLabel + "): exporting \"" + sequence.name + "\" ===");
    const t0 = Date.now();
    const ok = await fn(sequence, file.nativePath);
    s.ms = Date.now() - t0;
    s.returned = ok;
    s.path = file.nativePath;
    try {
      const contents = await file.read();
      s.bytes = contents ? contents.length : 0;
      s.head = contents ? String(contents).slice(0, 300) : "";
    } catch (e) {
      s.readbackError = String(e);
    }
    print(kindLabel + " export returned " + ok + " in " + s.ms + " ms, ~" + (s.bytes || "?") + " bytes → " + file.nativePath);
    s.ok = !!ok;
  } catch (e) {
    s.ok = false;
    s.error = String(e);
    print("Spike 4 (" + kindLabel + ") FAILED: " + e);
  }
}

const spikeOtio = () =>
  exportActiveSequence("otio",
    (seq, p) => ppro.ProjectConverter.exportAsOpenTimelineIO(seq, p, true),
    "sequence.otio");

const spikeFcpXml = () =>
  exportActiveSequence("fcpxml",
    (seq, p) => ppro.ProjectConverter.exportAsFinalCutProXML(seq, p, true),
    "sequence.xml");

// ----------------------------------------------------------------- Save report

async function saveReport() {
  try {
    const file = await lfs.getFileForSaving("edit-agent-capability-report.json");
    if (!file) return;
    await file.write(JSON.stringify(report, null, 2));
    print("\nReport saved to " + file.nativePath + " — send this file back.");
  } catch (e) {
    print("Save failed: " + e);
  }
}

// -------------------------------------------------------------------- wiring

document.addEventListener("DOMContentLoaded", () => {
  outEl = document.getElementById("out");
  document.getElementById("btn-report").addEventListener("click", runCapabilityReport);
  document.getElementById("btn-transcribe").addEventListener("click", spikeTranscribe);
  document.getElementById("btn-assembly").addEventListener("click", spikeAssembly);
  document.getElementById("btn-otio").addEventListener("click", spikeOtio);
  document.getElementById("btn-fcpxml").addEventListener("click", spikeFcpXml);
  document.getElementById("btn-save").addEventListener("click", saveReport);
});
