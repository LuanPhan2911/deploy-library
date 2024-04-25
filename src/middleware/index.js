const AuthAdminMiddleware = require("./AuthAdminMiddleware");
const AuthMiddleware = require("./AuthMiddleware");
const HasSingleFileMiddleware = require("./HasSingleFileMiddleware");
const IsValidObjectIdMiddleWare = require("./IsValidObjectIdMiddleware");
const IsValidPageNumberMiddleWare = require("./IsValidPageNumberMiddleWare");
module.exports = {
  AuthAdminMiddleware,
  AuthMiddleware,
  HasSingleFileMiddleware,
  IsValidObjectIdMiddleWare,
  IsValidPageNumberMiddleWare,
};
