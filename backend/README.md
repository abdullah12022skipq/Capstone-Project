##Digital Media App - Backend

**This is the backend repository for the Digital Media App. This app allows users to upload, view, and interact with various forms of digital media, such as images and videos. The backend is responsible for managing user accounts, media uploads, comments, likes, and other core functionalities.**

##Table of Contents

* Getting Started
  	Prerequisites
        Installation
* Usage
        Configuration
        API Endpoints
* Authentication
* Database
* Deployment
* Contributing
* License

##Getting Started
###Prerequisites

Before you begin, ensure you have met the following requirements:
**Node.js:** You need Node.js installed. You can download it from https://nodejs.org/.

###Installation

1. Clone the repository:
	git clone https://github.com/yourusername/Capstone-Project.git

2. Change into the project directory:
	cd backend

3. Install dependencies:
	npm install

4. Start the server:
	node index.js

The server will start, and your backend will be accessible at http://localhost:5000 by default.

##Usage
###Configuration

Before running the server in production, make sure to configure the environment variables for security and customization. You can use a .env file or set these variables directly in your hosting environment.

**Example .env:**
	PORT=3000
	MONGODB_URI=mongodb://localhost:27017/digital-media-db
	JWT_SECRET=yoursecretkey

###API Endpoints

Here are the main API endpoints available in this backend:

**User Management**
*	/api/users/register: Register a new user.
*       /api/users/login: Login a user.
*       /api/users/profile: Get the user's profile.
*       /api/users/update: Update user profile.
*       /api/users/change-password: Change user password.
*       /api/users/delete: Delete user profile.

**Media Management**
*       /api/media/upload: Upload new media.
*       /api/media/list: List all media.
*       /api/media/details/:mediaId: Get details of a specific media.
*       /api/media/delete/:mediaId: Delete specific media.

**Comments & Likes**
*       /api/comments/add/:mediaId: Add a comment to media.
*       /api/comments/update/:commentId: Update a comment.
*       /api/comments/delete/:commentId: Delete a comment.
*       /api/likes/like/:mediaId: Like a media.
*       /api/likes/dislike/:mediaId: Dislike a media.
*       /api/likes/remove/:mediaId: Remove a like/dislike.

##Authentication

This backend uses JSON Web Tokens (JWT) for authentication. To access protected routes, you need to include a valid JWT token in the request headers. Tokens are obtained during user registration and login.

##Database

We use MongoDB as the database for this application. Ensure you have a MongoDB server running and provide the connection URI in your environment configuration.

##Deployment

You can deploy this backend to your choice of hosting platforms, such as AWS, Heroku, or Vercel. Make sure to set up environment variables in your hosting environment as described in the Configuration section.

##Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: git checkout -b feature-name
3.  Commit your changes: git commit -m 'Add some feature'
4.  Push to your fork: git push origin feature-name
5.  Create a pull request.
