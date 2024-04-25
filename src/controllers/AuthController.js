const { User } = require("../models");
const bcrypt = require("bcrypt");
const { AuthService } = require("../services");
const { ResponseSuccess } = require("../utils/responses/JsonResponse");
const {
  UserPasswordMismatchException,
} = require("../utils/exceptions/handler");
const AuthController = {
  getUser: (req, res, next) => {
    let { _id, name, role, avatar } = req.user;
    try {
      return res.status(200).json(
        ResponseSuccess({
          data: {
            user: {
              _id,
              name,
              avatar,
              isAdmin: role === "admin",
            },
          },
        })
      );
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email });
      let passwordCompare = bcrypt.compareSync(password, user.password);
      if (!passwordCompare) {
        throw UserPasswordMismatchException;
      }
      let userToken = {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        isAdmin: user.role === "admin",
      };
      let token = await AuthService.createToken({
        ...userToken,
      });
      return res.status(200).json(
        ResponseSuccess({
          data: {
            token,
            user: userToken,
          },
          message: "User Login Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      let { name, email, password } = req.body;
      let hashPassword = await bcrypt.hash(password, 10);
      let user = await User.create({
        name,
        email,
        password: hashPassword,
      });
      let userToken = {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        isAdmin: user.role === "admin",
      };
      let token = await AuthService.createToken({
        ...userToken,
      });
      return res.status(200).json(
        ResponseSuccess({
          data: {
            token,
            user: userToken,
          },
          message: "User Register success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      let token = req.token;
      await AuthService.deleteToken(token);
      return res.status(200).json(
        ResponseSuccess({
          message: "User logout success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = AuthController;
