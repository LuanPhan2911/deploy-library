const schedule = require("node-schedule");
const AuthService = require("../services/AuthService");
const Scheduler = {
  deleteInvalidToken: () => {
    schedule.scheduleJob("0 0 * * *", async () => {
      try {
        await AuthService.deleteInvalidToken();
      } catch (error) {}
    });
  },
};
module.exports = Scheduler;
