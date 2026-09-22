# Phase 6L — Actinium through americium

September 13, 2026. Work stays in the existing Periodic Table Visualizer project.
All seven new explorers open from the detached actinide row. The app now has
**95 enabled explorers, H–Am, and 383 isotope/nuclear-state records**. The remaining
23 elements retain information cards. No other project was changed.

## Elements, defaults and configurations

Every configuration below begins with the 86-electron `[Rn]` core.
Configurations were checked against NIST's ground-state table. They are explicit
data, not the output of a generic filling routine.

| Element | Default | Protons / neutrons / electrons | Beyond [Rn] | Shell populations | Choices |
|---|---|---|---|---|---|
| Actinium, Ac | Ac-227 | 89 / 138 / 89 | 6d¹ 7s² | 2,8,18,32,18,9,2 | 225,227 |
| Thorium, Th | Th-232 | 90 / 142 / 90 | 6d² 7s² | 2,8,18,32,18,10,2 | 228,230,232 |
| Protactinium, Pa | Pa-231 | 91 / 140 / 91 | 5f² 6d¹ 7s² | 2,8,18,32,20,9,2 | 231 |
| Uranium, U | U-238 | 92 / 146 / 92 | 5f³ 6d¹ 7s² | 2,8,18,32,21,9,2 | 234,235,238 |
| Neptunium, Np | Np-237 | 93 / 144 / 93 | 5f⁴ 6d¹ 7s² | 2,8,18,32,22,9,2 | 237 |
| Plutonium, Pu | Pu-244 | 94 / 150 / 94 | 5f⁶ 7s² | 2,8,18,32,24,8,2 | 238,239,240,244 |
| Americium, Am | Am-243 | 95 / 148 / 95 | 5f⁷ 7s² | 2,8,18,32,25,8,2 | 241,243 |

Ac and Th have no occupied 5f state. Pa–Np have both 5f and 6d. Pu and Am have no
occupied 6d state. All have two 7s electrons. Neutrons are calculated as A − Z;
isotope changes retain the neutral electron count and configuration.

## Nuclear data and student wording

All **16 new choices are radioactive**. No stable actinide options or stable-isotope
guide entries appear. The panel distinguishes primordial isotopes, natural decay
products, extremely small natural traces, and primarily produced isotopes.
Natural occurrence and long half-life are explicitly distinguished from harmlessness.

| Isotope | Half-life displayed | Primary decay / daughter |
|---|---|---|
| Ac-225 | About 10 days | Alpha → francium-221 |
| Ac-227 | About 22 years | Mainly beta-minus → thorium-227; small alpha → francium-223 |
| Th-228 | About 1.9 years | Alpha → radium-224 |
| Th-230 | About 75,000 years | Alpha → radium-226 |
| Th-232 | About 14 billion years | Alpha → radium-228 |
| Pa-231 | About 33,000 years | Alpha → actinium-227 |
| U-234 | About 246,000 years | Alpha → thorium-230 |
| U-235 | About 704 million years | Alpha → thorium-231 |
| U-238 | About 4.47 billion years | Alpha → thorium-234 |
| Np-237 | About 2.14 million years | Alpha → protactinium-233 |
| Pu-238 | About 88 years | Alpha → uranium-234 |
| Pu-239 | About 24,000 years | Alpha → uranium-235 |
| Pu-240 | About 6,600 years | Alpha → uranium-236; small spontaneous-fission branch |
| Pu-244 | About 81 million years | Alpha → uranium-240; small spontaneous-fission branch |
| Am-241 | About 433 years | Alpha → neptunium-237 |
| Am-243 | About 7,400 years | Alpha → neptunium-239 |

Data retain named-source values; student displays round appropriately. In particular,
Pu-244 uses the ENSDF evaluator's revised **81.3 million years**, rather than the
81.2-million-year measurement cited in the evaluation's discussion or the older
80-million-year wallet-card value. Minor decay branches are selectively summarized,
not represented as a complete decay database.

