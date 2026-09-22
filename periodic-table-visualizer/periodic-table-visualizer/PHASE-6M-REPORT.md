# Phase 6M — Completing the actinide row

September 13, 2026. Implemented in the existing Periodic Table Visualizer project.
Curium through lawrencium extend the shared explorer, giving **103 enabled elements
(H–Lr) and 396 isotope/nuclear-state choices**. Elements 104–118 retain information
cards. Americium was neither duplicated nor rebuilt: all 95 earlier element records
and 383 earlier isotope records match the saved pre-change baseline exactly.

## Elements and isotopes

Every configuration below starts with the 86-electron `[Rn]` core. These explicit
configurations were verified against NIST's June 2024 table; they are not generated
by a simple filling rule. Neutrons are calculated as mass number minus atomic number.

| Element | Default | Protons / neutrons / electrons | Beyond [Rn] | Seven shells | Isotope choices |
|---|---|---|---|---|---|
| Curium, Cm | 247 | 96 / 151 / 96 | 5f⁷ 6d¹ 7s² | 2,8,18,32,25,9,2 | 244,247 |
| Berkelium, Bk | 247 | 97 / 150 / 97 | 5f⁹ 7s² | 2,8,18,32,27,8,2 | 247,249 |
| Californium, Cf | 251 | 98 / 153 / 98 | 5f¹⁰ 7s² | 2,8,18,32,28,8,2 | 249,251,252 |
| Einsteinium, Es | 252 | 99 / 153 / 99 | 5f¹¹ 7s² | 2,8,18,32,29,8,2 | 252 |
| Fermium, Fm | 257 | 100 / 157 / 100 | 5f¹² 7s² | 2,8,18,32,30,8,2 | 257 |
| Mendelevium, Md | 258 | 101 / 157 / 101 | 5f¹³ 7s² | 2,8,18,32,31,8,2 | 258 |
| Nobelium, No | 259 | 102 / 157 / 102 | 5f¹⁴ 7s² | 2,8,18,32,32,8,2 | 259 |
| Lawrencium, Lr | 266 | 103 / 163 / 103 | 5f¹⁴ 7s² 7p¹ | 2,8,18,32,32,8,3 | 262,266 |

**Nobelium completes 5f¹⁴. Lawrencium retains 5f¹⁴ and uses 7p¹, not 6d¹.**
Curium retains its 6d electron. Changing isotopes leaves these neutral configurations
unchanged. The progression includes Am's existing 5f⁷ 7s² as the handoff point.

All **13 added isotope choices are radioactive**, with half-life, decay, produced
origin and a concise safety statement. No natural percentages are invented.
The panel explains that a long half-life does not imply safe handling.

| Isotope | Evaluated half-life used | Rounded student display | Decay shown |
|---|---|---|---|
| Cm-244 | 18.11 years | About 18 years | Alpha → Pu-240 |
| Cm-247 | 15.6 million years | About 16 million years | Alpha → Pu-243 |
| Bk-247 | 1,380 years | About 1,400 years | Alpha → Am-243 |
| Bk-249 | 327.2 days | About 327 days | Mainly beta-minus → Cf-249 |
| Cf-249 | 351 years | About 350 years | Alpha → Cm-245 |
| Cf-251 | 898 years | About 900 years | Alpha → Cm-247 |
| Cf-252 | 2.645 years | About 2.65 years | Mainly alpha → Cm-248; spontaneous fission releases neutrons |
| Es-252 | 471.7 days | About 1.3 years | Mainly alpha → Bk-248; electron capture → Cf-252 |
| Fm-257 | 100.5 days | About 100 days | Mainly alpha → Cf-253; small spontaneous-fission branch |
| Md-258 | 51.59 days | About 52 days | Alpha → Es-254 |
| No-259 | 58 minutes | About 1 hour | Mainly alpha → Fm-255; electron capture / positron emission → Md-259 |
| Lr-262 | Approximately 4 hours | About 4 hours (approximate) | Electron capture / positron emission → No-262, uncertain branching; SF below 10% |
| Lr-266 | 11 hours, +21/−5 hours | About 11 hours (very uncertain) | Spontaneous fission; tentative assignment |

The nuclear data use the named NUBASE2020 evaluation for Cm–No. Minor branches
are not exhaustive. Md-258 is the ground state, not its short-lived nuclear isomer.
Bk-247's roughly 250-year uncertainty is stated in its significance text.
ENSDF identifies Lr-266 tentatively and reports the asymmetric lifetime uncertainty.
NUBASE2020's 22 ± 14 hours is a symmetrized representation of that same sparse
11 (+21/−5) hour result, not an independent precise measurement. Lr-262 is approximate;
its alpha decay has not been observed. The app does not animate a decay chain.

