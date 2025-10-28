# GitHub Reusable Workflows

This repository contains a comprehensive reusable GitHub Actions workflow for TypeScript/Node.js projects that supports both npm and yarn package managers, cross-platform builds, testing, and VS Code extension packaging.

## Available Workflows

### Build and Verify Workflow (`build-and-verify.yml`)

A comprehensive workflow that handles building, testing, linting, and packaging across multiple platforms with automatic platform matrix detection.

#### Features

- ✅ **Cross-platform builds**: Windows, Ubuntu, macOS (Intel & ARM)
- ✅ **Dual package manager support**: npm and yarn with automatic detection
- ✅ **VS Code extension packaging**: Creates platform-specific VSIX files
- ✅ **Automated testing**: Jest with coverage reporting
- ✅ **Quality checks**: Linting and build verification
- ✅ **Configurable matrix**: Custom or default 6-platform matrix
- ✅ **Release publishing**: Automatic GitHub release creation
- ✅ **Security hardening**: Step Security runner hardening

#### Inputs

| Input | Description | Required | Default | Type |
|-------|-------------|----------|---------|------|
| `node-version-file` | package.json file for Node.js version | Yes | `'./package.json'` | string |
| `package-manager` | Package manager (npm/yarn) | No | `'npm'` | string |
| `working-directory` | Working directory for build | No | `'.'` | string |
| `build-matrix` | JSON array of build combinations | No | Uses default matrix | string |
| `test-matrix` | JSON array of test combinations | No | Uses default matrix | string |
| `build-command` | Build script name | No | `'build'` | string |
| `test-command` | Test script name | No | `'test'` | string |
| `lint-command` | Lint script name | No | `'lint'` | string |
| `enable-qlty` | Enable Qlty coverage upload | No | `false` | boolean |
| `download-script-name` | Path to download script for tools | No | - | string |

#### Secrets

| Secret | Description | Required |
|--------|-------------|----------|
| `QLTY_COVERAGE_TOKEN` | Token for Qlty coverage upload | No |

#### Default Platform Matrix

The workflow uses a default 6-platform matrix from `.github/platform-matrix.json`:

- **Windows Server 2022**: AMD64 & ARM64
- **Ubuntu 24.04**: AMD64 & ARM64  
- **macOS 15 Intel**: AMD64
- **macOS 14**: ARM64 (Apple Silicon)

#### Jobs Overview

1. **configure-ci**: Loads platform matrix and configuration
2. **build**: Cross-platform building with artifact upload
3. **test**: Cross-platform testing with coverage reporting
4. **package**: Creates platform-specific VSIX packages
5. **publish-coverage**: Uploads coverage to Qlty (optional)
6. **publish**: Creates GitHub releases with assets (release events only)

## Usage Examples

### Basic Usage with npm

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  build-and-test:
    permissions:
      contents: write  # Required for publish job
    uses: soumeh01/test_ts_app/.github/workflows/build-and-verify.yml@main
    with:
      package-manager: 'npm'
      node-version-file: './package.json'
```

### Using yarn with Default Platform Matrix

```yaml
jobs:
  build-and-test-yarn:
    permissions:
      contents: write
    uses: soumeh01/test_ts_app/.github/workflows/build-and-verify.yml@main
    with:
      package-manager: 'yarn'
      node-version-file: './package.json'
      # Uses default 6-platform matrix (Windows/Ubuntu/macOS with AMD64/ARM64)
```

### Custom Platform Matrix

```yaml
jobs:
  limited-platforms:
    permissions:
      contents: write
    uses: soumeh01/test_ts_app/.github/workflows/build-and-verify.yml@main
    with:
      package-manager: 'npm'
      build-matrix: '[{"platform":"windows-2022","arch":"amd64"},{"platform":"ubuntu-24.04","arch":"amd64"}]'
      test-matrix: '[{"platform":"windows-2022","arch":"amd64"},{"platform":"ubuntu-24.04","arch":"amd64"}]'
      node-version-file: './package.json'
```

### With Coverage Upload

```yaml
jobs:
  build-with-coverage:
    permissions:
      contents: write
    uses: soumeh01/test_ts_app/.github/workflows/build-and-verify.yml@main
    secrets:
      QLTY_COVERAGE_TOKEN: ${{ secrets.QLTY_COVERAGE_TOKEN }}
    with:
      package-manager: 'npm'
      enable-qlty: true
      node-version-file: './package.json'
