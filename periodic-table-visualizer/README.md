# Periodic Table Visualizer

An offline interactive periodic table and atom explorer. Open `periodic-table-visualizer/index.html` in a browser. Keep its JavaScript and CSS directories together; no installation or build is required.

Project structure:

- `periodic-table-visualizer/`: application, scientific records, documentation, and in-browser tests.
- `qa/`: automated test scripts. Generated screenshots, logs, audit data, and data snapshots stay local.
- `PHASE-*.md`: development reports.

Publishing target: `matthewbuza/matthewbuza.github.io`, project path `/periodic-table-visualizer/`. The website homepage links to `/periodic-table-visualizer/`. Local deployment previews are excluded from the upload. Historical tests that rely on local snapshots or screenshot baselines need those local files to run.
