# MEAN Stack CRUD Application

A full-stack CRUD application built with the MEAN stack (MongoDB, Express, Angular 15, and Node.js). This application manages a collection of tutorials with create, read, update, and delete functionality.

## Features

- **Backend**: Node.js + Express REST APIs
- **Database**: Official MongoDB Docker image with authentication
- **Frontend**: Angular 15 with HTTPClient
- **Containerization**: Docker & Docker Compose for easy deployment
- **Database Management**: Automatic initialization and health checks

## Project Structure

```
mean-app/
├── backend/              # Express.js server
│   ├── app/
│   │   ├── config/      # Database configuration
│   │   ├── models/      # MongoDB models
│   │   ├── controllers/ # Route handlers
│   │   └── routes/      # API routes
│   ├── package.json
│   ├── server.js
│   └── Dockerfile
├── frontend/            # Angular application
│   ├── src/
│   ├── package.json
│   ├── angular.json
│   └── Dockerfile
├── docker-compose.yml   # Multi-service orchestration
├── mongo-init.js        # MongoDB initialization script
└── .env                 # Environment variables
```

## Quick Start with Docker Compose

### Prerequisites
- Docker & Docker Compose installed

### Run

```bash
cd mean-app
docker-compose up --build
```

This will:
- Build and start the backend service (http://localhost:8080)
- Build and start the frontend service (http://localhost)
- Start MongoDB with authentication and automatic initialization

### Access the Application
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080
- **MongoDB**: localhost:27017

## Local Development Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB installed locally OR Docker

### Step 1: Start MongoDB

**Option A - Using Docker:**
```bash
docker run -d --name mean-mongo -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=mongo_user \
  -e MONGO_INITDB_ROOT_PASSWORD=mongo_password \
  mongo:6.0
```

**Option B - Using local MongoDB:**
Create the `dd_db` database and set up authentication if needed.

### Step 2: Start Backend

```bash
cd backend
npm install
node server.js
```

Server runs on http://localhost:8080

### Step 3: Start Frontend

In a new terminal:
```bash
cd frontend
npm install
npx ng serve --port 8081
```

Application runs on http://localhost:8081

## Configuration

### Environment Variables

Edit `.env` to customize:
- `MONGO_INITDB_ROOT_USERNAME` - MongoDB admin username
- `MONGO_INITDB_ROOT_PASSWORD` - MongoDB admin password
- `MONGO_INITDB_DATABASE` - Initial database name
- `MONGODB_URI` - Connection string with auth
- `PORT` - Backend port

### Database Configuration

Backend database config: `backend/app/config/db.config.js`
- Reads `MONGODB_URI` from `.env` for Docker Compose
- Falls back to localhost for local development

### Frontend API Configuration

Frontend API endpoint: `frontend/src/app/services/tutorial.service.ts`
- Uses `http://localhost:8080/api/tutorials` for local development
- Uses `http://backend:8080/api/tutorials` for Docker Compose

## Docker Compose Services

### MongoDB
- **Image**: mongo:6.0 (official)
- **Authentication**: Enabled with credentials from `.env`
- **Health Check**: Automatic readiness verification
- **Initialization**: Runs `mongo-init.js` on startup
- **Volume**: Persistent data storage

### Backend
- **Builds**: `./backend/Dockerfile`
- **Port**: 8080
- **Dependencies**: Waits for MongoDB to be healthy
- **Network**: Connected to `mean-network`

### Frontend
- **Builds**: `./frontend/Dockerfile`
- **Port**: 80
- **Serves**: Nginx with production build
- **Dependencies**: Waits for backend
- **Network**: Connected to `mean-network`

## API Endpoints

- `GET /api/tutorials` - Get all tutorials
- `GET /api/tutorials/:id` - Get tutorial by ID
- `POST /api/tutorials` - Create new tutorial
- `PUT /api/tutorials/:id` - Update tutorial
- `DELETE /api/tutorials/:id` - Delete tutorial
- `DELETE /api/tutorials` - Delete all tutorials
- `GET /api/tutorials?title=search` - Search by title

## MongoDB Collections

### tutorials
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "published": "boolean"
}
```

## Troubleshooting

**Docker Compose fails to start:**
- Ensure Docker daemon is running
- Check port availability (80, 8080, 27017)
- View logs: `docker-compose logs -f`

**MongoDB connection refused:**
- Wait a few seconds for MongoDB to initialize
- Check `.env` credentials match docker-compose

**Frontend can't reach backend:**
- For Docker: Use `http://backend:8080`
- For local dev: Use `http://localhost:8080`

## Development Tips

- **Backend logs**: `docker-compose logs backend`
- **MongoDB logs**: `docker-compose logs mongo`
- **Frontend hot reload**: `npx ng serve` development mode
- **Stop services**: `docker-compose down`
- **Clean volumes**: `docker-compose down -v`
