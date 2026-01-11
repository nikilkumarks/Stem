💬 STEM – Real-Time Chat Application
📌 Project Overview

STEM is a full-stack real-time chat application that enables users to sign up, complete onboarding, connect with friends, and communicate through real-time messaging. The application supports typing indicators, read receipts, message reactions, online/offline presence, notifications, and video calling. It is built with a scalable backend architecture and a modern React frontend, focusing on performance, security, and real-time user experience.

🛠️ Tech Stack

Frontend : 
React.js,
Tailwind CSS,
DaisyUI,
TanStack Query (React Query),
Zustand (basic state management)

Backend : 
Node.js,
Express.js,
Database,
MongoDB

Database : MongoDB

Real-Time Features : Stream (chat, typing indicators, presence, read receipts, reactions)

Authentication & Security : 
JWT (JSON Web Token)
Protected routes
Session expiration handling

Deployment :

Frontend: Deployed (Live link provided below)

Backend: Deployed

Database: MongoDB Atlas

✨ Key Features
🔐 Authentication & Authorization

User signup, login, and logout

JWT-based authentication

Protected routes for authorized access

Session expiry handling for enhanced security

👤 User Onboarding & Social Features

User onboarding flow after signup

Recommended users based on platform logic

Send and accept friend requests

Prevention of duplicate friend requests

💬 Real-Time Chat

One-to-one real-time messaging

Typing indicators

Read receipts (sent / delivered / seen)

Message reactions (emoji-based reactions)

Online / offline presence tracking

🔔 Notifications

Real-time notifications for messages and friend requests

🎥 Video Calling

One-to-one video call functionality

🧱 Application Architecture

The frontend of STEM communicates with the backend using REST APIs for authentication, user management, and chat-related operations. JWT middleware is used to secure protected routes. MongoDB stores user data, relationships, and chat metadata. Real-time features such as messaging, typing indicators, reactions, read receipts, and presence are handled using Stream, ensuring instant synchronization across connected clients.

🗄️ Database Design
Main Collections

User

Stores user profile details and authentication information

FriendRequest

Manages pending and accepted friend requests between users

Database Optimizations

Indexing on frequently queried fields such as userId 

Normalized schema design for scalability

Logic implemented to prevent duplicate friend requests

🔗 API Endpoints

Authentication

POST   /auth/signup

POST   /auth/login

POST   /auth/logout

Users & Friends

GET    /users/recommended

POST   /friends/request

POST   /friends/accept

Chat

GET    /chats/:Id/

🔑 Authentication Flow

Users authenticate using JWT tokens. Upon successful login, a token is issued and stored on the client. All protected routes are secured using middleware that validates the token and session expiration before allowing access.

📸 Screenshots



Login Page

Chat Interface

Notifications Page

Video Call Screen

🔗 Live Demo & Repository

Live Demo: https://stem-o0zn.onrender.com/

GitHub Repository: https://github.com/nikilkumarks/Stem

▶️ How to Run Locally
1. Clone the repository
   git clone https://github.com/nikilkumarks/Stem.git

2. Install dependencies
   npm install

3. Create a .env file and add required environment variables

4. Start the backend server
   npm run server

5. Start the frontend
   npm start

   🧠 Challenges & Learnings

Efficient server-state management using TanStack Query

Designed scalable REST APIs with proper error handling

Secured APIs using JWT authentication and protected routes

Handled edge cases such as offline users and duplicate requests

🚀 Future Enhancements

Group chat functionality

Message search and filtering

Admin moderation and reporting tools

🏆 Why STEM?

STEM demonstrates strong full-stack development skills, real-time system implementation, backend API design, database modeling, authentication handling, and frontend state management. The project reflects real-world application architecture and production-level features suitable for full-stack developer roles.
