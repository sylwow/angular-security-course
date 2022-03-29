import { Request, Response, NextFunction } from "express";
import { decodeJwt } from "./security.utils";

export async function retreiveUserIdFromRequest(req: Request, res: Response, next: NextFunction) {
  const jwt = req.cookies["SESSIONID"];

  if (jwt) {
    handleSessionCookie(jwt, req).then(_ => next());
  } else {
    next();
  }
}

async function handleSessionCookie(jwt: any, req) {
  try {
    const payload = await decodeJwt(jwt);
    req['userId'] = payload.sub;
  } catch (err) {
    req['userId'] = undefined;
  }
}

