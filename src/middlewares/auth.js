const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  const authenticationHeader = request.headers.authorization;

  if (!authenticationHeader)
    return response.status(401).json({ message: "No token provided." });

  const authenticationParts = authenticationHeader.split(" ");

  if (!authenticationParts.length === 2)
    return response.status(401).json({ message: "Token error." });

  const [scheme, token] = authenticationParts;

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).json({ message: "Invalid token format." });

  jwt.verify(token, process.env.API_HASH, (error, decoded) => {
    if (error)
      return response
        .status(401)
        .json({ error, message: "Invalid or expired token." });

    request.userId = decoded.indexOf;
    return next();
  });
};
