const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  if (err.name === "HTTPError") {
    statusCode = err.statusCode;
    errorMessage = err.message;
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    statusCode = 400;
    errorMessage =
      "Duplicate key error. A document with this unique field already exists.";
  } else if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err
  ) {
    statusCode = 400;
    errorMessage = "Invalid JSON payload";
  } else if (err instanceof TypeError) {
    statusCode = 400;
    errorMessage = "Type Error: " + err.message;
  } else if (err instanceof ReferenceError) {
    statusCode = 500;
    errorMessage = "Reference Error: " + err.message;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    errorMessage = "Validation Error: " + err.message;
  }

  req.flash("error", errorMessage);

  next(err);
};

module.exports = errorHandler;
