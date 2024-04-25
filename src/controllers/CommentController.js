const { Comment } = require("../models");
const { ResponseSuccess } = require("../utils/responses/JsonResponse");
const { CommentService } = require("../services");

const CommentController = {
  index: async (req, res, next) => {
    try {
      let { page, _type, _id } = req.query;
      let comments = await Comment.paginate(
        {
          parent_id: null,
          commentable_type: _type,
          commentable_id: _id,
        },
        {
          page: page || 1,
          limit: 10,
          populate: {
            path: "user",
            select: "id name avatar",
          },
          sort: {
            createdAt: -1,
          },
        }
      );

      return res.status(200).json(
        ResponseSuccess({
          data: comments,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  getReplies: async (req, res, next) => {
    try {
      let { _id } = req.params;
      let comments = await Comment.find(
        {
          parent_id: _id,
        },
        {},
        {
          populate: {
            path: "user",
            select: "id name avatar",
          },
          sort: {
            createdAt: -1,
          },
        }
      );

      return res.status(200).json(
        ResponseSuccess({
          data: comments,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  store: async (req, res, next) => {
    try {
      let { commentable, message, parent } = req.validated;

      let comment = await Comment.create({
        commentable_id: commentable._id,
        commentable_type: commentable._type,
        message,
        parent_id: parent ? parent?._id : null,
        user: req.user._id,
      });
      if (comment.parent_id) {
        await Comment.findByIdAndUpdate(comment.parent_id, {
          $inc: {
            replies_count: 1,
          },
        });
      }
      return res.status(200).json(
        ResponseSuccess({
          data: comment,
          message: "Comment Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      let { _id } = req.params;
      await Comment.deleteMany({
        parent_id: _id,
      });
      let comment = await Comment.findByIdAndDelete(_id);
      if (comment?.parent_id) {
        await Comment.findByIdAndUpdate(comment?.parent_id, {
          $inc: {
            replies_count: -1,
          },
        });
      }
      return res.status(200).json(
        ResponseSuccess({
          message: "Delete Comment Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  destroyAll: async (req, res, next) => {
    try {
      let { _id, _type } = req.validated?.commentable;
      await CommentService.deleteAll({
        _id,
        _type,
      });
      return res.status(200).json(
        ResponseSuccess({
          message: "Delete All Comment Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = CommentController;
