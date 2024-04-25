const { Router } = require("express");
const {
  AuthAdminMiddleware,
  HasSingleFileMiddleware,
  IsValidObjectIdMiddleWare,
  IsValidPageNumberMiddleWare,
} = require("../middleware");
const {
  destroy,
  index,
  show,
  store,
  update,
  updateImage,
  getToSelect,
  getNewest,
  get,
} = require("../controllers/BookController");

const { upload } = require("../utils/fileStorage/upload");
const {
  DestroyBookRequest,
  StoreBookRequest,
  UpdateBookRequest,
} = require("../requests/book");
const router = Router();

router.get("/:_id/show", IsValidObjectIdMiddleWare, show);
router.get("/", IsValidPageNumberMiddleWare, index);
router.get("/select", getToSelect);
router.get("/newest", getNewest);
router.get("/filter", get);
router.use(AuthAdminMiddleware);
router.post("/create", StoreBookRequest, store);
router.put("/:_id/edit", IsValidObjectIdMiddleWare, UpdateBookRequest, update);
router.put(
  "/:_id/edit/image",
  IsValidObjectIdMiddleWare,
  upload({
    dir: "books",
  }).single("image"),
  HasSingleFileMiddleware,
  updateImage
);
router.delete(
  "/:_id/delete",
  IsValidObjectIdMiddleWare,
  DestroyBookRequest,
  destroy
);

module.exports = router;
