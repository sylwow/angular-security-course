import { User } from "../src/app/model/user";
import { Session } from "./session";

class SessionStore {
  private sessions: { [key: string]: Session } = {}

  createSession(sessionId: string, user: User) {
    return this.sessions[sessionId] = new Session(sessionId, user);
  }

  findUserBySessionId(sessionId: string): User | undefined {
    const session = this.sessions[sessionId];

    const isSessionValid = session.isValid();

    return isSessionValid ? session.user : undefined;
  }

  isSessionValid(sessionId: any) {
    const session = this.sessions[sessionId];

    return session.isValid();
  }

  destroySession(sessionId: any) {
    delete this.sessions[sessionId];
  }
}

export const sessionStore = new SessionStore();
