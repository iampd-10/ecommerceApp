// userRoutes.js
import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateUserRegistration } from "../validators/validators.js";
const router = express.Router();                                                                        

router.post("/register", validateUserRegistration, registerUser);
router.get("/verify", verifyToken);
router.post('/login', loginUser);

export default router;
