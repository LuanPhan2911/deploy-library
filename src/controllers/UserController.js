const { User, RentingBook } = require("../models");
const { remove, assetPath } = require("../utils/fileStorage/upload");
const { ResponseSuccess } = require("../utils/responses/JsonResponse");
const moment = require("moment");
const { RentingBookService } = require("../services");

const UserController = {
  getRentingBooks: async (req, res, next) => {
    let { status, page } = req.query;
    let user = req.user;
    if (!status) {
      status = "spending";
    }
    try {
      let rentingBooks = await RentingBook.paginate(
        {
          status,
          user: user._id,
        },
        {
          limit: 10,
          page,
          populate: [
            {
              path: "book",
              select: "_id name slug image",
            },
          ],
        }
      );
      return res.status(200).json(
        ResponseSuccess({
          data: rentingBooks,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  rentBook: async (req, res, next) => {
    try {
      let { _id: user_id } = req.user;
      let { days_after_expire, renting_quantity } = req.validated;
      let { _id: book_id } = req.validated.book;

      let rentingBook = await RentingBookService.create({
        book: book_id,
        user: user_id,
        expire_at: moment().add(days_after_expire, "days"),
        quantity: renting_quantity,
        status: "spending",
      });

      return res.status(200).json(
        ResponseSuccess({
          data: rentingBook,
          message: "Renting Book Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  destroyRentingBook: async (req, res, next) => {
    try {
      let { _id } = req.params;
      await RentingBookService.delete({
        _id,
      });
      return res.status(200).json(
        ResponseSuccess({
          message: "Renting Book Success",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  index: async (req, res, next) => {
    let { page } = req.query;
    try {
      let users = await User.paginate(
        { role: { $ne: "admin" }, email: { $ne: null } },
        {
          limit: 10,
          page,
          projection: "-password",
          sort: {
            deletedAt: -1,
          },
        }
      );
      return res.status(200).json(
        ResponseSuccess({
          data: users,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  edit: async (req, res, next) => {
    try {
      let _id = req.user._id;
      let user = await User.findById(_id, "-password");
      return res.status(200).json(
        ResponseSuccess({
          data: {
            user,
          },
        })
      );
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      let id = req.user._id;

      let user = await User.findByIdAndUpdate(id, req.validated, {
        returnDocument: "after",
        projection: "-password",
      });

      return res.status(200).json(
        ResponseSuccess({
          data: user,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  updateAvatar: async (req, res, next) => {
    try {
      let id = req.user._id;

      let user = await User.findById(id);
      if (user.avatar) {
        remove(user.avatar);
      }

      await User.findByIdAndUpdate(
        id,
        {
          avatar: assetPath(req.file?.path),
        },
        {
          returnDocument: "after",
          projection: "-password",
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
  updateBlock: async (req, res, next) => {
    try {
      let { _id } = req.params;
      let { status } = req.body;
      await User.findByIdAndUpdate(
        _id,
        {
          deletedAt: status === "lock" ? new Date() : null,
        },
        {
          returnDocument: "after",
          projection: "-password",
        }
      );

      return res.status(200).json(
        ResponseSuccess({
          message: "Update DeletedAt User Success",
          data: {
            status,
          },
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = UserController;
