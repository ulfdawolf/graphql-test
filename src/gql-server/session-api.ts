import sessionsData from "./data/sessions.json";

export type SessionDataType = (typeof sessionsData)[number];

export class SessionAPI {
  private sessions: SessionDataType[];
  constructor() {
    this.sessions = sessionsData;
  }

  getSessions = async () => {
    return this.sessions;
  };

  getSessionById = async (id: string = "") => {
    const idInt = parseInt(id);
    const sessionsWithId = this.sessions.filter((s) => s.id == idInt);
    return sessionsWithId[0];
  };
}
