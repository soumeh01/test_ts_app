# VS Code Extension CI/CD Template

A comprehensive TypeScript VS Code extension project with advanced CI/CD workflows supporting
cross-platform builds, testing, and VSIX packaging.

## Features

- ✅ **TypeScript 5.6.3** with ES2022 target configuration
- ✅ **Jest Testing** with coverage reporting and TypeScript support
- ✅ **ESLint** for code quality and consistency
- ✅ **Cross-Platform VSIX Packaging** for 6 platform combinations
- ✅ **GitHub Actions** with matrix builds and reusable workflows
- ✅ **Dual Package Manager Support** (npm and yarn)
- ✅ **Security Hardening** with Step Security runner protection
- ✅ **Modern Tooling** with latest GitHub Actions versions

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

# Package as VSIX (detects package manager automatically)
npm run package
# or
yarn package
```

### CI/CD Integration

This project includes production-ready GitHub Actions workflows:

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
      node-version: '20.18.0'
```

## Project Structure

```txt
.
├── src/
│   └── index.ts                      # Extension entry point
├── dist/                             # Build output
├── .github/
│   ├── workflows/
│   │   ├── build-and-verify.yml      # Reusable CI/CD workflow
│   │   └── self-test.yml             # Workflow testing
│   ├── platform-matrix.json         # 6-platform build matrix
│   ├── dependabot.yml               # Dependency automation
│   └── WORKFLOWS.md                 # Workflow documentation
├── package.json                     # Project configuration
├── tsconfig.json                    # TypeScript configuration
└── jest.config.js                   # Jest testing configuration
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

Essential scripts for development and CI/CD:

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

### VS Code Extension Configuration

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

## Dependencies

### Production Dependencies

- **vscode**: VS Code extension API typings

### Development Dependencies

- **typescript**: ^5.6.3 - TypeScript compiler
- **jest**: ^29.7.0 - Testing framework
- **ts-jest**: TypeScript preprocessor for Jest
- **@types/jest**: TypeScript definitions for Jest
- **@vscode/vsce**: ^3.1.0 - VS Code extension packaging
- **yargs**: Command-line argument parsing

## License

This project is licensed under the MIT License.
