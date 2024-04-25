const { ResponseSuccess } = require("../utils/responses/JsonResponse");

const TestController = {
  index: async (req, res, next) => {
    try {
      return res.status(200).json(ResponseSuccess({}));
    } catch (error) {
      next(error);
    }
  },
  store: async (req, res, next) => {
    try {
      return res.status(200).json(ResponseSuccess({}));
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      return res.status(200).json(ResponseSuccess({}));
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      return res.status(200).json(ResponseSuccess({}));
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      return res.status(200).json(ResponseSuccess({}));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = TestController;
