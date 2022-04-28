

import "./Doctor.css"
import Logo from "./../logo.svg"
import {Link} from "react-router-dom";

function Product(props){

    console.log('->', props.docData)
    let desc = props.len?props.docData.bio: props.docData.bio.substr(0,100)+'...'

    return (
        <center>
        <div className="main-doctor-div">

            {<li key = {props.docData._id}>
                <Link to={`/${props.docData._id}/details`}>
                <div style={{ marginLeft:"4%", backgroundImage: `url(/images/${props.docData.profile_img})`, backgroundSize:"cover", backgroundRepeat: "no-repeat", borderRadius:"50%", backgroundColor:"red", height:"100px", width:"100px", margin:"4%", float:"left" }}>

                </div>
                <div style={{ width:"60%" }}>
                <p>{props.docData.f_name} {props.docData.l_name} </p>
                <p>{ desc }</p>
                <p> Charge per hour : ₹ { props.docData.avg_charge } </p>
                <p>{`specialized as ${ props.docData.specialization }`} with { props.docData.year_of_exp } years of experience </p>
                <p>{`Address : ${ props.docData.city } ${props.docData.state}`}</p>
                <p>{`Contact : ${ props.docData.email }`}</p>
                <p></p>
                </div>
                </Link>
            </li>}

        </div>
        </center>
    )
}

export default Product;
