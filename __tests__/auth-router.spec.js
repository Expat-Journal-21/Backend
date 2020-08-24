const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/db-config");

describe("Auth Routes", () => {
  const testUserRegister = {
    username: "New Test User",
    name: "Test",
    email: "test123123@email.com",
    password: "1234"
  };
  const testUserRegister2 = {
    username: "New Test User2",
    name: "Test",
    email: "test123123123@email.com",
    password: "1234"
  };


  beforeAll(async () => {
    await db("posts").truncate()
})

beforeAll(async () => {
    await db("users").truncate()
})

 

  describe("POST /register", () => {

    beforeAll(async () => {
        await db("users").truncate()
    })
      it("Should return 201", () => {
          return supertest(server)
          .post("/api/auth/register")
          .send(testUserRegister)
          .then((res) => {
              expect(res.status).toBe(201)
          })
      })
      it("Should return JSON", () => {
        return supertest(server)
        .post("/api/auth/register")
        .send(testUserRegister)
        .then((res) => {
          expect(res.type).toMatch(/json/);
        });
      })
      it("Should return 400 if missing req data", () => {
        return supertest(server)
        .post("/api/auth/register")
        .then(res => {
            expect(res.status).toBe(400)
        })
    })
  }),
  describe("POST /login", () => {
    

    it("Should return 200", async () => {
      await supertest(server)
        .post("/api/auth/register")
        .send(testUserRegister);

      return supertest(server)
        .post("/api/auth/login")
        .send({ username: "New Test User", password: "1234" })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("Should return JSON", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({ username: "New Test User", password: "1234" })
        .then((res) => {
          expect(res.type).toMatch(/json/);
        });
    });
    it("Should return 401 if passwords do not match", async () => {
        await supertest(server)
        .post("/api/auth/register")
        .send(testUserRegister);

      return supertest(server)
        .post("/api/auth/login")
        .send({ username: "New Test User", password: "123" })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    })
    it("Should return a token", async () => {
        await supertest(server)
        .post("/api/auth/register")
        .send(testUserRegister);

      return supertest(server)
        .post("/api/auth/login")
        .send({ username: "New Test User", password: "1234" })
        .then((res) => {
          expect(res.body.token).not.toBeUndefined()
        });
    })
    
  });
});
