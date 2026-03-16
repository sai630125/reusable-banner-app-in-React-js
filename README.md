# Full Stack Login + Dashboard App (React + Spring Boot + MSSQL)

This workspace now includes:
- Frontend React app with Login page (`username`, `password`, `Login` button)
- Spring Boot backend API for authentication
- Microsoft SQL Server setup with database/user provisioning
- Dashboard page shown after successful login

## Project Structure

- `src/` : React frontend
- `backend/` : Spring Boot backend
- `backend/database/init.sql` : DB creation script
- `docker-compose.yml` : SQL Server container + DB init runner

## Database Credentials

As requested, SQL Server login is configured as:
- Username: `afm`
- Password: `afm`

Database name:
- `afm_auth_db`

## Authentication API

Backend endpoint:
- `POST /api/auth/login`

Request body:

```json
{
  "username": "afm",
  "password": "afm"
}
```

Success response:

```json
{
  "id": 1,
  "username": "afm",
  "fullName": "AFM User",
  "email": "afm@example.com"
}
```

## Prerequisites

Install these tools on your machine/dev container:
- Node.js + npm
- Java 17+
- Maven 3.9+
- Docker + Docker Compose

## Run Instructions

### 1) Start MSSQL and create DB/user automatically

```bash
docker compose up -d mssql mssql-init
```

### 2) Start Spring Boot backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:
- `http://localhost:8080`

### 3) Start React frontend

Open a new terminal:

```bash
npm install
npm start
```

Frontend runs on:
- `http://localhost:3000`

## Login in UI

Use these app login credentials (seeded automatically by backend):
- Username: `afm`
- Password: `afm`

After successful login, dashboard shows user profile details.

## Notes

- The backend uses BCrypt password hashing and stores a default user (`afm`) if not present.
- CORS is enabled for frontend origin `http://localhost:3000`.
- JPA auto-creates/updates the `users` table.
