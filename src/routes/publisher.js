const { Router } = require("express");
const {
  destroy,
  index,
  store,
  storeMany,
} = require("../controllers/PublisherController");

const {
  StoreManyPublisherRequest,
  StorePublisherRequest,
} = require("../requests/publisher");

const {
  AuthAdminMiddleware,
  IsValidObjectIdMiddleWare,
} = require("../middleware");

const router = Router();

router.get("/", index);

router.use(AuthAdminMiddleware);
router.post("/create", StorePublisherRequest, store);
router.post("/create_many", StoreManyPublisherRequest, storeMany);
router.delete("/:_id/delete", IsValidObjectIdMiddleWare, destroy);

module.exports = router;
