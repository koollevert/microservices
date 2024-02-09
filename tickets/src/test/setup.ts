import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Extend the NodeJS global object with the signin function
declare global {
  namespace NodeJS {
    interface Global {
      signin: () => string[];
    }
  }
}

let mongo: MongoMemoryServer;

// Explicitly declare the type of global
declare const global: NodeJS.Global & { signin: () => string[] };

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  mongo = new MongoMemoryServer();
  await mongo.start(); // Ensure server is started
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);

});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
}, 70000);

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (): string[] => {
  //Build a JWT payload. {id, email}
  const payload={
    id: 'gdggffdj1e',
    email: 'test@test.com'
  };
  //Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //Build session Object, {jwt:MY_JWT}
  const session={jwt:token};
  //Turn that session into JSON
  const sessionJSON=JSON.stringify(session);
  //Take JSON and encode it as base64
  const base64=Buffer.from(sessionJSON).toString('base64');
  //return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];

};
