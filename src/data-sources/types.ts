import { SessionAPI } from "../data-sources/session-api";
import { SpeakerAPI } from "../data-sources/speaker-api";

export type GQLServerContextType = {
  token?: string | string[];
  dataSources: {
    sessionAPI: SessionAPI;
    speakerAPI: SpeakerAPI;
  };
};
