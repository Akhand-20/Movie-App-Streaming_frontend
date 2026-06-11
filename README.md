# CINEMAX — Movie Streaming App (Backend)

A production-quality REST API backend for the CINEMAX movie streaming platform.

## 🔗 Live Demo
Frontend: https://movie-app-streaming-frontend.vercel.app
Backend API: https://movie-app-streaming.onrender.com

## 🛠 Tech Stack
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication + bcryptjs
- TMDB API Integration with MongoDB caching
- Deployed on Render

## 🏗 Architecture
6-layer architecture:
Routes → Controllers → Services → Repositories → Schemas → MongoDB

## 📦 API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/movies/trending
- GET /api/movies/top-rated
- GET /api/movies/search?q=query
- GET /api/movies/:id
- GET /api/movies/:id/videos
- GET /api/movies/:id/recommendations
- GET /api/watchlist (protected)
- POST /api/watchlist (protected)
- DELETE /api/watchlist/:tmdbId (protected)

## ⚙️ Setup
```bash
npm install
cp .env.example .env
# Fill in your env variables
npm run dev
```

## 🔑 Environment Variables
```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
TMDB_KEY=your_tmdb_key
TMDB_BASE_URL=https://api.themoviedb.org/3
NODE_ENV=development
CLIENT_URL=your_frontend_url
```