### Lawrencium's table mass

The existing project-wide IUPAC convention retains **[262]** on the lawrencium tile
and summary card, also matching NIST's June 2024 table. The explorer defaults to
**Lr-266**, as requested. Both choices are available, and the isotope text explains
the distinction. Other new tiles show [247], [247], [251], [252], [257], [258], [259].
Brackets denote a representative isotope's mass number, not an average atomic weight.

## Shared implementation and educational limits

The existing detached Ac–Lr row and main-table placeholder are preserved. There
are no new badges, separate element pages, packages, frameworks or runtime requests.
The four particle choices remain Proton, Neutron, Electron and Outer-region electron.
Proton/neutron exploration reuses the existing quark-and-gluon component.

- **Bohr:** seven counting shells with exact electron totals and lightweight particles.
  The circular paths are not literal electron trajectories.
- **de Broglie:** one conceptual pattern per occupied subshell, not one expensive
  wave per electron. Lr's 7s and 7p patterns have separate radii and label positions.
  The app does not solve the many-electron wavefunction in real time.
- **Schrödinger:** an 86-electron grouped core plus important occupied regions.
  Cm and Lr have four overview layers; Bk–No have three. Filled 5f remains visible
  for No/Lr, and Lr's 7p is separately inspectable. Clouds describe possible electron
  locations, not solid surfaces. Every occupied subshell can be inspected separately.

Original text at three reading levels covers names, uses, discovery and experimental
limits. Es/Fm test history is factual and non-procedural. Tiny Es research samples
are distinguished from the still smaller quantities available for later elements;
no ordinary bulk appearance, density, melting point or structure is invented.
Lr's ionization-energy measurement supports theoretical predictions but does not
directly determine its full electron configuration. Advanced calculations and limited
experimental evidence are identified explicitly in the progression disclosure.
Safety wording refers to trained personnel and regulated specialized facilities.
There are no acquisition, production, source-building or handling instructions.

## Files changed

- `js/actinide-data.js`: eight records, 13 isotopes, three-level descriptions,
  uncertainty and source metadata, explicit late-actinide validator; existing data retained.
- `js/periodic-data.js`: availability through Lr and representative-mass validation.
- `js/periodic-ui.js`: current explorer coverage in the home introduction.
- `js/quantum-models.js`: Lr 7s/7p separation using the existing shared renderer.
- `js/engine-ui.js`: configuration-evidence note and focused 7p explanation.
- `css/styles.css`: allow long profile names to wrap below the isotope symbol when needed;
  this fixes mendelevium at 320 pixels without changing the layout design.
- `README.txt`, `START-HERE.txt`, `DEVELOPER-NOTES.txt`, `SOURCES.txt`,
  `TEST-RESULTS.txt` and this report: current coverage, references and verification.
- `../qa/phase6m*.cjs`, pre-change `phase6m-prior-data.json`, result files and
  screenshots: data, model, interaction, state, layout, regression and performance checks.
  Earlier QA availability totals and the unimplemented boundary now end at Lr/Rf;
  their element-specific assertions remain in place.

## Verification

Data validation passes: 103 elements / 396 choices overall; 8 / 13 in this phase;
134 deliberately invalid data cases rejected. The saved H–Am records are unchanged.

The ten Phase 6M suites pass, plus the unchanged Copper canvas goldens:

- All 103 enabled tiles open by button and double-click. Each of the eight new
  tiles triggers exactly one load per native double-click; Rf/Db/Sg remain guarded.
- All 13 isotopes pass all three models (39 cases), including occupied wave/subshell
  choices, exact counts and 26 isotope/nucleon round trips.
- 16 native electron clicks, 48 native nucleon double-clicks and 48 fullscreen
  interior cases pass. Four particle categories and 192 subatomic panels are readable.
- 24 new-element mouse/wheel cases and 45 touch/pinch model cases across the entire
  Ac–Lr row pass. Vertical dragging has the expected direction.
- All 15 detached actinides support mouse, touch and keyboard entry. Native left/right
  arrows traverse the row; Tab crosses Am to Cm; down-arrow maps Lu to Lr. Category
  labels, positions, representative masses and the main-table placeholder remain intact.
