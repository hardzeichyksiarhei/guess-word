import * as dotenv from 'dotenv';

dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// author
const AUTHOR: string = process.env.AUTHOR || 'hardz';

// application
const PORT: number = parseInt(process.env.PORT, 10) || 5000;

// database
const MONGO_CONNECTION_STRING: string =
  process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/guess-game';

console.log(process.env.NODE_ENV);
console.log(PORT);
console.log(MONGO_CONNECTION_STRING);

export { NODE_ENV, AUTHOR, PORT, MONGO_CONNECTION_STRING };
