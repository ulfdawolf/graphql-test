import { RESTDataSource } from "@apollo/datasource-rest";
import { SessionDataType } from "./session-api";

export type Speaker = {
  id: string;
  bio: string;
  name: string;
  sessions: [SessionDataType];
};

export type SpeakerParamsType = {
  id?: string;
};

export class SpeakerAPI extends RESTDataSource {
  override baseURL = "http://localhost:3000";

  getSpeakers = async (): Promise<[Speaker]> => {
    const data = await this.get("/speakers");
    return data as [Speaker];
  };

  async getSpeakerById(id: string = ""): Promise<Speaker | undefined> {
    const data = await this.get(`/speakers/${encodeURIComponent(id)}`);
    return data as Speaker;
  }
}
