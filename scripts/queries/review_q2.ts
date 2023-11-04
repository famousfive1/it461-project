import { PrismaClient as PClient4 } from "../../prisma/generated/client4";
import { PrismaClient as PClient3 } from "../../prisma/generated/client3";

const prisma3 = new PClient3();
const prisma4 = new PClient4();
async function main() {
  const [result, revs] = await Promise.all([
    prisma3.review.findMany({
      where: {
        rating: {
          gte: 3.5,
        },
      },
      select: {
        id: true,
        rating: true,
      },
    }),
    prisma4.review.findMany({
      select: {
        id: true,
        review: true,
      },
    }),
  ]);

  let hash: any = {};
  for (let i of revs) hash[i.id] = i.review;
  let res = [];
  for (let i of result) {
    if (hash[i.id]) {
      res.push({ id: i.id, review: hash[i.id] });
    }
  }

  console.log(res);

  console.log("\nTime: ");
  let data = (await prisma3.$metrics.json()).histograms;
  console.log(data[0].value.sum + " ms");
  console.log(data[2].value.sum + " ms");
  console.log("----------------");
  let data2 = (await prisma4.$metrics.json()).histograms;
  console.log(data2[0].value.sum + " ms");
  console.log(data2[2].value.sum + " ms");
}

main()
  .then(async () => {
    await prisma4.$disconnect();
    await prisma3.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma4.$disconnect();
    await prisma3.$disconnect();

    process.exit(1);
  });
