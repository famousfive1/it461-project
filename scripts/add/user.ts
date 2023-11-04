import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
import { PrismaClient as PClient2 } from "../../prisma/generated/client2";
import { PrismaClient as PClient3 } from "../../prisma/generated/client3";
import { PrismaClient as PClient4 } from "../../prisma/generated/client4";

import { alpha as data } from "../../util/random";

const prisma = [new PClient1(), new PClient2(), new PClient3(), new PClient4()];

async function main() {
    await Promise.all(prisma.map(
        (c, i) => c.user.createMany({ data: data.slice(25*i, 25*i + 25) })
    ));
    console.log("Added");
};

main()
    .then(async () => {
        await Promise.all(prisma.map( c => c.$disconnect()));
    })
    .catch(async (e) => {
        console.error(e)
        await Promise.all(prisma.map( c => c.$disconnect()));
        process.exit(1)
    });
