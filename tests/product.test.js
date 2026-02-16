import request from "supertest";
import app from "../index.js";

let token;

beforeAll(async () => {
  await request(app).post("/register").send({ username: "produser", password: "1234" });
  const res = await request(app).post("/login").send({ username: "produser", password: "1234" });
  token = res.body.token;
});

describe("Product routes", () => {
  it("should create a product", async () => {
    const res = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Phone", price: 500, description: "Smartphone" });
    expect(res.statusCode).toBe(201);
  });
});
