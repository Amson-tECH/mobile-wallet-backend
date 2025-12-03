# Mobile Wallet Backend API

A robust Node.js/Express backend API for the Mobile Wallet application, user balance tracking, and financial summaries with serverless PostgreSQL database.

## 🚀 Features

- **Transaction Management** - Create, retrieve, and delete financial transactions
- **Balance Tracking** - Real-time balance calculation and summaries
- **Income & Expense Analytics** - Separate tracking of income and expenses
- **Rate Limiting** - Built-in rate limiting with Upstash Redis
- **Automated Tasks** - Cron jobs for scheduled operations
- **Serverless Database** - Neon PostgreSQL for scalable data storage
- **CORS Enabled** - Cross-origin resource sharing support
- **Health Check** - API health monitoring endpoint

## 🛠️ Technology Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js (v5.1.0)
- **Database**: Neon (Serverless PostgreSQL)
- **Rate Limiting**: Upstash Redis
- **Task Scheduling**: node-cron
- **Environment Management**: dotenv

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Neon Database account
- Upstash Redis account (for rate limiting)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Amson-tECH/mobile-wallet-backend.git
cd mobile-wallet-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=your_neon_database_connection_string

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### 4. Initialize the Database

The database will be automatically initialized when you start the server. The `transactions` table will be created if it doesn't exist.

### 5. Start the Server

**Development mode (with nodemon):**
```bash
npm run server
```

**Production mode:**
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## 📁 Project Structure

```
mobile-wallet-backend/
├── src/
│   ├── config/
│   │   ├── db.js              # Database connection and initialization
│   │   ├── cron.js            # Cron job configuration
│   │   └── upstash.js         # Upstash Redis configuration
│   ├── middleware/
│   │   └── rateLimiter.js     # Rate limiting middleware
│   ├── routes/
│   │   └── transactionRoute.js # Transaction API routes
│   └── server.js              # Main application entry point
├── node_modules/
├── .env                       # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 🔌 API Endpoints

### Health Check

**GET** `/api/health`

Check if the API is running.

**Response:**
```json
{
  "message": "status is ok"
}
```

---


## 🔐 Security Features

### Rate Limiting

The API includes rate limiting via Upstash Redis to prevent abuse:
- Configured in `src/middleware/rateLimiter.js`
- Limits requests per IP address
- Automatic cleanup of old entries

### CORS

Cross-Origin Resource Sharing is enabled to allow requests from your frontend application.

## ⏰ Cron Jobs

The application includes scheduled tasks configured in `src/config/cron.js`:
- Runs only in production (`NODE_ENV=production`)
- Add your scheduled maintenance tasks here
- Examples: cleanup old data, generate reports, send notifications


## 📊 Available Scripts

- `npm start` - Start the server in production mode
- `npm run server` - Start the server in development mode with nodemon (auto-restart)

## 🚀 Deployment

### Recommended Platforms

- **Railway** - Easy deployment with PostgreSQL support
- **Vercel** - Serverless deployment
- **Render** - Free tier available
- **Heroku** - Traditional PaaS
- **AWS/GCP/Azure** - Enterprise solutions



## 🐛 Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (missing required fields)
- `404` - Not Found
- `505` - Server Error

All error responses include a message:
```json
{
  "success": false,
  "message": "Error description"
}
```



---

**Built with ❤️ for the Mobile Wallet App**