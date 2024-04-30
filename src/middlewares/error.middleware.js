module.exports = (error, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    return res.status(error.statusCode)?.json({ success: false, message: error.message });
  };
  