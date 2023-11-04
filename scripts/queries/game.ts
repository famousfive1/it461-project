import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
import { PrismaClient as PClient2 } from "../../prisma/generated/client2";

const prisma2 = new PClient2()
const prisma1 = new PClient1()
async function main(){
    const result = await prisma2.game.findMany({
        where: {
            developer : {
                contains: 'Electronic Arts',
            },
        },
        select: {
            id: true,
            developer: true,
        },
    })
    
console.log(result);
}

main()
  .then(async () => {
    await prisma2.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma2.$disconnect()
    process.exit(1)
  })
