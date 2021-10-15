const router = require("express").Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require("../../controllers/thought-controllers.js");

router.route("/")
    .get(getAllThought)
    .post(createThought);

router.route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route("/:thoughtId/reactions")
    .post(createReaction)
    .delete(deleteReaction)

module.exports = router;
