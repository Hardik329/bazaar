import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //console.log(req.body);
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    //console.log("token: ", token);
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      // console.log("req.user: ",user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
     // console.log("id in url: ",req.params.id);
     // console.log("id logged in: ",req.user.id)
    if (req.user?.id === req.params.id || req.user?.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized!");
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized!");
    }
  });
};
