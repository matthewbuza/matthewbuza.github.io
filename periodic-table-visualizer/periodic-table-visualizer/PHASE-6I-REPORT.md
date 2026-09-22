# Phase 6I — Completing the lanthanide row

Completed in the existing Periodic Table Visualizer project, September 12, 2026.
**All seven new elements open from the periodic table and work in all three models.**
There are now 73 explorers and 312 isotope/nuclear-state records. All 118 table
positions remain unchanged; 45 other elements retain their information cards.

## Elements and isotope choices

| Element | Default | Protons / neutrons / electrons | Configuration | Shell population | Isotopes |
|---|---|---|---|---|---|
| Tb | Tb-159 | 65 / 94 / 65 | [Xe] 4f⁹ 6s² | 2,8,18,27,8,2 | 159,161 |
| Dy | Dy-164 | 66 / 98 / 66 | [Xe] 4f¹⁰ 6s² | 2,8,18,28,8,2 | 156,158,160,161,162,163,164 |
| Ho | Ho-165 | 67 / 98 / 67 | [Xe] 4f¹¹ 6s² | 2,8,18,29,8,2 | 165,166 |
| Er | Er-166 | 68 / 98 / 68 | [Xe] 4f¹² 6s² | 2,8,18,30,8,2 | 162,164,166,167,168,170 |
| Tm | Tm-169 | 69 / 100 / 69 | [Xe] 4f¹³ 6s² | 2,8,18,31,8,2 | 169,170 |
| Yb | Yb-174 | 70 / 104 / 70 | [Xe] 4f¹⁴ 6s² | 2,8,18,32,8,2 | 168,170,171,172,173,174,176 |
| Lu | Lu-175 | 71 / 104 / 71 | [Xe] 4f¹⁴ 5d¹ 6s² | 2,8,18,32,9,2 | 175,176,177 |

The 29 additions include 24 stable/observationally stable choices and five
radioactive choices. Lu-176 is naturally radioactive; the other four are
produced radioisotopes. All seven natural isotope mixtures sum to 100%.
Optional Er-169 and Yb-169 were omitted to keep the selectors concise.

NIST neutral ground states are stored explicitly, not inferred from a simple
filling rule. Shell and subshell totals, capacities, identities and neutron
arithmetic are validated. Yb correctly completes 4f¹⁴; Lu retains 4f¹⁴ and
adds 5d¹. Changing isotopes preserves every neutral electron configuration.

## Shared implementation and educational content

The established lanthanide data builder supplies the existing generalized
engine. No element-specific renderer, framework, dependency or new page was
added. The detached row, selection styling and tile content are preserved.
Single click selects a summary; double-click or Explore Atom opens the atom.
Keyboard follows the existing select-card-then-explore convention. Gd now
connects through Tb–Lu; Next stops before Hf. Fr/Ra gaps are unchanged.

New compact explanations cover the 4f progression, filled Yb group and Lu's 5d
electron at all three reading levels. The two 6s electrons are explicitly
outermost, with other states relevant to properties and bonding. Material uses
are attributed to compounds, alloys, laboratory setups or devices. Tb-161
clinical research is distinguished from established Lu-177 medicines.

## Scientific simplifications

- Bohr: exact 65–71 lightweight electron markers, six distinct shell counts,
  and every nucleon. Circular paths help count electrons; they are not real tracks.
- de Broglie: 13 occupied subshell bands, or 14 for Lu; faint inner core and
  emphasized occupied 4f/5d/6s. Wave patterns are conceptual, with no orbiting balls.
- Schrödinger: one grouped 54-electron xenon core plus 4f and 6s, and Lu's 5d.
  Clouds summarize likely electron locations, not solid surfaces or photographs.
  Explore Subshells reports exact occupancy and uses one representative f shape;
  the seven-orbital/14-electron capacity is explained. Sample dots are not electrons.

No ion configurations, solid-state simulations, calculated many-electron
wavefunctions or decay animations were added. Lower quality reduces decorative
detail while preserving all required Bohr electron and nucleon counts.

## Files changed

Application files:
- js/lanthanide-data.js — seven records, 29 isotopes, source metadata, explanations,
  full-group wording for Yb/Lu, and identity/configuration validation.
- js/periodic-data.js — enabled Tb–Lu in the existing availability registry.

