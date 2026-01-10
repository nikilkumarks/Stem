import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {

    // Implementation for getting recommended users

    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        // Fetch users who are not friends with the current user
        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, // Exclude current user
                { friends: { $ne: currentUserId } }, // Exclude current user's friends
                { isOnboarded: true } // Only include users who have completed onboarding
            ],
        });

        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Error fetching recommended users:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends", "fullName  profilePic nativeLanguage learningLanguage");

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error fetching friends:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}   

export async function sendFriendRequest(req, res) {

    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;

        // prevent sending request to oneself
        if (myId === recipientId) {
            return res.status(400).json({ message: "Cannot send friend request to oneself." });
        }

        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: "Recipient user not found." });
        }
        // Check if a user has already been friends
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends." });
        }

        // Check if a friend request has already been sent
        const existingRequest = await FriendRequest.findOne({

            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        });

        if (existingRequest) {
            return res.status(400).json({ message: "Friend request already sent." });
        }

        // Create a new friend request
        const friendRequest = new FriendRequest({
            sender: myId,
            recipient: recipientId
        });

        await friendRequest.save();

        res.status(201).json(friendRequest);
    } catch (error) {
        console.error("Error sending friend request:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
} 

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found." });
        }

        // verify the current user is the recipient of the friend request
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this friend request." });
        }

        // Update both users' friends lists
        // Using $addToSet to avoid duplicate entries
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        });

        // Delete the friend request after accepting
        await FriendRequest.findByIdAndDelete(requestId);

        res.status(200).json({ message: "Friend request accepted." });

    } catch (error) {
        console.error("Error accepting friend request:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getFriendRequests(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending"
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json({ incomingReqs, acceptedReqs: [] });

    } catch (error) {
        console.log("Error fetching friend requests:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getOutgoingFriendRequests(req, res) {
    try {
        const outgoingReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json({ outgoingReqs });
    } catch (error) {
        console.log("Error fetching outgoing friend requests:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}