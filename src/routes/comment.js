const { Router } = require("express");

const {
  destroy,
  destroyAll,
  getReplies,
  index,
  store,
} = require("../controllers/CommentController");

const {
  AuthMiddleware,
  IsValidObjectIdMiddleWare,
  IsValidPageNumberMiddleWare,
} = require("../middleware");
const DestroyCommentRequest = require("../requests/comment/DestroyCommentRequest");
const StoreCommentRequest = require("../requests/comment/StoreCommentRequest");

const router = Router();

router.get("/", IsValidPageNumberMiddleWare, index);
router.get("/:_id/replies", IsValidObjectIdMiddleWare, getReplies);

router.use(AuthMiddleware);
router.post("/create", StoreCommentRequest, store);
router.delete("/:_id/delete", IsValidObjectIdMiddleWare, destroy);
router.delete("/delete_all", DestroyCommentRequest, destroyAll);

module.exports = router;
