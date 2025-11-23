# Next.js Fullstack Inventory Management

A test fullstack application built with Next.js 16, featuring an inventory management system with authentication, product management, and analytics dashboard.

## 🚀 Tech Stack

### Frontend
- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Recharts** - Chart library for data visualization

### Backend
- **Next.js Server Actions** - Server-side logic
- **Prisma 6.18.0** - Type-safe database ORM
- **PostgreSQL** (via Neon) - Database
- **Zod** - Schema validation

### Authentication
- **Stack Auth** - Authentication and user management (configured within Neon)

### Development Tools
- **Biome** - Fast formatter and linter
- **Turbopack** - Fast bundler (Next.js default)

## ✨ Features

- 🔐 **Authentication** - Secure user authentication with Stack Auth
- 📦 **Product Management** - Create, view, and delete products
- 📊 **Dashboard** - Analytics dashboard with charts and metrics
- 📋 **Inventory** - View and manage inventory with pagination and search
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🔍 **Search** - Real-time product search functionality
- 📈 **Analytics** - Product trends and stock level visualizations

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 20.x or higher
- **pnpm** (or npm/yarn)
- A **Neon** account (for PostgreSQL database and Stack Auth)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd nextjs-fullstack
```

### 2. Install Dependencies

```bash
pnpm install
```

This will automatically run `prisma generate` via the `postinstall` script.

### 3. Set Up Neon Database and Stack Auth

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project if not done so already
3. Copy your **database connection string** (it will look like `postgresql://user:password@host/database`)
4. In your Neon project, navigate to **Stack Auth** settings (configured within Neon)
5. Get your Stack Auth credentials:
   - `NEXT_PUBLIC_STACK_PROJECT_ID`
   - `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
   - `STACK_SECRET_SERVER_KEY`

### 4. Initialize Stack Auth

Run the Stack Auth initialization command:

```bash
npx @stackframe/init-stack . --no-browser
```

This will set up the necessary Stack Auth configuration files in your project.

### 5. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Database connection string from Neon
DATABASE_URL='postgresql://user:password@host/database?sslmode=require'

# Stack Auth credentials
NEXT_PUBLIC_STACK_PROJECT_ID='your-project-id'
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='your-publishable-key'
STACK_SECRET_SERVER_KEY='your-secret-key'
```

### 6. Set Up Prisma

Generate Prisma Client and run migrations:

```bash
# Generate Prisma Client (runs automatically on install, but you can run manually)
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev --name init
```

### 7. Seed the Database (Optional)

Populate the database with sample data:

```bash
node prisma/seed.ts
```

### 8. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
nextjs-fullstack/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard page with analytics
│   ├── inventory/          # Inventory management page
│   ├── add-product/        # Add new product page
│   ├── sign-in/            # Authentication page
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── sidebar.tsx         # Navigation sidebar
│   └── products-chart.tsx  # Chart component
├── lib/                    # Utility functions and configurations
│   ├── prisma.ts           # Prisma client instance
│   ├── auth.ts             # Authentication helpers
│   └── actions/             # Server actions
│       └── products.ts     # Product CRUD operations
├── prisma/                 # Prisma configuration
│   ├── schema.prisma       # Database schema
│   ├── seed.ts             # Database seed script
│   └── migrations/        # Database migrations
└── stack/                  # Stack Auth configuration
    ├── client.tsx          # Client-side Stack Auth setup
    └── server.tsx          # Server-side Stack Auth setup
```

## 🗄️ Database Schema

The application uses a single `Product` model:

- `id` - Unique identifier (CUID)
- `userId` - Owner's authentication ID
- `name` - Product name
- `sku` - Stock keeping unit (optional, unique)
- `price` - Product price (Decimal with 2 decimal places)
- `quantity` - Current stock quantity
- `lowStockThreshold` - Alert threshold for low stock
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## 🚀 Available Scripts

```bash
# Development
pnpm dev              # Start development server

# Build
pnpm build            # Build for production (includes prisma generate)
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run Biome linter
pnpm format           # Format code with Biome

# Database
pnpm prisma generate  # Generate Prisma Client
pnpm prisma studio    # Open Prisma Studio (database GUI)
pnpm prisma migrate dev --name <name>  # Create and run migration
pnpm prisma db push   # Push schema changes without migration
```

## 🔧 Prisma Commands

```bash
# Generate Prisma Client after schema changes
pnpm prisma generate

# Create and apply a new migration
pnpm prisma migrate dev --name <migration_name>

# Open Prisma Studio (database GUI)
pnpm prisma studio

# Push schema changes to database (no migration)
pnpm prisma db push

# Reset database and apply all migrations
pnpm prisma migrate reset

# Pull schema from existing database
pnpm prisma db pull
```

## 🌐 Deployment

### Vercel Deployment

1. **Push your code** to GitHub/GitLab/Bitbucket

2. **Import project** in [Vercel](https://vercel.com/)

3. **Configure Environment Variables** in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_STACK_PROJECT_ID`
   - `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
   - `STACK_SECRET_SERVER_KEY`

4. **Build Settings** (usually auto-detected):
   - Build Command: `pnpm run build`
   - Install Command: `pnpm install`
   - Output Directory: `.next`

5. **Deploy!** The `postinstall` script will automatically generate Prisma Client during the build.

### Important Notes for Deployment

- The `postinstall` script ensures Prisma Client is generated automatically
- Make sure all environment variables are set in your deployment platform
- Run migrations on your production database before first deployment:
  ```bash
  pnpm prisma migrate deploy
  ```

## 🧪 Testing the Application

1. **Sign In**: Use Stack Auth to create an account or sign in
2. **Add Products**: Navigate to "Add Product" and create some products
3. **View Inventory**: Check the inventory page to see all products
4. **Dashboard**: View analytics and charts on the dashboard

## 📝 Notes

- This is a **test/learning project** for Next.js fullstack development
- The application demonstrates modern Next.js patterns including:
  - Server Components
  - Server Actions
  - Type-safe database queries with Prisma
  - Authentication integration
  - Responsive UI design

## 🤝 Contributing

This is a test project, but feel free to fork and modify for your own learning!

## 📄 License

This project is for educational purposes.
