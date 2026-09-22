# Phase 6J — Hafnium through gold

Implemented in the existing Periodic Table Visualizer project, September 12–13, 2026.
All eight new elements open through the periodic table's Explore Atom button
and by double-click, and work in all three atomic models. The application now
has **81 explorers and 346 isotope/nuclear-state records**. All 118 table
positions are preserved; 37 elements retain information cards.

## Element and isotope data

Every configuration below has the same `[Xe] 4f¹⁴` inner core.

| Element | Default | Protons / neutrons / electrons | Remaining configuration | Shell populations | Isotope choices |
|---|---|---|---|---|---|
| Hf | Hf-180 | 72 / 108 / 72 | 5d² 6s² | 2,8,18,32,10,2 | 174,176,177,178,179,180 |
| Ta | Ta-181 | 73 / 108 / 73 | 5d³ 6s² | 2,8,18,32,11,2 | 180m,181 |
| W | W-184 | 74 / 110 / 74 | 5d⁴ 6s² | 2,8,18,32,12,2 | 180,182,183,184,186 |
| Re | Re-187 | 75 / 112 / 75 | 5d⁵ 6s² | 2,8,18,32,13,2 | 185,187,188 |
| Os | Os-192 | 76 / 116 / 76 | 5d⁶ 6s² | 2,8,18,32,14,2 | 184,186,187,188,189,190,192 |
| Ir | Ir-193 | 77 / 116 / 77 | 5d⁷ 6s² | 2,8,18,32,15,2 | 191,193,192 |
| Pt | Pt-195 | 78 / 117 / 78 | 5d⁹ 6s¹ | 2,8,18,32,17,1 | 190,192,194,195,196,198 |
| Au | Au-197 | 79 / 118 / 79 | 5d¹⁰ 6s¹ | 2,8,18,32,18,1 | 197,198 |

The 34 additions include eight radioactive choices: Hf-174, W-180, Re-187,
Re-188, Os-186, Ir-192, Pt-190 and Au-198. Five are natural components;
Re-188, Ir-192 and Au-198 are produced choices. The remaining 26 have no
observed decay assigned, including explicitly observational Ta-180m and Os-184.

Ta-180m is a naturally occurring excited nucleus with 73 protons and 107
neutrons. Its selector group and status identify it as observationally stable
and a nuclear isomer. No measured half-life is claimed. Its short-lived
ground state is linked in metadata but is not offered as the natural isotope.
The 76.79 keV excitation energy is source-backed metadata, not main-panel copy.
Os-184 search limits likewise remain distinct from measured lifetimes.

Shell and subshell totals, capacities, neutral charge, isotope ownership and
neutron arithmetic are validated. Explicit configuration checks reject the
incorrect Pt 5d⁸ 6s² and Au 5d⁹ 6s² arrangements even when those alternatives
have internally consistent electron totals. Isotope changes preserve the
neutral electron configuration. Reduced detail preserves all physical particles.

## Shared implementation and explanations

The new data module extends the existing immutable catalog and reuses its
validated 68-electron core. Shared renderers, camera, controls and selection
systems handle the new elements. There is no element-specific renderer, new
framework, package, page, build step or runtime request.

The compact particle selector retains proton, neutron, inner electron and
outermost 6s choices. Pt/Au have one outermost electron; the other six have two.
The text explains that nearby 5d states also affect bonding. “Across the 5d
Metals” covers the progression and measured exceptions. Gold's high-school
note explains how relativity affects electron energies and contributes to
the way solid gold absorbs and reflects light.

Three reading levels cover Hf alloys/reactor controls and oxide insulators;
Ta capacitors, corrosion resistance and implants; W hot electrical parts and
carbide tools; Re alloys and catalysts; Os alloys and the distinct hazardous
tetroxide compound; Ir electrodes and controlled Ir-192 sources; Pt catalysts,
sensors and platinum-compound medicines; and Au jewelry, coins and corrosion-
resistant contacts. Silver and copper are correctly described as better
electrical conductors than gold. Medical/source uses distinguish compounds,
professional applications, research and historical uses from elemental metals.

## Scientific simplifications

- **Bohr:** six counting shells with every electron and nucleon represented.
  The circular paths and distances are illustrative, not real tracks or scale.
- **de Broglie:** fourteen occupied subshells represented by conceptual wave
  patterns. Inner states are subdued; 5d/6s stand out. These are not exact
  solutions for an interacting many-electron atom.
- **Schrödinger:** Overview groups 68 inner electrons and highlights 5d/6s,
  giving three visible cloud layers. Explore Subshells can inspect all fourteen
  occupied subshells, including full 4f. A focused f shape represents one
  orientation; it does not put fourteen electrons into one orbital. Clouds
  show a qualitative chance of finding electrons, not solid objects or photos.

## Files created or modified

Application paths below are relative to this report's folder:

