import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/profile.css';
import image from '../images/Ruet_logo.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Profile() {
    const { id } = useParams();
    const [memberInfo, setMemberInfo] = useState(null);


    useEffect(() => {
        AOS.init({
            // Options go here
        });

        fetchMemberInfo(id);
    }, [id]);

    const [edit, setEdit] = useState(false)

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

    const handleUpdateMember = () => {

        setEdit(false)

        // Send the updated member information in the body of the PUT request
        axios.put(`https://za-rvqp.onrender.com/api/updateMember/${id}`, memberInfo)
            .then((response) => {
                console.log("Member information updated successfully");
                fetchMemberInfo(id);
            })
            .catch((error) => {
                console.error("Error updating member information:", error);
            });
    };

    const returnRank=(r)=>{
        switch(r){
            case(1):return "Precident"
            case(2):return "Secratery"
            default:return "Member"
        }
    }

    if (!memberInfo) {
        return <p>Loading...</p>;
    }

    return (
        <div id="profileBackground">
            <div id="top-Left">
                { localStorage.getItem("id") && (memberInfo.id===localStorage.getItem("id")) &&
                    <button onClick={() => { setEdit(true) }}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                }
                

                <img src={image} alt="" style={{ borderRadius: "50%", aspectRatio: "1/1", width: "200px" }}></img>
                <h1>{memberInfo.name}</h1>
                <h2>{returnRank(memberInfo.rank)}</h2>
                <h2><i>{memberInfo.id}</i></h2>
                <h2><i>Department of Computer Science and Engineering</i></h2>
                <h2><i>Rajshahi University of Engineeering and Technology</i></h2>

                <h2 style={{ borderBottom: "3px solid black", fontSize: "2rem", marginTop: "50px" }}><i>Contacts:</i></h2>
                <p><strong>Phone: </strong><i>
                    {edit ? <input defaultValue={memberInfo.phone} 
                    onChange={(e) => { setMemberInfo({...memberInfo,phone:e.target.value})}} 
                    /> : memberInfo.phone}
                </i></p>
                <p><strong>Email: </strong><i>
                    {edit ? <input defaultValue={memberInfo.email} onChange={(e) => { setMemberInfo({...memberInfo,email:e.target.value})}}  /> : memberInfo.email}

                </i></p>
                <p><strong>Facebook: </strong><i>
                    {edit ? <input defaultValue={memberInfo.facebook} onChange={(e) => { setMemberInfo({...memberInfo,facebook:e.target.value})}}  /> : memberInfo.facebook}

                </i></p>
                <p><strong>LinkedIn: </strong><i>
                    {edit ? <input defaultValue={memberInfo.linkedin} onChange={(e) => { setMemberInfo({...memberInfo,linkedin:e.target.value})}}  /> : memberInfo.linkedin}

                </i></p>

                <h2 style={{ borderBottom: "3px solid black", fontSize: "2rem", marginTop: "50px" }}>Address:</h2>
                <p><i>
                    {edit ? <textarea defaultValue={memberInfo.adress} onChange={(e) => { setMemberInfo({...memberInfo,adress:e.target.value})}}  /> : memberInfo.adress}

                </i></p>
            </div>
            <div id="devider"></div>
            <div id="bottom-right" style={{ display: "flex", flexDirection: "column" }}>
                <h2 style={{ borderBottom: "3px solid black", fontSize: "2rem", marginTop: "50px" }}>About:</h2>
                {edit ? <textarea defaultValue={memberInfo.about} onChange={(e) => { setMemberInfo({...memberInfo,about:e.target.value})}}  /> : memberInfo.about}
                { localStorage.getItem("id") &&(memberInfo.id===localStorage.getItem("id")) &&
                <button style={{ alignSelf: "end", width: "max-content", padding: "10px", marginTop: "20px" }}
                    onClick={() => { handleUpdateMember() }}
                >Save</button>}
            </div>
        </div>
    );
}

export default Profile;
