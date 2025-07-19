# Finance Min

A minimal personal finance management application built with Next.js 15, designed to help users track expenses, manage budgets, and organize financial data through cycles and categories.

## Overview

Finance Min is a modern web application that provides a streamlined approach to personal financial management. The app organizes your finances into manageable "cycles" (time periods) and allows you to categorize expenses across different types of spending categories.

### Key Features

- **Cycle-based Management**: Organize your finances into time-based cycles for better focus and planning
- **Smart Categories**: Create and manage different types of categories:
  - **Variable**: Flexible spending categories that can overflow to other categories
  - **Fixed**: Consistent expenses like rent and utilities
  - **Goal**: Long-term savings objectives
- **Transaction Tracking**: Record and categorize all your financial transactions
- **Receipt Management**: Store and organize digital receipts
- **Payment Methods**: Manage multiple payment sources
- **User Authentication**: Secure login system with NextAuth.js
- **Real-time Updates**: Modern React 19 features with Server Actions and `useActionState`

### Tech Stack

- **Frontend**: Next.js 15 with React 19 features
- **Styling**: Tailwind CSS with SCSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: Preact Signals
- **UI Components**: Lucide React icons, custom drawer components
- **Animations**: Motion library
- **Type Safety**: TypeScript with Zod validation

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up your environment variables (copy `.env.example` to `.env.local`)

4. Set up the database:

```bash
npm run add:migrations
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── (authenticated)/     # Protected routes
│   │   ├── dashboard/       # Main dashboard
│   │   ├── categories/      # Category management
│   │   ├── cycles/          # Financial cycles
│   │   ├── receipts/        # Receipt storage
│   │   └── payment-methods/ # Payment method management
│   ├── api/                 # API routes
│   ├── dao/                 # Data access layer
│   └── login/               # Authentication
├── components/              # Reusable UI components
├── lib/                     # Utilities and configurations
└── services/                # Business logic services
```

## Development

### Database Migrations

When you make changes to the Prisma schema:

```bash
npm run add:migrations
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Features in Detail

### Categories
- Create custom spending categories with color coding
- Set up overflow relationships between categories
- Track balances and spending patterns
- Support for different category types (Variable, Fixed, Goal)

### Cycles
- Organize finances into manageable time periods
- Track spending across different cycles
- Focus on current financial management rather than historical data

### Transactions
- Record all financial transactions
- Link transactions to categories and receipts
- Track spending patterns over time

### Authentication
- Secure user authentication with NextAuth.js
- User-specific data isolation
- Account management functionality

## Contributing

This is a personal project, but contributions and suggestions are welcome. Please feel free to open issues or submit pull requests.

## License

This project is private and not currently licensed for public use.