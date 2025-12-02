import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/health/route";
import { prisma } from "@/lib/prisma";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    $queryRaw: vi.fn(),
  },
}));

describe("Health Check API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return healthy status when database is operational", async () => {
    vi.mocked(prisma.$queryRaw).mockResolvedValue([{ "?column?": 1 }]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe("healthy");
    expect(data.services.database).toBe("operational");
    expect(data.services.api).toBe("operational");
    expect(data.timestamp).toBeDefined();
  });

  it("should return degraded status when database is unavailable", async () => {
    vi.mocked(prisma.$queryRaw).mockRejectedValue(
      new Error("Database connection failed"),
    );

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.status).toBe("degraded");
    expect(data.services.database).toBe("unavailable");
    expect(data.services.api).toBe("operational");
  });
});

