// const TeamMember = require("../models/Team");
// const fs = require("fs");

// exports.getAllTeam = async (req, res) => {
//   const members = await TeamMember.find();
//   res.json(members);
// };

// exports.addTeamMember = async (req, res) => {
//   const { name, role, bio } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : "";

//   const member = new TeamMember({ name, role, bio, image });
//   await member.save();
//   res.status(201).json(member);
// };

// exports.deleteTeamMember = async (req, res) => {
//   const member = await TeamMember.findById(req.params.id);
//   if (member) {
//     if (member.image) fs.unlinkSync(`.${member.image}`);
//     await member.deleteOne();
//     res.json({ message: "Deleted" });
//   } else {
//     res.status(404).json({ error: "Not found" });
//   }
// };
import Team from "../models/Team.js";
import fs from "fs";

export const getTeam = async (req, res) => {
  const team = await Team.find();
  res.json(team);
};

export const createTeam = async (req, res) => {
  const { name, role, bio } = req.body;
  const imagePath = req.file ? `uploads/${req.file.filename}` : null;
  const member = new Team({ name, role, bio, image: imagePath });
  await member.save();
  res.status(201).json(member);
};

export const updateTeam = async (req, res) => {
  const { name, role, bio } = req.body;
  const team = await Team.findById(req.params.id);
  if (!team) return res.status(404).send("Not found");

  if (req.file && team.image) fs.unlinkSync(`server/${team.image}`);
  team.name = name;
  team.role = role;
  team.bio = bio;
  if (req.file) team.image = `uploads/${req.file.filename}`;
  await team.save();
  res.json(team);
};

export const deleteTeam = async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) return res.status(404).send("Not found");
  if (team.image) fs.unlinkSync(`server/${team.image}`);
  await team.deleteOne();
  res.sendStatus(204);
};
