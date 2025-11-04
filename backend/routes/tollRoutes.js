import express from "express";
import { processVehicle, buyPass, getLeaderboard } from "../controllers/tollController.js";

const router = express.Router();

router.post("/process", processVehicle);
router.post("/buy", buyPass);
router.get("/leaderboard", getLeaderboard);

export default router;
