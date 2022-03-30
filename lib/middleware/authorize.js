module.exports = (req, res, next) => {
  try {
    if (!req.user.username) throw new Error('you are not authorized!');
    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
