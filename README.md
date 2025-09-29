# ts-basic-app

A minimal TypeScript starter that builds to `dist/` and runs with Node.js.
Works with **npm** or **yarn**.

## Quickstart

```bash
# with npm
npm install
npm run build
npm start

# or with yarn
yarn install
yarn build
yarn start
```

## Dev mode (auto-reload)

```bash
# npm
npm run dev

# yarn
yarn dev
```

## Project structure

```
.
├── src/
│   └── index.ts
├── dist/          # emitted after build
├── package.json
└── tsconfig.json
```

## Notes

- `--frozen-lockfile` can be used in CI to enforce reproducible installs.
- `--ignore-scripts` and `--prefer-offline` are optional hardening/speed flags if your build doesn't rely on install scripts.
