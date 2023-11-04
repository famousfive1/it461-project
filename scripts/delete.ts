import { PrismaClient as PClient1 } from "../prisma/generated/client1";
import { PrismaClient as PClient2 } from "../prisma/generated/client2";
import { PrismaClient as PClient3 } from "../prisma/generated/client3";
import { PrismaClient as PClient4 } from "../prisma/generated/client4";

const p1 = new PClient1();
const p2 = new PClient2();
const p3 = new PClient3();
const p4 = new PClient4();

async function main() {
    await Promise.all([
        p1.user.deleteMany(),
        p1.game.deleteMany(),
        p2.user.deleteMany(),
        p2.game.deleteMany(),
        p3.user.deleteMany(),
        p3.review.deleteMany(),
        p3.transaction.deleteMany(),
        p4.user.deleteMany(),
        p4.review.deleteMany(),
        p4.transaction.deleteMany(),
    ]);
    console.log("Deleted");
};

main()
    .then(async () => {
        await Promise.all([
            p1.$disconnect,
            p2.$disconnect,
            p2.$disconnect,
            p2.$disconnect,
        ]);
    })
    .catch(async (e) => {
        console.error(e)
        await Promise.all([
            p1.$disconnect,
            p2.$disconnect,
            p2.$disconnect,
            p2.$disconnect,
        ]);
        process.exit(1)
    });
