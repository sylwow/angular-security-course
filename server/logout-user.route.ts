
import { Request, Response } from "express";
import { db } from "./database";
import { USERS } from "./database-data";
import * as argon2 from 'argon2';
import { validatePassword } from "./password-validation";
import { randomBytes } from "./security.utils";
import { sessionStore } from "./session-store";



export function logoutUser(req: Request, res: Response) {

  const sessionId = req.cookies["SESSIONID"];

  const isSessionValid = sessionStore.destroySession(sessionId);

  res.clearCookie("SESSIONID");

  res.send(200).json({});
}

