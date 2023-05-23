const jwt = require('jsonwebtoken');

const JWT_SECRET = 'my-@#$-key';

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Please authenticate using a valid token' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Please authenticate using a valid token' });
  }
};

module.exports = fetchuser;
