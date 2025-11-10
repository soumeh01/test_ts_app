# Build and Verify Workflow Usage

This document explains how to use the `build-and-verify.yml` reusable workflow for cross-platform TypeScript VS Code extension builds with comprehensive CI/CD features.

## Required Platform Matrix File

The workflow **requires** a platform matrix file to be provided. There is no default matrix, ensuring that each caller explicitly defines their target platforms. This approach provides better control and prevents unexpected platform builds.

### Platform Matrix File Format

Create a JSON file in your repository with the following format:

```json
[
  {
    "platform": "windows-2022",
    "arch": "amd64"
  },
  {
    "platform": "ubuntu-24.04",
    "arch": "amd64"
  },
  {
    "platform": "macos-14",
    "arch": "arm64"
  }
]
```

### Supported Platforms

- **Ubuntu**: `ubuntu-20.04`, `ubuntu-22.04`, `ubuntu-24.04` (latest recommended)
- **Windows**: `windows-2019`, `windows-2022` (2022 recommended)
- **macOS**: `macos-12`, `macos-13`, `macos-14`, `macos-15` (14+ for arm64)

### Supported Architectures

- `amd64` (x86_64) - Intel/AMD 64-bit
- `arm64` - ARM 64-bit (Apple Silicon, AWS Graviton)

## Usage Examples

### Basic Usage

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    uses: soumeh01/test_ts_app/.github/workflows/build-and-verify.yml@main
    with:
      platform-matrix-file: '.github/platform-matrix.json'
```

### Advanced Usage

```yaml
name: Advanced CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    permissions:
      contents: write  # Required for release version bumps
    uses: soumeh01/test_ts_app/.github/workflows/build-and-verify.yml@main
    with:
      platform-matrix-file: 'config/platforms.json'
      package-manager: 'yarn'
      working-directory: './app'
      build-command: 'build:prod'
      test-command: 'test:ci'
      lint-command: 'lint:check'
      enable-qlty: true
    secrets:
      QLTY_COVERAGE_TOKEN: ${{ secrets.QLTY_COVERAGE_TOKEN }}
      PR_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Platform-Specific Configurations

#### Minimal (Single Platform)

```json
[
  {
    "platform": "ubuntu-24.04",
    "arch": "amd64"
  }
]
```

#### Cross-Platform (Current Default)

This is the current configuration used by this repository:

```json
[
  {
    "platform": "windows-2022",
    "arch": "amd64"
  },
  {
    "platform": "ubuntu-24.04",
    "arch": "amd64"
  },
  {
    "platform": "macos-14",
    "arch": "arm64"
  }
]
```

#### Comprehensive (All Platforms & Architectures)

```json
[
  {
    "platform": "ubuntu-22.04",
    "arch": "amd64"
  },
  {
    "platform": "ubuntu-24.04",
    "arch": "amd64"
  },
  {
    "platform": "ubuntu-24.04",
    "arch": "arm64"
  },
  {
    "platform": "windows-2022",
    "arch": "amd64"
  },
  {
    "platform": "windows-2022",
    "arch": "arm64"
  },
  {
    "platform": "macos-13",
    "arch": "amd64"
  },
  {
    "platform": "macos-14",
    "arch": "arm64"
  },
  {
    "platform": "macos-15",
    "arch": "arm64"
  }
]
```

## Required Inputs

| Input | Required | Description |
|-------|----------|-------------|
| `platform-matrix-file` | ✅ | Path to JSON file containing platform matrix |

## Optional Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `node-version-file` | `./package.json` | Path to package.json file for Node.js version detection |
| `package-manager` | `npm` | Package manager to use (npm or yarn) with auto-detection |
| `working-directory` | `.` | Working directory for the build |
| `build-command` | `build` | npm/yarn script name for building |
| `test-command` | `test` | npm/yarn script name for testing |
| `lint-command` | `lint` | npm/yarn script name for linting |
| `enable-qlty` | `false` | Enable Qlty coverage upload (requires QLTY_COVERAGE_TOKEN) |

## Workflow Features

### Automatic Version Management

The workflow automatically manages version numbers based on git tags and event types:

- **Releases**: Uses the release tag version (e.g., `v1.2.3` → `1.2.3`)
- **Pull Requests**: Creates prerelease versions (e.g., `1.2.3-pr123-g9be1bf9.0`)
- **Branch Pushes**: Creates branch-specific versions (e.g., `1.2.3-main-5-g9be1bf9.0`)

### Package Manager Detection

The workflow includes intelligent package manager handling:

- Detects npm vs yarn automatically
- Uses appropriate commands for each package manager
- Handles version setting differences between npm and yarn
- Supports both package-lock.json and yarn.lock

### Security & Compliance

- **Step Security Hardening**: All jobs use harden-runner for security
- **Artifact Management**: Proper retention and cleanup of build artifacts
- **Git Configuration**: Automatic git setup for cross-platform compatibility

### Cross-Platform VSIX Packaging

The workflow builds platform-specific VSIX packages for:

- `win32-x64`, `win32-arm64`
- `linux-x64`, `linux-arm64`
- `darwin-arm64`

## Secrets

| Secret | Required | Description |
|--------|----------|-------------|
| `QLTY_COVERAGE_TOKEN` | Optional | Required only if `enable-qlty: true` |
| `PR_TOKEN` | Optional | Required only for release workflows to create version bump PRs |

## Error Handling

### Platform Matrix Validation

If the specified platform matrix file is not found:

```text
❌ Platform matrix file not found: .github/platform-matrix.json
💡 Please ensure the file exists in your repository at the specified path.
```

### JSON Validation

If the platform matrix contains invalid JSON:

```text
❌ Invalid JSON in platform matrix file
🔍 JSON validation error: [detailed error message]
```

### Empty Matrix Protection

If the platform matrix is empty or null:

```text
❌ Platform matrix is empty or invalid
```

This ensures that all platform configurations are explicit and prevents accidental usage of unexpected default configurations.

## Debug Logging

The workflow includes comprehensive debug logging for troubleshooting:

- Git repository status and configuration
- Package manager detection and version info
- Platform matrix loading and validation
- Version calculation and setting process
- Dependency installation details
- Build and test execution information

Enable debug logging by setting `ACTIONS_STEP_DEBUG: true` in your repository secrets.
