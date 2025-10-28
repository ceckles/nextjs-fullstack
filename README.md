#Setup
create a .env file in the root directory and add your database connection string
```bash
# Neon Auth environment variables for Next.js
NEXT_PUBLIC_STACK_PROJECT_ID=''
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=''
STACK_SECRET_SERVER_KEY=''

# Database owner connection string
DATABASE_URL='postgresql://'
```

#SEED DB
```bash
node prisma/seed.ts
```

#Install Dependencies
`npm i`

`npm prisma generate`

#Prisma Commands
`npx prisma migrate dev --name init` #Run this command to create your database and run migrations

`npx prisma studio` #Run this command to open Prisma Studio and view your database

`npx prisma generate` #Run this command to regenerate Prisma Client after changing your schema

`npx prisma db push` #Run this command to push your Prisma schema state to the database without generating a migration

`npx prisma migrate reset` #Run this command to reset your database and apply all migrations

`npx prisma migrate dev --name <migration_name>` #Run this command to create a new migration with the specified name

`npx prisma db pull` #Run this command to update your Prisma schema based on the current state of your database