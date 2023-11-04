import { PrismaClient as PClient2 } from "../../prisma/generated/client2";
import { PrismaClient as PClient1 } from "../../prisma/generated/client1";

const prisma1 = new PClient1();
const prisma2 = new PClient2();

async function main() {
  const game_name = await prisma1.game.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const game_dev = await prisma2.game.findMany({
    where: {
      developer: {
        contains: "BANDAI NAMCO",
      },
    },
    select: {
      id: true,
      developer: true,
    },
  });

  // console.log(game_name);
  // console.log(game_dev);

  var games = []
  for(let i = 0; i < game_dev.length ; i++){
    const foundObject = game_name.find((obj) => obj.id === game_dev.at(i)?.id);
    games.push(foundObject);
  }
  
  console.log(games);
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
