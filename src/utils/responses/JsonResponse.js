const ResponseSuccess = ({ data, message }) => {
  return {
    success: true,
    data,
    message,
  };
};
const ResponseFailure = ({ data, message }) => {
  return {
    success: false,
    message,
    data,
  };
};
module.exports = {
  ResponseSuccess,
  ResponseFailure,
};
