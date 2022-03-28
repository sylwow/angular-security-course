
import { Request, Response } from "express";
import { db } from "./database";
import { USERS } from "./database-data";
import * as argon2 from 'argon2';
import { validatePassword } from "./password-validation";
import { randomBytes } from "./security.utils";
import { sessionStore } from "./session-store";



export function getUser(req: Request, res: Response) {

  const sessionId: string = req.cookies["SESSIONID"];

  const user = sessionStore.findUserBySessionId(sessionId);
  if (user) {
    res.status(200).json(user);
  }
  else {
    res.sendStatus(204);
  }
}