CIAAW terrestrial fractions are Th-230 0.02% and Th-232 99.98%; Pa-231 100%;
U-234 0.0054%, U-235 0.7204%, U-238 99.2742%, with source uncertainties retained.
No invented natural percentages are assigned to trace-only or produced choices.
Th-228 is a variable natural decay product rather than a fixed slice of the
representative thorium mixture. Ac [227], Np [237], Pu [244] and Am [243] remain
bracketed mass numbers; Th 232.04, Pa 231.04 and U 238.03 retain the established
standard atomic-weight convention.

Each element has original Elementary, Middle School and High School descriptions.
Element and isotope panels cover rarity, history, nuclear energy, specialized
Ac-225 therapy, Pu-238 spacecraft decay heat, and sealed Am-241 detector sources.
High-school copy explains radioactive, fissile, fertile, oxidation state and
transuranium in context. Chemical changes involve electrons; nuclear changes
involve nuclei. Decay and fission are distinguished. Half-life describes a group
and does not schedule the decay of one atom. No decay simulation was added.
All seven include restrained safety copy. Smoke-detector sources must stay intact.
No acquisition, processing, separation, enrichment, handling calculations or weapon
procedures are included.

## Shared rendering and interaction

Bohr retains all 89–95 electron sprites and seven counting shells, with exact
nucleon totals even in low-detail mode. Waves show one conceptual pattern per
occupied subshell. Quantum Overview groups the 86-electron radon core and emphasizes
occupied 5f, 6d and 7s states: three layers for Ac/Th/Pu/Am, four for Pa/U/Np.
Focused 5f uses the existing representative f shape, seven orbitals and capacity 14;
6d has five orbitals and capacity 10. Every occupied subshell remains inspectable.
Clouds show likely electron locations, not rigid surfaces or a literal scale model.

The particle menu contains four categories: Proton, Neutron, Electron and
Outer-region electron. Nearby occupied 5f, 6d and 7s states can all affect bonding.
Both nucleons still open the shared quark-and-gluon interior by native double-click
or the accessible button. Charges, levels, models and camera restoration are retained.

Tiles stay in the detached actinide row, preserving category color and the main-table
placeholder. Their masses fit without header collisions. Mouse single/double-click,
phone tap plus Explore, keyboard Tab/arrows/Enter, browser history and reload work.
Ra leads to Ac; Am stops before Cm. Cross-element interior transitions cover Rn→Ac,
Ac→Th, U→Pu, Pu→Am, Am→H, Cu→U and Am→Rn with a clean, fitted destination state.
Mouse/touch rotation, vertical drag direction, wheel/pinch zoom, full-screen atom-only
mode and reduced-motion behavior use the existing controls.

## Files changed

- `js/actinide-data.js`: seven elements, 16 isotopes, explicit states, original
  three-level text, source metadata, progression and independent validation.
- `js/particle-geometry.js`: opt-in subshell metadata and four actinide categories.
- `js/quantum-models.js`: actinide emphasis and compressed 5f/6d/7s radii.
- `js/ui.js`, `js/engine-ui.js`: outer-region headings, focused 5f/6d explanations
  and the model disclaimer.
- `js/isotope-ui.js`: optional level-specific origin and abundance text, with the
  existing fallback retained for earlier elements.
- `js/periodic-data.js`, `js/periodic-ui.js`: availability, bracket validation,
  detached-row tile masses and current home introduction.
- `index.html`, `tests/atom-engine-test.html`: load the actinide dataset in order.
- `README.txt`, `DEVELOPER-NOTES.txt`, `START-HERE.txt`, `SOURCES.txt`,
  `TEST-RESULTS.txt`, this report: current coverage, references and verification.
- `../qa/phase6l*.cjs` and result files: new data, rendering, interaction,
  responsive, content, subatomic, transition, performance and regression coverage.
  Earlier QA availability totals and the enabled/unavailable boundary were updated.

No renderer was duplicated. No framework, runtime package, remote font, CDN, build
step, element-specific page or new simulation was introduced.

## Verification

New-batch browser checks passed:

- All 95 enabled elements open by button and mouse double-click.
- All 16 new isotopes × three models: 48 model cases and 32 isotope/nucleon round trips.
- 14 direct electron clicks, 42 full-screen interior checks, 42 native nucleon
  double-clicks, 21 mouse gesture cases and 21 touch rotation/pinch cases.
