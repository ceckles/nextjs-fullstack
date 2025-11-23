"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";

//Schema for Zod to validate the form data
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockthreshold: z.coerce.number().int().min(0).optional(),
});

export async function deleteProduct(formData: FormData) {
  //Server Action to delete a product
  //ensure user is authenticated able to delete product if not redirect to sign-in.
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const id = formData.get("productId");

  if (!id || typeof id !== "string" || id === "") {
    throw new Error("Product ID is required");
  }

  await prisma.product.deleteMany({
    where: {
      id: id,
      userId: user.id,
    },
  });
}

export async function createProduct(formData: FormData) {
  //Server action to create a product
  //ensure user is authenticated able to create product if not redirect to sign-in.
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  //Parse form data and validate it using Zod
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockThreshold: formData.get("lowStockthreshold") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Validation failed");
  }
  try {
    await prisma.product.create({
      //spread the parsed data and add the user id to the data
      data: { ...parsed.data, userId: user.id },
    });
    redirect("/inventory");
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
}
