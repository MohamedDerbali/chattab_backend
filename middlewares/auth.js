const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const AdminModel = require("../models/admin");
const config = process.env;

exports.AUTH_ROLES = {
  NO_TOKEN: "no token",
  USER: "user",
  ADMIN: "admin",
};
exports.authorize =
  (...roles) =>
  async (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    if (!token) {
      if (roles.length === 0 || roles.includes("no token")) {
        return next();
      }
      res.status(401).json({ message: "you are not authorized to do this!" });
    }
    try {
      const data = jwt.verify(token, config.CHATTAB_SECRET);
      if ("role" in data) {
        if (data.role == "user") {
          const user = await UserModel.findOne({ _id: data.sub }, {password:0}).populate("friendsList", "-friendsList -password -updatedAt -createdAt -status").lean();
          req.user = user;
          req.role = "user";
        } else if (data.role == "admin") {
          const admin = await AdminModel.findOne({ _id: data.sub }).lean();
          req.admin = admin;
          req.role = "admin";
        } else throw new Error("No user found!");
      } else {
        const [user, admin] = await Promise.all([
          UserModel.findById(data.id || data._id, {password:0}).populate("friendsList", "-friendsList -password -updatedAt -createdAt -status").lean(),
          AdminModel.findById(data.id || data._id),
        ]);
        if (user) {
          req.user = user;
          req.role = "user";
        } else if (admin) {
          req.admin = admin;
          req.role = "admin";
        } else throw new Error("No user found!");
      }
      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
