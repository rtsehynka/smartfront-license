# SmartFront Activation Server

Simple activation/usage tracking server for SmartFront License System.

## Deployment Options

### Option 1: Vercel (Recommended - Free)

1. Create new Vercel project
2. Copy `api/` folder to your project
3. Add environment variables:
   - `ACTIVATION_SECRET` - your secret key
   - `MONGODB_URI` - MongoDB connection (MongoDB Atlas free tier)
4. Deploy

### Option 2: Railway/Render

1. Create new project
2. Use `server.js` as entry point
3. Add environment variables
4. Deploy

## API Endpoints

### POST /api/report
Receives usage reports from SmartFront installations.

**Request:**
```json
{
  "domain": "example.com",
  "clientId": "admin_123",
  "version": "1.0.0",
  "timestamp": "2026-03-02T12:00:00Z",
  "environment": "production",
  "metadata": {
    "event": "admin_login",
    "username": "admin"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Usage recorded"
}
```

### GET /api/activations
List all recorded activations (protected).

### GET /api/domains
List unique domains using the platform.

## Database Schema

```javascript
{
  domain: String,
  clientId: String,
  version: String,
  timestamp: Date,
  environment: String,
  metadata: Object,
  ip: String,
  createdAt: Date
}
```

## Environment Variables

```env
ACTIVATION_SECRET=your-secret-key-here
MONGODB_URI=mongodb+srv://...
NOTIFICATION_EMAIL=roman.tsehynka@gmail.com
```
