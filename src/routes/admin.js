const { Router } = require("express");

const {
  destroy,
  index,
  show,
  store,
  update,
} = require("../controllers/RentingBookController");
const {
  AuthAdminMiddleware,
  IsValidObjectIdMiddleWare,
  IsValidPageNumberMiddleWare,
} = require("../middleware");
const {
  StoreRentingBookRequest,
  UpdateStatusRentingBookRequest,
} = require("../requests/rentingBook");
const router = Router();
router.use(AuthAdminMiddleware);
router.get("/books/renting", IsValidPageNumberMiddleWare, index);
router.get("/books/:_id/renting", IsValidObjectIdMiddleWare, show);
router.put(
  "/renting_books/:_id/edit",
  IsValidObjectIdMiddleWare,
  UpdateStatusRentingBookRequest,
  update
);
router.post("/renting_books/create", StoreRentingBookRequest, store);
router.delete("/renting_books/:_id/delete", IsValidObjectIdMiddleWare, destroy);

module.exports = router;
