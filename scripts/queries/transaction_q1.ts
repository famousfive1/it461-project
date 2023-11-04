
import { PrismaClient as PClient } from "../../prisma/generated/client4";

const prisma = new PClient();

async function main() {
  const trans = await prisma.transaction.findMany({
    where: {
        amount: {
            gt: 15
        }
    }
  });

  console.log(trans);

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();

    process.exit(1);
  });
