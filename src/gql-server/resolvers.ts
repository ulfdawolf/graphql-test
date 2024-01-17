import { resourceLimits } from "worker_threads";
import {
  SessionAPI,
  SessionDataType,
  SessionParamsType,
} from "../data-sources/session-api";
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
      args: SessionParamsType,
      ctx: GQLServerContextType,
    ) => {
      return ctx.dataSources.sessionAPI.getSessions(args);
    },
    sessionById: (
      _: undefined,
      args: SessionParamsType,
      ctx: GQLServerContextType,
    ) => {
      return ctx.dataSources.sessionAPI.getSessionById(args.id);
    },
    speakers: (
      _: undefined,
      args: SpeakerParamsType,
      ctx: GQLServerContextType,
    ) => {
      return ctx.dataSources.speakerAPI.getSpeakers();
    },
    speakerById: (
      _: undefined,
      args: SpeakerParamsType,
      ctx: GQLServerContextType,
    ) => {
      return ctx.dataSources.speakerAPI.getSpeakerById(args.id);
    },
  },
  Session: {
    speakers: async (
      session: SessionDataType,
      args: SpeakerParamsType,
      ctx: GQLServerContextType,
    ) => {
      const speakers = await ctx.dataSources.speakerAPI.getSpeakers();
      const result = speakers.filter((speaker) => {
        return (
          session.speakers.filter((s) => {
            return s.id === speaker.id;
          }).length > 0
        );
      });
      return result;
    },
  },
};
