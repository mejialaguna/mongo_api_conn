const { Thought, User } = require("../models/index");

const thoughtController = {
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "User",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => {
        res.json({
          dbThoughtData,
          Message: "user and their Thoughts found",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "User",
        select: "-__v",
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "invalid id try again" });
          return;
        }
        res.json({
          dbThoughtData,
          message: "here is you thought with the user",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "invalid id" });
          return;
        }
        res.json({
          dbUserData,
          message: "thought created",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "invalid id try again" });
          return;
        }
        res.json({
          dbThoughtData,
          message: "Great....thought updated",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'oops... invalid id' })
          return;
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        )        
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(400).json({message: 'great thought deleted'})
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(err)
    })
  },
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate
  }
};

module.exports = thoughtController;
