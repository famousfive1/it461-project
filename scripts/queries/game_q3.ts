import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
import { PrismaClient as PClient5 } from "../../prisma/generated/client5";

let prisma1 = new PClient1();
let prisma5 = new PClient5();

async function main() {
  prisma1 = new PClient1();
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

  console.log("\nTime for distributed: ");
  let data = (await prisma1.$metrics.json()).histograms;
  console.log(data[0].value.sum + " ms");
  console.log(data[2].value.sum + " ms");

  console.log("\n Time for centralised : ")
  prisma5 = new PClient5();
  const game_seq = await prisma5.game.findMany({
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

  // console.log(game_seq);

  let data5 = (await prisma5.$metrics.json()).histograms;
  console.log(data5[0].value.sum + " ms");
  console.log(data5[2].value.sum + " ms");


}

main()
  .then(async () => {
    await prisma1.$disconnect();
    await prisma5.$disconnect();


  })
  .catch(async (e) => {
    console.error(e);
    await prisma1.$disconnect();
    await prisma5.$disconnect();


    process.exit(1);
  });
