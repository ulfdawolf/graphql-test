import { SessionAPI, QueryParams } from "./session-api";

export type GQLServerContextType = {
  token?: string | string[];
  dataSources: {
    sessionAPI: SessionAPI;
  };
};

// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  Query: {
    sessions: (
      _: undefined,
      params: QueryParams,
      ctx: GQLServerContextType,
    ) => {
      return ctx.dataSources.sessionAPI.getSessions(params);
    },
    sessionById: (
      _: undefined,
      params: QueryParams,
      ctx: GQLServerContextType,
    ) => {
      return ctx.dataSources.sessionAPI.getSessionById(params.id);
    },
  },
};
