import { spawn } from 'child_process';

const route = process.argv[2] || '/';
const env = process.env.ENV || 'qa';

console.log(`\nStarting Playwright Codegen`);
console.log(`ENV: ${env}`);
console.log(`Route: ${route}\n`);

spawn(
  'npx',
  ['playwright', 'codegen', route],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      ENV: env
    }
  }
);