# Galaxy Grid Website

A modern, responsive website for Galaxy Grid with an admin panel for managing contact forms and users.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Admin Panel](#admin-panel)
- [Contributing](#contributing)
- [License](#license)

## Features

- Responsive design for all device sizes
- Modern UI with 3D canvas effects
- Contact form with validation
- Admin panel for managing contacts and users
- Dark/light theme support
- Real-time data management
- Secure authentication system

## Tech Stack

### Frontend
- React 18
- Vite (bundler)
- Tailwind CSS (styling)
- React Router (navigation)
- Font Awesome (icons)

### Backend
- Node.js
- Express.js
- MongoDB (database)
- Mongoose (ODM)
- JWT (authentication)
- Bcrypt (password hashing)

### Other Tools
- ESLint (code linting)
- Git (version control)

## Project Structure

```
galaxy-grid-website/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── admin/          # Admin panel components
│   │   ├── components/     # Reusable UI components
│   │   ├── data/           # Static data files
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
├── server/                 # Backend Express application
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Database models
│   └── routes/             # API routes
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd galaxy-grid-website
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create environment files (see [Environment Variables](#environment-variables))

5. Start the server:
```bash
cd ../server
npm run dev
```

6. In a new terminal, start the client:
```bash
cd client
npm run dev
```

## Usage

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd client
npm run dev
```

3. Open your browser to `http://localhost:5173` to view the application.

### Admin Panel

The admin panel is accessible at `/admin` and provides:
- Dashboard with statistics
- Contact form management
- User management
- Status and priority updates

To access the admin panel, you'll need valid admin credentials.

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (if enabled)
- `POST /api/auth/logout` - User logout

### Contacts
- `GET /api/contacts` - Get all contact forms
- `POST /api/contacts` - Submit a new contact form
- `PUT /api/contacts/:id/status` - Update contact status
- `PUT /api/contacts/:id/priority` - Update contact priority
- `DELETE /api/contacts/:id` - Delete a contact (soft delete)

### Admin
- `GET /api/admin/contacts` - Get all contacts for admin
- `GET /api/admin/users` - Get all admin users
- `POST /api/admin/users` - Create admin user
- `DELETE /api/admin/users/:id` - Delete admin user

## Environment Variables

### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/galaxy-grid
JWT_SECRET=your-jwt-secret-key
PORT=5000
NODE_ENV=development
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Admin Panel

The admin panel provides comprehensive management capabilities:

### Features
- View all submitted contact forms
- Update contact statuses (New, In Progress, Resolved, Closed)
- Set priority levels (Low, Medium, High, Urgent)
- Manage admin users
- View statistics and analytics

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.