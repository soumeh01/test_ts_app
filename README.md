# TypeScript VS Code Extension - Reusable CI/CD Workflows

This repository provides **production-ready reusable GitHub Actions workflows** for building, testing, and packaging TypeScript VS Code extensions across multiple platforms. The repository itself serves as a self-testing infrastructure to validate the workflows.

## 🎯 Purpose

**Primary**: Reusable GitHub Actions workflows for TypeScript VS Code extensions
**Secondary**: Self-test infrastructure to validate workflow functionality

## What This Repository Provides

### 1. Reusable Workflows

The main deliverable is the **`build-and-verify.yml`** reusable workflow located in `.github/workflows/`, which provides:

- ✅ **Cross-Platform Builds** - Windows, Linux, macOS (amd64 & arm64)
- ✅ **Automated Version Management** - Based on git tags for releases, PRs, and branches
- ✅ **Dual Package Manager Support** - npm and yarn with auto-detection
- ✅ **VSIX Packaging** - Platform-specific extension packages
- ✅ **Test Automation** - Unit tests, E2E tests, and coverage reporting
- ✅ **Security Hardening** - Step Security runner protection
- ✅ **Artifact Management** - Build outputs, test coverage, and packages

### 2. Self-Test Infrastructure

The rest of the repository serves as a **working example and testing environment**:

- TypeScript 5.6.3 project configuration
- Jest testing setup with coverage
- TPIP (Third-Party IP) license compliance tracking
- Example VSIX packaging configuration
- Platform matrix configurations

## 📖 Using the Reusable Workflow

### Quick Start

Add this to your repository's workflow file (e.g., `.github/workflows/ci.yml`):

### Quick Start

Add this to your repository's workflow file (e.g., `.github/workflows/ci.yml`):

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
      package-manager: 'npm'  # or 'yarn'
```

### Platform Matrix Configuration

Create `.github/platform-matrix.json` in your repository:

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

For detailed usage instructions, see [WORKFLOWS.md](.github/WORKFLOWS.md).

## 🛠️ Self-Test Infrastructure Development

If you're contributing to or testing the workflows themselves, use these commands:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests with coverage
npm test

# Lint code
npm run lint

# Clean build artifacts
npm run clean

# Package as VSIX
npm run package

# Update TPIP license tracking
npm run tpip:update

# Generate TPIP license report
npm run tpip
```

## 📁 Repository Structure

### Reusable Workflows (Primary Deliverable)

```txt
.github/
├── workflows/
│   ├── build-and-verify.yml      # 🎯 Main reusable workflow
│   └── self-test.yml             # Self-testing workflow
├── platform-matrix.json         # Example platform configuration
└── WORKFLOWS.md                 # Comprehensive workflow documentation
```

### Self-Test Infrastructure

```txt
.
├── src/
│   └── index.ts                      # Test extension entry point
├── dist/                             # Build output
├── scripts/
│   ├── update-tpip.ts                # TPIP license tracking updater
│   └── tpip-reporter.ts              # TPIP license report generator
├── docs/
│   ├── third-party-licenses.json     # TPIP license database
│   └── tpip-header.md                # TPIP report header template
├── package.json                     # Self-test project configuration
├── tsconfig.json                    # TypeScript configuration
├── jest.config.js                   # Jest testing configuration
└── tpip.md                          # Generated TPIP license report
```

## 🔧 Workflow Configuration

### Required Inputs

| Input | Description |
|-------|-------------|
| `platform-matrix-file` | Path to JSON file containing platform matrix configuration |

### Optional Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `package-manager` | `npm` | Package manager (npm or yarn) |
| `node-version-file` | `./package.json` | Path to package.json for Node version |
| `working-directory` | `.` | Working directory for build |
| `build-command` | `build` | npm/yarn script for building |
| `test-command` | `test` | npm/yarn script for testing |
| `lint-command` | `lint` | npm/yarn script for linting |
| `enable-qlty` | `false` | Enable Qlty coverage upload |

### Workflow Capabilities

- **Automatic Version Management** - Based on git tags (releases, PRs, branches)
- **Cross-Platform Builds** - Windows, Linux, macOS (amd64 & arm64)
- **VSIX Packaging** - Platform-specific packages (win32, linux, darwin)
- **Test Automation** - Unit tests, E2E tests, coverage reporting
- **Security Hardening** - Step Security runner protection
- **Artifact Management** - Build outputs, coverage, packages

See [WORKFLOWS.md](.github/WORKFLOWS.md) for detailed documentation.

## 📦 Self-Test Infrastructure

The self-test infrastructure includes:

### Scripts

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest --coverage",
    "lint": "echo \"✅ Lint check completed!\"",
    "package": "npm run build && vsce package",
    "tpip:update": "tsx scripts/update-tpip docs/third-party-licenses.json",
    "tpip": "tsx scripts/tpip-reporter.ts"
  }
}
```

### Test Extension Configuration

```json
{
  "name": "ts-basic-app",
  "engines": {
    "vscode": "^1.63.0",
    "node": "^20.18.0"
  }
}
```

### TPIP License Compliance

The self-test infrastructure includes TPIP (Third-Party Intellectual Property) license tracking for demonstration purposes:

- `scripts/update-tpip.ts` - License tracking updater
- `scripts/tpip-reporter.ts` - Report generator
- `docs/third-party-licenses.json` - License database

## 🤝 Contributing

Contributions are welcome! This repository serves dual purposes:

1. **Workflow Improvements**: Enhance the reusable `build-and-verify.yml` workflow
2. **Testing Infrastructure**: Improve the self-test setup to validate workflow features

## 📄 License

This project is licensed under the MIT License.

## 🔗 Resources

- [Workflow Documentation](.github/WORKFLOWS.md) - Complete workflow usage guide
- [GitHub Actions Reusable Workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [VS Code Extension API](https://code.visualstudio.com/api)
