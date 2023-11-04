import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
import { PrismaClient as PClient2 } from "../../prisma/generated/client2";

import { games } from "../../util/random";

const p1 = new PClient1();
const p2 = new PClient2();

async function main() {
    const f1 = games.map(i => ({
        id: i.id,
        name: i.name,
        release: i.release_date,
        price: i.price
    }));
    const f2 = games.map(i => ({
        id: i.id,
        developer: i.developer,
        genre: i.genre
    }));
    p1.game.createMany({ data: f1 });
    p2.game.createMany({ data: f2 });
    console.log("Added");
};

main()
    .then(async () => {
        await p1.$disconnect();
        await p2.$disconnect();
    })
    .catch(async (e) => {
        console.error(e)
        await p1.$disconnect();
        await p2.$disconnect();
        process.exit(1)
    });