- 168 subatomic panel cases across all seven elements and three reading levels.
- 378 model/reading-level/viewport cases at 320, 390, 768, 1024, 1366 and 1920 px;
  21 low-detail exact-count checks. No horizontal panel or page overflow.
- 48 expanded isotope/level panels; four representative-mass corruption rejections;
  single-load double-click checks for all seven tiles; no copied copper examples.
- Data capacity/count/default/identity/radioactivity corruption checks, including
  seven 5f/6d swaps that preserve the total electron count, are rejected.
- Copper's Bohr, wave and quantum canvas PNGs exactly match the existing goldens.

**All 61 earlier regression suites passed. All nine Phase 6L result files passed.**
Three older suites initially timed out during overlapping browser runs; serial
reruns passed without a product change. No failed or pending checks remain.

All browser tests load the app directly from `file://`. New suites observed no JavaScript
errors, remote requests or missing local resources. Source links are optional;
reading or operating the app never fetches them automatically.

## Performance

600 repeated atom loads retained exactly three cached renderers, two canvases,
one pending animation frame, and 1720 event listeners before and after. Disposed
scenes released particle, hit, sprite, cloud and cached nucleus geometry references.
Post-collection heap growth was 158,316 bytes (about 155 KiB).

Americium median draw times after repeated switching were approximately 1.3 ms Bohr,
1.0 ms wave and 1.7 ms quantum; corresponding p95 values were 2.3, 1.6 and 2.0 ms.
These are measurements from this Windows/Chrome machine, not guarantees for every
classroom laptop. Existing detail tiers and compressed geometry remain in use.

## Sources and limitations

[NIST ground-state table](https://www.nist.gov/document/periodictable2016pdf-0)
supports the explicit configurations. [CIAAW isotope compositions](https://www.ciaaw.org/isotopic-abundances.htm)
support the terrestrial fractions. The named [NNDC wallet-card snapshot](https://www.lnl.infn.it/wp-content/uploads/Nuclear_Wallet_Cards.pdf)
provides most half-lives and primary decays; separate ENSDF records support
[Ac-225](https://www.nndc.bnl.gov/nudat3/getdecaydataset.jsp?dsid=225ra+bM+decay+%2814.9+d%29&nucleus=225AC),
[Pu-244](https://www.nndc.bnl.gov/ensnds/244/Pu/adopted.pdf),
[Am-241](https://www.nndc.bnl.gov/ensnds/241/Am/adopted.pdf) and
[Am-243](https://www.nndc.bnl.gov/nudat3/getdecaydataset.jsp?dsid=247bk+a+decay&nucleus=243AM).

[NASA](https://science.nasa.gov/planetary-science/programs/radioisotope-power-systems/about-plutonium-238/)
supports spacecraft decay-heat power; [DOE](https://www.energy.gov/orem/articles/terrapower-cardinal-health-isotek-and-doe-celebrate-historic-achievement-next)
supports specialized Ac-225 clinical research; [EPA](https://www.epa.gov/radtown/americium-ionization-smoke-detectors)
supports enclosed detector sources. [NRC fissile](https://www.nrc.gov/reading-rm/basic-ref/glossary/fissile-material)
and [fertile](https://www.nrc.gov/reading-rm/basic-ref/glossary/fertile-material)
glossary entries support the conceptual distinctions. [Wallner et al.](https://www.nature.com/articles/ncomms6956)
support tiny natural interstellar Pu-244 traces. Individual RSC element references
support historical and material context. `SOURCES.txt` and each explorer's existing
source disclosure retain the full dated attribution.

The models remain educational approximations, with no calculated many-electron
solution, chemical reaction, material sample, radiation dose or nuclear reaction.
The isotope selection is intentionally concise; optional Pa-233, U-233 and Np-239
were not added. Minor branches are not exhaustive. Browser automation used installed
Chrome on Windows with emulated touch/viewport sizes, not physical tablets or
separate Safari/Firefox installations.

For elements 96–103, retain explicit measured ground states (including configuration
exceptions), concise sourced radioactive-isotope sets, the same grouped core and
focused f-state strategy, and the shared performance limits. Verify the later-actinide
configurations and longest-lived representative masses before enabling those tiles.
They remain information-only in this phase.
