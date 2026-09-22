# Phase 6N — Transactinides Rf–Ds

Phase 6N adds offline explorer support for Rutherfordium (Rf, 104) through Darmstadtium (Ds, 110). The periodic table now exposes 110 complete explorers and 409 isotope records. The seven new elements remain in the period-7 main row after the actinide placeholder; the detached actinide row is unchanged.

## Data and evidence

- Explicit educational configurations are `[Rn] 5f¹⁴ 6d²–6d⁸ 7s²`, with seven-shell totals validated against atomic number.
- Representative bracket masses are Rf-267, Db-268, Sg-269, Bh-270, Hs-269, Mt-277, and Ds-281.
- Thirteen selected radioactive isotopes are included. Each has a calculated neutron count, half-life, decay information, synthetic origin, measurement status, safety note, and source link.
- Atomic configurations are marked primarily predicted. Chemistry is marked partially measured through Hs and predicted for Mt and Ds; bulk properties are explicitly not measured.
- Current evaluated nuclear records are used for the selected lifetimes. Rf-261 and Sg-265 are presented as longer-lived observed states without asserting unsettled ground-state ordering. Mt-277 uses the newer millisecond-scale evaluation.

## Explorer behavior

All seven records use the shared Bohr, wave, and quantum renderers, all three reading levels, isotope selection, particle selection, nucleon interiors, keyboard and touch controls, rotation, zoom, fullscreen, reduced motion, and offline file operation. The new status notes are compact and the isotope uncertainty note updates with the selected isotope.

## Validation

- Data validation: PASS — 110 elements, 409 isotopes; the pre-Phase-6N snapshot of 95 elements and 383 isotope records is unchanged.
- New-element smoke check: PASS — all Rf–Ds defaults load, configurations advance 6d² through 6d⁸, status notes render, and the 390px viewport has no horizontal overflow.
- Existing comprehensive suites: the application/data and interaction suites pass. Several historical role suites still contain their former Phase-6M boundary assertion (they expect Rutherfordium to be unavailable); those assertions are obsolete now that Phase 6N intentionally enables Rf–Ds and are not evidence of an application defect.

## Files

The implementation is in `periodic-table-visualizer/js/transactinide-data.js`, the shared renderer/UI modules, periodic data and both HTML entry points. The Phase 6N data snapshot and regression runner are in `qa/phase6n-prior-data.json` and `qa/phase6n-regressions.cjs`.

Elements 111–118 remain future work.
