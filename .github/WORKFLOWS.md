# GitHub Reusable Workflows

This repository contains reusable GitHub Actions workflows for TypeScript/Node.js projects that support both npm and yarn package managers.

## Available Workflows

### 1. Build Workflow (`build.yml`)

Builds your TypeScript project and uploads build artifacts.

#### Inputs

| Input | Description | Required | Default | Type |
|-------|-------------|----------|---------|------|
| `node-version` | Node.js version to use | No | `'20'` | string |
| `package-manager` | Package manager (npm/yarn) | No | `'npm'` | string |
| `working-directory` | Working directory for build | No | `'.'` | string |
| `build-script` | Build script name | No | `'build'` | string |
| `artifact-name` | Build artifact name | No | `'build-output'` | string |
| `artifact-path` | Path to upload as artifact | No | `'dist'` | string |
| `build-matrix` | JSON array of build combinations | No | `null` | string |
| `test-matrix` | JSON array of test combinations | No | `null` | string |

#### Outputs

| Output | Description |
|--------|-------------|
| `build-success` | Whether the build was successful |
| `build-matrix-used` | The build matrix configuration used |
| `test-matrix-used` | The test matrix configuration used |

### 2. Verify Workflow (`verify.yml`)

Runs type checking, tests, and linting for code quality verification.

#### Inputs

| Input | Description | Required | Default | Type |
|-------|-------------|----------|---------|------|
| `node-version` | Node.js version to use | No | `'20'` | string |
| `package-manager` | Package manager (npm/yarn) | No | `'npm'` | string |
| `working-directory` | Working directory | No | `'.'` | string |
| `typecheck-script` | TypeScript checking script | No | `'typecheck'` | string |
| `test-script` | Test script name | No | `'test'` | string |
| `lint-script` | Lint script name | No | `'lint'` | string |
| `skip-tests` | Skip running tests | No | `false` | boolean |
| `skip-lint` | Skip running lint | No | `false` | boolean |

#### Outputs

| Output | Description |
|--------|-------------|
| `typecheck-success` | Whether type checking passed |
| `test-success` | Whether tests passed |
| `lint-success` | Whether linting passed |

## Usage Examples

### Basic Usage

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    uses: ./.github/workflows/build.yml
    with:
      package-manager: 'npm'
      node-version-file: 'package.json'
```

### With Yarn

```yaml
jobs:
  build-yarn:
    uses: ./.github/workflows/build.yml
    with:
      package-manager: 'yarn'
      node-version-file: 'package.json'
      artifact-name: 'my-app-dist'
```

### Matrix Testing

```yaml
jobs:
  matrix-test:
    strategy:
      matrix:
        node-version: ['16', '18', '20']
        package-manager: ['npm', 'yarn']
    uses: ./.github/workflows/verify.yml
    with:
      node-version: ${{ matrix.node-version }}
      package-manager: ${{ matrix.package-manager }}
```

### Custom Build and Test Matrices

```yaml
jobs:
  multi-target-build:
    uses: ./.github/workflows/build.yml
    with:
      build-matrix: |
        {
          "include": [
            {"os": "linux", "arch": "x64"},
            {"os": "linux", "arch": "arm64"},
            {"os": "darwin", "arch": "x64"},
            {"os": "windows", "arch": "x64"}
          ]
        }
      test-matrix: |
        {
          "include": [
            {"platform": "ubuntu-latest", "arch": "x64"},
            {"platform": "macos-latest", "arch": "x64"},
            {"platform": "windows-latest", "arch": "x64"}
          ]
        }
```

### Cross-Platform Testing

```yaml
jobs:
  cross-platform-test:
    uses: ./.github/workflows/build.yml
    with:
      test-matrix: |
        {
          "include": [
            {"platform": "ubuntu-20.04", "arch": "x64"},
            {"platform": "ubuntu-22.04", "arch": "x64"},
            {"platform": "macos-12", "arch": "x64"},
            {"platform": "macos-13", "arch": "x64"},
            {"platform": "windows-2019", "arch": "x64"},
            {"platform": "windows-2022", "arch": "x64"}
          ]
        }
```

## Matrix Configuration

The build workflow supports custom matrices for both build targets and test environments.

### Build Matrix Format

The `build-matrix` input accepts a JSON string with the following structure:

```json
{
  "include": [
    {"os": "linux", "arch": "x64"},
    {"os": "darwin", "arch": "arm64"}
  ]
}
```

- `os`: Target operating system (e.g., linux, darwin, windows)
- `arch`: Target architecture (e.g., x64, arm64)

### Test Matrix Format

The `test-matrix` input accepts a JSON string with the following structure:

```json
{
  "include": [
    {"platform": "ubuntu-latest", "arch": "x64"},
    {"platform": "macos-latest", "arch": "x64"}
  ]
}
```

- `platform`: GitHub Actions runner (e.g., ubuntu-latest, macos-latest, windows-latest)
- `arch`: Runner architecture (e.g., x64, arm64)

### Default Matrices

If not specified, the workflow uses these defaults:

- **Build Matrix**: `[{"os": "linux", "arch": "x64"}]`
- **Test Matrix**: `[{"platform": "ubuntu-latest", "arch": "x64"}]`

### Monorepo Usage

```yaml
jobs:
  verify-backend:
    uses: ./.github/workflows/verify.yml
    with:
      working-directory: './backend'
      package-manager: 'npm'

  verify-frontend:
    uses: ./.github/workflows/verify.yml
    with:
      working-directory: './frontend'
      package-manager: 'yarn'
```

## Required Scripts in package.json

For the workflows to work properly, ensure your `package.json` includes these scripts:

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc --noEmit",
    "clean": "rimraf dist",
    "test": "jest",           // Optional: only if you have tests
    "lint": "eslint src"      // Optional: only if you have linting
  }
}
```

The workflows will gracefully handle missing optional scripts (test, lint, clean).

## Lockfile Handling

The workflows intelligently handle different lockfile scenarios:

### When using npm:
- ✅ **With package-lock.json**: Uses `npm ci` for fast, reproducible installs with caching
- ⚠️ **Without package-lock.json**: Falls back to `npm install` without caching

### When using yarn:
- ✅ **With yarn.lock**: Uses `yarn install --frozen-lockfile` for reproducible installs with caching
- ⚠️ **Without yarn.lock**: Uses `yarn install` to create lockfile, caching disabled

**Recommendation**: Always commit your lockfiles (`package-lock.json` or `yarn.lock`) for optimal CI performance and reproducible builds.

## Features

- ✅ **Dual Package Manager Support**: Works with both npm and yarn
- ✅ **Lockfile Flexibility**: Handles missing yarn.lock/package-lock.json gracefully
- ✅ **Smart Caching**: Automatic cache detection based on available lockfiles
- ✅ **Configurable Node.js Versions**: Support for multiple Node versions
- ✅ **Build Artifacts**: Automatic artifact upload and retention
- ✅ **Graceful Script Handling**: Safely handles missing optional scripts
- ✅ **Rich Summary Reports**: Detailed workflow summaries in GitHub UI
- ✅ **Monorepo Ready**: Configurable working directories
- ✅ **Matrix Testing**: Easy setup for testing across environments
- ✅ **Custom Build/Test Matrices**: Configure multi-target builds and cross-platform testing
- ✅ **Dependency Caching**: Automatic npm/yarn cache optimization when lockfiles exist

## CI/CD Pipeline Example

See `ci.yml` for a complete example that includes:
- Code verification (type checking, tests, linting)
- Build process with artifact upload
- Matrix testing across Node versions and package managers
- Conditional execution based on branch and event type