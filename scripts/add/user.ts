import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
import { PrismaClient as PClient2 } from "../../prisma/generated/client2";
import { PrismaClient as PClient3 } from "../../prisma/generated/client3";
import { PrismaClient as PClient4 } from "../../prisma/generated/client4";

import { alpha as data } from "../../util/random";

const prisma1 = new PClient1();
const prisma2 = new PClient2();
const prisma3 = new PClient3();
const prisma4 = new PClient4();

async function main() {
    await Promise.all([
        prisma1.user.createMany({ data: data.slice(0, 25)   }),
        prisma2.user.createMany({ data: data.slice(25, 50)  }),
        prisma3.user.createMany({ data: data.slice(50, 75)  }),
        prisma4.user.createMany({ data: data.slice(75, 100) })
    ]);
    console.log("Added");
};

main()
    .then(async () => {
        await Promise.all([
            prisma1.$disconnect(),
            prisma2.$disconnect(),
            prisma3.$disconnect(),
            prisma4.$disconnect(),
        ]);
    })
    .catch(async (e) => {
        console.error(e)
        await Promise.all([
            prisma1.$disconnect(),
            prisma2.$disconnect(),
            prisma3.$disconnect(),
            prisma4.$disconnect(),
        ]);
        process.exit(1)
    });
