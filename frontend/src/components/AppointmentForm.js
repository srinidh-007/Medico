import { useState, useEffect } from "react";
import CalendarFunc from "./Calendar";
import TimeFrame from "./TimeFrame";
import "./AppointmentForm.css";
import { getUser } from "../Utils/Common";

const AppointmentForm = (props) => {
  const user = getUser();
  const [time, setTime] = useState(false);
  const [disableDates, setDisableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [loadStatus, setLoadStatus] = useState(0);

  // for seleting date from calender
  const setTimeHandler = (e) => {
    setSelectedDate(e);
    setTime(true);
  };
  const getTimeFromTimeFrame = (e) => {
    setSelectedTime(e.value);
  };

  // for getting those dates which are fully booked
  const getblockedDates = async () => {
    const filledAppo = await fetch(
      "http://localhost:8000/Appointments" + "?docId=" + props.docId
    );
    let filledAppoJson = await filledAppo.json();
    filledAppoJson = Array.from(filledAppoJson);
    let disdatestemp = [];
    if (filledAppoJson.length !== 0) {
      let years = filledAppoJson.map((ins) => ins.year);
      years = new Set(years);

      let months = filledAppoJson.map((ins) => ins.month);
      months = new Set(months);

      let dates = filledAppoJson.map((ins) => ins.date);
      dates = new Set(dates);

      for (let y of years) {
        for (let m of months) {
          for (let d of dates) {
            let resp = await fetch(
              "http://localhost:8000/Appointments" +
                "?docId=" +
                props.docId +
                "&&date=" +
                d +
                "&&month=" +
                m +
                "&&year=" +
                y
            );
            resp = await resp.json();
            if (resp.length == 6) {
              disdatestemp.push(
                d.toString().concat("/", (m + 1).toString(), "/", y.toString())
              );
            }
          }
        }
      }
      disdatestemp = Array.from(new Set(disdatestemp));
      console.log(disdatestemp);
    }
    setLoadStatus(1);
    console.log(typeof disdatestemp, disdatestemp);
    return disdatestemp;
  };

  let disdates = getblockedDates();

  // for filling existing details in appointment form for users
  const insertUserDetails = async () => {
    const userDetails = await fetch(
      "http://localhost:8000/patients/" + user.userId
    );
    let userDetailsJson = await userDetails.json();
    const formRes = document.querySelector("#appointForm");
    document.querySelector("#first_name").value = userDetailsJson.f_name;
    document.querySelector("#last_name").value = userDetailsJson.l_name;

    document.querySelector("#phone_number").value = userDetailsJson.mobile;
    document.querySelector("#dob").value =
      userDetailsJson.dob.split("-")[2] +
      "-" +
      userDetailsJson.dob.split("-")[1] +
      "-" +
      userDetailsJson.dob.split("-")[0];
    document.querySelector("#location").value = userDetailsJson.city;
  };

  // for checking the details are valid and slot is empty and redirecting to next page
  const formHandler = async (e) => {
    const formRes = document.querySelector("#appointForm");
    e.preventDefault();

    if (
      formRes.first_name == "" ||
      formRes.last_name.value == "" ||
      formRes.email_addr.value == "" ||
      formRes.email_address_confirm.value == "" ||
      formRes.email_addr.value.trim() !==
        formRes.email_address_confirm.value.trim() ||
      formRes.phone_number.value === "" ||
      formRes.age.value <= 0 ||
      formRes.age.value > 120 ||
      formRes.location.value === ""
    ) {
      document.querySelector("#fillingWarning").innerHTML =
        "Fill the details correctly!!";
      return;
    } else {
      document.querySelector("#fillingWarning").innerHTML = "";
    }

    const filledAppo = await fetch("http://localhost:8000/Appointments");
    let filledAppoJson = await filledAppo.json();
    if (filledAppoJson.length !== 0) {
      filledAppoJson = Array.from(filledAppoJson);
      filledAppoJson = filledAppoJson.filter((ins) => {
        return (
          ins.year === selectedDate.getFullYear() &&
          ins.month === selectedDate.getMonth() &&
          ins.date === selectedDate.getDate() &&
          ins.time === selectedTime &&
          ins.docId == props.docId.toString()
        );
      });
    }

    if (
      filledAppoJson.length !== 0 &&
      filledAppoJson[0].time.includes(selectedTime)
    ) {
      document.querySelector("#warning").innerHTML =
        "Slot already selected, Please select some other slot";
    } else {
      document.querySelector("#warning").innerHTML = "";
      const doc = {
        docId: props.docId,
        docName: props.docName,
        date: selectedDate.getDate(),
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
        time: selectedTime,
        patName: formRes.first_name.value + formRes.last_name.value,
        patEmail: formRes.email_addr.value,
        patPhone: formRes.phone_number.value,
        patDOB: formRes.dob.value,
        patAge: formRes.age.value,
        patLoc: formRes.location.value,
      };

      await fetch("http://localhost:8000/Appointments", {
        method: "POST",
        body: JSON.stringify(doc),
        headers: { "Content-Type": "application/json" },
      });

      const doc1 = {
        docId: props.docId,
        patId: user.userId,
        docName: props.docName,
        date: selectedDate.getDate(),
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
        time: selectedTime,
        docMobile: props.doc.mobile,
        docSpecialization: props.doc.specialization,
        docPrice: props.doc.price,
      };

      await fetch("http://localhost:8000/patientAppo", {
        method: "POST",
        body: JSON.stringify(doc1),
        headers: { "Content-Type": "application/json" },
      });

      window.location.replace("/appointments");
    }
  };

  // displayed form once getting blocked dates was done
  if (loadStatus == 1) {
    insertUserDetails();
    return (
      <>
        <link
          rel="stylesheet"
          href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css"
        ></link>

        <div className={`container`} style={{ padding: "30px" }}>
          <form id="appointForm" action="/activeappointments" method="">
            <div
              className="form-div-main"
              style={{ textAlign: "left", color: "#F9951F" }}
            >
              <center>
                <div class="form-group" className="inp">
                  <label for="first_name">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="first_name"
                    placeholder="First Name"
                    required
                    autofocus
                    autoComplete="on"
                  />
                  <span class="help-block"></span>
                </div>
                <div class="form-group" className="inp">
                  <label for="last_name">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="last_name"
                    placeholder="Last Name"
                    required
                    autofocus
                    autoComplete="on"
                  />
                  <span class="help-block"></span>
                </div>
                <div class="form-group" className="inp">
                  <label for="email_address">Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email_addr"
                    placeholder="Email address"
                    required
                  />
                  <span class="help-block"></span>
                </div>
                <div class="form-group" className="inp">
                  <label for="email_address_confirm">
                    Please re-confirm your email address.
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="email_address_confirm"
                    placeholder="Confirm email address"
                    required
                    autoComplete="off"
                  />

                  <span class="help-block"></span>
                </div>
                <div class="form-group" className="inp">
                  <label for="phone_number">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone_number"
                    placeholder="+1-416-967-1111"
                  />
                  <span class="help-block"></span>
                </div>
                <div class="form-group" className="inp">
                  <label for="dob">Date of Birth</label>
                  <input type="date" class="form-control" id="dob" />
                  <span class="help-block"></span>
                </div>
                <div class="form-group" className="inp">
                  <label for="age">Age</label>
                  <input
                    type="number"
                    class="form-control"
                    id="age"
                    placeholder="Age"
                    min="0"
                    max="110"
                    required
                  />
                  <span class="help-block"></span>
                </div>
                <div class="form-group" className="inp">
                  <label htmlFor="Location">Location</label>
                  <input
                    type="text"
                    class="form-control"
                    id="location"
                    placeholder="Location"
                    required
                  />
                  <span class="help-block"></span>
                </div>
              </center>
            </div>
            <div style={{ color: "green" }}>
              <p id="temp"></p>
              <h2>Select data and time for appointment</h2>
              <CalendarFunc
                onChange={setTimeHandler}
                disableTiles={["20/1/2022"]}
                getBlockDatesFunc={getblockedDates}
              />
              {time ? <TimeFrame getTime={getTimeFromTimeFrame} /> : null}
            </div>
            <br />
            <p
              id="fillingWarning"
              style={{ color: "red", fontWeight: "bold" }}
            ></p>
            <p id="warning" style={{ color: "red", fontWeight: "bold" }}></p>
            <button
              type="submit"
              class="btn btn-lg btn-primary btn-block"
              onClick={formHandler}
            >
              Make Appointment
            </button>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <center>
          <h1 style={{ color: "orange" }}>Loading</h1>
        </center>
      </div>
    );
  }
};

export default AppointmentForm;
