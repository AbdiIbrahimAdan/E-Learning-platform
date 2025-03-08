import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  profileImage: { type: String },
  expertise: [{ type: String }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  chat: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
instructorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;
