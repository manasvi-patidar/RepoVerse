const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next); // automatically forwards async errors to Express
  };
};

module.exports = asyncHandler;
