import { GQLServerContextType } from "../data-sources/types";
import { SessionParamsType } from "../data-sources/session-api";
import { SpeakerParamsType } from "../data-sources/speaker-api";

export const Query = {
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
    __: SpeakerParamsType,
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
};
