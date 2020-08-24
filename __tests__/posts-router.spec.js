const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/db-config");
const { signToken } = require("../helpers/auth-helpers");
describe("Posts Router", () => {
  
  
  const testUser = {
    username: "TestVippsiTest",
    name: "Test Name",
    email: "TestVippsi1@email.com",
    password: "test123",
  };

  beforeAll(async () => {
    await supertest(server).post("/api/auth/register").send(testUser);


    await db("posts").truncate();

    return supertest(server)
      .post("/api/auth/login")
      .send(testUser)
      .then((res) => {
        return token = res.body.token;
      });
  });


  beforeEach(async () => {
    await db("posts").insert(
      {
      title: "Updated New Post Example2",
      description: "New Test Post Description",
      images: [
        "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
      ],
      user_id: 3,
      is_public: true,
    });
  });

  describe("GET /", () => {
    it("Should return 200", () => {
      return supertest(server)
        .get("/api/posts")
        .set("Authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("Should return json", () => {
      return supertest(server)
        .get("/api/posts")
        .set("Authorization", token)
        .then((res) => {
          expect(res.type).toMatch(/json/);
        });
    })
})

    describe("GET /:postId", () => {
      it("Should return 200", () => {
        return supertest(server)
          .get("/api/posts/1")
          .set("Authorization", token)
          .then((res) => {
            expect(res.status).toBe(200);
          });
      });
      it("Should return json", () => {
        return supertest(server)
          .get("/api/posts")
          .set("Authorization", token)
          .then((res) => {
            expect(res.type).toMatch(/json/);
          });
      });
    });

    describe("GET /user/:id", () => {
      it("Should return 200", () => {
        return supertest(server)
          .get("/api/posts/user/3")
          .set("Authorization", token)
          .then((res) => {
            expect(res.status).toBe(200);
          });
      });
      it("Should return json", () => {
        return supertest(server)
          .get("/api/posts/user/3")
          .set("Authorization", token)
          .then((res) => {
            expect(res.type).toMatch(/json/);
          });
      });
      it("Should return posts for the given user", () => {
        return supertest(server)
          .get("/api/posts/user/1")
          .set("Authorization", token)
          .then((res) => {
            for (let i = 0; i < res.body.length; i++) {
              expect(res.body[i].user_id).toEqual(1);
            }
          });
      });
    });

    describe("POST /", () => {
      it("Should return 201", () => {
        return supertest(server)
          .post("/api/posts")
          .set("Authorization", token)
          .send({
            title: "Updated New Post Example2",
            description: "New Test Post Description",
            images: [
              "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
            ],
            user_id: 3,
            is_public: true,
          })
          .then((res) => {
            expect(res.status).toBe(201);
          });
      });
      it("Should return json", () => {
        return supertest(server)
          .get("/api/posts")
          .set("Authorization", token)
          .then((res) => {
            expect(res.type).toMatch(/json/);
          });
      });
    });

    describe("PUT /:postId", () => {

        it("Should return 200", () => {
            return supertest(server)
            .put("/api/posts/1")
            .set("Authorization", token)
            .send({
                title: "Test Updated",
            description: "New Test Post Description",
            images: [
              "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
            ],
            user_id: 3,
            is_public: true,
            })
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("Should return json", () => {
            return supertest(server)
            .put("/api/posts/1")
            .set("Authorization", token)
            .send({
                title: "Test Updated",
            description: "New Test Post Description",
            images: [
              "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
            ],
            user_id: 1,
            is_public: true,
            })
            .then(res => {
                expect(res.type).toMatch(/json/)
            })
        })
        
    })
    describe("DELETE /:postId", () => {
        it("Should return 200", () => {
            return supertest(server)
            .delete("/api/posts/1")
            .set("Authorization", token)
            .then(res => {
                expect(res.status).toBe(200)
            })
        })

        it("Should return count of 1", () => {
            return supertest(server)
            .delete("/api/posts/2")
            .set("Authorization", token)
            .then(res => {
                expect(res.body).toEqual(1)
            })
        })
    })
  });
