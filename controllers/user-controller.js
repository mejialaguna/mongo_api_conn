const { User } = require("../models/index");

const userController = {
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "friends", //user schema (friends object line 28)
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => {
        res.json({
          dbUserData,
          message: "all user found",
        })
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "friends", //user schema (friends object line 28)
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "oops.... theres no one with that id" });
          return;
        }
        res.json({
          dbUserData,
          message: 'user found'
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) =>
        res.json({
          dbUserData,
          message: "user created",
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "oops.... invalid user , try again" });
          return;
        }
        res.json({
          dbUserData,
          message: "user updated",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "invalid id please try again" });
          return;
        }
        res.json({
          dbUserData,
          message: "User deleted ",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "oops, invalid id , try again" });
          return;
        }
        res.json({
          dbUserData,
          message: "great.... you have a new friend",
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    ).then((dbUserData) => {
      if (!dbUserData) {
        res
          .status(404)
          .json({ message: "oops.....friend not found with that id " });
        return;
      }
      res.json({
        dbUserData,
        message: "friend deleted",
      });
    })
      .catch((err) => {
      console.log(err)
      res.status(400).json(err)
    })
  },
};

module.exports = userController;
