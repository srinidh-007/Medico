import doctorsList from "./../assets/doctors.json";
import Doctor from "./Doctor";
import Dropdown from "react-dropdown";
import DropdownButton from "react-dropdown";
import ReactPaginate from "react-paginate";
import { useState } from "react";

import "./CommonDashboard.css";

<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  crossorigin="anonymous"
></link>;

const CommonDashboard = () => {
  const [items, setItems] = useState(doctorsList["doctors"]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 4;
  const [opt, setOpt] = useState("f_name");
  const [query, setQuery] = useState("");

  items.sort((a, b) => (a[opt] > b[opt] ? 1 : -1));
  const pagesVisited = pageNumber * itemsPerPage;
  let displayItems = items
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((doc) => <Doctor docData={doc} len={false} />);

  const PageCount = Math.ceil(items.length / itemsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const options1 = {
    "First Name": "f_name",
    "Last Name": "l_name",
    Email: "email",
    "User name": "user_name",
    City: "city",
    State: "state",
    Specialization: "specialization",
    "Years Of Experience": "year_of_exp",
    Price: "avg_charge",
  };


// using solr for getting the documents with entered query
  const updatingItems = async (e) => {

    let uri = 'http://localhost:8983/solr/doctorsRepository';
    const term = e.target.value;
    if (term) {
      uri += `/query?q=f_name:${term}&l_name:${term}&user_name:${term}&specialization:${term}&city:${term}&state:${term}&q.op=OR&indent=true`
    }else{
        uri+= `/query?q=*:*&q.op=OR&indent=true`
    }

    setQuery(e.target.value);
    const updatedDoctors = fetch(uri);
    let updatedDoctorsJson = await updatedDoctors.json();
    setItems(updatedDoctorsJson['response']['docs']);
  };


  // For sorting doctors based on selected attribute
  const defaultOption = selectedOption;
  const selectedOptionHandler = (e) => {
    setSelectedOption(e.value);
    setOpt(options1[e.value]);
    items.sort((a, b) => (a[opt] > b[opt] ? 1 : -1));
    setItems(items);
  };

  if (items.length === 0) {
    return <h1>No items found</h1>;
  }

  // for showing doctors with the entered query
  const updateItems = async (e) => {
    setQuery(e.target.value);
    const updatedDoctors = await fetch(
      "http://localhost:8000/doctors?q=" + e.target.value
    );
    let updatedDoctorsJson = await updatedDoctors.json();
    setItems(updatedDoctorsJson);
  };

  return (
    <div>
      <center>
        <h1>Choose your Doctor 🩺</h1>
        <div style={{ width: "180px", padding: "5px" }}>
          <Dropdown
            options={Object.keys(options1)}
            onChange={selectedOptionHandler}
            value={defaultOption}
            placeholder="Sort By"
          />
        </div>

        <input
          style={{ margin: "10px" }}
          placeholder="Search for doctors"
          onChange={updateItems}
        ></input>
      </center>
      <div id="listing">{displayItems}</div>
      <br />
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={PageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default CommonDashboard;
