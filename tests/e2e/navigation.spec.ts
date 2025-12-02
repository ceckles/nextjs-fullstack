import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("should load home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Inventory Management/i);
  });

  test("should redirect to sign-in when not authenticated", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    // Should redirect to sign-in or show sign-in page
    await expect(page).toHaveURL(/sign-in/);
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");
    // Check that navigation elements exist (if visible)
    const signInLink = page.getByRole("link", { name: /sign in/i });
    await expect(signInLink).toBeVisible();
  });
});
