# Phase 6C — completed 10 September 2026

Implemented in the existing Periodic Table Visualizer project. All **29 elements from hydrogen through copper** now have complete explorers. Zinc and the 89 remaining unfinished elements retain information cards. No replacement application, new page, runtime dependency or network feature was introduced.

## Enabled records

| Element | Default | Default p / n / e | Shells | Configuration after [Ar] | Included mass numbers |
|---|---|---|---|---|---|
| Potassium | K-39 | 19 / 20 / 19 | 2, 8, 8, 1 | 4s¹ | 39, 40, 41 |
| Calcium | Ca-40 | 20 / 20 / 20 | 2, 8, 8, 2 | 4s² | 40, 42, 43, 44, 46, 48 |
| Scandium | Sc-45 | 21 / 24 / 21 | 2, 8, 9, 2 | 3d¹ 4s² | 45, 44, 47 |
| Titanium | Ti-48 | 22 / 26 / 22 | 2, 8, 10, 2 | 3d² 4s² | 46, 47, 48, 49, 50, 44 |
| Vanadium | V-51 | 23 / 28 / 23 | 2, 8, 11, 2 | 3d³ 4s² | 50, 51 |
| Chromium | Cr-52 | 24 / 28 / 24 | 2, 8, 13, 1 | 3d⁵ 4s¹ | 50, 52, 53, 54 |
| Manganese | Mn-55 | 25 / 30 / 25 | 2, 8, 13, 2 | 3d⁵ 4s² | 55, 54 |
| Iron | Fe-56 | 26 / 30 / 26 | 2, 8, 14, 2 | 3d⁶ 4s² | 54, 56, 57, 58, 60 |
| Cobalt | Co-59 | 27 / 32 / 27 | 2, 8, 15, 2 | 3d⁷ 4s² | 59, 60 |
| Nickel | Ni-58 | 28 / 30 / 28 | 2, 8, 16, 2 | 3d⁸ 4s² | 58, 60, 61, 62, 64, 63 |

The 39 new isotope records bring the total to **94**. Neutron counts are calculated from mass number minus atomic number. Isotope replacement preserves the neutral electron configuration.

## Scientific decisions

- Every neutral configuration was checked against the corresponding NIST Atomic Data handbook record. The [Ar] core expands to 1s² 2s² 2p⁶ 3s² 3p⁶. Explicit independent test expectations confirm all ten configurations and defaults.
- Chromium is stored as **[Ar] 3d⁵ 4s¹**, never generated as 3d⁴ 4s². Its three reading-level explanations appear in Across Period 4. The explanation avoids a universal preference for half-filled subshells.
- Nickel consistently follows the NIST neutral ground state **[Ar] 3d⁸ 4s²**.
- Transition-metal selection distinguishes outermost 4s electrons from chemically important 3d electrons. It does not equate one outer-shell count with a universal transition-metal valence. Bonding and variable ion charges are explained without adding ion controls.
- Natural abundance and stability are independent. K-40, Ca-48 and V-50 retain their CIAAW natural percentages and explicit radioactive labels, including accessible text in comparisons. Produced radioisotopes receive no invented ordinary percentage.
- Ca-48 uses the NEMO-3 measured double-beta half-life, approximately 6.4 × 10¹⁹ years, with its measurement provenance documented. V-50 quotes the measured electron-capture **partial** half-life, approximately 2.77 × 10¹⁷ years. Its possible beta-minus branch is not described as observed.
- Sc-44 uses the newer approximately 4.04-hour measurement. Ni-63 displays approximately 101 years. Ti-44 is included with a rounded 60-year half-life and supernova/generator context.
- Medical research applications are qualified. Co-60 source uses include radiation protection and are distinguished from ordinary cobalt. Ni-62 is described through binding energy per nucleon, not an unqualified “most stable nucleus” label.

The 56 new local source entries include organization, title, URL, access date and supported claims. Sources comprise **NIST, CIAAW/IUPAC, RSC, BIPM/DDEP, NNDC/ENSDF, USGS, NASA, DOE/NIDC, EPA, CDC**, and the cited nuclear/isotope research papers. Full references and qualifications are in `SOURCES.txt` and the app’s Verified sources disclosure.

## Model and interaction results

