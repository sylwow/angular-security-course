
import { Request, Response } from "express";
import { db } from "./database";
import { USERS } from "./database-data";
import * as argon2 from 'argon2';
import { validatePassword } from "./password-validation";
import { randomBytes } from "./security.utils";
import { sessionStore } from "./session-store";
import { DbUser } from "./db-user";



export function loginUser(req: Request, res: Response) {

  const credentials = req.body;

  const user = db.findUserByEmail(credentials.email);

  if (!user) {
    res.sendStatus(403);
  } else {
    loginAndBUildResponse(credentials, user, res);
  }
}

async function loginAndBUildResponse(credentials: any, user: DbUser, res: Response) {
  try {
    const sessionId = await attemptLogin(credentials, user);

    res.cookie("SESSIONID", sessionId, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      // expires: session.expires,
    });

    res.status(200).json({ id: user.id, email: user.email });
  } catch (error) {
    res.sendStatus(403);
  }
}

async function attemptLogin(credentials: any, user: DbUser) {

  const isPasswordValid = await argon2.verify(user.passwordDigest, credentials.password);

  if (!isPasswordValid) {
    throw new Error("wrong password");
  }

  console.log(USERS);

  const sessionId = await randomBytes(20).then(bytes => bytes.toString('hex'));

  console.log(sessionId);

  sessionStore.createSession(sessionId, user);

  return sessionId;


}

