const { verifyJTW } = require('../handlers/jwtHandler');
//extracts info from a jwt token and verifies the token
async function authenticate(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Assumes 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ error: 'JWT missing' });
  }

  const decoded = await verifyJTW(token);

  if (!decoded) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  req.user = decoded;
  next();
}
// only admins can access these endpoints
function adminProtected(req, res, next) {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Access denied: Admins only' });
  }
  next();
}
// only admins and the user themselves can access these endpoints
function selfProtected(req, res, next) {
  const resourceId = parseInt(req.params.id); // Example: ID from the request path
  if (req.user.role !== 'Admin' && req.user.id !== resourceId) {
    return res.status(403).json({ error: 'Access denied: You can only access your own data' });
  }
  next();
}

module.exports = {
  authenticate,
  adminProtected,
  selfProtected,
};
