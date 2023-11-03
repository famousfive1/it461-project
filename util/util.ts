import shell from "shelljs";

const n_nodes = 2;
const op = process.argv[2];

for(let i = 1; i <= n_nodes; i++) {
    shell.exec(`prisma ${op} --schema prisma/schema${i}.prisma`);
}
