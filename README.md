# I-Saúde Teleconsulta Service

## Overview
Telemedicine consultation service for I-Saúde platform that manages video consultations between healthcare professionals and patients.

## Tech Stack
- Node.js
- TypeScript
- Express.js
- WebRTC
- TypeORM
- PostgreSQL

## Main Features
- Video consultation scheduling
- Real-time video/audio communication
- Medical records management
- Prescription handling
- Appointment management

## Project Structure
```
src/
├── app/
│   ├── controllers/   # Request handlers
│   ├── entities/      # Database entities
│   ├── interfaces/    # TypeScript interfaces
│   ├── middlewares/   # Express middlewares
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── utils/        # Helper functions
├── database/
│   ├── migrations/    # Database migrations
│   └── typeorm.ts    # Database configuration
├── app.ts            # Express app configuration
├── routes.ts         # Main routes configuration
└── server.ts        # Server initialization
```

## API Documentation
Complete API documentation is available through Swagger at `/api-docs`.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=3003
NODE_ENV=development
DATABASE_URL=postgres://user:pass@localhost:5432/teleconsulta
WEBRTC_CONFIG=your_webrtc_config
```

3. Start development server:
```bash
npm run dev
```

4. Run database migrations:
```bash
npm run typeorm migration:run
```

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run migration:generate`: Generate new migration
- `npm run migration:run`: Run pending migrations

## Features in Detail

### Video Consultations
- Real-time video/audio communication
- Screen sharing capabilities
- Chat functionality during consultation
- Recording options (if enabled)

### Appointment Management
- Schedule consultations
- Cancel/reschedule appointments
- Reminder notifications
- Waiting room functionality

### Medical Records
- View/update patient records
- Prescription management
- Consultation history
- Document sharing

### Security
- Encrypted communications
- HIPAA compliance measures
- User authentication
- Session management

## Error Handling
Standardized error responses:
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Testing
Run tests using:
```bash
npm test
```

Unit tests and integration tests are available in the `__tests__` directory.
