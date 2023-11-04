import { PrismaClient as PClient4 } from "../../prisma/generated/client4";
import { PrismaClient as PClient3 } from "../../prisma/generated/client3";

const prisma3 = new PClient3()
const prisma4 = new PClient4()
async function main(){
    const result = await prisma3.review.findMany({
        where: {
           rating : {
            gte: 3.5,
           },
        },
        select: {
            id: true,
            rating: true,
        },
    })
// console.log(result);

    const revs = await prisma4.review.findMany({
        select: {
            id: true,
            review: true,
        },
    })
    // console.log(revs);

    var res = []
  for(let i = 0; i < result.length ; i++){
    const foundObject = revs.find((obj) => obj.id === result.at(i)?.id);
    res.push(foundObject);
}

console.log(res);
}

main()
  .then(async () => {
    await prisma4.$disconnect()
    await prisma3.$disconnect()

  })
  .catch(async (e) => {
    console.error(e)
    await prisma4.$disconnect()
    await prisma3.$disconnect()

    process.exit(1)
  })