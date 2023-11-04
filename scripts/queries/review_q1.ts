import { PrismaClient as PClient4 } from "../../prisma/generated/client4";

const prisma4 = new PClient4();
async function main() {
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

  console.log(result);

  console.log("\nTime: ");
  let data = (await prisma4.$metrics.json()).histograms;
  console.log(data[0].value.sum + " ms");
  console.log(data[2].value.sum + " ms");
}

main()
  .then(async () => {
    await prisma4.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma4.$disconnect();
    process.exit(1);
  });
