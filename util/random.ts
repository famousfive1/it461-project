// ESM
import { faker } from '@faker-js/faker';




let i = 0
  // Define a function to generate random user data
function generateRandomUserData(): {
    id: number;
    username: string;
    password: string;
  } {

    const id = i;
    i++;

    const username = faker.internet.userName();
    const password = faker.internet.password();

    return { id, username, password };
  }
  



export const alpha = faker.helpers.multiple(generateRandomUserData, {
    count: 100,
  });

