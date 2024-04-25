const { model, Schema } = require("mongoose");
const personalAccessTokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  token: String,
  expired: Date,
});
module.exports = model("PersonalAccessToken", personalAccessTokenSchema);
