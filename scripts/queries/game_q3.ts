import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
import { PrismaClient as PClient5 } from "../../prisma/generated/client5";

let prisma1 : PClient1;
let prisma5 : PClient5;

async function main() {

  prisma5 = new PClient5();
  for (let i = 0; i < 30; i++) {
    await prisma5.game.findMany({
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
  }

  // console.log(game_seq);

  console.log("\n Time for centralised : ")
  let data5 = (await prisma5.$metrics.json()).histograms;
  console.log(data5[0].value.sum + " ms");
  console.log(data5[2].value.sum + " ms");

  prisma1 = new PClient1();
  for(let i = 0; i < 30; i++) {
    await prisma1.game.findMany({
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
  }
  
  let data = (await prisma1.$metrics.json()).histograms;
  // console.log(game_price);

  console.log("\nTime for distributed: ");
  console.log(data[0].value.sum + " ms");
  console.log(data[2].value.sum + " ms");

 
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
