import express from "express";
import { signup, login, logout, onboard } from "../controllers/auth.controller.js"; 
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout); // its used post because it changes the server state also operation is not idempotent

router.post("/onboarding", protectRoute, onboard);

// check the user is authenticated
router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});

export default router;