```

### Monorepo Usage

```yaml
jobs:
  backend:
    permissions:
      contents: write
    uses: soumeh01/test_ts_app/.github/workflows/build-and-verify.yml@main
    with:
      working-directory: './backend'
      package-manager: 'npm'
      node-version-file: './backend/package.json'

  frontend:
    permissions:
      contents: write
    uses: soumeh01/test_ts_app/.github/workflows/build-and-verify.yml@main
    with:
      working-directory: './frontend'
      package-manager: 'yarn'
      node-version-file: './frontend/package.json'
```

## Platform Matrix Configuration

### Default Matrix

If no custom matrix is provided, the workflow uses a comprehensive 6-platform matrix from `.github/platform-matrix.json`:

```json
[
  {"platform": "windows-2022", "arch": "amd64"},
  {"platform": "windows-2022", "arch": "arm64"},
  {"platform": "ubuntu-24.04", "arch": "amd64"},
  {"platform": "ubuntu-24.04", "arch": "arm64"},
  {"platform": "macos-15-intel", "arch": "amd64"},
  {"platform": "macos-14", "arch": "arm64"}
]
```

### Custom Matrix Format

Both `build-matrix` and `test-matrix` accept JSON arrays with platform/architecture combinations:

```json
[
  {"platform": "windows-2022", "arch": "amd64"},
  {"platform": "ubuntu-24.04", "arch": "amd64"}
]
```

- **platform**: GitHub Actions runner (windows-2022, ubuntu-24.04, macos-15-intel, macos-14)
- **arch**: Target architecture (amd64, arm64)

## Required Package.json Configuration

### Minimal Scripts

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest --coverage",
    "lint": "echo \"✅ Lint check completed!\"",
    "package": "npm run build && vsce package"
  }
}
```

### VS Code Extension Support

For VS Code extension projects, include:

```json
{
  "engines": {
    "vscode": "^1.63.0",
    "node": "^20.18.0"
  },
  "activationEvents": ["onStartupFinished"],
  "contributes": {}
}
```

## Package Manager Detection

The workflow automatically handles package manager differences:

### npm Configuration

- Uses `npm ci` for dependency installation
- Adds `--no-yarn` flag to vsce package command
- Respects package-lock.json for reproducible builds

### yarn Configuration

- Uses `yarn --frozen-lockfile` for dependency installation
- Adds `--yarn` flag to vsce package command
- Respects yarn.lock for reproducible builds

## Artifact Outputs

The workflow produces several artifacts:

- **dist-{package-manager}**: Built TypeScript output and project files
- **test-coverage-{package-manager}**: Jest coverage reports
- **vsix-package-{package-manager}-{platform}-{arch}**: Platform-specific VSIX packages

## Self-Testing

The repository includes `self-test.yml` which demonstrates two usage patterns:

1. **Custom Matrix**: Limited to 2 platforms for faster CI
2. **Default Matrix**: Full 6-platform cross-platform testing

## Key Features

- ✅ **Cross-Platform VSIX Packaging**: Generates platform-specific extension packages
- ✅ **Dual Package Manager Support**: Works with both npm and yarn
- ✅ **Matrix Build Support**: Tests across 6 platform combinations
- ✅ **Smart Caching**: Automatic dependency cache optimization
- ✅ **Build Artifacts**: Automatic artifact upload and retention
- ✅ **Graceful Script Handling**: Safely handles missing optional scripts
- ✅ **Rich Summary Reports**: Detailed workflow summaries in GitHub UI
- ✅ **Monorepo Ready**: Configurable working directories
- ✅ **Security Hardening**: Step Security runner hardening included
- ✅ **Modern Actions**: Uses latest GitHub Actions versions

## Complete Example

```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  release:
    types: [published]

jobs:
  test-and-build:
    permissions:
      contents: write
    uses: soumeh01/test_ts_app/.github/workflows/build-and-verify.yml@main
    with:
      package-manager: 'npm'
      node-version: '20.18.0'
      build-command: 'npm run build'
      test-command: 'npm test'
      lint-command: 'npm run lint'
      package-command: 'npm run package'
```

## Troubleshooting

### Lockfile Issues

If you encounter cache misses or installation errors:

1. Ensure your lockfile is committed to version control
2. Use `npm ci` or `yarn --frozen-lockfile` locally before committing
3. Check that lockfile and package.json are in sync

### Monorepo Considerations

- Use `working-directory` to target specific packages
- Consider caching strategies for mono-repos
- Be mindful of dependency hoisting and version conflicts

## Customization

You can extend these workflows by:

1. **Adding Custom Scripts**: Update your package.json scripts
2. **Modifying Matrices**: Provide custom build/test matrices
3. **Custom Artifacts**: Configure additional artifact uploads
4. **Environment Variables**: Pass custom environment variables
5. **Post-Build Actions**: Use additional steps after package generation
