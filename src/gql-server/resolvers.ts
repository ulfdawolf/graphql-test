import { SessionAPI, SessionParamsType } from "../data-sources/session-api";
import { SpeakerAPI, SpeakerParamsType } from "../data-sources/speaker-api";

export type GQLServerContextType = {
  token?: string | string[];
  dataSources: {
    sessionAPI: SessionAPI;
    speakerAPI: SpeakerAPI;
  };
};

// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  Query: {
    sessions: (
      _: undefined,
      params: SessionParamsType,
      ctx: GQLServerContextType,
    ) => {
      return ctx.dataSources.sessionAPI.getSessions(params);
    },
    sessionById: (
      _: undefined,
      params: SessionParamsType,
      ctx: GQLServerContextType,
    ) => {
      return ctx.dataSources.sessionAPI.getSessionById(params.id);
    },
    speakers: (
      _: undefined,
      params: SpeakerParamsType,
      ctx: GQLServerContextType,
    ) => {
      return ctx.dataSources.speakerAPI.getSpeakers();
    },
    speakerById: (
      _: undefined,
      params: SpeakerParamsType,
      ctx: GQLServerContextType,
    ) => {
      return ctx.dataSources.speakerAPI.getSpeakerById(params.id);
    },
  },
};
