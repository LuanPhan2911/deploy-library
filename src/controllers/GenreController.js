const { Genre, Book } = require("../models");
const slug = require("slug");
const { ResponseSuccess } = require("../utils/responses/JsonResponse");

const GenreController = {
  index: async (req, res, next) => {
    try {
      let genres = await Genre.find({}, "-books", {
        sort: {
          createdAt: -1,
        },
      });
      return res.status(200).json(
        ResponseSuccess({
          data: genres,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  store: async (req, res, next) => {
    try {
      let { name } = req.body;
      let genre = await Genre.create({
        name,
        slug: slug(name),
      });
      return res.status(200).json(
        ResponseSuccess({
          data: genre,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  storeMany: async (req, res, next) => {
    try {
      let { genres: data } = req.body;
      data = data.map((item) => {
        return {
          ...item,
          slug: slug(item["name"]),
        };
      });
      let genres = await Genre.insertMany(data);
      return res.status(200).json(
        ResponseSuccess({
          data: genres,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      let { _id } = req.params;
      await Genre.findByIdAndDelete(_id);
      await Book.updateMany(
        {
          genre: _id,
        },
        {
          $pull: {
            genre: _id,
          },
        }
      );
      return res.status(200).json(
        ResponseSuccess({
          message: "Delete Genre Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = GenreController;
