import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {   getRecommendedUsers,
           getMyFriends,
           sendFriendRequest,
           acceptFriendRequest,
           getFriendRequests,
           getOutgoingFriendRequests
         } from "../controllers/user.controller.js";
import { get } from "mongoose";

const router = express.Router();

// apply protectRoute middleware to all routes in this router
router.use(protectRoute);

// all routes defined here will be protected
router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

export default router;