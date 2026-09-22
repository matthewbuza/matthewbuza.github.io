# Rubidium through zirconium — first Period 5 expansion

Implemented in the existing offline Periodic Table Visualizer project, 10 September 2026. All **40 elements H–Zr** now have student explorers, with **144 isotope choices**. Niobium and later elements retain information cards. No installation, server, runtime API, CDN or external asset is required.

## Added elements and isotopes

| Element | Default | Default p / n / e | Shell populations | Configuration after [Kr] | Included isotope masses |
|---|---|---|---|---|---|
| Rubidium | Rb-85 | 37 / 48 / 37 | 2, 8, 18, 8, 1 | 5s¹ | 85 stable; 87 naturally radioactive |
| Strontium | Sr-88 | 38 / 50 / 38 | 2, 8, 18, 8, 2 | 5s² | 84, 86, 87, 88 stable; 90 radioactive |
| Yttrium | Y-89 | 39 / 50 / 39 | 2, 8, 18, 9, 2 | 4d¹ 5s² | 89 stable; 90 radioactive |
| Zirconium | Zr-90 | 40 / 50 / 40 | 2, 8, 18, 10, 2 | 4d² 5s² | 90, 91, 92, 94 stable; 96 naturally radioactive; 89 radioactive |

These are 15 new isotope records. The expanded krypton core is **1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶**, containing 36 electrons. NIST's neutral-atom handbook entries independently confirm each configuration. Records are explicit; no filling-order algorithm guesses them. All isotope changes calculate neutrons as mass number minus atomic number and retain the neutral electron configuration.

## Rendering and teaching

The full-detail tier extends through Z=40. Bohr shows every electron and nucleon and five occupied shell guides. Wave shows nine occupied subshell states for Rb/Sr and ten for Y/Zr, with no electron balls. Quantum Overview retains nine/ten distinct subshell layers. Explore Subshells isolates a representative shape with the full occupancy and capacity in the panel; a d subshell has five related orbitals, rather than one cloud per electron.

The shared role machinery now supports **4d transition electrons** and **outer 5s electrons**. Both can be chemically important for Y/Zr. The outer-shell category is not presented as their complete valence definition. The new Across Period 5 disclosure explains 5s¹ → 5s² → 4d¹ 5s² → 4d² 5s² at Elementary, Middle School and High School levels. Existing Period 4 roles and exceptions are preserved.

Engineering text covers rubidium clocks and rock dating; strontium colors, ceramics and magnets; yttrium phosphors, lasers and superconducting materials; and zirconium cladding and ceramics. Zirconium metal, zircon silicate and zirconia oxide are distinguished. Ordinary stable strontium and yttrium are not described as if they were Sr-90 or Y-90. Medical applications identify the radioactive isotope and its carrier rather than implying that the ordinary element is a treatment.

The existing build had no dedicated Previous/Next buttons. Native buttons were added through the existing guarded hash router to meet this request. They follow atomic number, including Kr → Rb → Sr → Y → Zr. Previous is disabled at H and Next is disabled at Zr, with an accessible explanation identifying unfinished niobium. Direct `#explore=Nb` remains guarded. Single-click/tap cards, Explore buttons, mouse double-click and browser history remain supported.

## Scientific source decisions

- **NIST Atomic Data Handbook:** four neutral ground states and expanded krypton core.
- **CIAAW / IUPAC 2024:** representative terrestrial abundances and uncertainties. The updated zirconium fractions are 51.47%, 11.23%, 17.16%, 17.36%, 2.78% for masses 90, 91, 92, 94, 96. NIST's older abundance table was not substituted for CIAAW.
- **CIAAW rubidium and USGS geologic time:** Rb-87 beta-minus decay to stable Sr-87; the selected teaching half-life is 48.8 billion years. This is a sourced learning value, not a precision dating calibration. Isotope ratios support rock dating; atomic clocks use an atomic transition instead of nuclear decay.
- **BIPM / DDEP volume 3:** Sr-90 28.80(7) years, beta-minus to Y-90; Y-90 2.6684(13) days, beta-minus to Zr-90. Student text rounds these to about 29 years and 64 hours.
- **BIPM / DDEP volume 8:** Zr-89 78.42(13) hours, primarily electron capture with a positron branch to Y-89. DOE/NIDC supports labelled-antibody PET research wording.
- **NEMO-3 primary measurement:** observed two-neutrino double-beta decay of Zr-96, 2.35 ±0.14 statistical ±0.16 systematic ×10¹⁹ years. It is classified as extremely long-lived and radioactive, not stable. Searches for neutrinoless decay are explicitly distinguished from an observed process.
- **NIST clocks, EPA, BGS, IAEA, DOE/NIDC and RSC:** clocks, fission-product context, isotope provenance, medical delivery and material uses. Sr-87/Sr-86 provenance is described as evidence interpreted with local context, not an exact location detector.

