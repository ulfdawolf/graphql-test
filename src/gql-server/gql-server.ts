import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { SessionAPI, QueryParams } from "./session-api";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Session" type defines the queryable fields for every session in our data source.
  type Session {
    id: ID!
    title: String!
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String @deprecated(reason: "Too many sessions in single track")
    level: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    sessions(
      id: ID
      title: String
      description: String
      startsAt: String
      endsAt: String
      room: String
      day: String
      format: String
      track: String
      level: String  
    ): [Session]
    sessionById(id:ID): Session
  }
`;

type GQLServerContext = {
  token?: string | string[];
  dataSources: {
    sessionAPI: SessionAPI;
  };
};

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  Query: {
    sessions: (_: undefined, params: QueryParams, ctx: GQLServerContext) => {
      return ctx.dataSources.sessionAPI.getSessions(params);
    },
    sessionById: (_: undefined, params: QueryParams, ctx: GQLServerContext) => {
      return ctx.dataSources.sessionAPI.getSessionById(params.id);
    },
  },
};

export const gqlServerStart = async () => {
  const server = new ApolloServer<GQLServerContext>({
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
        },
      };
    },
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
};
