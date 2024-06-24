/*
============================================
============================================
            **** WARNING ****
  RUNNING THIS SCRIPT WILL DELETE AND\OR
  OVERWRITE YOUR BCARDS DATABASE !!!!!!!
============================================
============================================
*/

// 3rd party
const chalk = require('chalk');

// Mine
const connectDB = require('./config/db');
const { cards, users } = require('./data/data');
const Card = require('./models/Card');
const User = require('./models/User');
const Benchmark = require('./utils/benchmarking');



const seedCards = async () => {
  const insertedCards = await Card.insertMany(cards);
  console.log(chalk.blue(`\t- Inserted ${insertedCards.length} cards`));
};

const seedUsers = async () => {
  const insertedUsers = await User.insertMany(users);
  console.log(chalk.blue(`\t- Inserted ${insertedUsers.length} users`));
};

const clearDatabase = async () => {
  await Card.deleteMany();
  await User.deleteMany();
};


const seedAll = async () => {
  const startTime = Date.now();

  try {
    await Benchmark(clearDatabase, chalk.bold.yellow('\nClearing the database:'), "Reset");
    await Benchmark(seedCards, chalk.bold.yellow('\nSeeding Cards:'));
    await Benchmark(seedUsers, chalk.bold.yellow('\nSeeding Users:'));

    console.log(chalk.bold.underline.green('\nSeeding completed successfully\n'));
  } catch (e) {
    console.log(chalk.red('[x] Seeding error'));
    console.log(chalk.red(e.message));
    process.exit(1);
  }
};

connectDB().then(async () => {
  await Benchmark(seedAll, chalk.bold.bgGreenBright("\n ----------==========  SEEDING DATABASE  ==========----------"));
  process.exit(0);
});
