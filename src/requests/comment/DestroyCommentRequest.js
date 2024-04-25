const Validator = require("validatorjs");
const { FailValidateException } = require("../../utils/exceptions/handler");
const { filterObjectKeys } = require("../../utils/helper");
const { CommentService } = require("../../services");

const DestroyCommentRequest = (req, res, next) => {
  try {
    Validator.registerAsync(
      "commentable_id_valid",
      async function (_id, attribute, key, passes) {
        let { commentable } = req.body;
        if (["Book"].includes(commentable?._type)) {
          let isValid = await CommentService.validCommentableId({
            _id,
            _type: commentable?.type,
          });
          if (isValid) {
            return passes();
          }
        }
        return passes(false, "Invalid commentable id");
      }
    );

    const rules = {
      commentable: {
        _type: "required|in:Book",
        _id: "required|string|commentable_id_valid",
      },
    };
    let validation = new Validator(req.body, rules);

    validation.checkAsync(
      () => {
        let validKeys = Object.keys(rules);
        req.validated = filterObjectKeys(req.body, validKeys);

        next();
      },
      () => next(FailValidateException(validation.errors.all()))
    );
  } catch (error) {
    next(error);
  }
};
module.exports = DestroyCommentRequest;
