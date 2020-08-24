const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/db-config");

describe("Public Router", () => {

    describe("GET /", () => {
        it("Should return 200", () => {
            return supertest(server)
            .get("/api/public")
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("Should return json", () => {
            return supertest(server)
            .get("/api/public")
            .then(res => {
                expect(res.type).toMatch(/json/)
            })
        })
    })
})