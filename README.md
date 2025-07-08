# AI-Based Recommender System

*COMPANY*: CODTECH IT SOLUTIONS PVT. LTD.

*NAME*: SHALU

*INTERN ID*: CT06DF405

*DOMAIN*: JAVA PROGRAMMING

*DURATION*: 6 WEEKS

*MENTOR*: NEELS SANTHOSH KUMAR

DESCRITON:# 🎬 Netflix-Style AI-Based Recommendation System

Welcome to `task4` – a full-stack, production-grade AI-powered recommendation system that replicates the recommendation behavior of platforms like Netflix. This project combines **Apache Mahout**, **Spring Boot**, and a modern **React + TypeScript frontend** to deliver personalized movie/show suggestions based on user behavior.

---

## 🚀 Project Overview

This intelligent system utilizes **item-based collaborative filtering** to analyze user preferences and predict new content recommendations. It features a **Netflix-inspired UI**, admin controls, dynamic search and filtering, real-time recommendation updates, and a backend built with scalable architecture and clean API integration.

---

## 🛠 Tech Stack

### 🔧 Backend
- Java 17
- Spring Boot 3.x
- Apache Mahout
- Maven
- MySQL/PostgreSQL (or H2 for dev)
- Swagger/OpenAPI
- JWT Authentication
- Docker

### 💻 Frontend
- React 18 + TypeScript
- Tailwind CSS
- React Router
- Zustand (state management)
- Axios (API calls)
- Chart.js (Analytics)
- TMDB API Integration

---

## 📁 Folder Structure

task4/

├── backend/ ← Spring Boot + Mahout

├── frontend/ ← React + TypeScript + Tailwind

├── data/ ← Sample datasets (ratings.csv, movies.csv)

├── docker/ ← Dockerfiles and docker-compose.yml

├── postman_collection.json

└── README.md



## 🌟 Features

### 🔒 User Features
- 🔐 Login/signup with JWT
- 🎯 Personalized movie/show recommendations
- 🎬 View similar items to any selected title
- 🔍 Search, filter, and sort movies by genre, rating, release year
- 👍 Like/Dislike buttons to refine suggestions
- 📁 Export personal recommendations as CSV or PDF

### 🧑‍💼 Admin Features
- 📤 Upload and validate rating datasets (CSV/JSON)
- 📊 Real-time admin dashboard with analytics:
  - Most recommended items
  - Top genres
  - Active users
- 🔧 Monitor system usage and recommendation accuracy

---

## 📡 API Endpoints

| Endpoint                     | Description                            |
|-----------------------------|----------------------------------------|
| `/recommend/{userId}`       | Get user-specific recommendations      |
| `/similar-items/{itemId}`   | Fetch similar movies                   |
| `/upload-data`              | Upload new dataset (CSV/JSON)          |
| `/export/{userId}`          | Export recommendations for user        |
| `/analytics`                | Admin analytics dashboard              |

---



🧪 Running Locally
Backend (Spring Boot)

cd task4/backend
./mvnw spring-boot:run
Frontend (React + Vite)

cd task4/frontend
npm install
npm run dev
Docker (Full Stack)

cd task4/docker
docker-compose up --build


🧑‍💻 Author
Shalu Baloda
Java Programmer Intern
Codetech Solution Pvt. Ltd.

🌐 Live Project Preview: Click here to open the app
