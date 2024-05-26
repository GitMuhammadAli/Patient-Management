const errorHandler = (err, req, res, next) => {
  console.log("inside error handler");

  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  if (err.name === "HTTPError") {
    statusCode = err.statusCode;
    errorMessage = err.message;
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    statusCode = 400;
    errorMessage =
      "Duplicate key error. The provided data conflicts with an existing record.";
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
  } else {
    console.error("Error:", err.stack);
    statusCode = 500;
    errorMessage = "Internal Server Error";
  }

  console.log(statusCode, errorMessage);
  console.error("Error:", err.stack);
  res.status(statusCode).send(`<script>alert('${errorMessage}');</script>`);
};

module.exports = errorHandler;
