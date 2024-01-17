import sessionsData from "../gql-server/data/sessions.json";

export type SessionDataType = (typeof sessionsData)[number];
export type SessionParamsType = {
  id?: string;
  title?: string;
  description?: string;
  startsAt?: string;
  endsAt?: string;
  room?: string;
  day?: string;
  format?: string;
  track?: string;
  level?: string;
};

export class SessionAPI {
  private sessions: SessionDataType[] = sessionsData;

  getSessions = async (params: SessionParamsType) => {
    function search(session: SessionDataType, params: SessionParamsType) {
      return Object.keys(params).every((key) => {
        if (!params.hasOwnProperty(key)) {
          return true;
        }

        const value = params[key as keyof SessionParamsType] || "";
        if (key === "id") {
          return parseInt(value) === session.id;
        }

        const sessionValue = session[key as keyof SessionDataType];
        return value === sessionValue;
      });
    }

    return this.sessions.filter((s) => {
      return search(s, params);
    });
  };

  getSessionById = async (id: string = "") => {
    const idInt = parseInt(id);
    const sessionsWithId = this.sessions.filter((s) => {
      return s.id === idInt;
    });
    return sessionsWithId[0];
  };
}
