# Niobium through cadmium — completed 11 September 2026

Implemented in the existing Periodic Table Visualizer project. **All 48 elements H–Cd now have explorers**, with **187 selectable isotope/nuclear-state records**. The 43 additions include two metastable states. No other project was used.

## Elements and isotope sets

| Element | Default | Protons/neutrons/electrons | Occupied shells | Neutral configuration | Included mass/state labels |
|---|---|---|---|---|---|
| Niobium | Niobium-93 | 41/52/41 | 2, 8, 18, 12, 1 | [Kr] 4d⁴ 5s¹ | 93, 92, 94 |
| Molybdenum | Molybdenum-98 | 42/56/42 | 2, 8, 18, 13, 1 | [Kr] 4d⁵ 5s¹ | 92, 94, 95, 96, 97, 98, 100, 99 |
| Technetium | Technetium-98 | 43/55/43 | 2, 8, 18, 13, 2 | [Kr] 4d⁵ 5s² | 98, 99, 99m |
| Ruthenium | Ruthenium-102 | 44/58/44 | 2, 8, 18, 15, 1 | [Kr] 4d⁷ 5s¹ | 96, 98, 99, 100, 101, 102, 104 |
| Rhodium | Rhodium-103 | 45/58/45 | 2, 8, 18, 16, 1 | [Kr] 4d⁸ 5s¹ | 103, 105 |
| Palladium | Palladium-106 | 46/60/46 | 2, 8, 18, 18 | [Kr] 4d¹⁰ | 102, 104, 105, 106, 108, 110, 107 |
| Silver | Silver-107 | 47/60/47 | 2, 8, 18, 18, 1 | [Kr] 4d¹⁰ 5s¹ | 107, 109, 110m, 111 |
| Cadmium | Cadmium-114 | 48/66/48 | 2, 8, 18, 18, 2 | [Kr] 4d¹⁰ 5s² | 106, 108, 110, 111, 112, 113, 114, 116, 109 |

Nb-92/94, Mo-99/100, all Tc states, Rh-105, Pd-107, Ag-110m/111 and Cd-109/113/116 are radioactive. All remaining new records are observationally stable. Mo-100, Cd-113 and Cd-116 remain in their natural mixtures. No ordinary abundance is assigned to produced states. Optional Ru-106 was not included.

## Configurations and models

NIST ground-state records verify all eight configurations. Nb, Mo, Ru, Rh and Pd use their measured exceptions. Ag and Cd explicitly retain filled 4d with one/two 5s electrons. No generic Aufbau calculation supplies the records.

Palladium has only four occupied shells, nine occupied subshells and no occupied 5s. The other seven additions have five occupied shells and ten occupied subshells. Bohr renders individual electrons; de Broglie has every occupied band without electron balls; Schrödinger Overview retains all occupied clouds and Explore Subshells lists actual occupied states. 4d and 5s roles are separately selectable. Filled 4d descriptions differ from developing 4d descriptions. Three reading levels and Across Period 5 cover the complete Rb–Cd progression.

## Nuclear isomers

Tc-99 and Tc-99m both have 43 protons, 56 neutrons and 43 neutral electrons. Switching them changes the nuclear-state record without regenerating the particle array, nucleus or renderer instances. The m suffix appears in names, nuclear symbol, fullscreen and internal-exploration breadcrumbs. The explanatory panel identifies an excited nucleus with the same counts. Ag-110m stores its Ag-110 ground-state relationship; Ag-110 itself is not selectable in this phase.

Records store excitation identifiers and energies, metastable labels, ground-state links, half-lives, decay modes, relevance and three-level explanations. Invalid isomer records fail before state mutation. Changing a mass number retains the existing isotope behavior; changing from an interior view returns to the atom.

## Sources and accuracy

