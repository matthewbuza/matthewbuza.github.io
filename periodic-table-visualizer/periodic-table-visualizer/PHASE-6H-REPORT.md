# Phase 6H — Lanthanum through gadolinium

Completed September 12, 2026, in the Periodic Table Visualizer project only.
There are now **66 enabled explorers and 283 isotope/nuclear-state records**.
All 118 table positions remain; 52 other elements retain information cards.

## Added records and configurations

Configurations are explicit neutral ground states from NIST, using a closed
[Xe] core of 54 electrons. No generic Aufbau prediction or configuration
exception is needed for this batch. Shell counts are derived from these states.

| Element | Default p / n / e | Beyond [Xe] | Shell populations | Isotopes added |
|---|---|---|---|---|
| La | 57 / 82 / 57 | 5d¹ 6s² | 2,8,18,18,9,2 | 138,139 |
| Ce | 58 / 82 / 58 | 4f¹ 5d¹ 6s² | 2,8,18,19,9,2 | 136,138,140,142 |
| Pr | 59 / 82 / 59 | 4f³ 6s² | 2,8,18,21,8,2 | 141,144 |
| Nd | 60 / 82 / 60 | 4f⁴ 6s² | 2,8,18,22,8,2 | 142,143,144,145,146,148,150 |
| Pm | 61 / 84 / 61 | 4f⁵ 6s² | 2,8,18,23,8,2 | 145,147 |
| Sm | 62 / 90 / 62 | 4f⁶ 6s² | 2,8,18,24,8,2 | 144,147,148,149,150,152,154 |
| Eu | 63 / 90 / 63 | 4f⁷ 6s² | 2,8,18,25,8,2 | 151,153,152 |
| Gd | 64 / 94 / 64 | 4f⁷ 5d¹ 6s² | 2,8,18,25,9,2 | 152,154,155,156,157,158,160,153 |

The 35 added isotopes comprise 12 radioactive and 23 stable/observationally
stable choices. Promethium has neither a stable isotope nor an ordinary
abundance mixture. Seven natural mixtures sum to 100%. Ce-142 and Gd-160
remain observationally stable: experimental limits are not measured lifetimes.
Eu-151 is radioactive, following the observed alpha-decay measurement. Sm-148,
Sm-147, La-138, Nd-144/150 and Gd-152 are naturally radioactive too.
Nd-150 uses the named NEMO-3 2016 result (9.34 × 10¹⁸ years); Eu-151 uses
4.62 × 10¹⁸ years. Eu-152 uses the newer NIST certificate's 13.517 years,
rather than the older Wallet Cards value. Half-life displays are rounded;
source and advanced notes preserve context. No decay animation is introduced.

## Visualization and teaching

All eight use six Bohr rings, exact electron/nucleon counts and the existing
shared nucleus geometry. Wave mode exposes all 13 occupied subshells (14 for
Ce/Gd), with a faint core and brighter occupied 4f/5d/6s. It adds no electron
balls. Quantum Overview has one 54-electron core group plus two important
states, or three for Ce/Gd. Focus mode uses the existing representative
f-orbital shape and explains seven orbitals/capacity 14. Empty 4f in La and
empty 5d in Pr–Eu never appear as occupied choices.

The outer-electron label identifies 6s² and explains why 4f/5d also matter.
Particle, isotope, engineering and Across the Lanthanides explanations support
Elementary, Middle School and High School. Detached-row placement, inner
4f filling, Eu half-filling and Gd's retained 4f⁷ plus 5d¹ are explained.
Medical content distinguishes MRI contrast compounds from metal and from
radioactive Gd-153 calibration sources. Sensor studies are described as research.

## Files changed

Application: new js/lanthanide-data.js; updated index.html,
tests/atom-engine-test.html, js/periodic-data.js, js/particle-geometry.js,
js/quantum-models.js, js/ui.js and js/engine-ui.js.
Documentation: START-HERE.txt, README.txt, DEVELOPER-NOTES.txt, SOURCES.txt,
TEST-RESULTS.txt and this report.
QA: new phase6h.cjs, phase6h-interactions.cjs, phase6h-roles.cjs,
phase6h-subatomic.cjs, phase6h-final.cjs, phase6h-performance.cjs and
phase6h-regressions.cjs under ../qa, with result JSON, logs and screenshots.
Earlier suites' availability totals/boundaries were updated to the new range;
their scientific assertions and copper reference images were retained.
No new page, renderer, stylesheet, runtime dependency or network API was added.

## Sources

SOURCES.txt and the local isotope source registry contain 34 records with
organization, title, URL, access date and supported facts. They include NIST
atomic data, CIAAW 2024, NNDC Wallet Cards, the cited primary decay/search
studies, RSC applications, DOE/ORNL, USGS, FDA and NIST neutron/calibration data.
Older snapshots are identified explicitly and updated where newer cited
measurements differ. Source URLs are references, never runtime dependencies.

## Validation and regression results

- Shared schema: 66 elements / 283 records; new batch 8 / 35, all valid.
- All 35 isotopes through three models: 105 model cases and 70 nucleon returns.
- 39 configuration/classification negative cases plus six malformed isotope cases.
- 16 native electron clicks, 48 fullscreen interiors and 192 subatomic panels.
- 24 touch/model cases; detached-row positions, screen-reader labels and keyboard access.
- Ba → La → … → Gd, disabled Tb boundary, unchanged Fr/Ra gaps; search, filters,
  cards, double-click, browser history, reload and all reading levels.
- 432 responsive model/level cases at 320, 390, 768, 1024, 1366 and 1920 pixels;
  24 forced-low-detail cases preserve every nucleon and Bohr electron.
- Phone particle panels and desktop model screenshots visually reviewed; no overflow.
- All 36 prior regression suites passed. Phase 5 initially failed after a QA
  helper changed its keyboard starting tile; restoring the intended La fixture
  passed on rerun. The regression JSON retains this history.
- Copper Bohr, wave and quantum golden images remain byte-identical.
- Local file:// operation: no normal-use JavaScript errors or network requests.

## Performance

A 550-element-switch run through Ba, La–Gd, Fr and Ra passed. Listener count
stayed 1,720; three renderer instances remained. Measured heap growth was
816,376 bytes after collection, with no unbounded accumulation detected.
Gd median draw times before/after were Bohr 1.0/1.0 ms, wave 0.8/0.8 ms and
quantum 2.2/2.8 ms; final p95 was 1.8/1.3/4.3 ms respectively. Timing varies
with concurrent work and hardware; this is a bounded Chrome test, not a
universal speed guarantee. Full measurements are in ../qa/phase6h-performance-results.json.
Only the active atom is loaded. Existing shared geometry and decorative-detail
reduction remain in use, while exact required particles survive low detail.

## Tests not completed and known limitations

No manual physical touchscreen, assistive-technology listening session, Safari,
Firefox or Edge run was performed; UI tests used local Chrome/Playwright.
Screenshots and layout checks do not prove accessibility on every device.
Cloud density, radial separation and f shapes are qualitative educational
models, not calculated many-electron wavefunctions. Cloud samples are not
electron counts. This phase adds neutral ground states, not ion configurations,
crystal fields, chemical bonding simulations or every known isotope.

Recommend Tb–Lu next: verify each neutral configuration and isotope set,
retain the 54-electron core grouping and exact counts, test 4f completion and
Lu's occupied 5d, and extend navigation only when those explorers are complete.
