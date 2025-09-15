# Smart Classroom Management System

A comprehensive classroom management web application built with Next.js, React, and TypeScript. This system provides educators and administrators with powerful tools to manage classrooms, faculty, subjects, timetables, and student activities efficiently.

## 📋 Project Overview

The Smart Classroom Management System is designed to streamline educational administration through an intuitive, modern interface. It offers complete classroom management capabilities including user authentication, dashboard analytics, faculty management, subject organization, and automated timetable generation.

## ✨ Key Features

- **🔐 Authentication System** - Secure sign-in and sign-up functionality
- **📊 Dashboard Overview** - Comprehensive analytics and quick access to key metrics
- **🏫 Classroom Management** - Create, edit, and manage classroom information
- **👨‍🏫 Faculty Management** - Maintain faculty profiles and assignments
- **📚 Subject Management** - Organize subjects and course information
- **📅 Timetable Generator** - Automated timetable creation and management
- **📝 Data Input Forms** - Streamlined data entry and validation
- **✅ Review & Approval System** - Workflow for content review and approval
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI** - Clean, accessible interface built with shadcn/ui components

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - Modern, accessible component library
- **Icons:** [Lucide React](https://lucide.dev/) - Beautiful, customizable icons
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) - Form handling and validation
- **Charts:** [Recharts](https://recharts.org/) - Data visualization
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes) - Dark/light mode support
- **Package Manager:** [pnpm](https://pnpm.io/) - Fast, disk space efficient

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <YOUR_GIT_URL>
   cd smart_classroom
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality

## 📁 Project Structure

```
smart_classroom/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard and main app pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.jsx           # Home page
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── public/               # Static assets
└── styles/               # Additional stylesheets
```

## 🎯 Core Modules

### Authentication

- Secure user registration and login
- Protected routes and session management

### Dashboard

- Overview analytics and key metrics
- Quick navigation to all system modules

### Classroom Management

- Create and manage classroom information
- Track capacity, equipment, and availability

### Faculty Management

- Maintain faculty profiles and contact information
- Assign subjects and track teaching loads

### Subject Management

- Organize academic subjects and courses
- Manage prerequisites and credit hours

### Timetable Generation

- Automated schedule creation
- Conflict detection and resolution
- Export capabilities

### Data Input & Review

- Streamlined data entry forms
- Validation and error handling
- Review and approval workflows
- TypeScript for better development experience

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
