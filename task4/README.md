# Netflix-Style AI-Based Recommendation System

## 🎯 Overview
A production-level AI-powered recommendation system using Apache Mahout for intelligent item-based filtering, Spring Boot for backend APIs, and React TypeScript for a Netflix-style frontend.

## 🧠 Tech Stack
- **Frontend**: React 18+, TypeScript, Tailwind CSS, Zustand, Axios
- **Backend**: Java 17+, Spring Boot 3.x, Apache Mahout, Maven
- **Database**: H2 (Dev) / MySQL / PostgreSQL
- **APIs**: TMDB integration, JWT Authentication, Swagger
- **Deployment**: Docker, Docker Compose

## 📁 Project Structure
```
task4/
├── backend/                 # Spring Boot + Mahout API
├── frontend/               # React + TypeScript UI
├── data/                   # Sample datasets
├── docker/                 # Docker configuration
├── postman_collection.json # API testing
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose
- Maven

### 1. Clone and Setup
```bash
cd task4
```

### 2. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

### 4. Docker Deployment
```bash
docker-compose up --build
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token

### Recommendations
- `GET /api/recommend/{userId}` - Get personalized recommendations
- `GET /api/similar-items/{itemId}` - Find similar movies
- `POST /api/rate` - Rate a movie
- `GET /api/export/{userId}` - Export recommendations as CSV

### Admin
- `POST /api/admin/upload-data` - Upload training datasets
- `GET /api/admin/analytics` - System analytics
- `GET /api/admin/users` - User management

### Movies
- `GET /api/movies/search` - Search movies
- `GET /api/movies/{id}` - Get movie details
- `GET /api/movies/trending` - Get trending movies

## 🎨 Features

### User Features
- ✅ Personalized movie recommendations
- ✅ Similar items discovery
- ✅ Advanced search and filtering
- ✅ Rating system with feedback
- ✅ "Because you watched..." suggestions
- ✅ Export recommendations to CSV/PDF

### Admin Features
- ✅ Secure admin dashboard
- ✅ Dataset upload with validation
- ✅ Real-time analytics
- ✅ User management
- ✅ System monitoring

### Technical Features
- ✅ JWT-based authentication
- ✅ Apache Mahout integration
- ✅ TMDB API integration
- ✅ Responsive Netflix-style UI
- ✅ Real-time updates
- ✅ Docker containerization

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

### API Testing
Import `postman_collection.json` into Postman for comprehensive API testing.

## 🐳 Docker Deployment

### Development
```bash
docker-compose -f docker-compose.dev.yml up
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up
```

## 📊 Sample Data
- `data/ratings.csv` - User rating data (user_id, movie_id, rating, timestamp)
- `data/movies.csv` - Movie metadata (movie_id, title, genres, year, tmdb_id)
- `data/sample_users.json` - Sample user profiles

## 🔧 Configuration

### Environment Variables
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=recommendations
DB_USER=admin
DB_PASS=password

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000

# TMDB API
TMDB_API_KEY=your-tmdb-api-key
TMDB_BASE_URL=https://api.themoviedb.org/3

# Redis (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 📈 Performance
- Mahout recommendations: ~100ms response time
- Database queries: Optimized with indexing
- Frontend: Lazy loading and virtualization
- Caching: Redis for frequent queries

## 🚀 Deployment Options

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Render)
```bash
cd backend
mvn clean package
# Deploy target/*.jar
```

### Full Stack (AWS/DigitalOcean)
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License
This project is licensed under the MIT License.

## 🆘 Support
For issues and questions:
- Create GitHub issue
- Check documentation
- Review API endpoints in Swagger UI: http://localhost:8080/swagger-ui.html