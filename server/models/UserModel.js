import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.1yoSL-WO0YU5mQKROudvswHaHa?rs=1&pid=ImgDetMain",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
