import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
// import { PrismaClient as PClient2 } from "../../prisma/generated/client2";

// const prisma2 = new PClient2()
const prisma1 = new PClient1()
async function main(){
    const result = await prisma1.game.findMany({
        where: {
           release : {
                gte: new Date(
                  '2020-03-19'
                ),
            },
        },
        select: {
            id: true,
            name: true,
            release: true,
        },
    })
    
console.log(result);
}

main()
  .then(async () => {
    await prisma1.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma1.$disconnect()
    process.exit(1)
  })
