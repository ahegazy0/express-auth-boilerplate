# 🔐 Express Auth API Boilerplate

> Production-ready authentication API built with Express, MongoDB & JWT | Full OAuth integration, email verification, password reset and enterprise-grade security

[![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4+-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[Live Demo](https://express-auth-boilerplate.onrender.com/api/v1/auth/google) | [API Documentation](https://express-auth-boilerplate.onrender.com/api/v1/docs) | [Report Bug](https://github.com/ahegazy0/express-auth-boilerplate/issues) | [Request Feature](https://github.com/ahegazy0/express-auth-boilerplate/issues)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)
---

## ⚠️ Warn

**If you're using the deployed API on Render (not local), email features will NOT work.**
### Why?
Render's free tier blocks outgoing SMTP connections on ports 25, 465, and 587 for security reasons. This affects:
- ✉️ Email verification during registration
- 🔐 Password reset emails
- 📧 Any email-based features

### Solutions:

**Option 1: Run Locally** ✅

**Option 2: Switch Email Provider** 🔄

---

## ✨ Features

### 🔑 Authentication & Authorization
- ✅ **JWT Authentication** - Access & refresh token rotation
- ✅ **OAuth 2.0 Integration** - Google, GitHub, Microsoft
- ✅ **Email Verification** - Secure account activation
- ✅ **Password Reset** - Token-based password recovery
- ✅ **Role-Based Access Control** - User & Admin roles
- ✅ **HTTP-Only Cookies** - Secure refresh token storage

### 🛡️ Security
- ✅ **Rate Limiting** - Protection against brute force
- ✅ **Input Validation** - Comprehensive request validation
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **Helmet.js** - Security headers
- ✅ **CORS Configuration** - Cross-origin resource sharing
- ✅ **Audit Logging** - Track authentication events

### 📚 Documentation & Developer Experience
- ✅ **OpenAPI/Swagger** - Interactive API documentation
- ✅ **Request Logging** - Winston logger integration
- ✅ **Error Handling** - Centralized error management
- ✅ **Clean Architecture** - Skeleton design pattern
- ✅ **Environment Config** - Easy configuration management

---

## 🚀 Tech Stack

### Core
- **Runtime:** Node.js (v14+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + Passport.js

### Libraries & Tools
- **Validation:** Joi
- **Email:** Nodemailer
- **Security:** Helmet, bcrypt, express-rate-limit, cors
- **Logging:** Winston
- **Documentation:** Swagger UI Express
- **OAuth:** Passport strategies (Google, GitHub, Microsoft)

---

## 🏗️ Architecture

This project follows the **Skeleton Design Pattern** with a clean, modular architecture:

```
┌─────────────┐
│   Routes    │ ← HTTP endpoints
└──────┬──────┘
       │
┌──────▼──────┐
│ Controllers │ ← Request handling
└──────┬──────┘
       │
┌──────▼──────┐
│  Services   │ ← Business logic
└──────┬──────┘
       │
┌──────▼──────┐
│   Models    │ ← Data layer
└─────────────┘
```

**Key Principles:**
- Separation of concerns
- Single responsibility
- Dependency injection
- Middleware-based architecture

---

## 📁 Project Structure

```
express-auth-boilerplate/
├── src/
│   ├── config/                # Configuration files
│   ├── controllers/           # Route controllers (request handlers)
│   ├── services/              # Business logic layer
│   ├── models/                # Mongoose schemas & models
│   ├── routes/                # API route definitions
│   ├── middlewares/           # Express middleware functions
│   ├── validations/           # Input validation schemas
│   ├── strategies/            # Passport OAuth strategies
│   ├── utils/                 # Utility functions & helpers
│   ├── docs/                  # API documentation
│   ├── app.js                 # Express app configuration
│   └── index.js               # Application entry point
├── .env                       # Environment variables 
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── package.json               # NPM dependencies & scripts
├── package-lock.json          # Locked dependency versions
└── README.md                  # Project documentation
```
---

## 🎯 Getting Started

### Prerequisites

```bash
node >= 16.0.0
npm >= 8.0.0
MongoDB >= 4.0
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ahegazy0/express-auth-boilerplate.git
cd express-auth-boilerplate
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration variables as shown in the [Environment Variables](#-environment-variables)

4. **Run the application**

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

5. **Access the API**
- API Base URL: `http://localhost:5000/api/v1`
- Swagger Documentation: `http://localhost:5000/api/v1/docs`

---

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint                              | Auth        | Description                          |
|--------|---------------------------------------|-------------|--------------------------------------|
| POST   | `/api/v1/auth/register`               | Public      | Register new user                    |
| GET    | `/api/v1/auth/verify-email?token=...` | Public      | Verify email address                 |
| POST   | `/api/v1/auth/login`                  | Public      | Login (returns access + refresh)     |
| POST   | `/api/v1/auth/logout`                 | Cookie      | Logout and invalidate tokens         |
| POST   | `/api/v1/auth/refresh-token`          | Cookie      | Get new access token                 |
| POST   | `/api/v1/auth/forgot-password`        | Public      | Send password reset email            |
| PATCH  | `/api/v1/auth/reset-password?token=...`| Public     | Reset password with token            |

### User Endpoints

| Method | Endpoint                              | Auth        | Description                          |
|--------|---------------------------------------|-------------|--------------------------------------|
| GET    | `/api/v1/auth/me`                     | Bearer      | Get current user profile             |
| PATCH  | `/api/v1/users/me`                    | Bearer      | Update user profile                  |

### OAuth Endpoints

| Method | Endpoint                              | Auth        | Description                          |
|--------|---------------------------------------|-------------|--------------------------------------|
| GET    | `/api/v1/auth/google`                 | Public      | Initiate Google OAuth flow           |
| GET    | `/api/v1/auth/google/callback`        | Public      | Google OAuth callback                |
| GET    | `/api/v1/auth/github`                 | Public      | Initiate GitHub OAuth flow           |
| GET    | `/api/v1/auth/github/callback`        | Public      | GitHub OAuth callback                |
| GET    | `/api/v1/auth/microsoft`              | Public      | Initiate Microsoft OAuth flow        |
| GET    | `/api/v1/auth/microsoft/callback`     | Public      | Microsoft OAuth callback             |

### 📖 Interactive Documentation

Visit [API Documentaion](https://express-auth-boilerplate.onrender.com/api/v1/docs) for complete Swagger/OpenAPI documentation with request/response examples and testing interface.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory. See `.env.example` for all required variables:

### Required Variables

| Variable                  | Description                          | Example                           |
|---------------------------|--------------------------------------|-----------------------------------|
| `NODE_ENV`                | Environment mode                     | `development` / `production`      |
| `PORT`                    | Server port                          | `5000`                            |
| `MONGODB_URI`             | MongoDB connection string            | `mongodb://localhost:27017/auth`  |
| `JWT_ACCESS_SECRET`       | Secret for access tokens             | `your-secret-key`                 |
| `JWT_REFRESH_SECRET`      | Secret for refresh tokens            | `your-secret-key`                 |
| `JWT_PASSWORD_RESET_SECRET`| Secret for access tokens            | `your-secret-key`                 |
| `JWT_ACCESS_EXPIRES_IN`   | Expire for refresh tokens            | `15m`                             |
| `JWT_REFRESH_EXPIRES_IN`  | Secret for refresh tokens            | `7d`                              |
| `JWT_REFRESH_COOKIE_EXPIRES_IN`| Secret for refresh tokens       | `7d`                              |


### Optional (OAuth)

| Variable                     | Description                       | Examples
|------------------------------|-----------------------------------|----------------------------
| `GOOGLE_CLIENT_ID`           | Google OAuth client ID            |`your-google-client-id`       |
| `GOOGLE_CLIENT_SECRET`       | Google OAuth client secret        |`your-google-client-secret`   |
| `GOOGLE_REFRESH_TOKEN`       | Google refresh token              |`your-googlel-refresh-token`  |
| `GOOGLE_CALLBACK_URL`        | OAuth callback path               |`/api/v1/auth/google/callback`|
| `GOOGLE_REDIRECT_URI`        | OAuth redirect URI                | `https://developers.google.com/oauthplayground`
| `GOOGLE_USER`                | Google user email                 |`your-email@gmailcom`         |
| `GITHUB_CLIENT_ID`           | GitHub OAuth client ID            |`your_github_client_id`       |
| `GITHUB_CLIENT_SECRET`       | GitHub OAuth client secret        |`your_github_client_secret`   |
| `GITHUB_CALLBACK_URL`        | OAuth callback path               |`/api/v1/auth/github/callback`|
| `MICROSOFT_CLIENT_ID`        | Microsoft OAuth client ID         |`your_microsoft_client_id`    |
| `MICROSOFT_CLIENT_SECRET`    | Microsoft OAuth client secret     |`your_microsoft_client_secret`|
| `MICROSOFT_CALLBACK_URL`     | OAuth callback path               |`/api/v1/auth/microsoft/callback`|

---

## 📦 Deployment

### Deploy to Production

1. **Set environment to production**
```env
NODE_ENV=production
```

2. **Build and start**
```bash
npm start
```

### Deploy to Render

This project is configured for Render deployment:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard
4. Deploy!

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">
  Made with ❤️ by Abdulrahman Hegazy
</div>
