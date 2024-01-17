import { GQLServerContextType } from "../data-sources/types";
import { SessionDataType } from "../data-sources/session-api";
import { SpeakerParamsType } from "../data-sources/speaker-api";

export const Session = {
  speakers: async (
    session: SessionDataType,
    _: SpeakerParamsType,
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
};
