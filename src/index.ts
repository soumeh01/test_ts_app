/**
 * Basic TypeScript application entrypoint.
 * Build: `npm run build` or `yarn build`
 * Run:   `npm start`     or `yarn start`
 */

type GreetingOptions = {
  name?: string;
  excited?: boolean;
};

function greet({ name = "World", excited = true }: GreetingOptions = {}): string {
  const msg = `Hello, ${name}`;
  return excited ? msg + "!" : msg + ".";
}

// Read an optional name from env or argv
const fromEnv = process.env.NAME;
const fromArgv = process.argv[2];

const message = greet({
  name: fromArgv || fromEnv || undefined,
  excited: process.env.EXCITED !== "false",
});

// Structured logging example
console.log(JSON.stringify({ level: "info", message, timestamp: new Date().toISOString() }));

// Export for potential testing or reuse
export { greet };
