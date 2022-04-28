let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../db_server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Patients API', () => {

    // Test the GET route

    describe("GET /patients", () => {
        it("It should GET all the patients", (done) => {
            chai.request(server)
                .get("/patients")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    // response.body.length.should.be.eq(3);
                done();
                });
        });

        it("It should NOT GET all the patients", (done) => {
            chai.request(server)
                .get("/patient") // wrong request
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });



   // Test the GET (by id) route

    describe("GET /patients/:id", () => {
        it("It should GET a patient by ID", (done) => {
            const patientId = "62456a5edb1864967222b6d7";
            chai.request(server)
                .get("/patients/" + patientId)
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
                    response.body.should.have.property('blood_group');
                    response.body.should.have.property('profession');
                    response.body.should.have.property('is_admin');
                    response.body.should.have.property('is_doctor').eq(false);
                    response.body.should.have.property('bio');
                    response.body.should.have.property('_id').eq(patientId);
                done();
                });
        });

        it("It should NOT GET a patient by ID", (done) => {
            const patientId = 123;
            chai.request(server)
                .get("/patients/" + patientId)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });



     // Test the POST route

    describe("POST /patients", () => {
        it("It should POST a new patient", (done) => {
            const patient = {
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
              blood_group: "O-",
              profession: "Data Scientist",
              is_admin: false,
              is_doctor: false,
              bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis dictum lobortis. Sed at nisi non velit elementum consectetur.&nbsp;"
            };
            chai.request(server)
                .post("/patients")
                .send(patient)
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
                    response.body.should.have.property('blood_group');
                    response.body.should.have.property('profession');
                    response.body.should.have.property('is_admin');
                    response.body.should.have.property('is_doctor').eq(false);
                    response.body.should.have.property('bio');
                done();
                });
        });

        it("It should NOT POST a new patient without the mentioning of all the properties", (done) => {
            const patient = {
                user_name: "james_bond"
            };
            chai.request(server)
                .post("/patients")
                .send(patient)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });



    // Test the PUT route

    describe("PUT /patients/:id", () => {
        it("It should PUT an existing patient", (done) => {
            const patientId = "62456aaadb1864967222b6e1";
            const patient = {
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
              blood_group: "O-",
              profession: "Data Scientist",
              is_admin: false,
              is_doctor: false,
              bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis dictum lobortis. Sed at nisi non velit elementum consectetur.&nbsp;"
            };
            chai.request(server)
                .put("/patients/" + patientId)
                .send(patient)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id').eq(patientId);
                done();
                });
        });

        it("It should NOT PUT for an non-existing patient", (done) => {
            const patientId = 123; // no patient exists for this id
            const patient = {
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
              blood_group: "O-",
              profession: "Data Scientist",
              is_admin: false,
              is_doctor: false,
              bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis dictum lobortis. Sed at nisi non velit elementum consectetur.&nbsp;"
            };
            chai.request(server)
                .put("/patients/" + patientId)
                .send(patient)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });
    });





    // Test the DELETE route

    describe("DELETE /patients/:id", () => {
        it("It should DELETE an existing patient", (done) => {
            const patientId = "6268343644da06fa662664bd";
            chai.request(server)
                .delete("/patients/" + patientId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a delete that is not in the database", (done) => {
            const patientId = 123;
            chai.request(server)
                .delete("/patients/" + patientId)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });




});
