Reveel 🎨
AI-powered image generation and sharing platform.

Reveel is a full-stack web application that allows users to generate images using AI, post them publicly, and explore images shared by others through a clean and responsive interface.

✨ Features
🧠 Generate Images with AI — Use advanced AI models to create images from text prompts.

🖼️ Post Publicly — Share your creations with the world.

🔍 Search Gallery — Explore other users' images with search functionality.

💻 Full-Stack App — Built with modern technologies on both frontend and backend.

🧾 Real-Time Posting — New images appear instantly for other users.

🚀 Tech Stack
🔹 Frontend (React)
React 19

React Router DOM

Material UI & styled-components

Axios

🔸 Backend (Node.js + Express)
Express.js (v5)

MongoDB + Mongoose

OpenAI / Google GenAI / Replicate APIs

Cloudinary (for image hosting)

dotenv for environment variables

🛠️ Project Structure
```
reveel/
│
├── client/                 # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── index.js
│
├── server/                 # Express backend
│   ├── controllers/
│   │   ├── Post.js
│   │   └── GenerateAIImage.js
│   ├── routes/
│   │   ├── postRoutes.js
│   │   └── generateRoutes.js
│   └── index.js
```
📦 Getting Started
1. Clone the repository
bash
git clone https://github.com/yourusername/reveel.git
cd reveel
2. Setup the Server
bash
cd server
npm install
Create a .env file and add:

env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OPENAI_API_KEY=your_openai_key  # or GenAI/Replicate API key
PORT=5000
Start the server:
bash
npm start
3. Setup the Client
bash

cd ../client
npm install
npm start
The app will run locally at http://localhost:3000 and connect to the backend.

🔍 API Endpoints
POST /api/generate
Generates an AI image based on a text prompt.

POST /api/posts
Saves a generated image with metadata to the database.

GET /api/posts
Fetches all publicly shared images.

🤝 Contribution
Contributions, suggestions, and feedback are welcome!
Feel free to fork the repo, open issues, or submit pull requests.
