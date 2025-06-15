// models/Team.js
import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: String,
  role: String,
  bio: String,
  image: String,
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
