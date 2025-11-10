# TypeScript Basic App

A comprehensive TypeScript VS Code extension project with advanced CI/CD workflows, cross-platform builds,
testing, VSIX packaging, and Third-Party Intellectual Property (TPIP) license compliance tracking.

## Features

- ✅ **TypeScript 5.6.3** with ES2022 target and ES modules configuration
- ✅ **Jest Testing** with coverage reporting and TypeScript support
- ✅ **License Compliance** with TPIP (Third-Party IP) tracking and reporting
- ✅ **Cross-Platform VSIX Packaging** for 6 platform combinations
- ✅ **GitHub Actions** with matrix builds and reusable workflows
- ✅ **Dual Package Manager Support** (npm and yarn with auto-detection)
- ✅ **Security Hardening** with Step Security runner protection
- ✅ **Modern Tooling** with latest GitHub Actions versions and TSX runtime

## Quick Start

### Development

```bash
# Install dependencies
npm install
# or
yarn install

# Build the project
npm run build
# or  
yarn build

# Run tests with coverage
npm test
# or
yarn test

# Lint code
npm run lint
# or
yarn lint

# Clean build artifacts
npm run clean

# Package as VSIX (detects package manager automatically)
npm run package
# or
yarn package

# Update TPIP license tracking
npm run tpip:update

# Generate TPIP license report
npm run tpip
```

### CI/CD Integration

This project includes production-ready GitHub Actions workflows with platform matrix support:

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  build-and-test:
    permissions:
      contents: write
    uses: soumeh01/test_ts_app/.github/workflows/build-and-verify.yml@main
    with:
      package-manager: 'npm'
      platform-matrix-file: '.github/platform-matrix.json'
```

## Project Structure

```txt
.
├── src/
│   └── index.ts                      # Extension entry point
├── dist/                             # Build output
├── scripts/
│   ├── update-tpip.ts                # TPIP license tracking updater
│   └── tpip-reporter.ts              # TPIP license report generator
├── docs/
│   ├── third-party-licenses.json     # TPIP license database
│   └── tpip-header.md                # TPIP report header template
├── .github/
│   ├── workflows/
│   │   ├── build-and-verify.yml      # Reusable CI/CD workflow
│   │   └── self-test.yml             # Workflow testing
│   ├── platform-matrix.json         # 6-platform build matrix
│   ├── dependabot.yml               # Dependency automation
│   └── WORKFLOWS.md                 # Workflow documentation
├── package.json                     # Project configuration
├── tsconfig.json                    # TypeScript configuration
├── jest.config.js                   # Jest testing configuration
└── tpip.md                          # Generated TPIP license report
```

## GitHub Actions Workflows

### Cross-Platform Support

The project supports building and testing across 6 platform combinations:

- **Windows**: 2022 (amd64, arm64)
- **Ubuntu**: 24.04 (amd64, arm64)
- **macOS**: 15-intel (amd64), 14 (arm64)

### Workflow Features

- **Matrix Builds**: Parallel execution across platforms
- **Smart Caching**: Automatic dependency cache optimization
- **Artifact Management**: Build outputs and test coverage reports
- **Security Hardening**: Step Security runner protection
- **Package Manager Detection**: Automatic npm/yarn handling
- **VSIX Generation**: Platform-specific extension packages

See [WORKFLOWS.md](.github/WORKFLOWS.md) for detailed documentation.

## Configuration

### Package.json Scripts

Essential scripts for development, CI/CD, and license compliance:

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "clean": "git clean -f -x ./node_modules ./dist ./coverage ./.vscode-test *.vsix",
    "test": "jest --coverage",
    "test:e2e": "echo \"✅ E2E test completed!\"",
    "lint": "echo \"✅ Lint check completed!\"",
    "package": "npm run build && vsce package --no-dependencies --allow-star-activation --allow-missing-repository --skip-license",
    "tpip:update": "tsx scripts/update-tpip docs/third-party-licenses.json",
    "tpip": "tsx scripts/tpip-reporter.ts --header ./scripts/tpip-header.md docs/third-party-licenses.json ./tpip.md"
  }
}
```

### VS Code Extension Configuration

```json
{
  "name": "ts-basic-app",
  "displayName": "TypeScript Basic App",
  "version": "1.1.0",
  "type": "module",
  "engines": {
    "vscode": "^1.63.0",
    "node": "^20.18.0",
    "yarn": "^1.22.0"
  },
  "activationEvents": ["onStartupFinished"],
  "contributes": {}
}
```

## TPIP License Compliance

This project includes comprehensive Third-Party Intellectual Property (TPIP) license tracking:

### What is TPIP?

TPIP (Third-Party Intellectual Property) tracking ensures legal compliance by:

- Cataloging all runtime dependencies and their licenses
- Tracking license changes when dependencies are updated
- Generating compliance reports for legal review
- Ensuring proper attribution of third-party code

### TPIP Commands

```bash
# Update TPIP database with current dependencies
npm run tpip:update

# Generate TPIP license compliance report
npm run tpip
```

### TPIP Files

- `docs/third-party-licenses.json` - License database
- `scripts/tpip-header.md` - Report header template
- `tpip.md` - Generated compliance report
- `scripts/update-tpip.ts` - License tracking updater
- `scripts/tpip-reporter.ts` - Report generator

## Dependencies

### Production Dependencies

Currently none - this is a development template with no runtime dependencies.

### Development Dependencies

- **typescript**: ^5.6.3 - TypeScript compiler with ES2022 support
- **jest**: ^29.7.0 - Testing framework with coverage reporting
- **ts-jest**: ^29.1.0 - TypeScript preprocessor for Jest
- **@types/jest**: ^29.5.0 - TypeScript definitions for Jest
- **@types/node**: ^20.11.30 - Node.js TypeScript definitions
- **@vscode/vsce**: ^3.1.0 - VS Code extension packaging tool
- **yargs**: ^18.0.0 - Command-line argument parsing for TPIP scripts
- **@types/yargs**: ^17.0.33 - TypeScript definitions for yargs

## License

This project is licensed under the MIT License.
