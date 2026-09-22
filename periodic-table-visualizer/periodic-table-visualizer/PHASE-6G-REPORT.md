# Phase 6G — Cesium, barium, francium and radium

Implemented in the existing Periodic Table Visualizer project on 12 September 2026. There are **58 enabled explorers: hydrogen through barium, plus francium and radium**, with **248 selectable isotope/nuclear-state records**. The other 60 elements retain information cards. All assets and data remain local; open `index.html` directly.

## Elements and isotopes

| Element | Default | Protons / neutrons / electrons | Shells | Selectable isotopes |
|---|---|---|---|---|
| Cesium (Caesium on the table) | Cs-133 | 55 / 78 / 55 | 2, 8, 18, 18, 8, 1 | 133, 134, 137 |
| Barium | Ba-138 | 56 / 82 / 56 | 2, 8, 18, 18, 8, 2 | 130, 132, 134, 135, 136, 137, 138, 133, 140 |
| Francium | Fr-223 | 87 / 136 / 87 | 2, 8, 18, 32, 18, 8, 1 | 223, 221 |
| Radium | Ra-226 | 88 / 138 / 88 | 2, 8, 18, 32, 18, 8, 2 | 223, 224, 226, 228 |

The four records explicitly use **[Xe] 6s¹, [Xe] 6s², [Rn] 7s¹ and [Rn] 7s²**. Cs/Ba have twelve occupied subshells. Fr/Ra have sixteen, including filled 4f¹⁴, 5d¹⁰, 6s² and 6p⁶ in the radon core. Shell populations come from these explicit configurations, not a generic filling prediction.

The 18 new records include seven observationally stable isotopes and eleven radioactive isotopes. Cs-133 is the only stable naturally occurring cesium isotope. Ba-138 dominates natural barium. Ba-130 remains a natural, extremely long-lived radioactive component; Ba-132/134/135/136/137/138 are stable. No francium or radium isotope is marked stable or assigned an ordinary abundance percentage. Their tiny natural amounts depend on decay chains.

## Teaching content and models

Elementary, Middle School and High School descriptions cover element properties, particles, isotopes, applications and the three models. The optional **Compare Groups 1 and 2** panel compares outer s electrons and Periods 6/7. High School explains that effects involving fast and interacting electrons are not calculated here. Changing reading level preserves the active model, selection, camera, pause and presentation state.

The science panel distinguishes reactive elemental metals from compounds: cesium timing/photoelectric materials, barium sulfate imaging and drilling fluids, barium ceramics/electronics, francium research, and radium history and specialist medical uses. Soluble barium compounds and poorly soluble barium sulfate are distinguished. Radium-223's approval is indication-specific; the cited radium-224 treatment is investigational. Historical luminous paint is described as a cause of severe occupational harm.

Cs/Ba keep full-detail electron and nucleon rendering, six rings, all twelve wave states and twelve quantum overview layers. Fr/Ra retain all 87/88 Bohr electrons, all isotope nucleons, and seven rings. Shared circle geometry and flat nucleon shading reduce repeated drawing work without combining particles or hit targets.

Fr/Ra quantum Overview uses a faint **86-electron combined inner core** plus the highlighted 7s region. The core has its own selection identity and explanation, rather than pretending to be a single 6p subshell. Explore Subshells isolates any of the sixteen occupied states with exact occupancy/capacity and a representative s, p, d or f shape. The 4f view explicitly reports 14 of 14 electrons while showing one representative orientation. Wave mode retains all sixteen selectable bands and has no electron balls. Visual review led to a clearer lower wave label and gold outer clouds.

## Scientific sources

Twenty-one local source records include organization, title, URL, access date and supported facts. Full entries are in `SOURCES.txt` and `js/outer-s-data.js`.

