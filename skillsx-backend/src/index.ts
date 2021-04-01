import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/UserResolver";
import { AdminResolver } from "./resolvers/AdminResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";

const startServer = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [UserResolver, AdminResolver, CategoryResolver],
  });
  const port = 4002;
  const app = Express();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });
  apolloServer.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
startServer();
