const { Book } = require("../models");
const { CommentService } = require("../services");
const { assetPath, remove } = require("../utils/fileStorage/upload");
const { ResponseSuccess } = require("../utils/responses/JsonResponse");
const slug = require("slug");
const BookController = {
  index: async (req, res, next) => {
    try {
      let { page, name, genre } = req.query;
      let books = await Book.paginate(
        {
          $or: [
            {
              name: {
                $regex: name || "",
                $options: "i",
              },
            },
            {
              author_name: {
                $regex: name || "",
                $options: "i",
              },
            },
          ],

          ...(genre && {
            genres: {
              $in: [genre],
            },
          }),
        },
        {
          page,
          limit: 10,
          populate: [
            {
              path: "publisher",
            },
            {
              path: "genres",
            },
          ],
        }
      );
      return res.status(200).json(
        ResponseSuccess({
          data: books,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getNewest: async (req, res, next) => {
    try {
      const books = await Book.find({}, "_id image name slug", {
        limit: 10,
        sort: {
          createdAt: -1,
        },
      });
      return res.status(200).json(
        ResponseSuccess({
          data: books,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  getToSelect: async (req, res, next) => {
    try {
      const books = await Book.find({}, "_id name remain_quantity");
      return res.status(200).json(
        ResponseSuccess({
          data: books,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const { genres, publisher, _id } = req.query;
      const books = await Book.find(
        {
          _id: {
            $ne: _id,
          },
          $or: [
            {
              genres: {
                $in: genres,
              },
            },
            {
              publisher: {
                $eq: publisher,
              },
            },
          ],
        },
        "_id image name slug",
        {
          limit: 10,
          sort: {
            createdAt: -1,
          },
        }
      );
      return res.status(200).json(
        ResponseSuccess({
          data: books,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      let book = await Book.create({
        ...req.validated,
        slug: slug(req.validated.name),
      });
      return res.status(200).json(
        ResponseSuccess({
          data: book,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      let { _id } = req.params;
      let book = await Book.findById(_id)
        .populate("genres", "-books")
        .populate("publisher", "-books");
      return res.status(200).json(
        ResponseSuccess({
          data: book,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      let { _id } = req.params;
      let book = await Book.findByIdAndUpdate(
        _id,
        {
          ...req.validated,
          slug: slug(req.validated.name),
        },
        {
          returnDocument: "after",
        }
      );
      return res.status(200).json(
        ResponseSuccess({
          data: book,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  updateImage: async (req, res, next) => {
    try {
      let { _id } = req.params;

      let book = await Book.findById(_id);
      if (book.image) {
        remove(book.image);
      }

      await Book.findByIdAndUpdate(
        _id,
        {
          image: assetPath(req.file?.path),
        },
        {
          returnDocument: "after",
        }
      );

      return res.status(200).json(
        ResponseSuccess({
          message: "Update Image Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      let { _id } = req.params;
      let book = await Book.findByIdAndDelete(_id);
      if (book?.image) {
        remove(book?.image);
      }
      await CommentService.deleteAll({
        _id,
        _type: "Book",
      });
      return res.status(200).json(
        ResponseSuccess({
          message: "Delete Book Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = BookController;
