import { PrismaClient as PClient1 } from "../prisma/generated/client1";

const prisma = new PClient1();

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
