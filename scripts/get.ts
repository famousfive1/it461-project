import { PrismaClient } from '../prisma/generated/client1'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  console.log(users)
  const metrics = await prisma.$metrics.json()
  for(let i of metrics.histograms) {
    console.log(i.key, i.value.sum)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
