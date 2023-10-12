import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/profile.css';
import image from '../images/Ruet_logo.jpg';
import axios from 'axios';

function Profile() {
    const  id = localStorage.getItem("id");
    const [memberInfo, setMemberInfo] = useState(null);

    useEffect(() => {
        AOS.init({
            // Options go here
        });

        fetchMemberInfo(id);
    }, [id]);

    const fetchMemberInfo = (id) => {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        axios.get(`https://za-rvqp.onrender.com/api/members/${id}`)
            .then((response) => {
                setMemberInfo(response.data);
            })
            .catch((error) => {
                console.error("Error fetching member information:", error);
            });
    };

    if (!memberInfo) {
        return <p>Loading...</p>;
    }

    return (
        <div id="profileBackground">
            <div id="top-Left">
                <img src={image} alt="" style={{ borderRadius: "50%", aspectRatio: "1/1", width: "200px" }}></img>
                <h1>{memberInfo.name}</h1>
                <h2><i>{memberInfo.id}</i></h2>
                <h2><i>Department of Computer Science and Engineering</i></h2>
                <h2><i>Rajshahi University of Engineeering and Technology</i></h2>

                <h2 style={{ borderBottom: "3px solid black", fontSize: "2rem", marginTop: "50px" }}><i>Contacts:</i></h2>
                <p><strong>Phone: </strong><i>{memberInfo.phone}</i></p>
                <p><strong>Email: </strong><i>{memberInfo.email}</i></p>
                <p><strong>Facebook: </strong><i>{memberInfo.facebook}</i></p>
                <p><strong>LinkedIn: </strong><i>{memberInfo.linkedin}</i></p>

                <h2 style={{ borderBottom: "3px solid black", fontSize: "2rem", marginTop: "50px" }}>Address:</h2>
                <p><i>Address details</i></p>
            </div>
            <div id="devider"></div>
            <div id="bottom-right">
                <h2 style={{ borderBottom: "3px solid black", fontSize: "2rem", marginTop: "50px" }}>About:</h2>
                <p>{memberInfo.about}</p>
            </div>
        </div>
    );
}

export default Profile;
