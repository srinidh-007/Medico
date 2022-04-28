let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../db_server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Appointments API', () => {

    // Test the GET route

    describe("GET /appointments", () => {
        it("It should GET all the appointments", (done) => {
            chai.request(server)
                .get("/appointments")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    // response.body.length.should.be.eq(3);
                done();
                });
        });

        it("It should NOT GET all the appointments", (done) => {
            chai.request(server)
                .get("/appointment") // wrong request
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });



   // Test the GET (by id) route

    describe("GET /appointments/:id", () => {
        it("It should GET a appointment by ID", (done) => {
            const appointmentId = "6245dd43caf059ded5357e28";
            chai.request(server)
                .get("/appointments/" + appointmentId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id');
                    response.body.should.have.property('docId');
                    response.body.should.have.property('docName');
                    response.body.should.have.property('date');
                    response.body.should.have.property('month');
                    response.body.should.have.property('year');
                    response.body.should.have.property('time');
                    response.body.should.have.property('patName');
                    response.body.should.have.property('patEmail');
                    response.body.should.have.property('patPhone');
                    response.body.should.have.property('patDOB');
                    response.body.should.have.property('patAge');
                    response.body.should.have.property('patLoc');
                    response.body.should.have.property('_id').eq(appointmentId);
                done();
                });
        });

        it("It should NOT GET a appointment by ID", (done) => {
            const appointmentId = 123;
            chai.request(server)
                .get("/appointments/" + appointmentId)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });



     // Test the POST route

    describe("POST /appointments", () => {
        it("It should POST a new appointment", (done) => {
            const appointment = {
              docId: "624566df2857ecac0cc57eca",
              docName: "James",
              date: 15,
              month: 02,
              year: 2022,
              time: "10-11AM",
              patName: "HarshithJupuru",
              patEmail: "harshith.j19@iiits.in",
              patPhone: "9215038896",
              patDOB: "1918-09-20",
              patAge: "20",
              patLoc: "Chittoor",
            };
            chai.request(server)
                .post("/appointments")
                .send(appointment)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id');
                    response.body.should.have.property('docId');
                    response.body.should.have.property('docName');
                    response.body.should.have.property('date');
                    response.body.should.have.property('month');
                    response.body.should.have.property('year');
                    response.body.should.have.property('time');
                    response.body.should.have.property('patName');
                    response.body.should.have.property('patEmail');
                    response.body.should.have.property('patPhone');
                    response.body.should.have.property('patDOB');
                    response.body.should.have.property('patAge');
                    response.body.should.have.property('patLoc');
                done();
                });
        });

        it("It should NOT POST a new appointment without the mentioning of all the properties", (done) => {
            const appointment = {
                user_name: "james_bond"
            };
            chai.request(server)
                .post("/appointments")
                .send(appointment)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });



    // Test the PUT route

    // describe("PUT /appointments/:id", () => {
    //     it("It should PUT an existing appointment", (done) => {
    //         const appointmentId = "62684041306982ceb2ee5344";
    //         const appointment = {
    //           docId: "624566df2857ecac0cc57eca",
    //           docName: "James",
    //           date: 15,
    //           month: 02,
    //           year: 2022,
    //           time: "10-11AM",
    //           patName: "HarshithJupuru",
    //           patEmail: "harshith.j19@iiits.in",
    //           patPhone: "9215038896",
    //           patDOB: "1918-09-20",
    //           patAge: "20",
    //           patLoc: "Chittoor",
    //         };
    //         chai.request(server)
    //             .put("/appointments/" + appointmentId)
    //             .send(appointment)
    //             .end((err, response) => {
    //                 response.should.have.status(200);
    //                 response.body.should.be.a('object');
    //                 response.body.should.have.property('_id').eq(appointmentId);
    //             done();
    //             });
    //     });

    //     it("It should NOT PUT for an non-existing appointment", (done) => {
    //         const appointmentId = 123; // no appointment exists for this id
    //         const appointment = {
    //           docId: "624566df2857ecac0cc57eca",
    //           docName: "James",
    //           date: 15,
    //           month: 02,
    //           year: 2022,
    //           time: "10-11AM",
    //           patName: "HarshithJupuru",
    //           patEmail: "harshith.j19@iiits.in",
    //           patPhone: "9215038896",
    //           patDOB: "1918-09-20",
    //           patAge: "20",
    //           patLoc: "Chittoor",
    //         };
    //         chai.request(server)
    //             .put("/appointments/" + appointmentId)
    //             .send(appointment)
    //             .end((err, response) => {
    //                 response.should.have.status(400);
    //             done();
    //             });
    //     });
    // });





    // Test the DELETE route

    describe("DELETE /appointments/:id", () => {
        it("It should DELETE an existing appointment", (done) => {
            const appointmentId = "62684041306982ceb2ee5344";
            chai.request(server)
                .delete("/appointments/" + appointmentId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a delete that is not in the database", (done) => {
            const appointmentId = 123;
            chai.request(server)
                .delete("/appointments/" + appointmentId)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });




});
