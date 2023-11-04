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

  console.log("\nTime: ");
  let data = (await prisma.$metrics.json()).histograms;
  console.log(data[0].value.sum + " ms");
  console.log(data[2].value.sum + " ms");
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
