# Cyber Style Portfolio

Modern, cyberpunk-styled portfolio web application built with React and TypeScript.

## Project Overview

This is a personal portfolio website featuring a cyberpunk aesthetic with smooth animations and modern UI components.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

Follow these steps to set up the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd cyber-style-portfolio

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

### Build for Production

```sh
npm run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```sh
npm run preview
```

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - High-quality component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Project Structure

```
cyber-style-portfolio/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── assets/         # Static assets
├── server.js           # Express backend server
├── public/             # Public assets
└── ...
```

## Backend Server Setup

The project includes an Express.js backend server for handling email submissions.

### Development

1. **Create a `.env` file** in the root directory:

```env
PORT=3001
SMTP_HOST=smtp.rackhost.hu
SMTP_PORT=465
SMTP_USER=your-email@galacziarnold.com
SMTP_PASSWORD=your-email-password
RECIPIENT_EMAIL=your-email@galacziarnold.com
```

2. **Start the backend server:**
```sh
npm run dev:server
```

3. **Start the frontend (in a separate terminal):**
```sh
npm run dev
```

Or start both at once:
```sh
npm run dev:all
```

### Production

For production deployment, make sure to set the environment variables on your hosting platform.

**Note:** 
- `SMTP_USER` should be your full email address (e.g., `tinkodev@galacziarnold.com`)
- `SMTP_PASSWORD` is your email account password
- `RECIPIENT_EMAIL` is where you want to receive the contact form submissions (can be the same as `SMTP_USER`)

## Available Scripts

- `npm run dev` - Start frontend development server (Vite)
- `npm run dev:server` - Start backend server (Express)
- `npm run dev:all` - Start both frontend and backend simultaneously
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run start` - Start backend server in production mode
- `npm run lint` - Run ESLint

## License

This project is private and personal.
