import { PrismaClient as PClient4 } from "../../prisma/generated/client4";
import { PrismaClient as PClient5 } from "../../prisma/generated/client5";

async function main() {
  const prisma4 = new PClient4();
  const result = await prisma4.review.findMany({
    where: {
      game_id: 1,
    },
    select: {
      id: true,
      review: true,
      game_id: true,
    },
  });

  // console.log(result);

  console.log("\nTime: ");
  let data = (await prisma4.$metrics.json()).histograms;
  console.log(data[0].value.sum + " ms");
  console.log(data[2].value.sum + " ms");

  await prisma4.$disconnect();

  const prisma5 = new PClient5();
  await prisma5.review.findMany({
    where: {
      game_id: 1,
    },
    select: {
      id: true,
      review: true,
      game_id: true,
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
