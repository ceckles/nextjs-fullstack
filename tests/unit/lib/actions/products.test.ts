import { describe, it, expect, vi, beforeEach } from "vitest";
import { createProduct, deleteProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Mock dependencies
vi.mock("@/lib/auth");
vi.mock("@/lib/prisma", () => ({
  prisma: {
    product: {
      create: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("Product Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createProduct", () => {
    it("should create a product with valid data", async () => {
      const mockUser = { id: "user-123" };
      vi.mocked(getCurrentUser).mockResolvedValue(mockUser as any);
      vi.mocked(prisma.product.create).mockResolvedValue({
        id: "product-123",
        userId: "user-123",
        name: "Test Product",
        price: 10.99,
        quantity: 5,
        sku: "SKU-001",
        lowStockThreshold: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any);

      const formData = new FormData();
      formData.append("name", "Test Product");
      formData.append("price", "10.99");
      formData.append("quantity", "5");
      formData.append("sku", "SKU-001");
      formData.append("lowstockthreshold", "3");

      await expect(createProduct(formData)).resolves.not.toThrow();
      expect(prisma.product.create).toHaveBeenCalledWith({
        data: {
          name: "Test Product",
          price: 10.99,
          quantity: 5,
          sku: "SKU-001",
          lowStockThreshold: 3,
          userId: "user-123",
        },
      });
    });

    it("should handle validation errors", async () => {
      const mockUser = { id: "user-123" };
      vi.mocked(getCurrentUser).mockResolvedValue(mockUser as any);

      const formData = new FormData();
      formData.append("name", ""); // Invalid: empty name
      formData.append("price", "-10"); // Invalid: negative price

      await expect(createProduct(formData)).rejects.toThrow(
        "Validation failed",
      );
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product with valid ID", async () => {
      const mockUser = { id: "user-123" };
      vi.mocked(getCurrentUser).mockResolvedValue(mockUser as any);
      vi.mocked(prisma.product.deleteMany).mockResolvedValue({ count: 1 });

      const formData = new FormData();
      formData.append("productId", "product-123");

      await expect(deleteProduct(formData)).resolves.not.toThrow();
      expect(prisma.product.deleteMany).toHaveBeenCalledWith({
        where: {
          id: "product-123",
          userId: "user-123",
        },
      });
    });

    it("should throw error for missing product ID", async () => {
      const mockUser = { id: "user-123" };
      vi.mocked(getCurrentUser).mockResolvedValue(mockUser as any);

      const formData = new FormData();

      await expect(deleteProduct(formData)).rejects.toThrow(
        "Product ID is required",
      );
    });
  });
});

