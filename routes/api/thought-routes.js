const router = require("express").Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require("../../controllers/thought-controller");

router.route("/")
    .get(getAllThought);

router.route('/:userId')
.post(createThought);

router.route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route("/:thoughtId/reactions")
    .post(createReaction)
    

router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction)

module.exports = router;
