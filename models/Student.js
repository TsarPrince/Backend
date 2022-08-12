const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: Number,
  age: Number,
  isStudent: Boolean,
  highestQualification: String,
  interests: [String],
  address: String,
  branch: String
});

module.exports = new mongoose.model("Student", StudentSchema);
