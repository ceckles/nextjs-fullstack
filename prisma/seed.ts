import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const demoUserId = "bd130e58-6b16-4ef2-ae26-7c1b9db307bb";

  // Create sample products
  await prisma.product.createMany({
    data: Array.from({ length: 90 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      price: (Math.random() * 90 + 10).toFixed(2),
      sku: `SKU-${1000 + i}`,
      quantity: Math.floor(Math.random() * 20),
      lowStockThreshold: Math.floor(Math.random() * 20) + 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    })),
  });

  console.log("Seed data created successfully!");
  console.log(`Created 25 products for user ID: ${demoUserId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
