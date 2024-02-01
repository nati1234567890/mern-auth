import express from "express";
import { test, uppdateUser } from "../controllers/UserController.js";
import { VerifiedToken } from "../utiles/VerifieUser.js";
const UserRouter = express.Router();

UserRouter.get("/", test);
UserRouter.post("/update/:id", VerifiedToken, uppdateUser);

export default UserRouter;
