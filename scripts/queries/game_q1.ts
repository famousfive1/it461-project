import { PrismaClient as PClient2 } from "../../prisma/generated/client2";
import { PrismaClient as PClient1 } from "../../prisma/generated/client1";

const prisma1 = new PClient1();
const prisma2 = new PClient2();

async function main() {
  const [game_name, game_dev] = await Promise.all([
    prisma1.game.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
    prisma2.game.findMany({
      where: {
        developer: {
          contains: "NAMCO",
        },
      },
      select: {
        id: true,
        developer: true,
      },
    })
  ])
  // const game_name = await prisma1.game.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //   },
  // });

  // const game_dev = await prisma2.game.findMany({
  //   where: {
  //     developer: {
  //       contains: "EA SPORTS",
  //     },
  //   },
  //   select: {
  //     id: true,
  //     developer: true,
  //   },
  // });

  // console.log(game_name);
  // console.log(game_dev);
  
  let hash : any = {};
  for(let i of game_name)
    hash[i.id] = i.name;
  let games = []
  for(let i of game_dev) {
    if(hash[i.id]) {
      games.push({ id: i.id, name: hash[i.id] });
    }
  }
  
  console.log(games);
  console.log("\nTime: ")
  let data = (await prisma1.$metrics.json()).histograms;
  console.log(data[0].value.sum + " ms")
  console.log(data[2].value.sum + " ms")
  console.log("----------------")
  let data2 = (await prisma2.$metrics.json()).histograms;
  console.log(data2[0].value.sum + " ms")
  console.log(data2[2].value.sum + " ms")

  // console.log(await prisma2.$metrics)

}

main()
  .then(async () => {
    await prisma1.$disconnect();
    await prisma2.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma1.$disconnect();
    await prisma2.$disconnect();

    process.exit(1);
  });
