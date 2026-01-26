# Créatifia - Frontend Creative Agency

## Overview

Créatifia is a modern frontend creative agency website built as a full-stack application offering $299 flat-rate websites delivered in 5 days. The site showcases frontend development services with a story-driven approach. The application features a dark-themed, award-style design with bold typography, smooth animations, and an editorial aesthetic designed to impress founders, startups, and SaaS teams.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing with lazy-loaded pages
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with custom CSS variables for theming (dark mode default)
- **UI Components**: shadcn/ui component library (New York style) with heavy customization
- **Animations**: Framer Motion for page transitions, scroll effects, and micro-interactions
- **Typography**: Custom fonts (Syne for display, Space Grotesk for tech, Inter for body)

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Build Process**: Custom build script using esbuild for server bundling and Vite for client

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all database table definitions
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod
- **Tables**: Users, Projects, and Contact Submissions

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components (shadcn/ui + custom)
│   │   ├── pages/       # Route pages (lazy-loaded)
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and query client
├── server/           # Backend Express application
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   └── schema.ts     # Drizzle database schema
└── attached_assets/  # Static image assets
```

### Key Design Decisions
1. **Monorepo Structure**: Client, server, and shared code in one repository with path aliases for clean imports
2. **Lazy Loading**: All page components are lazy-loaded to improve initial bundle size
3. **Dark Mode First**: The design defaults to dark mode for a premium, high-end aesthetic
4. **Type Safety**: End-to-end TypeScript with shared types between frontend and backend
5. **Component Memoization**: Performance-critical motion components use React.memo

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Connection**: Uses `pg` Pool with Drizzle ORM wrapper

### Third-Party Services
- **Google Fonts**: Syne, Space Grotesk, and Inter fonts loaded via CDN

### Key NPM Packages
- **UI Framework**: @radix-ui primitives for accessible components
- **Forms**: react-hook-form with @hookform/resolvers for Zod validation
- **Animations**: framer-motion for all motion effects
- **Date Handling**: date-fns for date formatting
- **Carousel**: embla-carousel-react for image carousels

### Development Tools
- **Replit Plugins**: vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner
- **Database Migrations**: drizzle-kit for schema management (`db:push` command)