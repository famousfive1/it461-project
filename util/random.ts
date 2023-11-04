import { faker } from '@faker-js/faker';

function generateRandomUserData(i: number): {
    id: number;
    username: string;
    password: string;
} {
    const id = i;
    const username = faker.internet.userName();
    const password = faker.internet.password();

    return { id, username, password };
}

function generateRandomTransactions(i: number): {
    id: number;
    game_id: number;
    user_id: number;
    amount: number;
    status: string;
} {
    const id = i;
    const game_id = faker.number.int(99);
    const user_id = faker.number.int(99);
    const amount = faker.number.float({ min: 0, max: 100, precision: 0.01 });
    const status = "Success";
    return { id, game_id, user_id, amount, status };
}

function generateRandomReviews(i: number): {
    id: number;
    game_id: number;
    user_id: number;
    review: string;
    rating: number;
} {
    const id = i;
    const game_id = faker.number.int(99);
    const user_id = faker.number.int(99);
    const review = faker.lorem.paragraph({ min: 1, max: 4 });
    const rating = faker.number.float({ min: 1, max: 5, precision: 0.1 });
    return { id, game_id, user_id, review, rating };
}

const count = 5;
const iter = Array.apply(null, Array(count));
export const user = iter.map((_, i) => generateRandomUserData(i));
export const trans = iter.map((_, i) => generateRandomTransactions(i));
export const reviews = iter.map((_, i) => generateRandomReviews(i));

console.log(user, trans, reviews);

