const { Router } = require("express");

const {
  destroy,
  index,
  store,
  storeMany,
} = require("../controllers/GenreController");
const {
  StoreGenreRequest,
  StoreManyGenreRequest,
} = require("../requests/genre");

const {
  AuthAdminMiddleware,
  IsValidObjectIdMiddleWare,
} = require("../middleware");

const router = Router();

router.get("/", index);

router.use(AuthAdminMiddleware);
router.post("/create", StoreGenreRequest, store);
router.post("/create_many", StoreManyGenreRequest, storeMany);
router.delete("/:_id/delete", IsValidObjectIdMiddleWare, destroy);

module.exports = router;