- The eight requested cross-element transitions clear interiors, particle/isotope
  state and the camera while retaining model and reading level. Back/Forward, reload,
  table search/filter/scroll restoration and the Lr/Rf boundary pass.
- 432 model/level/viewport combinations pass at 320, 390, 768, 1024, 1366 and 1920
  pixels, plus 24 low-detail exact-count cases and 39 expanded isotope/level panels.
  No horizontal page or information-panel overflow occurs. Long profile names wrap
  onto a separate line where necessary; Lr's two outer wave labels do not overlap.
- Every browser suite loads the local file directly. No remote requests, missing
  files or JavaScript errors were found. Reduced motion keeps simulation time fixed.
- The original Phase 6C copper canvas images remain byte-identical in all three models.

All **69 earlier regression suites pass**, including the complete previous Ac–Am
phase, francium/radium, the lanthanide row and all earlier interaction suites.
No browser-suite retries were needed. All 31 application scripts parse successfully.
The app continues to run completely offline from `file://`. No checks remain pending.

### Measured performance

After 600 repeated element loads, the app retains three renderers, two canvases,
369 physical particles for Lr-266 and one pending animation frame. Event listeners
remain exactly 1,720 before and after; obsolete scene data is released. Post-collection
heap growth is 166,696 bytes (about 163 KiB), below the 4 MiB regression bound.
Cached nucleon geometry remains the same object during repeated draws.

Lr median draw times after switching are approximately 1.4 ms Bohr, 1.2 ms wave and
2.1 ms quantum (p95: 1.7, 1.3 and 2.4 ms). Fullscreen medians are 1.4, 1.2 and 2.1 ms.
Three local navigations to a ready Lr explorer took approximately 490–660 ms while
other regression tests were running. These are observations on this Windows/Chrome
machine, not frame-rate or startup guarantees for every classroom device.

## Sources consulted

Accessed September 13, 2026. Full source metadata also appears in the offline app.

- [NIST June 2024 periodic table](https://www.nist.gov/system/files/documents/2024/06/25/NIST_periodictable_June24_iupac.pdf): explicit atomic configurations and Lr [262].
- [NUBASE2020, IAEA/AMDC](https://www-nds.iaea.org/amdc/ame2020/NUBASE2020.pdf): evaluated nuclear lifetimes and decay modes.
- [ENSDF Lr-262](https://www.nndc.bnl.gov/ensnds/262/Lr/adopted.pdf) and [tentative Lr-266](https://www.nndc.bnl.gov/ensnds/266/Lr/adopted.pdf): adopted lifetime qualifications and decay evidence.
- [JAEA lawrencium ionization research](https://asrc.jaea.go.jp/soshiki/gr/schaedel-gr/Lr-IP/Lr-IP.htm): 7p theory, measured ionization energy and interpretation limits.
- [NASA/JPL Mars Pathfinder APXS](https://planetarydata.jpl.nasa.gov/img/data/mpf/rover/mprv_0001/document/apxsinst.htm): Cm-244 in planetary instruments.
- [ORNL californium applications](https://www.ornl.gov/news/ornls-californium-252-will-play-pivotal-role-new-reactor-startups): sealed-source industrial, research and reactor-startup context.
- [Lawrence Berkeley Laboratory history](https://www2.lbl.gov/abc/wallchart/chapters/08/0.html): Es/Fm discovery and Md identification one atom at a time.
- RSC individual pages for [Cm](https://periodic-table.rsc.org/element/96/curium), [Bk](https://periodic-table.rsc.org/element/97/berkelium), [Cf](https://periodic-table.rsc.org/element/98/californium), [Es](https://periodic-table.rsc.org/element/99/einsteinium), [Fm](https://periodic-table.rsc.org/element/100/fermium), [Md](https://periodic-table.rsc.org/element/101/mendelevium), [No](https://periodic-table.rsc.org/element/102/nobelium) and [Lr](https://periodic-table.rsc.org/element/103/lawrencium): names, uses and experimental context. Nuclear values use the evaluated sources above.

## Remaining scope

Elements 104–118 are not enabled. A future phase should verify relativistic atomic
configurations, distinguish predicted properties from measurements, retain explicit
uncertainties for sparsely observed isotopes and recheck the same renderer limits.
Optional extra Es/Md isotopes were omitted to keep the selector concise.
The models remain educational approximations, not material samples or nuclear simulators.
Browser QA uses installed Chrome on Windows, with emulated touch and viewport sizes;
it does not certify every physical tablet or a separate Firefox/Safari installation.
