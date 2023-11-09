import { PrismaClient as PClient2 } from "../../prisma/generated/client2";
import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
import { PrismaClient as PClient5 } from "../../prisma/generated/client5";


async function main() {
  const prisma1 = new PClient1();
  const prisma2 = new PClient2();
  const [game_name, game_gen] = await Promise.all([
    prisma1.game.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
    prisma2.game.findMany({
      where: {
        genre: {
          contains: "Strategy",
        },
      },
      select: {
        id: true,
        genre: true,
      },
    }),
  ]);

  let hash: any = {};
  for (let i of game_name) hash[i.id] = i.name;
  let games = [];
  for (let i of game_gen) {
    if (hash[i.id]) {
      games.push({ id: i.id, name: hash[i.id] });
    }
  }

  // console.log(games);

  console.log("\nTime: ");
  let data = (await prisma1.$metrics.json()).histograms;
  console.log(data[0].value.sum + " ms");
  console.log(data[2].value.sum + " ms");
  console.log("----------------");
  let data2 = (await prisma2.$metrics.json()).histograms;
  console.log(data2[0].value.sum + " ms");
  console.log(data2[2].value.sum + " ms");

  await prisma1.$disconnect();
  await prisma2.$disconnect();

  const prisma5 = new PClient5();

  await prisma5.game.findMany({
      where: {
        genre: {
          contains: "Strategy",
        },
      },

    select: {
      id: true,
      name: true,
      developer: true,
    }
  })


  console.log("\n Centra Time: ");
  let data5 = (await prisma5.$metrics.json()).histograms;
  console.log(data5[0].value.sum + " ms");
  console.log(data5[2].value.sum + " ms");

  await prisma5.$disconnect();
}

main()
  .then(async () => {
  })
  .catch(async (e) => {
    console.error(e);

    process.exit(1);
  });
