let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../db_server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Patientappos API', () => {

    // Test the GET route

    describe("GET /patientappos", () => {
        it("It should GET all the patientappos", (done) => {
            chai.request(server)
                .get("/patientappos")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    // response.body.length.should.be.eq(3);
                done();
                });
        });

        it("It should NOT GET all the patientappos", (done) => {
            chai.request(server)
                .get("/patientappo") // wrong request
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });



   // Test the GET (by id) route

    describe("GET /patientappos/:id", () => {
        it("It should GET a patientappo by ID", (done) => {
            const patientappoId = "62456a5edb1864967222b6d7";
            chai.request(server)
                .get("/patientappos/" + patientappoId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT GET a patientappo by ID", (done) => {
            const patientappoId = 123;
            chai.request(server)
                .get("/patientappos/" + patientappoId)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });



     // Test the POST route

    describe("POST /patientappos", () => {
        it("It should POST a new patientappo", (done) => {
            const patientappo = {
              docId: "6decbc0999b6268966dec57a",
              patId: "62682e968966de9966dec57a",
              docName: "Peter Parker",
              date: 17,
              month: 2,
              year: 2022,
              time: "8-9AM",
              docMobile: "9845781268",
              docSpecialization: "Dermatology"
            };
            chai.request(server)
                .post("/patientappos")
                .send(patientappo)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id');
                    response.body.should.have.property('docId');
                    response.body.should.have.property('patId');
                    response.body.should.have.property('docName');
                    response.body.should.have.property('date');
                    response.body.should.have.property('month');
                    response.body.should.have.property('year');
                    response.body.should.have.property('time');
                    response.body.should.have.property('docMobile');
                    response.body.should.have.property('docSpecialization');
                done();
                });
        });

        it("It should NOT POST a new patientappo without the mentioning of all the properties", (done) => {
            const patientappo = {
                user_name: "james_bond"
            };
            chai.request(server)
                .post("/patientappos")
                .send(patientappo)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });



    // Test the PUT route

    // describe("PUT /patientappos/:id", () => {
    //     it("It should PUT an existing patientappo", (done) => {
    //         const patientappoId = "6268343644da06fa662664bd";
    //         const patientappo = {
    //           docId: "6decbc0999b6268966dec57a",
    //           patId: "62682e968966de9966dec57a",
    //           docName: "Peter Parker",
    //           date: 17,
    //           month: 2,
    //           year: 2022,
    //           time: "8-9AM",
    //           docMobile: "9845781268",
    //           docSpecialization: "Dermatology"
    //         };
    //         chai.request(server)
    //             .put("/patientappos/" + patientappoId)
    //             .send(patientappo)
    //             .end((err, response) => {
    //                 response.should.have.status(200);
    //                 response.body.should.be.a('object');
    //                 response.body.should.have.property('_id').eq(patientappoId);
    //             done();
    //             });
    //     });

    //     it("It should NOT PUT for an non-existing patientappo", (done) => {
    //         const patientappoId = 123; // no patientappo exists for this id
    //         const patientappo = {
    //           docId: "6decbc0999b6268966dec57a",
    //           patId: "62682e968966de9966dec57a",
    //           docName: "Peter Parker",
    //           date: 17,
    //           month: 2,
    //           year: 2022,
    //           time: "8-9AM",
    //           docMobile: "9845781268",
    //           docSpecialization: "Dermatology"
    //         };
    //         chai.request(server)
    //             .put("/patientappos/" + patientappoId)
    //             .send(patientappo)
    //             .end((err, response) => {
    //                 response.should.have.status(400);
    //             done();
    //             });
    //     });
    // });





    // Test the DELETE route

    describe("DELETE /patientappos/:id", () => {
        it("It should DELETE an existing patientappo", (done) => {
            const patientappoId = "626836a07be23c06a0393e49";
            chai.request(server)
                .delete("/patientappos/" + patientappoId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a delete that is not in the database", (done) => {
            const patientappoId = 123;
            chai.request(server)
                .delete("/patientappos/" + patientappoId)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });




});
