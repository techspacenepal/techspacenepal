const errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
