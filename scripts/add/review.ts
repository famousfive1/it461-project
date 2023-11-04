import { PrismaClient as PClient3 } from "../../prisma/generated/client3";
import { PrismaClient as PClient4 } from "../../prisma/generated/client4";
import { PrismaClient as PClient5 } from "../../prisma/generated/client5";

import { reviews } from "../../util/random";

const p3 = new PClient3();
const p4 = new PClient4();
const p5 = new PClient5();

async function main() {
    const f1 = reviews.map(i => ({
        id: i.id,
        user_id: i.user_id,
        rating: i.rating
    }));
    const f2 = reviews.map(i => ({
        id: i.id,
        game_id: i.game_id,
        review: i.review
    }));
    await Promise.all([
        p3.review.createMany({ data: f1 }),
        p4.review.createMany({ data: f2 }),
        p5.review.createMany({ data: reviews })

    ]);
    console.log("Added");
};

main()
    .then(async () => {
        await p3.$disconnect();
        await p4.$disconnect();
        await p5.$disconnect();

    })
    .catch(async (e) => {
        console.error(e)
        await p3.$disconnect();
        await p4.$disconnect();
        await p5.$disconnect();

        process.exit(1)
    });
