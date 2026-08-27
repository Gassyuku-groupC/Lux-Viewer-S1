````markdown
# Role-SVG Change Lux Viewer

## Overview

This project is a modified Lux AI 2021 replay viewer that changes the appearance of Units and Cities according to their assigned tactical Roles.

The viewer changes the SVG assets referenced by each Unit and City based on its Role. This makes it possible to visually identify the role of each Unit and City directly in the replay.

The viewer is based on the Lux AI Season 1 viewer and the Group C local viewer work.

---

## Features

- Preserves the original Lux unit, city, map, animation, and replay controls.
- Changes Unit and City SVG assets according to their assigned Roles.
- Makes the tactical role of each Unit and City visually identifiable.
- Supports ordinary stateful Lux replays without changing their basic display.
- Supports replays containing role information.
- Includes a generator that embeds a `*.roles.json` sidecar into a replay.

---

# Requirements

## External Software

The following software must be installed before setting up the viewer.

- Git
- Node.js
- npm
- Python 3.8 or newer

## Node.js Packages

The packages specified in `package.json` are installed with:

```powershell
npm install
````

The following additional packages are required for the Windows environment:

```powershell
npm install --save-dev rimraf copyfiles
```

The `serve` package is required to serve the production build locally:

```powershell
npm i -g serve
```

## Python Packages

No additional Python packages are required for basic viewer operation.

Python 3.8 or newer is required for the replay-related scripts.

A Python virtual environment can be created with:

```powershell
python -m venv .venv-viewer
```

---

# Quick Start

Follow the steps below in order when setting up the viewer on a new PC.

## 1. Clone the Repository

```powershell
git clone https://github.com/Gassyuku-groupC/Lux-Viewer-S1.git
cd Lux-Viewer-S1
```

## 2. Set Up the Python Environment

If you are not using Anaconda:

```powershell
python -m venv .venv-viewer
.\.venv-viewer\Scripts\Activate.ps1
```

## 3. Install Node.js Packages

```powershell
npm install
```

## 4. Install Additional Packages

```powershell
npm i -g serve
npm install --save-dev rimraf copyfiles
```

## 5. Set the Node.js Compatibility Option

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

## 6. Build the Viewer

```powershell
npm run build
```

## 7. Replace the Asset Directory

Delete:

```text
dist/assets/
```

Then copy:

```text
assets/
```

to:

```text
dist/assets/
```

The final structure should be:

```text
Lux-Viewer-S1/
├─ assets/
├─ dist/
│  ├─ assets/
│  └─ ...
└─ ...
```

## 8. Start the Viewer

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run dev
```

## 9. Select the `dist` Directory

When the viewer opens, select the `dist` directory and wait for the viewer to finish loading.

## 10. Select a Replay

Select a Replay JSON file from:

```text
replays/
```

---

# Detailed Setup

## Python Virtual Environment

If Anaconda is not used, create a Python virtual environment:

```powershell
python -m venv .venv-viewer
```

Activate it with:

```powershell
.\.venv-viewer\Scripts\Activate.ps1
```

The Python virtual environment is only used for Python-related tools.

`npm install` does not depend on the Python virtual environment.

---

## npm Packages

Run:

```powershell
npm install
```

This installs the dependencies specified in `package.json`.

The installed packages are stored in:

```text
node_modules/
```

The `node_modules/` directory is not tracked by Git, so `npm install` must be run when setting up the project on a new PC.

---

## `serve`

Install `serve` globally:

```powershell
npm i -g serve
```

`serve` is used to serve the production build locally.

---

## Node.js Compatibility

This viewer uses an older Webpack environment.

Modern Node.js versions may cause OpenSSL compatibility problems.

Set the following environment variable:

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

This setting only applies to the current terminal session.

If the terminal is restarted, run the command again.

This command does not change the installed Node.js version.

It only enables the legacy OpenSSL provider required by the older Webpack environment.

---

## Windows Build Support

Some of the original build scripts were designed for a Linux environment.

Install the following development dependencies for Windows:

```powershell
npm install --save-dev rimraf copyfiles
```

* `rimraf` provides cross-platform file and directory removal.
* `copyfiles` provides cross-platform file copying.

---

## Build

Build the viewer with:

```powershell
npm run build
```

The production build is generated in:

```text
dist/
```

---

## Team-Created Assets

After building, delete:

```text
dist/assets/
```

Then copy:

```text
assets/
```

to:

```text
dist/assets/
```

The final structure should be:

```text
Lux-Viewer-S1/
├─ assets/
├─ dist/
│  ├─ assets/
│  └─ ...
└─ ...
```

> **Important**
>
> If the team-created assets are not copied to `dist/assets/`, asset reference errors may occur.
>
> Units and Cities may not be displayed correctly and may appear as a corrupted or "salt-and-pepper" pattern.

---

## Launch

Start the development server with:

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run dev
```

When the viewer opens, select `dist` and wait for the application to finish loading.

Then select a Replay JSON from:

```text
replays/
```

---

# Development

## Modifying the Source Code

The main source files are located under:

```text
src/
```

Role-to-asset mappings are mainly managed in:

```text
src/roleColors.ts
```

The viewer changes the SVG asset referenced by a Unit or City according to its assigned Role.

This allows the same Unit or City type to have a different appearance depending on its tactical Role.

---

## Development Workflow

When modifying the source code, use the following workflow.

### 1. Stop the Running Viewer

```text
Ctrl + C
```

### 2. Modify the Source Code

Modify the required files under:

```text
src/
```

### 3. Build Again

```powershell
npm run build
```

### 4. Update the Assets

If the build regenerated `dist/assets/`, delete it and copy the team-created assets again:

```text
assets/
   ↓ copy
dist/assets/
```

### 5. Start the Viewer

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run dev
```

---

# Generate a Role-Colored Replay

The viewer reads `roleFrames` embedded in the replay.

Merge a normal stateful replay and its role sidecar with:

```powershell
python .\scripts\merge_role_sidecar_into_replay.py `
  .\replays\match.commands.json `
  .\replays\match.roles.json `
  .\replays\match.role-colored.json
```

The generator rejects input files whose seeds do not match.

The source files are left unchanged.

Upload the generated:

```text
match.role-colored.json
```

to the viewer.

See `ROLE_DATA_FORMAT.md` for the role sidecar schema and role names.

---

# Role Assets

## Worker Roles

The following Worker Roles are supported:

* `Harvester`
* `Builder`
* `Attacker`
* `Firefighter`

Each Role can use a Role-specific Worker SVG asset.

## City Roles

The following City Roles are supported:

* `FuelDepot`
* `FuelStation`
* `ResearchStation`
* `ManufacturingPoint`
* `SacrificialDecay`

Each Role can use a Role-specific City SVG asset.

* `FuelDepot` and `FuelStation` use the fuel-related City asset.
* `ResearchStation` uses the research-related City asset.
* `ManufacturingPoint` uses the manufacturing-related City asset.
* `SacrificialDecay` uses the sacrificial City asset for team 0, variant 0, during both day and night.

Role-to-asset-key mappings are centralized in:

```text
src/roleColors.ts
```

---

# Build Output

Production assets are generated in:

```text
dist/
```

The `dist/` directory is intentionally not tracked by Git.

Generate it with:

```powershell
npm run build
```

before serving or publishing a release.

---

# Attribution

This project derives from the Lux AI Challenge Season 1 visualizer and Group C's local viewer modifications.

The original Apache 2.0 license is retained in `LICENSE`.

```
```
