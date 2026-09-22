# Phase 6K — Mercury through radon

September 13, 2026. Work remains in the existing Periodic Table Visualizer project.
All seven new elements open from the periodic table and support all three models.
This completes period 6, with **88 enabled explorers and 367 isotope/state choices**
across H–Ra. The remaining 30 elements have information cards. Actinium and the
actinides were not implemented; existing francium and radium were retained.

## Elements and isotopes added

Every configuration below starts with `[Xe] 4f¹⁴ 5d¹⁰`.

| Element | Default | Protons / neutrons / electrons | Outer configuration | Shell populations | Isotope choices |
|---|---|---|---|---|---|
| Mercury, Hg | Hg-202 | 80 / 122 / 80 | 6s² | 2,8,18,32,18,2 | 196,198,199,200,201,202,204 |
| Thallium, Tl | Tl-205 | 81 / 124 / 81 | 6s² 6p¹ | 2,8,18,32,18,3 | 203,205 |
| Lead, Pb | Pb-208 | 82 / 126 / 82 | 6s² 6p² | 2,8,18,32,18,4 | 204,206,207,208 |
| Bismuth, Bi | Bi-209 | 83 / 126 / 83 | 6s² 6p³ | 2,8,18,32,18,5 | 209 |
| Polonium, Po | Po-209 | 84 / 125 / 84 | 6s² 6p⁴ | 2,8,18,32,18,6 | 209,210 |
| Astatine, At | At-210 | 85 / 125 / 85 | 6s² 6p⁵ | 2,8,18,32,18,7 | 210,211 |
| Radon, Rn | Rn-222 | 86 / 136 / 86 | 6s² 6p⁶ | 2,8,18,32,18,8 | 219,220,222 |

There are 21 additions: 13 stable choices and eight radioactive choices.
Bi-209 is **radioactive**, with an adopted half-life of 2.01 × 10¹⁹ years,
rounded in the student panel. It is described as effectively stable for ordinary
purposes, not simply stable. **Po, At and Rn have no stable isotopes.**

| Radioactive isotope | Stored half-life | Main-panel display | Decay summary |
|---|---|---|---|
| Bi-209 | 2.01 × 10¹⁹ years | About 2 × 10¹⁹ years | Alpha to Tl-205 |
| Po-209 | 125.2 years | About 125 years | Mainly alpha to Pb-205; small electron-capture branch |
| Po-210 | 138.376 days | About 138 days | Alpha to Pb-206 |
| At-210 | 8.1 hours | About 8.1 hours | Mainly electron capture to Po-210; small alpha branch |
| At-211 | 7.214 hours | About 7.2 hours | Electron capture to Po-211, followed by alpha; alpha to Bi-207 |
| Rn-219 | 3.96 seconds | About 4 seconds | Alpha to Po-215 |
| Rn-220 | 55.6 seconds | About 56 seconds | Alpha to Po-216 |
| Rn-222 | 3.8235 days | About 3.82 days | Alpha to Po-218 |

Hg retains CIAAW percentages and uncertainties. Tl and Pb use published
terrestrial ranges, with the comparison bar hidden because those ranges do not
describe one fixed mixture. Pb-206/207/208 explanations distinguish accumulated
geological decay products from recently formed lead. Bi-209's 100% natural
abundance does not imply stability. Po-210 and radon have natural decay-chain
origins without invented fixed percentages. At-210/211 are produced research
choices; other short-lived astatine isotopes account for natural traces.
Optional Bi-213 and an extra thallium radioisotope were omitted for a concise list.

## Implementation and educational content

The new module reuses the validated 78-electron inner core and the existing
immutable schema, renderers, particle selector, camera, routes and subatomic
view. It does not duplicate geometry or introduce a framework or package.

The new tiles retain their positions, family colors and dimensions, with compact
atomic-weight labels added to Hg–Rn. Po `[209]`, At `[210]` and Rn `[222]` remain
representative mass numbers, not decimal atomic weights. A validator rejects
substituting ordinary weights for these three values. Previous/Next now connects
Au through the seven additions to Fr and Ra, then stops at unavailable Ac.

Original descriptions cover all three reading levels. Topics include mercury's
liquid state and toxic vapor, thallium's limited specialized uses and high toxicity,
lead batteries/shielding and exposure prevention, bismuth alloys and compound
medicines, controlled polonium research, emerging At-211 therapy research, and
radon's invisible indoor-air hazard, testing and mitigation. Historical tin-lead
solder is distinguished from increasingly common lead-free alternatives.

High-school text introduces the 6p progression and explains the less available
6s pair without treating it as the only factor in chemistry. Relativistic effects
are presented as a contribution to mercury's bonding and low melting point.
The text distinguishes individual atoms from bulk mercury liquid and radon gas.
No acquisition, preparation, concentration or handling procedures were added.

## Model simplifications

- **Bohr:** six counting shells, exact electron/nucleon totals, lightweight
  particles and compressed distances. Circular tracks are illustrative.
- **de Broglie:** a conceptual wave pattern per occupied subshell, rather than a
  separate animation for every electron. Hg has 14 occupied subshells; Tl–Rn have
  15. Inner states remain inspectable while outer states are emphasized.
- **Schrödinger:** a grouped 78-electron inner core plus 6s and, when occupied,
  6p. Overview therefore has two layers for Hg and three for Tl–Rn. Focus mode
  inspects every occupied subshell, including filled 4f/5d. Clouds summarize likely
  electron detection and have no hard surface; filled Rn 6p⁶ is not a rigid sphere.

Reduced quality changes decoration, not scientifically meaningful particle counts.
No model is a literal photograph, scale model or exact many-electron calculation.

## Files created or modified

Paths here are relative to this report's folder.

