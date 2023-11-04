import { PrismaClient as PClient3 } from "../../prisma/generated/client3";
import { PrismaClient as PClient4 } from "../../prisma/generated/client4";

import { reviews } from "../../util/random";

const p3 = new PClient3();
const p4 = new PClient4();

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
    p3.review.createMany({ data: f1 });
    p4.review.createMany({ data: f2 });
    console.log("Added");
};

main()
    .then(async () => {
        await p3.$disconnect();
        await p4.$disconnect();
    })
    .catch(async (e) => {
        console.error(e)
        await p3.$disconnect();
        await p4.$disconnect();
        process.exit(1)
    });