Documentation: START-HERE.txt, README.txt, DEVELOPER-NOTES.txt, SOURCES.txt,
TEST-RESULTS.txt and this PHASE-6I-REPORT.md.

New QA under ../qa: phase6i.cjs, phase6i-interactions.cjs, phase6i-roles.cjs,
phase6i-subatomic.cjs, phase6i-final.cjs, phase6i-state.cjs,
phase6i-performance.cjs and phase6i-regressions.cjs, with JSON results,
logs and screenshots. Existing QA availability totals and unfinished-neighbor
expectations were updated to 73/312 and Lu/Hf; prior scientific cases remain.
Copper golden reference files were not regenerated.

## Sources and conventions

SOURCES.txt lists the new 22 references and the reused sources. The shared
registry contains 56 entries with organization, title, URL, access date and
supported facts. References include NIST atomic states; CIAAW 2024 abundances;
NNDC Wallet Cards nuclear data; FDA, IAEA and PSI medical/research information;
RSC uses; USGS detector/phosphor applications; and NIST clocks and fiber optics.

Lu-176 uses the explicitly named CIAAW value 3.57(14) × 10¹⁰ years; published
half-life evaluations differ and the advanced note records this limitation.
Lu-177 uses the FDA label's 6.647 days. Ho-166 uses hours, correcting an unrelated
IAEA treatment report's printed days-unit error. This phase does not confuse
observational stability, natural abundance and radioactivity.

## Validation and interaction results

- Complete dataset: 73 elements / 312 records; lanthanides: 15 / 64, all valid.
- All 73 enabled tiles passed summary/button and direct double-click navigation.
- All 29 new isotopes: 87 model cases and 58 proton/neutron interior round trips.
- Exact defaults, electron/shell/subshell totals, occupancy/capacity, six rings,
  isotope neutron changes, wave choices and grouped/focused cloud counts verified.
- 49 negative data cases: 29 configuration/classification, six isotope and 14 identity cases.
- 14 direct electron clicks, 42 fullscreen interiors, 168 subatomic-panel cases,
  and 42 native nucleon double-clicks across the seven elements and three models.
- 21 touch drag/pinch cases and 21 mouse drag/wheel cases; vertical drag direction verified.
- Cross-element loading exits interiors, removes stale isotope/particle selections,
  retains model/reading level and resets camera fit. History/reload and boundaries pass.
- 378 model/reading-level checks at 320,390,768,1024,1366,1920 pixels; no panel
  or page text overflow. Twenty-one forced-low-detail cases retain exact particles.
- All 41 earlier regression suites passed, covering H–Gd, Cu, Cs/Ba/Fr/Ra,
  table/search/filter behavior, isomers, models, interiors, fullscreen and reduced motion.
- Copper's three canvas images remain byte-identical to the existing golden references.
- Direct file:// operation: zero network requests, missing files or normal-use console errors.

The initial new role test exposed missing Ba/Hf placement wording in the middle
reading level. The shared placement sentence was clarified and the rerun passed.

## Performance

A 550-switch run through Cu, Gd, Tb–Lu, Fr and Ra passed. The maximum pending
animation count remained one; event listeners stayed at 1,720; DOM canvases
stayed at two (the atom and existing transition overlay). Three model renderers
were retained, and replaced scenes released their particles, geometry and caches.
Post-collection heap growth was 121,044 bytes, with no unbounded accumulation detected.

Lu median draw times before/after were Bohr 1.0/1.0 ms, wave 0.8/0.8 ms and
quantum 2.1/2.0 ms. Final p95 values were 1.6/1.0/2.2 ms. Separate fullscreen
Lu medians were 2.1/0.8/2.0 ms; p95 values were 2.8/1.0/2.4 ms. Static nucleus
geometry retained its identity across repeated draws. These are local Chrome
measurements, not guarantees for every classroom device.

## Remaining limitations and next phase

Tests used headless Chrome/Playwright with simulated touch and reduced motion.
Manual physical tablets, screen-reader listening, Firefox, Safari and Edge
were not tested. Visual checks and automated layout assertions cannot cover
every hardware/browser combination. The models are qualitative educational
representations, and the isotope list is intentionally selective.

Recommended next phase: a focused Hf–Hg transition-metal batch with individually
verified ground states and isotopes, preserving the established grouped-core
rendering and exact-count checks. Hafnium and all actinide explorers remain
unfinished in this phase.
