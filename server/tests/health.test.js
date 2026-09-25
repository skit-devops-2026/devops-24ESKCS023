const request = require("supertest");
const app = require("../app");

describe("health and metrics", () => {
  test("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  test("GET /metrics returns prometheus text", async () => {
    const res = await request(app).get("/metrics");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("http_requests_total");
  });

  test("unknown route returns 404", async () => {
    const res = await request(app).get("/nope");
    expect(res.statusCode).toBe(404);
  });
});