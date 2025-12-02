import { expect, test } from "@playwright/test";

test.describe("Health Check", () => {
  test("should return healthy status", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.status).toBe("healthy");
    expect(data.services).toBeDefined();
    expect(data.timestamp).toBeDefined();
  });

  test("should have correct response structure", async ({ request }) => {
    const response = await request.get("/api/health");
    const data = await response.json();

    expect(data).toHaveProperty("status");
    expect(data).toHaveProperty("timestamp");
    expect(data).toHaveProperty("services");
    expect(data.services).toHaveProperty("database");
    expect(data.services).toHaveProperty("api");
  });
});
