import { PrismaClient as PClient1 } from "../../prisma/generated/client1";
import { PrismaClient as PClient2 } from "../../prisma/generated/client2";
import { PrismaClient as PClient5 } from "../../prisma/generated/client5";

import { games } from "../../util/random";

const p1 = new PClient1();
const p2 = new PClient2();
const p5 = new PClient5();

async function main() {
    const f1 = games.map(i => ({
        id: i.id,
        name: i.name,
        release: new Date(i.release_date).toISOString(),
        price: i.price
    }));
    const f2 = games.map(i => ({
        id: i.id,
        developer: i.developer,
        genre: i.genre
    }));
    const all = games.map(i => ({
        id: i.id,
        name: i.name,
        release: new Date(i.release_date).toISOString(),
        price: i.price,
        developer: i.developer,
        genre: i.genre
    }));
    await Promise.all([
        p1.game.createMany({ data: f1 }),
        p2.game.createMany({ data: f2 }),
        p5.game.createMany({ data: all })
    ]);

    console.log("Added");
};

main()
    .then(async () => {
        await p1.$disconnect();
        await p2.$disconnect();
        await p5.$disconnect();

    })
    .catch(async (e) => {
        console.error(e)
        await p1.$disconnect();
        await p2.$disconnect();
        await p5.$disconnect();

        process.exit(1)
    });
