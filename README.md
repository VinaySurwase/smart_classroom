# Smart Classroom Management System

A modern classroom management application built with React and TypeScript.

## Project Overview

This Smart Classroom Management System provides tools for managing classroom schedules, timetables, and educational activities. It features a clean, responsive interface designed to help educators and students organize their academic activities efficiently.

## How to run this project

Follow these steps to set up and run the project locally:

### Prerequisites

Make sure you have Node.js & npm installed.

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd smart_classroom

# Step 3: Navigate to the frontend directory
cd frontend

# Step 4: Install the necessary dependencies
npm i

# Step 5: Start the development server with auto-reloading and an instant preview
npm run dev
```

## Technologies Used

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - Component-based UI library
- **shadcn-ui** - Modern UI component library
- **Tailwind CSS** - Utility-first CSS framework

## Features

- Interactive timetable management
- Responsive design for desktop and mobile
- Modern UI components
- TypeScript for better development experience

## Project Structure

```
smart_classroom/
├── frontend/           # Frontend React application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/             # Base UI components (shadcn-ui)
│   │   │   ├── TimetableDisplay.tsx
│   │   │   └── TimetableForm.tsx
│   │   ├── pages/              # Application pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Index.tsx
│   │   │   ├── Login.tsx
│   │   │   └── NotFound.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility functions
│   │   └── assets/             # Static assets
│   ├── public/                 # Static public files
│   ├── index.html              # Main HTML template
│   ├── package.json            # Frontend dependencies
│   └── vite.config.ts          # Vite configuration
├── backend/            # Backend services (if any)
└── README.md           # Project documentation
```

## Development

To start developing:

1. Navigate to the frontend directory: `cd frontend`
2. Run `npm run dev` to start the development server
3. Open your browser to `http://localhost:8080`
4. Start editing files - changes will be reflected automatically

## Build for Production

```sh
cd frontend
npm run build
```

This will create a `dist` folder with optimized production files.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
