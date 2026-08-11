import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { arcjetMiddleware } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetMiddleware); // Apply Arcjet middleware to all routes in this router

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", authMiddleware, updateProfile);
router.get("/check", authMiddleware, (req, res) =>
  res.status(200).json(req.user),
);

export default router;
