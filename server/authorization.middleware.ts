import { Request, Response, NextFunction } from 'express';


export function checkIfAuthorized(allowedRoles: string[], req: Request, res: Response, next: NextFunction) {
    const roles = req['user']['roles'] as string[];
    if (allowedRoles.every(role => roles.includes(role))) {
        next();
    }
    else {
        res.sendStatus(403);
    }
}


