# Bank Security Admin Dashboard

A modern React application for bank security administrators to monitor and manage fraudulent transactions.

## Features

- View all flagged fraudulent transactions
- Detailed view of each transaction
- Take actions on suspicious transactions (investigate, block, flag, or clear)
- Real-time status updates
- Responsive design for all devices

## Tech Stack

- React 18
- TypeScript
- Vite
- Material-UI
- React Router
- Axios

## Prerequisites

- Node.js 14.x or later
- npm 6.x or later

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bank-security-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API configuration:
```env
VITE_API_BASE_URL=http://your-api-url
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The application expects the following API endpoints:

- `GET /api/transactions/fraudulent` - List all fraudulent transactions
- `GET /api/transactions/fraudulent/:id` - Get details of a specific transaction
- `POST /api/transactions/:id/action` - Take action on a transaction

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
