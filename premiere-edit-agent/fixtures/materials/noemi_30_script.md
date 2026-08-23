# :30 Commercial — Script (Noemi Legaspi spot)

**Editor ruling (2026-08-23): the authoritative script is whatever she read off
the prompter and recorded on camera.** The as-read reference below is
reconstructed from the transcripts (T_112 full take + pickups); the originally
provided draft is kept underneath for provenance.

## Authoritative as-read reference (confirmed from the full-shoot transcript)

**Scene 1** (setups: 1-Alpha rolls T_112–116 / clips C031–C035; 1-Baker rolls
T_117–121 / clips C036–C040):

> I'm Noemi Legaspi. For 20 years, I've called Woodburn home.
> This is my community. I know my neighbors. I know their struggles.
> And I know what rising taxes are doing to families trying to get ahead.
> Salem keeps passing the costs down to us, and nothing is getting better.
> I'm running to change that because as a small business owner,
> I know a lot more about Oregon's economy than any politician.

**Scene 2** (setups: 2-Apple rolls T_122–126 / clips C001–C005; 2-Baker rolls
T_127–129 / clips C006–C008):

> I'm a small business owner, a mental health counselor, and daughter of
> Mexican immigrants. I've spent two decades protecting Oregon families.
> You deserve someone who's fighting for you, not the insiders.

Notes: the draft's "who's made payroll" bridge was never read — every complete
take says "because as a small business owner". Scene 2 usually starts without
the name (it appears in only a couple of takes). "Paid for by Noemi Legaspi
PAC" was never read on set (VO/graphic). "cost"/"costs" varies take to take.

## Producer notes (project-specific criteria)

- 2026-08-23, via editor: **the producer's favorite takes are 3 and 4.**
  Treatment: a ranking boost and a "producer favorite" tag on those takes —
  not an override. The selects still show the tool's own delivery ranking so
  agreement/divergence is visible ("producer favorite take 3 also ranks #1 on
  energy" vs. a flagged split). Takes are resolved to clips via spoken-slate
  parsing (`companion/editagent/slate.py`).

## Original draft as provided

> I'm Noemi Legaspi
>
> For more than ten years, I've run a small business here in Woodburn
>
> This is my community, I know my neighbors, I know their struggles,
> and I know what rising taxes are doing to families trying to get ahead
>
> Salem keeps passing the costs down to us
>
> I'm running to change that because a small business owner who's made payroll
> knows a lot more about Oregon's economy than any politician.
>
> Paid for by Noemi Legaspi PAC

## Known discrepancies vs. what was read on set (roll SCENE_T_112)

The teleprompter copy on set differed from the script above — flagged for the
editor to resolve which version is authoritative:

| Script above | Read on set (T_112) |
|---|---|
| "For more than ten years, I've run a small business here in Woodburn" | "For 20 years, I've called Woodburn home." |
| "Salem keeps passing the costs down to us" | "Salem keeps passing the cost down to us, and nothing is getting better." |

Script-fidelity matching must therefore tolerate revision drift and always
report take-vs-script differences rather than assume either is wrong.
