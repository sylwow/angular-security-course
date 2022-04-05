export function checkCsrfToken(req, res, next) {

  const cookie = req.cookies['XSRF-TOKEN'];

  const header = req.headers['x-xsrf-token'];

  if (cookie && header && cookie === header) {
    next();
  } else {
    res.sendStatus(403);
  }
}
