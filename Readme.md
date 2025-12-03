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
git clone https://github.com/yourusername/mobile-wallet-backend.git
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

### Create Transaction

**POST** `/api/transactions`

Create a new transaction.

**Request Body:**
```json
{
  "user_id": "user_123",
  "title": "Grocery Shopping",
  "amount": -50.25,
  "category": "Food"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "user_id": "user_123",
  "title": "Grocery Shopping",
  "amount": -50.25,
  "category": "Food",
  "created_at": "2025-11-27"
}
```

---

### Get User Transactions

**GET** `/api/transactions/:userId`

Retrieve all transactions for a specific user, ordered by date (newest first).

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user_id": "user_123",
    "title": "Salary",
    "amount": 3000.00,
    "category": "Income",
    "created_at": "2025-11-27"
  },
  {
    "id": 2,
    "user_id": "user_123",
    "title": "Grocery Shopping",
    "amount": -50.25,
    "category": "Food",
    "created_at": "2025-11-26"
  }
]
```

---

### Delete Transaction

**DELETE** `/api/transactions/:id`

Delete a transaction by ID.

**Response:** `200 OK`
```json
{
  "message": "Transaction deleted successfully"
}
```

---

### Get Financial Summary

**GET** `/api/transactions/summary/:userId`

Get balance, income, and expenses summary for a user.

**Response:** `200 OK`
```json
{
  "balance": 2949.75,
  "income": 3000.00,
  "expenses": -50.25
}
```

## 🗄️ Database Schema

### Transactions Table

```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);
```

**Fields:**
- `id` - Auto-incrementing primary key
- `user_id` - User identifier from authentication service (Clerk)
- `title` - Transaction description
- `amount` - Transaction amount (positive for income, negative for expenses)
- `category` - Transaction category (e.g., Food, Income, Transport)
- `created_at` - Transaction date (defaults to current date)

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

## 🧪 Testing

```bash
npm test
```

*Note: Tests are not yet implemented. Add your test suite using Jest, Mocha, or your preferred testing framework.*

## 📊 Available Scripts

- `npm start` - Start the server in production mode
- `npm run server` - Start the server in development mode with nodemon (auto-restart)
- `npm test` - Run tests (to be implemented)

## 🚀 Deployment

### Recommended Platforms

- **Railway** - Easy deployment with PostgreSQL support
- **Vercel** - Serverless deployment
- **Render** - Free tier available
- **Heroku** - Traditional PaaS
- **AWS/GCP/Azure** - Enterprise solutions

### Deployment Steps (Example: Railway)

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and initialize:
```bash
railway login
railway init
```

3. Add environment variables in Railway dashboard

4. Deploy:
```bash
railway up
```

## 🔧 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 3000) |
| `NODE_ENV` | Environment (development/production) | No |
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token | Yes |

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📧 Support

For issues or questions:
- GitHub Issues: [Create an issue](https://github.com/yourusername/mobile-wallet-backend/issues)
- Email: support@mobilewalletapp.com

## 🙏 Acknowledgments

- [Neon](https://neon.tech/) - Serverless PostgreSQL database
- [Upstash](https://upstash.com/) - Serverless Redis for rate limiting
- [Express.js](https://expressjs.com/) - Web framework

---

**Built with ❤️ for the Mobile Wallet App**