- NIST neutral ground states: [cesium](https://physics.nist.gov/PhysRefData/Handbook/Tables/cesiumtable1.htm), [barium](https://physics.nist.gov/PhysRefData/Handbook/Tables/bariumtable1.htm), [francium](https://physics.nist.gov/PhysRefData/Handbook/Tables/franciumtable1.htm), [radium](https://physics.nist.gov/PhysRefData/Handbook/Tables/radiumtable1.htm).
- [CIAAW 2024 isotopic compositions](https://www.ciaaw.org/isotopic-abundances.htm) supplies the natural percentages and uncertainties. Natural barium percentages sum to 100%.
- Nuclear lifetimes and minor channels use the explicitly named [NNDC April 2005 Nuclear Wallet Cards](https://www.lnl.infn.it/wp-content/uploads/Nuclear_Wallet_Cards.pdf) snapshot, with classroom rounding. These are not presented as the newest precision evaluations.
- Ba-130 uses [Meshik et al.'s 2001 geochemical measurement](https://profiles.wustl.edu/en/publications/weak-decay-of-sup130supba-and-sup132supba-geochemical-measurement), about 2.2 × 10²¹ years. Accumulated daughter xenon supports a combined weak-decay estimate; double electron capture is expected to dominate. The text does not claim a directly resolved decay channel.
- [BIPM's definition of the second](https://www.bipm.org/en/si-base-units/second) supports the Cs-133 atomic transition explanation. This transition is not radioactive nuclear decay.
- [IAEA TRS 389](https://www-pub.iaea.org/MTCD/Publications/PDF/TRS389_scr.pdf) supports the clarification that reactor Cs-134 is produced mainly by neutron capture on Cs-133, despite being discussed alongside fission products.
- RSC element references, NIST calibration/francium research, Los Alamos photocathode research, EPA cesium/radium/history pages, [DailyMed's Xofigo label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a398400e-bd31-41a9-9696-4f7c06569ede) and the [NCI Ra-224 trial](https://www.cancer.gov/research/participate/clinical-trials-search/v?id=NCI-2022-10859&r=1) support the application text.

## Navigation

Single-click/tap opens a card; mouse double-click or Explore enters an enabled atom. The table keeps all 118 positions and has no 3D badges. Both cesium spellings work in search. Keyboard, touch, search/filter restoration, direct symbol hashes, reload and browser history were exercised.

Navigation always considers the immediate atomic-number neighbor. **Xe → Cs → Ba** stops before unavailable La. **Fr → Ra** stops before Ac, and Fr's Previous stops at unavailable Rn. Ra's Previous returns to Fr. Hydrogen's Previous is disabled. No control skips an unfinished gap or implies the rest of Periods 6/7 are complete.

## Verification

- Global validation: **58 elements / 248 records**, new batch **4 / 18**.
- All 18 new isotopes across three models: **54 model cases** and **36 proton/neutron interior round trips**.
- **8 native canvas electron clicks**, **24 fullscreen nucleon cases**, and **12 touch rotation/pinch model cases** passed.
- **96 quark, gluon and whole-nucleon panels** passed across both nucleons and all reading levels.
- Six malformed isotope records and sixteen malformed configurations/defaults were rejected.
- **216 element/model/reading-level/width combinations** passed at 320, 390, 768, 1024, 1366 and 1920 pixels. Expanded panels and full configurations showed no horizontal overflow. Twelve forced low-detail model checks retained exact physical-particle counts.
- All occupied wave/subshell selectors, representative 4f isolation, combined-core selection, radioactivity labels and hidden Fr/Ra abundance charts passed.
- Copper's three saved reference canvases remain byte-identical; the baseline was not regenerated.
- Direct `file://` operation passed with no runtime remote requests, missing resources or normal-use console errors.
- **All 31 previous-phase regression suites passed**, including all earlier explorers and Tc-99m, Ag-110m and Sn-117m behavior. Availability assertions now include the four new elements; unfinished-neighbor tests use La. Earlier scientific expectations remain intact.

Evidence is in `../qa/phase6g*-results.json`, regression logs and screenshots. The tests use desktop Chrome with emulated viewports/touch.

## Performance and reductions

The stress test passed **500 loads cycling Xe, Cs, Ba, Fr and Ra**, switching through all three models on every load. Listener count stayed at **1,720**; the renderer cache stayed at **three**. Disposed renderers released physical-particle arrays, cloud buffers, sprites and shared paths. Post-GC heap growth was **809,892 bytes**, about **0.77 MiB**, within the test's 4 MiB threshold. No before/after median slowdown threshold was exceeded.

| Element | Bohr median | Wave median | Quantum median |
|---|---:|---:|---:|
| Xe | 1.1 ms | 1.2 ms | 5.1 ms |
| Cs | 1.2 ms | 1.1 ms | 4.8 ms |
| Ba | 1.1 ms | 1.1 ms | 4.8 ms |
| Fr | 1.3 ms | 0.9 ms | 1.4 ms |
| Ra | 1.3 ms | 0.9 ms | 1.4 ms |

These are synchronous desktop draw medians after cycling, not end-to-end frame rates. Ra wave p95 was 11.7 ms in this run despite its low median; other work was running concurrently, so timings should not be treated as hardware guarantees.

Cs/Ba required no heavy preset. Fr/Ra use the existing heavy preset: flat nucleon shading, electron decorative scale 0.78, DPR cap 1.5, and 72 wave segments instead of 140. Their overview has 700 core sample points plus 262 outer points; isolation uses 1,200 points. No additional runtime reduction was needed to pass the measured stress test. These preset choices favor clarity and lower drawing cost; testing does not prove they are necessary on every device. The adaptive fallback can further reduce wave segments/cloud sample density without dropping any particles or occupied subshell data.

## Files changed

- Added `js/outer-s-data.js`: four elements, eighteen isotopes, three-level explanations, source metadata and validation.
- Updated `index.html` and `tests/atom-engine-test.html` to load the local module.
- Updated `js/periodic-data.js` to enable Cs, Ba, Fr and Ra.
- Updated `js/engine-config.js` for full detail through Z=56.
- Updated `js/particle-geometry.js` for new subshell metadata.
- Updated `js/atom-model.js` for shared heavy-nucleon circle geometry and disposal.
- Updated `js/quantum-models.js` for new display radii, inner/outer contrast, wave labels and combined-core identity.
- Updated `js/ui.js` for the combined-core particle description.
- Updated `START-HERE.txt`, `README.txt`, `DEVELOPER-NOTES.txt`, `SOURCES.txt`, `TEST-RESULTS.txt`; added this report.
- Added permanent `../qa/phase6g*.cjs` checks, source export, JSON results and screenshots. Earlier QA suites received availability and boundary expectation updates; their scientific checks remain intact.

## Limits and next phase

No physical Chromebook/tablet/phone, Safari, Firefox, Edge, screen reader or school-managed file restrictions were tested. The models are qualitative, not physical-scale images, exact many-electron wavefunctions, relativistic calculations or decay simulations. Nuclear data are documented snapshots. Reference links need internet only when opened; the explorer itself does not.

Begin the lanthanides with a small, independently verified La/Ce/Pr/Nd batch. Source each neutral 4f/5d/6s configuration explicitly, including exceptions; do not infer them from a simple filling rule. Reuse the grouped-core overview while retaining each occupied subshell and exact Bohr counts. Validate isotope choices and 4f shapes, benchmark the first batch, then extend across the series.
