import { db } from "./database";


export function createUser(req, res) {
  const cred = req.body;
  const user = db.createUser(cred.email, cred.password);

  console.log(user);

  res.status(200).json({ id: user.id, email: user.email });
}
