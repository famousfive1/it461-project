import { PrismaClient as PClient } from "../../prisma/generated/client3";

const prisma = new PClient();

async function main() {
  const trans = await prisma.transaction.groupBy({
    by: ["game_id"],

    _count: {
      game_id: true,
    },

    orderBy: {
      _count: {
        game_id: "desc",
      },
    },

    take: 1,
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
