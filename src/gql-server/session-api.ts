import sessionsData from "./data/sessions.json";

export type SessionsDataType = typeof sessionsData;

export class SessionAPI {
  private sessions: SessionsDataType;
  constructor() {
    this.sessions = sessionsData;
  }

  getSessions = async () => {
    return this.sessions;
  };
}
