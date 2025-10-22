# GitHub Reusable Workflows

This repository contains reusable GitHub Actions workflows for TypeScript/Node.js projects that support both npm and yarn package managers.

## Available Workflows

### 1. Build Workflow (`build.yml`)

Builds your TypeScript project and uploads build artifacts.

#### Inputs

| Input | Description | Required | Default | Type |
|-------|-------------|----------|---------|------|
| `node-version` | Node.js version to use | No | `'18'` | string |
| `package-manager` | Package manager (npm/yarn) | No | `'npm'` | string |
| `working-directory` | Working directory for build | No | `'.'` | string |
| `build-script` | Build script name | No | `'build'` | string |
| `artifact-name` | Build artifact name | No | `'build-output'` | string |
| `artifact-path` | Path to upload as artifact | No | `'dist'` | string |

#### Outputs

| Output | Description |
|--------|-------------|
| `build-success` | Whether the build was successful |

### 2. Verify Workflow (`verify.yml`)

Runs type checking, tests, and linting for code quality verification.

#### Inputs

| Input | Description | Required | Default | Type |
|-------|-------------|----------|---------|------|
| `node-version` | Node.js version to use | No | `'18'` | string |
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
  verify:
    uses: ./.github/workflows/verify.yml
    with:
      package-manager: 'npm'
      node-version: '18'

  build:
    needs: verify
    uses: ./.github/workflows/build.yml
    with:
      package-manager: 'npm'
      node-version: '18'
```

### With Yarn

```yaml
jobs:
  verify-yarn:
    uses: ./.github/workflows/verify.yml
    with:
      package-manager: 'yarn'
      node-version: '20'
      skip-tests: false
      skip-lint: false

  build-yarn:
    needs: verify-yarn
    uses: ./.github/workflows/build.yml
    with:
      package-manager: 'yarn'
      node-version: '20'
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

## Features

- ✅ **Dual Package Manager Support**: Works with both npm and yarn
- ✅ **Configurable Node.js Versions**: Support for multiple Node versions
- ✅ **Build Artifacts**: Automatic artifact upload and retention
- ✅ **Graceful Script Handling**: Safely handles missing optional scripts
- ✅ **Rich Summary Reports**: Detailed workflow summaries in GitHub UI
- ✅ **Monorepo Ready**: Configurable working directories
- ✅ **Matrix Testing**: Easy setup for testing across environments
- ✅ **Dependency Caching**: Automatic npm/yarn cache optimization

## CI/CD Pipeline Example

See `ci.yml` for a complete example that includes:
- Code verification (type checking, tests, linting)
- Build process with artifact upload
- Matrix testing across Node versions and package managers
- Conditional execution based on branch and event type