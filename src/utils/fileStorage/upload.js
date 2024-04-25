const multer = require("multer");
const fs = require("fs");
let storage = (dir) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/" + dir);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + "." + file.originalname);
    },
  });
};
let upload = ({ dir }) => {
  return multer({ storage: storage(dir) });
};
const assetPath = (path) => {
  return path?.replace("public", "")?.replaceAll("\\", "/");
};
const remove = (path) => {
  let publicPath = "public" + path;
  fs.unlink(publicPath, function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
    } else {
      console.info(`removed`);
    }
  });
};
module.exports = {
  assetPath,
  upload,
  remove,
};