- Created `js/period6-completion-data.js`: seven elements, 21 isotopes, original
  three-level content, 19 source records and explicit validation.
- Updated `index.html`, `tests/atom-engine-test.html`: load the data module.
- Updated `js/periodic-data.js`: enable Hg–Rn and validate bracketed masses.
- Updated `js/periodic-ui.js`, `css/periodic.css`: compact mass labels on the new
  tiles using existing mass records, dimensions, colors and layout.
- Updated `js/particle-geometry.js`, `js/quantum-models.js`, `js/ui.js`,
  `js/engine-ui.js`: opt-in shared heavy-atom behavior, outer-region labels,
  subshell metadata, cloud layout and inner/outer descriptions.
- Updated `js/isotope-ui.js`: hide half-life for stable choices in the new batch.
- Updated `README.txt`, `START-HERE.txt`, `DEVELOPER-NOTES.txt`, `SOURCES.txt`,
  `TEST-RESULTS.txt`; created this report.
- Created `../qa/phase6k*.cjs`, result JSON and screenshots for main coverage,
  content, interactions, roles, subatomic views, state, responsive layout,
  performance and regression. Older global test expectations were advanced to
  88/367 totals and continuous H–Ra navigation; older element assertions remain.

## Sources consulted

The local source list stores exact URLs, organizations, access dates and claim
scope. References are expandable and are never fetched automatically.

- [NIST periodic table](https://www.nist.gov/document/periodictable2016pdf-0):
  neutral configurations; [CIAAW compositions](https://www.ciaaw.org/isotopic-abundances.htm):
  fractions/ranges, Bi composition and representative mass numbers.
- [ENSDF Bi-209 adopted levels](https://www.nndc.bnl.gov/ensnds/209/Bi/adopted.pdf):
  current hosted evaluation checked for the 2.01(8) × 10¹⁹-year alpha half-life.
- [NIST Po-209 measurement](https://www.nist.gov/publications/half-life-209po-revisited):
  named 2014 value, replacing the old 102-year lifetime.
- [NNDC April 2005 Wallet Cards](https://www.lnl.infn.it/wp-content/uploads/Nuclear_Wallet_Cards.pdf)
  and [ENSDF At-211 decay](https://www.nndc.bnl.gov/nudat3/getdecaydataset.jsp?dsid=211at+ec+decay&nucleus=211PO):
  other selected lifetimes and branches. This is an explicitly dated curated snapshot.
- RSC element pages for all seven additions and its relativity education article:
  material properties, uses and qualitative heavy-element behavior.
- [EPA radon](https://www.epa.gov/radtown/radon-homes-schools-and-buildings),
  [EPA mercury](https://www.epa.gov/mercury/basic-information-about-mercury) and
  [EPA lead](https://www.epa.gov/lead/what-are-some-health-effects-lead): health context.
- [NCI At-211 clinical trials](https://www.cancer.gov/research/participate/clinical-trials/intervention/astatine-at-211-anti-cd45-monoclonal-antibody-bc8-b10)
  and NIST lead-free solder publication: research status and electrical applications.

## Validation and interaction evidence

The main suite opens all 88 enabled elements through buttons and double-click.
It exercises the 21 new isotope choices in every model: 63 isotope/model cases,
with 42 nucleon interior returns and independent expected electron configurations.

Additional suites cover 14 direct electron clicks; 42 native nucleon double-clicks;
42 fullscreen interiors; 21 mouse rotation/wheel and 21 touch rotation/pinch cases;
168 subatomic panels; 378 responsive model/level cases at widths 320–1920;
and 21 forced reduced-detail cases preserving all physical particle counts.

Content checks verify 63 isotope/level panels, stable half-life hiding, Bi-209,
Po/At/Rn bracketed masses, published Tl/Pb ranges, absence of copper examples,
and mobile panel fit. All seven new tile double-clicks trigger exactly one load.
Mass labels fit beside atomic numbers. Programmatic negative cases cover
36 configuration/default/radioactivity errors, 14 identities, six isotope-schema
errors and three replacements of bracketed masses with decimal atomic weights.

Direct Au→Hg, Hg→Rn, Rn→H, Pb→Cu, Bi→Po, At→Rn and Rn→Au changes were
tested from nucleon interiors with changed isotopes. The destination receives
correct particles, isotope and camera state while retaining model/reading level.
Keyboard navigation, table positions, history, fullscreen exit, search/filter
restoration, reduced motion and offline operation are covered.

All **54 previous regression suites pass**, together with all eight Phase 6K
result files. Final regression status is recorded in `TEST-RESULTS.txt` and the machine-readable
`../qa/phase6k-regression-results.json`. Copper canvas images match the existing
Phase 6C baselines byte-for-byte; those baselines were not regenerated.

## Performance and limitations

600 repeated atom loads exercised H, Cu, Au, all seven new elements, Fr and Ra
in every model. Old scenes released geometry and particle caches. Renderer count
stayed at three, canvas count at two, listeners at 1,720, and pending animation
frames at one. Post-GC heap growth was 149,568 bytes, below the existing 4 MiB
tolerance. Radon retained its cached nucleon geometry across repeated draws.

After switching, Rn median draw times were approximately 1.1/0.9/1.8 ms for
Bohr/wave/quantum, with p95 values 1.3/1.2/2.1 ms. These are local synchronous
headless Chrome measurements with regression work running, not a guarantee for
every classroom device. Raw before/after data are saved.

All application checks used `file://`: no runtime network requests, missing local
resources or browser errors occurred. Touch was emulated; physical-device and
cross-browser certification are outside these results. Astatine's uncertain bulk
properties are not represented as directly measured certainties. The offline
isotope catalog does not update automatically. An actinide phase should separately
review complex electron configurations, nuclear data and readable radioactive-
isotope selection before enabling those elements.
