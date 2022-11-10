const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatsSchema = new Schema(
  {
    numberOfVisits: {
      type: Number,
      default: 0,
    },
    numberOfMessages: {
      type: Number,
      default: 0,
    },
    numberOfUsers: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Stats', StatsSchema);
