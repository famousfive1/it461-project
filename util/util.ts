import shell from "shelljs";

const n_nodes = 2;
let op = process.argv[2];
if(process.argv[3]) op += ' ' + process.argv[3];
if(process.argv[4]) op += ' ' + process.argv[4];

for(let i = 1; i <= n_nodes; i++) {
    shell.exec(`prisma ${op} --schema prisma/schema${i}.prisma`);
}