Rb-87 and Zr-96 remain in the natural-abundance comparison and are labelled radioactive. Sr-90, Y-90 and Zr-89 have no invented ordinary natural percentages. Stable records display Stable rather than an infinite half-life. Terrestrial fractions are distinguished from cosmic prevalence. Full local references include organization, title, URL, access date and supported facts in `js/period5-data.js`, the app's source panel and `SOURCES.txt`.

## Changed files

Created `js/period5-data.js` and this report. Updated:

- `index.html` and `tests/atom-engine-test.html`: load the new local module; the main page also adds adjacent-element controls and current availability text.
- `js/engine-config.js`: full detail through Z=40.
- `js/periodic-data.js`: enable Rb/Sr/Y/Zr.
- `js/periodic-ui.js`: adjacent-element control labels, boundaries and guarded routing.
- `js/particle-geometry.js`: assign role metadata across all occupied shells; use active transition/outer-shell names.
- `js/quantum-models.js`: five-shell cloud extents and subdued core wave bands, reusing existing rendering and shape algorithms.
- `js/ui.js`, `js/engine-ui.js`: generalize transition selection and headings from 3d/4s to the active 4d/5s records.
- `css/periodic.css`: responsive adjacent-element navigation.
- `START-HERE.txt`, `README.txt`, `DEVELOPER-NOTES.txt`, `SOURCES.txt`, `TEST-RESULTS.txt`: current scope, source provenance and validation.

Added `qa/phase7a.cjs`, `phase7a-interactions.cjs`, `phase7a-roles.cjs`, `phase7a-performance.cjs`, `phase7a-regressions.cjs`, `phase7a-subatomic.cjs`, their result JSON files and screenshots. Earlier availability and unfinished-route test expectations now use H–Zr and Nb; earlier scientific expectations remain intact. QA tooling remains outside the portable app.

## Executed new-element verification

- All 40 available elements open through Explore and mouse double-click. No tile badges. All 118 basic records remain accessible.
- All 15 new isotopes across all three models: **45 model cases**, exact p/n/e and shell/subshell counts, capacities and full-detail layers; **30 proton/neutron interior round trips** preserve state.
- **10 native electron clicks** across inner, outer and transition categories; **24 fullscreen nucleon round trips**; three explanation levels; six invalid isotope records rejected.
- Independent default/configuration and natural-mixture checks; 4d group counts and representative shapes; fifth-shell selection and animation.
- **12 element/model gesture cases** covering emulated touch rotation and pinch, wheel zoom and reset. Keyboard Next traversal, Previous, history/reload and H/Nb boundaries pass.
- Responsive checks at 320, 390, 768, 1024, 1366 and 1920 pixels; expanded panels at 320/390/768. No document or particle-panel horizontal overflow. Native controls retain accessible names and keyboard operation.
- Screenshots reviewed for the Zr quantum overview, Y 4d isolation and a narrow-screen Zr reading view. All new-element functional checks used direct `file://`; no normal-use errors, failed local resources or runtime network requests were detected.

All 17 earlier regression suites passed, including Phase 6D's isotope/model, interaction and shape checks. Copper's three canvas snapshots remain byte-identical to their saved baselines. Another 96 new-element subatomic panel cases passed, selecting up/down quarks, gluons and whole nucleons for both nucleon types at all three reading levels.

The 400-element-switch performance run retained 1720 listeners and three current renderer instances, with 0.82 MiB post-GC heap growth. New-element median draw times were 0.6–0.7 ms Bohr, 0.7–0.8 ms Wave, and about 4.6 ms Quantum. No progressive slowdown was detected by the before/after test threshold.

Final regression and performance outcomes are recorded in `TEST-RESULTS.txt` and the QA JSON files.

## Limitations

Testing uses desktop Chrome with emulated viewport sizes and touch. Physical mobile devices, screen-reader software, Firefox, Edge and Safari were not tested. The timings do not establish performance on low-end classroom hardware. Clouds and waves remain qualitative teaching models with compressed scale, not exact many-electron solutions. No grouped inner-state rendering, new atomic model, decay animation, molecule, lattice or student ion control was introduced.

For the next batch, curate niobium and later configurations—including 4d/5s exceptions—and isotope records before enabling any route. Current desktop measurements do not justify reducing detail through zirconium. Profile additional fifth-period states on representative classroom devices before changing sampling or visual detail.
