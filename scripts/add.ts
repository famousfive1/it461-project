import { PrismaClient as PClient1 } from "../prisma/generated/client1";
import { PrismaClient as PClient2 } from "../prisma/generated/client2";

const prisma1 = new PClient1();
const prisma2 = new PClient2();

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'charlie@prisma.io',
        },
    })
    console.log(user)
};

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });
