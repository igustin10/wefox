const supertest = require("supertest");
const app = require("../app");
const api = supertest(app)
jest.setTimeout(20000)

describe("Login tests", () => {
    it("should return 200 with success ", async () => {
        const response = await api.post("/login")
            .send({email:"agustinclaret@hotmail.com", password: "testwefox"})
        expect(response.status).toBe(200);
        const success = JSON.parse(response.text).success
        expect(success).toBe("success");
    });

    it("should return 400 with failed and bad credentials - bad pass", async () => {
        const response = await api.post("/login")
            .send({email:"agustinclaret@hotmail.com", password: "badpass"})
        expect(response.status).toBe(400);
        const text = JSON.parse(response.text)
        expect(text.success).toBe("failed");
        expect(text.msg).toBe("bad credentials");
    });

    it("should return 400 with failed and bad credentials - bad mail", async () => {
        const response = await api.post("/login")
            .send({email:"aasdsadret@hotmail.com", password: "badpass"})
        expect(response.status).toBe(400);
        const text = JSON.parse(response.text)
        expect(text.success).toBe("failed");
        expect(text.msg).toBe("bad credentials");
    });
});

describe("Verify Address", () => {
    it("should return 200 with success", async () => {
        const response = await api.get("/api/verifyaddress")
            .query({ street:'Coronel Diaz', streetNumber:2660, town:'CABA', postalCode:1425, country:'Argentina'})
        expect(response.status).toBe(200);
        const success = JSON.parse(response.text).success
        expect(success).toBe("success");
    });

    it("should return 400 with failed - bad address", async () => {
        const response = await api.get("/api/verifyaddress")
            .query({ street:'asdasdasd', streetNumber:452523, town:'fgaagrsager', postalCode:143665336, country:'dgafgfadgfa'})
        expect(response.status).toBe(400);
        const text = JSON.parse(response.text)
        expect(text.success).toBe("failed");
        expect(text.msg).toBe("bad address");
    });
});

let token = 0

describe("View Weather Tests", () => {
    beforeAll(async () => {
        const response = await api.post("/login")
            .send({email:"agustinclaret@hotmail.com", password: "testwefox"})
        token = JSON.parse(response.text).data.token
    });
    it("should return 200 and success", async () => {
        const response = await api.get("/api/viewweather")
            .set('auth-token',token)
            .query({ street:'Coronel Diaz', streetNumber:2660, town:'CABA', postalCode:1425, country:'Argentina'})
        expect(response.status).toBe(200);
        const success = JSON.parse(response.text).success
        expect(success).toBe("success");
    });

    it("should return 400 with failed - bad address", async () => {
        const response = await api.get("/api/viewweather")
            .set('auth-token',token)
            .query({ street:'asdasdasd', streetNumber:452523, town:'fgaagrsager', postalCode:143665336, country:'dgafgfadgfa'})
        expect(response.status).toBe(400);
        const text = JSON.parse(response.text)
        expect(text.success).toBe("failed");
        expect(text.msg).toBe("bad address");
    });

    it("should return 400 with failed - unauthorized", async () => {
        const response = await api.get("/api/viewweather")
            .query({ street:'Coronel Diaz', streetNumber:2660, town:'CABA', postalCode:1425, country:'Argentina'})
        expect(response.status).toBe(401);
        const text = JSON.parse(response.text)
        expect(text.success).toBe("failed");
        expect(text.msg).toBe("unauthorized");
    });
});