import { spawnSync } from "child_process";
import { join } from "path";

spawnSync('npx', ['ts-node', join(__dirname, "add", "user.ts")], { stdio: 'inherit' });
console.log("Added Users");
spawnSync('npx', ['ts-node', join(__dirname, "add", "game.ts")], { stdio: 'inherit' });
console.log("Added Games");
spawnSync('npx', ['ts-node', join(__dirname, "add", "review.ts")], { stdio: 'inherit' });
console.log("Added Reviews");
spawnSync('npx', ['ts-node', join(__dirname, "add", "trans.ts")], { stdio: 'inherit' });
console.log("Added Transactions");
