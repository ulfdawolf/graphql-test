import { RESTDataSource } from "@apollo/datasource-rest";

export type SpeakerParamsType = {
  id?: string;
};

export class SpeakerAPI extends RESTDataSource {
  override baseURL = "http://localhost:3000";

  getSpeakers = async () => {
    const data = await this.get("/speakers");
    return data;
  };

  async getSpeakerById(id: string = "") {
    console.log("We are here: ", id);
    const data = await this.get(`/speakers/${encodeURIComponent(id)}`);

    return data;
  }
}
