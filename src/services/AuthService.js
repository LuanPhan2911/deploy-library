const jwt = require("jsonwebtoken");
const moment = require("moment");
const PersonalAccessToken = require("../models/PersonalAccessToken");
class AuthService {
  static async createToken(user) {
    try {
      let token = jwt.sign(user, process.env.APP_SECRET, {
        expiresIn: "7d",
      });

      await PersonalAccessToken.create({
        user: user._id,
        token: token,
        expired: moment().add(7, "days"),
      });
      return token;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteToken(token) {
    try {
      await PersonalAccessToken.findOneAndDelete({
        token: token,
      });
    } catch (error) {}
  }
  static async validToken(token) {
    let personalAccessToken = await PersonalAccessToken.findOne({
      token: token,
      expired: {
        $gte: new Date(),
      },
    }).populate("user", "-password");
    return personalAccessToken;
  }
  static async deleteInvalidToken() {
    try {
      await PersonalAccessToken.findOneAndDelete({
        expired: {
          $lt: new Date(),
        },
      });
    } catch (error) {}
  }
}
module.exports = AuthService;
