// const jwt = require('jsonwebtoken');

// const checkRole = (allowedRoles) => {
//   return (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer")) {
//       return res.status(403).json({ error: "Access denied: No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       if (!allowedRoles.includes(decoded.role)) {
//         return res.status(403).json({ error: "Access denied: Invalid role" });
//       }

//       req.user = decoded; // save user data for later
//       next();
//     } catch (error) {
//       return res.status(403).json({ error: "Access denied: Invalid token" });
//     }
//   };
// };

// module.exports = checkRole;

const jwt = require("jsonwebtoken");

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: "Access denied: Invalid role" });
      }

      next();
    } catch (err) {
      return res.status(403).json({ error: "Access denied: Invalid token" });
    }
  };
};

module.exports = checkRole;