- Created `js/heavy-d-data.js`: eight elements, 34 isotope/state records,
  29 source records, all three explanation levels and explicit validation.
- Updated `js/atom-data.js`: validation and accessible labels for natural
  observationally stable nuclear isomers, preserving produced-isomer checks.
- Updated `js/periodic-data.js`: enables Hf–Au and extends existing navigation.
- Updated `js/particle-geometry.js`, `js/quantum-models.js`, `js/ui.js`:
  opt-in shared heavy-atom behavior and accurate subshell/particle labels.
- Updated `js/engine-ui.js`, `js/isotope-ui.js`: subshell explanations,
  observational selector grouping, isomer labels, and appropriate half-life display.
- Updated `index.html` and `tests/atom-engine-test.html`: load the new module.
- Updated `README.txt`, `START-HERE.txt`, `DEVELOPER-NOTES.txt`, `SOURCES.txt`,
  `TEST-RESULTS.txt`; created this report.
- Created `../qa/phase6j*.cjs`, result JSON files and screenshots for data,
  interactions, isotope/isomer cases, responsive layout, performance and regression.
  Earlier QA expectations were updated for 81/346 totals and the Au/Hg boundary;
  their existing element and interaction assertions remain in place.

## Validation and interactions

Headless installed Chrome loaded the application using `file://` throughout.
The new batch checks cover:

- All 81 enabled tiles through single-click/Explore Atom and double-click;
  all 34 added isotope choices in all three models: 102 model cases and 68
  proton/neutron interior returns, with independent expected counts/configurations.
- Sixteen direct canvas electron clicks, 48 native nucleon double-clicks,
  48 fullscreen nucleon interiors, 24 mouse gesture/model cases and 24 touch
  rotation/pinch/model cases. Drag direction and wheel/pinch zoom are asserted.
- 192 subatomic panels across both nucleons and three reading levels.
- 432 responsive element/model/level cases at widths 320,390,768,1024,1366,1920;
  expanded isotope/particle panels have no horizontal overflow. Twenty-four
  forced reduced-detail cases retain every nucleon and Bohr electron.
- Keyboard table access, row positions, search/filter restoration, history,
  reload, fullscreen exit, reduced motion, Lu–Hf–Au navigation and Hg stop.
  Existing Fr/Ra gaps remain intact.
- Direct H→Au, Cu→W, Lu→Hf, Pt→Au and Au→H switches from nucleon interiors
  with changed isotopes. Model/reading level survive; selected particle,
  isotope, geometry and camera reset correctly for the destination.
- Thirty-seven configuration/default/radioactivity rejection cases, sixteen
  identity rejections, six isotope-schema rejections and fifteen focused
  configuration/isomer rejection cases. Nine Ta-180m model/level round trips
  confirm counts, labels, source metadata and the absence of a measured half-life.

All **47 earlier regression suites pass**, as do the new Phase 6J suites.
Final regression status is recorded in `TEST-RESULTS.txt` and
`../qa/phase6j-regression-results.json`. Copper's three canvas images are compared
byte-for-byte against the unchanged pre-existing Phase 6C baselines.

## Performance

650 repeated loads across H, Cu, Lu, all eight new elements, Fr and Ra exercised
every model. Disposed scenes released their geometry, particle arrays and caches.
The run retained exactly three cached renderers, two canvases and one pending
animation frame. Event listeners stayed at 1,720 before and after; post-GC heap
growth was 147,752 bytes, within the existing 4 MiB tolerance.

After switching, Pt median synchronous draw times were 1.7/1.4/2.5 ms and
Au 1.3/1.4/2.8 ms for Bohr/wave/quantum. Their p95 times were 2.5/1.8/3.8 ms
and 2.1/2.3/4.1 ms respectively. No sustained slowdown threshold failed.
These are local headless measurements with other regression checks running,
not a device frame-rate guarantee. Raw before/after timing data are retained.

## Sources and limitations

NIST supplies measured neutral configurations; CIAAW supplies terrestrial
fractions and uncertainties. Hafnium's published rounded fractions sum to
100.011%, so the data preserve them rather than silently normalize.
Half-life values use named measurements/snapshots: Hf-174 (2020), W-180 (2004),
Pt-190 (2017), and the explicitly dated NNDC snapshot for the other radioisotopes.
Ta-180m and Os-184 research limits are not treated as observed decay lifetimes.
The offline catalog is curated, not automatically updated. Exact references and
claim scope are in `SOURCES.txt`, the data module and expandable source panels.

No runtime network requests or missing local resources occurred. Browser and
touch checks use installed headless Chrome with emulated touch, not manual
certification on every phone or browser. All three models remain educational
approximations. Optional Hf-178m2, W-188 and Re-186 were omitted to keep selectors
focused. Mercury and the actinides were not added. A future phase can extend the
existing shared catalog after separate scope and scientific review.
