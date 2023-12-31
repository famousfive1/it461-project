import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
import { PrismaClient as PClient5 } from "../../prisma/generated/client5";

// const prisma2 = new PClient2()
async function main() {
const prisma1 = new PClient1();
  const result = await prisma1.game.findMany({
    where: {
      release: {
        gte: new Date("2003-03-19"),
      },
    },
    select: {
      id: true,
      name: true,
      release: true,
    },
  });

  // console.log(result);

  console.log("\nTime: ");
  let data = (await prisma1.$metrics.json()).histograms;
  console.log(data[0].value.sum + " ms");
  console.log(data[2].value.sum + " ms");
    await prisma1.$disconnect();


  const prisma5 = new PClient5();

  await prisma5.game.findMany({
    where: {
      release: {
        gte: new Date("2003-03-19"),
      },
    },
    select: {
      id: true,
      name: true,
      release: true,
    },
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
