# Phase 6F — Period 5 complete

Completed in the existing Periodic Table Visualizer project on 12 September 2026. All **54 elements from hydrogen through xenon** have explorers, with **230 selectable isotope/nuclear-state records**. This phase adds six elements and 43 records. Caesium through oganesson retain information cards.

## Added records

| Element | Default | Protons / neutrons / electrons | Shells | Included mass/state labels |
|---|---|---|---|---|
| Indium | 115 | 49 / 66 / 49 | 2, 8, 18, 18, 3 | 113, 115, 111 |
| Tin | 120 | 50 / 70 / 50 | 2, 8, 18, 18, 4 | 112, 114, 115, 116, 117, 118, 119, 120, 122, 124, 117m, 126 |
| Antimony | 121 | 51 / 70 / 51 | 2, 8, 18, 18, 5 | 121, 123, 124, 125 |
| Tellurium | 130 | 52 / 78 / 52 | 2, 8, 18, 18, 6 | 120, 122, 123, 124, 125, 126, 128, 130 |
| Iodine | 127 | 53 / 74 / 53 | 2, 8, 18, 18, 7 | 127, 123, 125, 129, 131 |
| Xenon | 132 | 54 / 78 / 54 | 2, 8, 18, 18, 8 | 124, 126, 128, 129, 130, 131, 132, 134, 136, 133, 135 |

NIST ground-state records independently verify **[Kr] 4d¹⁰ 5s² 5p¹ through 5p⁶**. Each record explicitly lists all eleven occupied subshells. The validator checks electron totals, shell populations, capacities, isotope identities and default masses. No generic filling prediction supplies these configurations.

## Models and teaching content

Bohr retains every individual electron and nucleon, with five shell rings. De Broglie retains all eleven occupied wave bands without electron balls. Schrödinger Overview retains eleven clouds; Explore Subshells shows a representative orbital shape with the full subshell occupancy and capacity. Filled 4d is subdued and selectable; 5s and 5p form the emphasized valence shell. No content reduction or particle grouping was introduced for performance.

Elementary, Middle School and High School content covers particles, isotopes, models, engineering applications and the full Rb–Xe progression. Engineering examples distinguish elements from compounds and include the many-atom explanation of electrical behavior. Changing reading level preserves the active visualization.

## Radioactivity and nuclear isomers

Natural In-115, Te-128/130 and Xe-124/136 are explicitly radioactive with extremely long half-lives. Xe-124 uses observed double electron capture; Xe-136 uses observed two-neutrino double-beta decay. Stable means no observed radioactive decay, not an infinite half-life. Te-123 remains observationally stable; a search limit is not a measured lifetime. Natural mixtures include their radioactive components and sum to 100%. Produced isotopes and Sn-117m have no ordinary natural percentage.

Sn-117m and Sn-117 both contain 50 protons, 67 neutrons and 50 neutral electrons. The isomer stores its 314.58 keV excitation and selectable ground-state relationship. Its lifetime follows the named ENSDF March 2012 update, 14.00 days; older 13.76-day tables differ. Switching these states preserves the particle array, individual objects, geometry, renderers, camera, selection, model and pause. Existing Tc-99m and Ag-110m behavior passed regression testing.

## Scientific sources

The 38 new local source entries and reused DOE CdTe reference are documented in SOURCES.txt and the data module. Sources were checked on 11 September 2026.

