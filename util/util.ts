import { execSync } from "child_process";

const n_nodes = 4;
let op = process.argv[2];

for(let i = 1; i <= n_nodes; i++) {
    console.log("---------------");
    execSync(`prisma ${op} --schema prisma/schema${i}.prisma`, {stdio: 'inherit'});
}
