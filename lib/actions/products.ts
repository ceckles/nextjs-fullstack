"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";

export async function deleteProduct(formData: FormData) {
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