Local source metadata is in js/period5-transition-data.js and SOURCES.txt. NIST supplies neutral atomic configurations; CIAAW 2024 supplies terrestrial abundances; NNDC/ENSDF, BIPM/DDEP and primary experiments supply decay classifications and half-lives. EPA supplies the natural-technetium qualification. RSC, USGS, DOE, NIST, national laboratories and primary researchers support applications.

Lifetimes are explicitly named source snapshots, with rounded student displays. Stable means no observed decay. A lower limit for hypothetical decay is not treated as an observed lifetime. Rh-105 and Ag-111 therapy descriptions identify research status. Cadmium toxicity is distinguished from radioactivity. Advanced source caveats remain in the source notes rather than the main particle description.

## Verification

PASS: 48 elements / 187 selectable records; new batch 8 / 43.
43 isotope/state cases across 3 models = 129; 86 nucleon round trips.
23 native canvas electron clicks; 48 fullscreen nucleon cases.
192 subatomic panels; 24 gesture/model cases; three reading levels.
27 Tc same-A state switches preserve array, object and renderer identity,
geometry, camera, selection and pause; 8 invalid isomer records rejected.
Six additional corrupted isotope records rejected. Pd: 4 rings, 46 individual
electrons, 9 occupied wave/cloud states, no 5s options or outer-s category.
Other new elements: 5 rings, 10 occupied wave/cloud states, individual electrons.
Widths 320, 390, 768, 1024, 1366, 1920: no document or particle-panel overflow.
All 21 earlier regression suites pass, including targeted phase51 rerun.
Copper's three canvas PNGs remain byte-identical to the earlier golden baseline.
Direct file:// testing: no remote requests, missing assets or normal-use errors.

Performance: 480 repeated element switches; 1720 listeners before/after;
3 cached model renderers, no retained disposed scene or duplicate particles.
Post-GC heap growth 0.78 MiB. Nb–Cd median draw times after cycling:
Bohr 0.6–1.2 ms, wave 0.8–1.3 ms, quantum 4.8–6.7 ms.
No progressive slowdown under the benchmark's median threshold. These are
headless desktop Chrome observations, not physical-device frame-rate guarantees.

Search/filter restoration, single/double clicks, Explore buttons, keyboard, hashes, reload/history, Previous/Next, zoom/rotation, reset, pause, fullscreen and explanation-state preservation were exercised. Cadmium cannot advance to unfinished indium. The complete folder still launches directly from index.html without a server, CDN, runtime API, installation or internet.

## Files changed

- New app module: js/period5-transition-data.js.
- index.html: ordered module load and current availability text.
- js/periodic-data.js: completed explorer list through Cd.
- js/engine-config.js: full-detail threshold through Z=48.
- js/particle-geometry.js: omit nonexistent Pd outer-s category.
- js/atom-data.js: isomer validation and shared display-name helper.
- js/app.js: preserve particles on same-mass nuclear-state changes.
- js/ui.js, js/isotope-ui.js, js/subatomic.js: isomer names and nuclear-state information.
- tests/atom-engine-test.html: new data-module load.
- README.txt, START-HERE.txt, DEVELOPER-NOTES.txt, SOURCES.txt, TEST-RESULTS.txt and this report.
- ../qa/phase7b*.cjs, results and screenshots: phase coverage. Earlier QA scripts have updated availability and guard expectations; phase51's stale expected hash was corrected after its first failed run.

## Limitations and next phase

Not run on physical phones/tablets or classroom hardware, real screen readers, or Firefox/Edge/Safari in this phase. Touch was emulated in Chrome. Cloud and wave shapes are qualitative teaching models, sizes are compressed, and decay/isomer transitions are described rather than physically simulated. The isotope sets are curated, not exhaustive; source snapshots are not a precision decay-data service.

Proceed with **indium through xenon** as a separately sourced expansion. Retain full detail initially, add explicit 5p configurations and carefully classified natural radioactive isotopes, then repeat the current device/layout and performance checks before changing rendering complexity.
