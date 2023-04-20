const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

const isCircleOwner = (req, res, next) => {
  const circle_id = Number(req.params.id);
  const { owned_circles } = req.user;

  if (owned_circles.some((circle) => circle.id === circle_id)) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated, isCircleOwner };
