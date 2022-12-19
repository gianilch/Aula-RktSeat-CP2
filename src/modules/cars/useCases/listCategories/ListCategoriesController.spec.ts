import { app } from "@shared/infra/http/app";
import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuid } from "uuid";

let connection: Connection;
describe("List Categories", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(user_id, name, email, password, "is_admin", driver_license)
        VALUES('${id}', 'Gian Carlos Ilchechen', 'admin@rentx.com.br', '${password}', true, 'XXXXXXXXXX')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all availables categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest Description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    let response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("category_id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });
});
