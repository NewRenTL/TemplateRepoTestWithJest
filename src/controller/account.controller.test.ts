import request from "supertest";
import app from "../app";

describe("GET /billetera/contactos", () => {
  it("should return contacts for a valid account number", async () => {
    const response = await request(app).get("/api/accounts/billetera/contactos?minumero=21345");

    expect(response.status).toBe(200);

    expect(response.body).toEqual([
      { number: "123", name: "Luisa" },
      { number: "456", name: "Andrea" },
    ]);
  });

  it("should return 404 if account does not exist", async () => {
    const response = await request(app).get("/api/accounts/billetera/contactos?minumero=99999");

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      error: "No se encontró la cuenta con número 99999.",
    });
  });

  it("should return 400 if no account number is provided", async () => {
    const response = await request(app).get("/api/accounts/billetera/contactos");

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      error: "El parámetro 'minumero' es requerido.",
    });
  });
});
