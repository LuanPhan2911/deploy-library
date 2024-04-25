const User = require("../models/User");

class UserService {
  static async emailExist(email) {
    try {
      let user = await User.findOne({
        email,
      });
      return user;
    } catch (error) {}
  }
}
module.exports = UserService;
