import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
import { PrismaClient as PClient2 } from "../../prisma/generated/client2";
import { PrismaClient as PClient3 } from "../../prisma/generated/client3";
import { PrismaClient as PClient4 } from "../../prisma/generated/client4";
import { PrismaClient as PClient5 } from "../../prisma/generated/client5";

let prisma = [];
let prisma5: PClient5;

async function main() {
  prisma5 = new PClient5();

  const user_ids = await prisma5.transaction.findMany({
    where: {
      game_id: {
        equals: 10,
      },
    },

    select: {
      user_id: true,
    },
  });

  let ids = [];
  for (let i of user_ids) {
    ids.push(i.user_id);
  }

  prisma5.$disconnect();
  let query = {
    where: {
      id: {
        in: ids,
      },
    },
  };

  prisma5 = new PClient5();
  for (let a = 0; a < 30; a++) {
    const names = await prisma5.user.findMany(query);
  }

  console.log("\nCentralized Time : ");
  let data = (await prisma5.$metrics.json()).histograms;
  console.log(data[0].value.sum + " ms");
  console.log(data[2].value.sum + " ms");


  prisma = [new PClient1(), new PClient2(), new PClient3(), new PClient4()];
  for (let a = 0; a < 30; a++) {

    await Promise.all([
        prisma[0].user.findMany(query),
        prisma[1].user.findMany(query),
        prisma[2].user.findMany(query),
        prisma[3].user.findMany(query),
    ])
  }

  console.log("\nDistributed Time : ");
  let data2 = (await prisma[0].$metrics.json()).histograms;
  console.log(data2[0].value.sum + " ms");
  console.log(data2[2].value.sum + " ms");

  await prisma[0].$disconnect();
  await prisma[1].$disconnect();
  await prisma[2].$disconnect();
  await prisma[3].$disconnect();


}

main()
  .then(async () => {
    await prisma5.$disconnect();


  })
  .catch(async (e) => {
    console.error(e);
    await prisma5.$disconnect();

    process.exit(1);
  });
