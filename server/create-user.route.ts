
import { Request, Response } from "express";
import { db } from "./database";
import { USERS } from "./database-data";
import * as argon2 from 'argon2';
import { validatePassword } from "./password-validation";
import { randomBytes } from "./security.utils";
import { sessionStore } from "./session-store";



export function createUser(req: Request, res: Response) {

  const credentials = req.body;

  const errors = validatePassword(credentials.password);

  if (errors.length > 0) {
    res.status(400).json({ errors });
  }
  else {
    createUserAndSession(res, credentials);
  }
}

async function createUserAndSession(res: Response, credentials) {
  try {
    const passwordDigest = await argon2.hash(credentials.password);

    const user = db.createUser(credentials.email, passwordDigest);

    console.log(USERS);

    const sessionId = await randomBytes(20).then(bytes => bytes.toString('hex'));

    console.log(sessionId);

    const session = sessionStore.createSession(sessionId, user);

    res.cookie("SESSIONID", sessionId, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      // expires: session.expires,
    });

    res.status(200).json({ id: user.id, email: user.email });

  } catch (error) {
    res.status(500).json({ errors: error });
  }
}