- [NIST Atomic Spectra Handbook](https://physics.nist.gov/PhysRefData/Handbook/Tables/indiumtable1.htm): separate ground-state tables for all six elements.
- [CIAAW 2024 compositions](https://www.ciaaw.org/isotopic-abundances.htm): natural fractions and uncertainties.
- [NNDC Nuclear Wallet Cards](https://www.lnl.infn.it/wp-content/uploads/Nuclear_Wallet_Cards.pdf) and [Sn-117 ENSDF update](https://www.nndc.bnl.gov/nudat3/getdecaydataset.jsp?dsid=117sn+it+decay&nucleus=117SN): named decay snapshots, with later rare-decay evidence overriding old limits.
- [CUORE Te-128 analysis](https://link.aps.org/accepted/10.1103/PhysRevLett.129.222501): 2.19 × 10²⁴-year geochemical-ratio estimate, distinct from the neutrinoless-decay limit. Published geochemical estimates vary.
- [CUORE Te-130 measurement](https://arxiv.org/abs/2012.11749), [XENON Xe-124 observation](https://www.nature.com/articles/s41586-019-1124-4), and [EXO-200 Xe-136 measurement](https://arxiv.org/abs/1306.6106): observed rare-decay evidence.
- RSC, NIST, DOE, NASA, IAEA, NRC, FDA, NLM/DailyMed, NCI and primary research support material, medical and reactor applications. Research examples are qualified; no dosing or operating instructions are provided.

## Verification

- 54 enabled elements tested through card buttons and double-click entry; all 118 table positions retained and no 3D badges.
- 43 new isotope/state choices × 3 models = **129 model cases**; **86 nucleon round trips**.
- **18 native canvas electron clicks**, **36 fullscreen nucleon cases**, **144 subatomic panel cases**, and **18 gesture/model cases** passed.
- **27 Sn-117/117m switches** preserved state and particle identity. Eight malformed isomer records and six malformed isotope records were rejected.
- Three reading levels and widths **320, 390, 768, 1024, 1366 and 1920 px** tested. Expanded panels showed no horizontal text overflow. Representative screenshots were visually inspected.
- Keyboard navigation, touch rotation/pinch, mouse zoom, reset, history, reload, search/filter preservation and H/Cs navigation boundaries passed.
- All **26 previous-phase regression suites passed**, including H–Cd and existing isomers. Availability assertions now include H–Xe and unsupported routes target Cs; previous scientific expectations remain intact.
- Copper's three saved canvas comparisons remained byte-identical; the baseline was not regenerated.
- Direct file:// operation passed with no runtime remote requests, missing resources or normal-use console errors.

Detailed results are in ../qa/phase6f*-results.json, regression logs and screenshots. Performance results are in ../qa/phase6f-performance-results.json.

The repeated-switching test passed **540 element loads**, exercising all three models each time. Listener count stayed at 1,720, the renderer cache stayed at three, and disposed scenes retained no particle/cloud buffers. Post-GC heap growth was 804,640 bytes (about 0.77 MiB). No tested element exceeded the before/after slowdown threshold. Xenon median draw times after cycling were approximately 0.9 ms Bohr, 1.0 ms wave and 4.9 ms quantum. These are local desktop draw timings, not a frame-rate guarantee for other hardware.

## Files changed

- Added js/period5-completion-data.js: element/isotope records, three-level content, source metadata and validator.
- Updated index.html and tests/atom-engine-test.html: load the new local module.
- Updated js/periodic-data.js: enable In–Xe.
- Updated js/engine-config.js: full-detail range through Z=54.
- Updated js/particle-geometry.js, js/ui.js and js/engine-ui.js: metadata-driven filled-core labels and selection; correct 5s/5p valence information.
- Updated js/quantum-models.js: separate display radii for all eleven new cloud states.
- Updated START-HERE.txt, README.txt, DEVELOPER-NOTES.txt, SOURCES.txt and TEST-RESULTS.txt; added this report.
- Added ../qa/phase6f*.cjs, results, record audit and screenshots. Earlier QA scripts received availability/boundary updates.

## Limits and next phase

These are qualitative teaching models, not physical-scale images, exact many-electron solutions or decay simulations. Nuclear lifetimes are documented evaluation snapshots, not a live precision database. No real mobile hardware, Safari, Firefox or Edge testing was completed; browser checks used desktop Chrome with emulated viewports and touch. School-managed device restrictions were not tested.

Begin Period 6 with caesium and barium. Then add the lanthanides in a separately validated batch with explicit measured 4f/5d/6s configurations, clear orbital-role explanations and isotope records. Measure rendering cost before introducing that larger set; retain all occupied states and reduce decorative work first if needed.
