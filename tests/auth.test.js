import request from "supertest";
import app from "../index.js";

describe("Auth routes", () => {
  it("should register a user", async () => {
    const res = await request(app)
      .post("/register")
      .send({ username: "testuser", password: "1234" });
    expect(res.statusCode).toBe(201);
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "1234" });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
