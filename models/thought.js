const { Schema, model, } = require("mongoose");
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = new Schema(
  {

  }
)

const ThoughtSchema = new Schema(
  {
    thought_text: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, " 2 or more characters required"],
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    userName: {
      type: String,
      required: [true, "this need to be fill"],
      trim: true,
      minlength: 6,
      maxlength: 16,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);  


ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});


const Thought = model("Thought", ThoughtSchema);
module.exports = Thought;
