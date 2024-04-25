const { Router } = require("express");

const {
  index,
  edit,
  destroyRentingBook,
  getRentingBooks,
  rentBook,
  update,
  updateAvatar,
  updateBlock,
} = require("../controllers/UserController");

const { upload } = require("../utils/fileStorage/upload");
const {
  UpdateBlockUserRequest,
  UpdateUserRequest,
  UserDestroyRentingBookRequest,
  UserStoreRentingBookRequest,
} = require("../requests/user");
const {
  AuthAdminMiddleware,
  IsValidObjectIdMiddleWare,
  IsValidPageNumberMiddleWare,
  HasSingleFileMiddleware,
  AuthMiddleware,
} = require("../middleware");
const router = Router();
router.use(AuthMiddleware);
router.get("/edit", edit);
router.put("/edit", UpdateUserRequest, update);
router.put(
  "/edit/avatar",
  upload({ dir: "users" }).single("avatar"),
  HasSingleFileMiddleware,
  updateAvatar
);
router.post("/renting_books/create", UserStoreRentingBookRequest, rentBook);
router.get("/renting_books", IsValidPageNumberMiddleWare, getRentingBooks);
router.delete(
  "/renting_books/:_id/delete",
  IsValidObjectIdMiddleWare,
  UserDestroyRentingBookRequest,
  destroyRentingBook
);
router.get("/", AuthAdminMiddleware, IsValidPageNumberMiddleWare, index);
router.put(
  "/:_id/locking",
  AuthAdminMiddleware,
  IsValidObjectIdMiddleWare,
  UpdateBlockUserRequest,
  updateBlock
);

module.exports = router;
