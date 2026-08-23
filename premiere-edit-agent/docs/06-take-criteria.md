# 06 — Take Selection Criteria (commercial, low-charisma subject)

**Status: DRAFT — proposed 2026-08-23, pending the editor's edits and priority
ranking.** Supersedes the "energy" framing: when a subject is uniformly
low-energy, ranking by energy is noise. The question is which take is most
*workable* — which responds best to music, B-roll, and tight cutting.

## A. Gate criteria (pass/fail; failing takes are excluded, with the reason)

| # | Criterion | Measured by |
|---|---|---|
| 1 | Script accuracy — the actual words, no paraphrase/drops/wrong names | now: token match vs. as-read reference |
| 2 | Line completeness — full sentence in one unbroken read | now: contiguous coverage of the line |
| 3 | Clean diction — no mumbles/slurs/mispronunciations | now (proxy): low-confidence word ratio |

## B. Ranking criteria (ordered list is provisional until the editor ranks them)

| # | Criterion | Measured by |
|---|---|---|
| 4 | Conviction — doesn't trail off at sentence ends | Phase 3 audio (end-of-sentence pitch/loudness fall); AI judgment interim |
| 5 | Natural cadence vs. prompter cadence — rhythm varies like thought | now (proxy): syllable-timing evenness; Phase 3 audio refines |
| 6 | Correct emphasis on operative words | AI judgment from audio |
| 7 | Warmth/sincerity — 10% warmth beats sterile-clean | AI judgment from audio |
| 8 | Cuttability — clean head/tail, usable breath, no direction bleed | now: gap/bleed analysis around the take |
| 9 | Line-to-line matchability — assembly doesn't sound Franken-edited | now (partial): pace similarity across chosen set; scored on combinations, not single takes |
| 10 | No distracting artifacts (smacks, gasps, creaks) | Phase 3 audio |

## C. External inputs (modifiers and tags — never overrides)

| # | Input | Mechanism |
|---|---|---|
| 11 | Producer/client favorites (e.g. "takes 3 & 4") | ranking boost + visible tag; divergence from the tool's own ranking is reported, not hidden |
| 12 | On-camera performance (eyes, face, posture) | human tag column in the paper cut; feeds the learning system; not machine-scored in V1 |

## Open questions for the editor

1. Edits to the list — anything missing, wrong, or mis-framed (esp. #7
   "warmth beats clean")?
2. Priority order within B for this subject — is #4 (conviction) or #8
   (cuttability) the top criterion, given aggressive cutting around music?

Until answered, implementation weights are provisional and marked as such in
`companion/editagent/ranking.py`; every ranked take carries its per-criterion
evidence so re-weighting later re-ranks without re-analysis.
