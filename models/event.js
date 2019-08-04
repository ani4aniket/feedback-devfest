var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
  email: { type: String, default: "" },
  overallRating: { type: String, default: "" },
  sessionsAttended: { type: Array, default: [] },
  visitedSBs: { type: Array, default: [] },
  buffetRating: { type: String, default: "" },
  stageRating: { type: String, default: "" },
  volunteersRating: { type: String, default: "" },
  eventManagementRating: { type: String, default: "" },
  beforeEventRating: { type: String, default: "" },
  upcomingDevfest: { type: String, default: "" },
  shortReview: { type: String, default: "", maxlength: 1000 },
  makingBetter: { type: String, default: "", maxlength: 500 },
  active: { type: Boolean, default: false }
});

module.exports = mongoose.model("Event", eventSchema);
