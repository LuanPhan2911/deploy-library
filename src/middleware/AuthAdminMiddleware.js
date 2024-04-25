const {
  UnAuthenticateException,
  NoPermissionAccessException,
} = require("../utils/exceptions/handler");

const AuthService = require("../services/AuthService");

const AuthAdminMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw UnAuthenticateException;
    }
    let personalAccessToken = await AuthService.validToken(token);
    if (!personalAccessToken) {
      throw UnAuthenticateException;
    }

    if (!personalAccessToken.user) {
      throw UnAuthenticateException;
    }
    if (personalAccessToken.user.role !== "admin") {
      throw NoPermissionAccessException;
    }
    req.user = personalAccessToken.user;
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = AuthAdminMiddleware;
