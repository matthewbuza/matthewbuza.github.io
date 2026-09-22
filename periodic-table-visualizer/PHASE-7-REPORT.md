# Phase 7 — Completing Period 7

Added offline explorer records for Rg, Cn, Nh, Fl, Mc, Lv, Ts and Og (111–118). The existing shared renderers remain in use and elements 1–110 are preserved.

The new records use the requested educational configurations: Rg `[Rn] 5f¹⁴ 6d¹⁰ 7s¹`, Cn `[Rn] 5f¹⁴ 6d¹⁰ 7s²`, and Nh–Og with 7p¹–7p⁶. Shell totals and neutral electron counts are validated by the existing atom engine. Representative bracket masses are 282, 285, 286, 290, 290, 293, 294 and 294; brackets identify representative isotope mass numbers rather than average atomic weights.

Focused radioactive isotope records, synthetic origin, safety notes, evaluated-status labels, half-lives, decay summaries, and source links were added. Electron configurations and most chemistry/bulk properties are marked predicted; no natural abundances or ordinary uses are invented.

The new data module is `periodic-table-visualizer/js/period7p-data.js`. It is loaded by both HTML entry points. `qa/phase7-smoke.cjs` covers all eight element routes at a narrow viewport. A direct Chromium file-mode check confirmed Oganesson loads with 118 electrons, seven shells, and no atom-data error.

Elements beyond Oganesson are intentionally not included.
