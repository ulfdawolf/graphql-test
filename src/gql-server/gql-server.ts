import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { SessionAPI } from "../data-sources/session-api";
import { SpeakerAPI } from "../data-sources/speaker-api";
import { GQLServerContextType, resolvers } from "./resolvers";
import { readFileSync } from "fs";

const typeDefs = readFileSync("./src/gql-server/schema.graphql", {
  encoding: "utf-8",
});

export const gqlServerStart = async () => {
  const server = new ApolloServer<GQLServerContextType>({
    typeDefs,
    resolvers,
  });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      return {
        token: req.headers.token,
        dataSources: {
          sessionAPI: new SessionAPI(),
          speakerAPI: new SpeakerAPI(),
        },
      };
    },
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
};
