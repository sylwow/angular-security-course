import { db } from "./database";

export function userInfo(req, res) {
    const userinfo = req.auth;

    console.log('checking usert', userinfo);

    let user = db.findUserByEmail(userinfo.email);

    if (!user) {
        db.createUser(userinfo.email, userinfo.sub);
    }

    res.status(200).json({ email: user.email, preferences: { someconfig: 'for example darkmode enabled' } });
}