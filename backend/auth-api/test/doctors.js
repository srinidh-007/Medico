let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../db_server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Doctors API', () => {

    // Test the GET route

    describe("GET /doctors", () => {
        it("It should GET all the doctors", (done) => {
            chai.request(server)
                .get("/doctors")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    // response.body.length.should.be.eq(3);
                done();
                });
        });

        it("It should NOT GET all the doctors", (done) => {
            chai.request(server)
                .get("/doctor") // wrong request
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });



   // Test the GET (by id) route

    describe("GET /doctors/:id", () => {
        it("It should GET a doctor by ID", (done) => {
            const doctorId = "624566df2857ecac0cc3a55b";
            chai.request(server)
                .get("/doctors/" + doctorId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id');
                    response.body.should.have.property('password');
                    response.body.should.have.property('f_name');
                    response.body.should.have.property('l_name');
                    response.body.should.have.property('email');
                    response.body.should.have.property('user_name');
                    response.body.should.have.property('profile_img');
                    response.body.should.have.property('gender');
                    response.body.should.have.property('mobile');
                    response.body.should.have.property('dob');
                    response.body.should.have.property('city');
                    response.body.should.have.property('state');
                    response.body.should.have.property('avg_charge');
                    response.body.should.have.property('specialization');
                    response.body.should.have.property('year_of_exp');
                    response.body.should.have.property('is_admin');
                    response.body.should.have.property('is_doctor');
                    response.body.should.have.property('bio');
                    response.body.should.have.property('_id').eq(doctorId);
                done();
                });
        });

        it("It should NOT GET a doctor by ID", (done) => {
            const doctorId = 123;
            chai.request(server)
                .get("/doctors/" + doctorId)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });



     // Test the POST route

    describe("POST /doctors", () => {
        it("It should POST a new doctor", (done) => {
            const doctor = {
              password: "123456",
              f_name: "James",
              l_name: "Bond",
              email: "james.bond@007.com",
              user_name: "james_bond",
              profile_img: "male_avatar_red.svg",
              gender: "Male",
              mobile: "9845781425",
              dob: "15-02-1997",
              city: "Tirupati",
              state: "Andhra Pradesh",
              avg_charge: "6500",
              specialization: "Cardiology",
              year_of_exp: 20,
              is_admin: false,
              is_doctor: true,
              bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis dictum lobortis. Sed at nisi non velit elementum consectetur.&nbsp;"
            };
            chai.request(server)
                .post("/doctors")
                .send(doctor)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id');
                    response.body.should.have.property('password');
                    response.body.should.have.property('f_name');
                    response.body.should.have.property('l_name');
                    response.body.should.have.property('email');
                    response.body.should.have.property('user_name');
                    response.body.should.have.property('profile_img');
                    response.body.should.have.property('gender');
                    response.body.should.have.property('mobile');
                    response.body.should.have.property('dob');
                    response.body.should.have.property('city');
                    response.body.should.have.property('state');
                    response.body.should.have.property('avg_charge');
                    response.body.should.have.property('specialization');
                    response.body.should.have.property('year_of_exp');
                    response.body.should.have.property('is_admin');
                    response.body.should.have.property('is_doctor').eq(true);
                    response.body.should.have.property('bio');
                done();
                });
        });

        it("It should NOT POST a new doctor without the mentioning of all the properties", (done) => {
            const doctor = {
                user_name: "james_bond"
            };
            chai.request(server)
                .post("/doctors")
                .send(doctor)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });



    // Test the PUT route

    describe("PUT /doctors/:id", () => {
        it("It should PUT an existing doctor", (done) => {
            const doctorId = "6268123053726502a68aedb7";
            const doctor = {
              password: "123456",
              f_name: "Jenifer",
              l_name: "Harris",
              email: "uhays@hotmail.com",
              user_name: "ryan21",
              profile_img: "female_avatar_green.svg",
              gender: "Female",
              mobile: "7954806500",
              dob: "07-09-1926",
              city: "Karur",
              state: "Tamil Nadu",
              avg_charge: "2000",
              specialization: "ENT",
              year_of_exp: 9,
              is_admin: false,
              is_doctor: true,
              bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis dictum lobortis. Sed at nisi non velit elementum consectetur.&nbsp;"

            };
            chai.request(server)
                .put("/doctors/" + doctorId)
                .send(doctor)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id').eq(doctorId);
                done();
                });
        });

        it("It should NOT PUT for an non-existing doctor", (done) => {
            const doctorId = 123; // no doctor exists for this id
            const doctor = {
              password: "123456",
              f_name: "Jenifer",
              l_name: "Harris",
              email: "uhays@hotmail.com",
              user_name: "ryan21",
              profile_img: "female_avatar_green.svg",
              gender: "Female",
              mobile: "7954806500",
              dob: "07-09-1926",
              city: "Karur",
              state: "Tamil Nadu",
              avg_charge: "2000",
              specialization: "ENT",
              year_of_exp: 9,
              is_admin: false,
              is_doctor: true,
              bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis dictum lobortis. Sed at nisi non velit elementum consectetur.&nbsp;"

            };
            chai.request(server)
                .put("/doctors/" + doctorId)
                .send(doctor)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });
    });





    // Test the DELETE route

    describe("DELETE /doctors/:id", () => {
        it("It should DELETE an existing doctor", (done) => {
            const doctorId = "6268343644da06fa662664b4";
            chai.request(server)
                .delete("/doctors/" + doctorId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a doctor that is not in the database", (done) => {
            const doctorId = 123;
            chai.request(server)
                .delete("/doctors/" + doctorId)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });




});
