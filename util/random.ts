import { faker } from '@faker-js/faker';
import { join } from 'path';
import fs from 'fs';
import { parse } from 'csv/sync';

const content = fs.readFileSync(join(__dirname, 'final_data.csv'));
const records = parse(content, {
    columns: true,
    skip_empty_lines: true
});
const count = 10000;
// const mod = 100;
const mod = records.length;

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
    const game_id = faker.number.int(count-1);
    const user_id = faker.number.int(count-1);
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
    const game_id = faker.number.int(count-1);
    const user_id = faker.number.int(count-1);
    const review = faker.lorem.paragraph({ min: 1, max: 4 });
    const rating = faker.number.float({ min: 1, max: 5, precision: 0.1 });
    return { id, game_id, user_id, review, rating };
}

function generateGames(i: number): {
    id: number;
    name: string;
    release_date: string;
    developer: string;
    genre: string;
    price: number
} {
    const id = i;
    const name = records[i % mod].name;
    const parts = records[i % mod].release_date.split('-');
    const release_date = parts.reverse().join('-');
    const developer = records[i % mod].developer;
    const genre = records[i % mod].genre;
    const price = Number.parseFloat( records[i % mod].original_price.replace('$', '') );
    return { id, name, release_date, developer, genre, price };
}

const iter = Array.apply(null, Array(count));
export const user = iter.map((_, i) => generateRandomUserData(i));
export const trans = iter.map((_, i) => generateRandomTransactions(i));
export const reviews = iter.map((_, i) => generateRandomReviews(i));
export const games = iter.map((_, i) => generateGames(i));

