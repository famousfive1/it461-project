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

  const game_gen = await prisma2.game.findMany({
    where: {
      genre: {
        contains: "Strategy",
      },
    },
    select: {
      id: true,
      genre: true,
    },
  });

//   console.log(game_name);
//   console.log(game_gen);

  var games = []
  for(let i = 0; i < game_gen.length ; i++){
    const foundObject = game_name.find((obj) => obj.id === game_gen.at(i)?.id);
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
