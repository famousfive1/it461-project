// ESM
import { faker } from '@faker-js/faker';


console.log(
    faker.helpers.fake(
      'Hello {{person.prefix}} {{person.lastName}}, how are you today?'
    )
  );

  // Define a function to generate random user data
function generateRandomUserData(): {
    username: string;
    password: string;
    review: number;
    alpha: number;
  } {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const review = faker.number.int({ min: 1, max: 5 }); // Assuming a review score between 1 and 5
    const alpha = getRandomInt(review);

    return { username, password, review, alpha };
  }
  

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)+1;
  }



  // Generate and print random user data
  const randomUserData = generateRandomUserData();
  console.log('Random User Data:', randomUserData);

  var alpha = faker.helpers.multiple(generateRandomUserData, {
    count: 5,
  });
  
  console.log(alpha)