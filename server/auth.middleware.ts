export function checkIfAuthenticated(req, res, next) {
  if (req['userId']) {
    next();
  } else {
    res.sendStatus(403);
  }
}
