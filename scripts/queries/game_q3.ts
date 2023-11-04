import { PrismaClient as PClient1 } from "../../prisma/generated/client1";

const prisma1 = new PClient1();

async function main() {
  const game_price = await prisma1.game.findMany({
    where: {
      price: {
        lt: 15,
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  console.log(game_price);

  console.log("\nTime: ");
  let data = (await prisma1.$metrics.json()).histograms;
  console.log(data[0].value.sum + " ms");
  console.log(data[2].value.sum + " ms");
}

main()
  .then(async () => {
    await prisma1.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma1.$disconnect();

    process.exit(1);
  });
