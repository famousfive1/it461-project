import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
import { PrismaClient as PClient2 } from "../../prisma/generated/client2";
import { PrismaClient as PClient3 } from "../../prisma/generated/client3";
import { PrismaClient as PClient4 } from "../../prisma/generated/client4";
import { PrismaClient as PClient5 } from "../../prisma/generated/client5";


import { user } from "../../util/random";

const prisma = [new PClient1(), new PClient2(), new PClient3(), new PClient4()];
const prisma5 = new PClient5();

async function main() {
    await Promise.all(prisma.map(
        (c, i) => c.user.createMany({ data: user.slice(25*i, 25*i + 25) })
    ));
    prisma5.user.createMany({data: user})
    console.log("Added");
};

main()
    .then(async () => {
        await Promise.all(prisma.map( c => c.$disconnect()));
        await prisma5.$disconnect();
    })
    .catch(async (e) => {
        console.error(e)
        await Promise.all(prisma.map( c => c.$disconnect()));
        await prisma5.$disconnect();
        process.exit(1)
    });
