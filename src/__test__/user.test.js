const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app.js");
const User = require("../models/user.model.js");
const userService = require("../services/user.service.js");
const dbConnection = require("../configs/db.config.js");
const CustomError = require("../Utils/CustomError.js");
const globalErrorMessage = require("../middlewares/error.middleware.js");
const { json } = require("express");
let mongoServer;

const mockResponse = () => {
  const res = {};
  res.status = jest.fn();
  res.json = jest.fn();
  return res;
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await dbConnection();

  // Connect Mongoose to the in-memory database
  //   await mongoose.connect(mongoUri, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useCreateIndex: true,
  //   });
});

afterAll(async () => {
  await User.deleteOne({ username: "testuser" });
  await mongoose.disconnect();
  await mongoServer.stop();
  //   done();
});

// ... (rest of the tests)
// jest.setTimeout(30000)

const req = {
  params: { id: "some_id" },
  body: {
    /* your body data */
  },
};
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};
const next = jest.fn();

describe("User test", () => {
  let createdUserId;
  // Jest test case for user signup
  it("should return a list of users", async () => {
    const resp = await request(app).get(`/user`).expect(200);

    expect(resp.body.message).toBe("get user list successfully");
  });
  it("should create a new user", async () => {
    const testUser = {
      username: "testuser",
      age: 20,
      hobbies: ["Gaming", "Painting"],
    };
    try {
      const response = await request(app)
        .post("/user")
        .send(testUser)
        .expect(200);
      createdUserId = response.body.data.id;
      expect(response.body.message).toBe("User created successfully");
    } catch (error) {
      expect(error.message).toEquals("");
      expect(error.status).toEquals(500);
    }
  });
  //   // Jest test case for handling invalid credentials
  it("should update a user successfully", async () => {
    await request(app)
      .put(`/user/${createdUserId}`)
      .send({
        username: "testUser",
        age: 20,
        hobbies: ["painting", "listening music"],
      })
      .expect(200);
  });

  it("should return 404 if user is not found", async () => {
    await request(app)
      .put("/user/5")
      .send({
        username: "testUser",
        age: 20,
        hobbies: ["painting", "listening music"],
      })
      .expect(404);
  });

  it("should return a user by ID", async () => {
    const resp = await request(app)
      .get(`/user/${createdUserId}`)
      .send({
        username: "testUser",
        age: 20,
        hobbies: ["painting", "listening music"],
      })
      .expect(200);
  });

  it("should return 404 if user is not found", async () => {
    const resp = await request(app)
      .get(`/user/6`)
      .send({
        username: "testUser",
        age: 20,
        hobbies: ["painting", "listening music"],
      })
      .expect(404);
  });

  //   it("should handle errors", async () => {
  //     userService.updateUser = jest.fn().mockImplementation(() => {
  //        new CustomError("Something went wrong", 500);
  //     });
  //     await userService.updateUser(req, res, next);

  //     // expect(next).toHaveBeenCalled();
  //     expect(next).toHaveBeenCalledWith(
  //       new CustomError("Something went wrong", 500)
  //     );
  //   });

  it("should delete a user successfully", async () => {
    const resp = await request(app)
      .delete(`/user/${createdUserId}`)
      .send({
        username: "testUser",
        age: 20,
        hobbies: ["painting", "listening music"],
      })
      .expect(200);
    expect(resp.body.message).toBe("User deleted successfully");
  });
  it('should return JSON response with status and message', () => {
    const error = new Error('Test error');
    error.statusCode = 404; // Setting up a custom statusCode for testing

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    globalErrorMessage(error, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Test error' });
  });
});

// afterAll(async () => {
//   await User.deleteOne({ username: "testuser" });
//   done()
// });
