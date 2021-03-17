import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/UserResolver";
import { AdminResolver } from "./resolvers/AdminResolver";

const startServer = async () => {
  await createConnection(); // 1
  const schema = await buildSchema({
    resolvers: [UserResolver, AdminResolver],
  });
  const app = Express(); //3
  const apolloServer = new ApolloServer({ schema }); //4
  apolloServer.applyMiddleware({ app }); // 5
  app.listen(4000, () => {
    console.log("server started");
  });
};
startServer();