- All ten new elements opened through generated Explore buttons and native mouse double-click. Single-click remained on the information card; zinc and invalid routes remained guarded. All 118 tile positions and badge removal were checked.
- **39 isotope cases × 3 models = 117 model cases passed.** Every Bohr scene retained all nucleons and all electrons, four occupied shells and correct shell populations. Animation was checked separately.
- Matter-wave views retained all six occupied subshell bands for K/Ca and all seven for Sc–Ni. Every band could be isolated; occupancy text matched data. There are no electron balls in this view.
- Quantum Overview retained every occupied subshell. Explore Subshells checked occupancy, capacity, principal level and region role. The 3d focus uses one representative multi-lobed orientation from five related orbitals, retaining its total occupancy in text. Visual inspection confirmed a visible nucleus and transparent Overview.
- Separate role checks exercised 3d and 4s selection in every model, every 3d Bohr group count, and the representative d orientation.
- **78 isotope/nucleon round trips**, **60 fullscreen nucleon visits**, and **28 native electron clicks** passed. Model, isotope, camera, pause and subshell state survived the relevant explanation/fullscreen/interior round trips.
- Three explanation levels updated element, engineering, isotope, model and progression text. Six malformed isotope cases were rejected by the new validator; the shared development suite rejected ten additional invalid records.
- Direct hashes, reload, browser history, Back to Periodic Table, search/filter/scroll preservation, and keyboard/touch routes passed.
- All runtime test pages used **file://**. Tests observed **zero console/page errors, missing local resources or remote runtime requests**.

## Accessibility and visual checks

Tested widths: **320, 390, 768, 1024, 1366 and 1920 pixels**. Particle panels did not overflow. Expanded isotope references and progression were also checked at 320/390/768 pixels for all three levels. Labels and numeric values accompany color, including radioactive natural isotopes.

Keyboard selection, native disclosure toggling, focus behavior, accessible controls, touch taps, rotation/pinch, reduced-motion behavior, and fullscreen exit/Escape were exercised. Screenshots of Bohr, wave, Overview, 1s and representative 3d views were inspected. Source lists remain in an optional disclosure to keep the ordinary panel shorter.

## Regression and performance

Executed regression suites passed:

- `phase6b.cjs`: 25 earlier isotopes, 75 model cases, 50 interiors.
- `phase6a.cjs`: 23 earlier isotopes, 69 model cases, 46 interiors.
- `phase51.cjs`: all hydrogen isotopes/models and 44 route switches; touch, camera and routing checks.
- `phase5.cjs`: 118 cards/source rows, layout, search, keyboard, offline navigation and copper state.
- `phase45.cjs`: generalized engine and development fixtures, 70 cycles, ten invalid records rejected. Xe/U remain development fixtures, not enabled student explorers.
- `phase4.cjs`: all four copper isotopes, 12 model combinations and 24 interiors.
- `phase2.cjs`: copper models, levels, selections, 60 switches, native/denied/absent fullscreen and fallback behavior.
- `phase6c-golden.cjs`: all three copper canvases were **byte-identical PNGs** to baselines captured before Phase 6C runtime edits.

The performance run covered **290 element switches** and three models per element. Listener count stayed **1,718 → 1,718** across the measured surfaces. The renderer cache stayed at three; disposed scenes released physical particles, hits, clouds and sprites. Post-GC heap growth was **888,572 bytes**. Measured post-run median draws for K–Ni were roughly **0.4–0.6 ms for Bohr/waves and 4.5–4.6 ms for quantum**. No progressive slowdown was detected by the test thresholds. These are synchronous desktop measurements, not a frame-rate guarantee for other devices.

Machine-readable results and screenshots are retained in the workspace’s `qa` folder. Portable application files remain together inside `periodic-table-visualizer`.

## Files created or changed

New application file: `js/period4-data.js`.

Updated application files: `index.html`, `tests/atom-engine-test.html`, `js/periodic-data.js`, `js/periodic-ui.js`, `js/particle-geometry.js`, `js/atom-model.js`, `js/quantum-models.js`, `js/ui.js`, `js/engine-ui.js`, `js/isotope-ui.js`.

Updated documentation: `README.txt`, `START-HERE.txt`, `DEVELOPER-NOTES.txt`, `SOURCES.txt`, `TEST-RESULTS.txt`. This completion report is new.

New QA scripts: `phase6c.cjs`, `phase6c-interactions.cjs`, `phase6c-roles.cjs`, `phase6c-performance.cjs`, `phase6c-golden.cjs`. Availability expectations in `phase5.cjs`, `phase51.cjs`, `phase6a.cjs` and `phase6b.cjs` were updated to H–Cu, with zinc replacing potassium as the unfinished-element guard where applicable.

## Limits and next step

Tests ran in desktop Google Chrome with Playwright. **Physical mobile devices, screen readers, Firefox, Safari and Edge were not tested.** Portable copying to a physical thumb drive and school-device restrictions were not exercised.

Waves and clouds remain qualitative teaching shapes, not computed many-electron solutions. Bohr tracks and scale are simplified. Solid magnetism and conductivity also depend on interactions, structure and processing; no lattice, domain, spin or decay simulation was added.

Recommended next phase: **zinc through krypton**, using verified explicit configurations and isotope records in the shared engine. Review the filled 3d core and developing 4p valence region, then extend these data, interaction, accessibility and performance checks before enabling their Explore buttons.
