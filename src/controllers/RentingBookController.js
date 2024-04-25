const { RentingBook, Book, User } = require("../models");
const { RentingBookService } = require("../services");
const { ResponseSuccess } = require("../utils/responses/JsonResponse");
const moment = require("moment");
const RentingBookController = {
  index: async (req, res, next) => {
    let { status, page } = req.query;
    if (!status) {
      status = "spending";
    }
    try {
      let rentingBooks = await RentingBook.paginate(
        {
          status,
        },
        {
          limit: 10,
          page,
          populate: [
            {
              path: "user",
              select: "_id name birthday gender phone_number address",
            },
            {
              path: "book",
              select: "_id name",
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
  store: async (req, res, next) => {
    try {
      let { user, days_after_expire, renting_quantity, book } = req.validated;
      let reader = await User.create(user);
      let rentingBook = await RentingBookService.create({
        user: reader._id,
        book: book._id,
        expire_at: moment().add(days_after_expire, "days"),
        quantity: renting_quantity,
        status: "renting",
      });

      await Book.findByIdAndUpdate(rentingBook.book, {
        $inc: {
          remain_quantity: -rentingBook.quantity,
        },
      });
      await rentingBook.populate({
        path: "user",
        select: "id name",
      });
      return res.status(200).json(
        ResponseSuccess({
          data: rentingBook,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      let { _id } = req.params;
      let rentBook = await RentingBook.findById(_id).populate([
        {
          path: "user",
          select: "_id name birthday gender phone_number address",
        },
        {
          path: "book",
          select: "_id name author_name image remain_quantity",
        },
      ]);
      return res.status(200).json(
        ResponseSuccess({
          data: rentBook,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      let { status } = req.validated;
      let { _id } = req.params;

      let rentingBook = await RentingBook.findByIdAndUpdate(_id, {
        status,
      });
      if (status === "renting") {
        await Book.findByIdAndUpdate(rentingBook.book, {
          $inc: {
            remain_quantity: -rentingBook.quantity,
          },
        });
      }
      if (status === "completed") {
        await Book.findByIdAndUpdate(rentingBook.book, {
          $inc: {
            remain_quantity: rentingBook.quantity,
          },
        });
      }
      return res.status(200).json(
        ResponseSuccess({
          message: `Update success to status ${status}`,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      let { _id } = req.params;
      await RentingBookService.delete({
        _id,
      });
      return res.status(200).json(
        ResponseSuccess({
          message: "Delete renting book success",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = RentingBookController;
