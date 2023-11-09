import { PrismaClient as PClient } from "../../prisma/generated/client4";
import { PrismaClient as PClient5 } from "../../prisma/generated/client5";

async function main() {
  const prisma = new PClient();

  const trans = await prisma.transaction.findMany({
    where: {
      amount: {
        gt: 15,
      },
    },
  });

  // console.log(trans);

  console.log("\nTime: ");
  let data = (await prisma.$metrics.json()).histograms;
  console.log(data[0].value.sum + " ms");
  console.log(data[2].value.sum + " ms");
  await prisma.$disconnect();


  const prisma5 = new PClient5();

  await prisma5.transaction.findMany({
    where: {
      amount: {
        gt: 15,
      },
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
