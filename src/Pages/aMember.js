import React from "react";
import axios from "axios";
import AOS from 'aos';

import 'aos/dist/aos.css';
import '../css/a.css';
import ruetLogo from "../images/Ruet_logo.jpg";
import libraryLogo from "../images/library.png";



class AMember extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            dept: "",
            image: "",
            about: "",
            designation: "",
            email: "",
            phone: "",
            facebook: "",
            linkedin: "",
            members: []
        };
    }

    componentDidMount() {
        this.fetchMembers();
    }

    // Function to fetch members from the API
    fetchMembers = async () => {
        try {
            const response = await axios.get("https://za-rvqp.onrender.com/api/get-all-members");
            const members = response.data; // Assuming the response contains an array of members
            this.state.members=members
            this.setState({ members });
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    // Function to handle form submission for creating a member
    handleCreateMember = async (event) => {
        event.preventDefault();
        const newMember = {
            id: parseInt(this.state.id), // Parse the ID as an integer
            name: this.state.name,
            dept: this.state.dept,
            image: this.state.image,
            about: this.state.about,
            designation: this.state.designation,
            email: this.state.email,
            phone: this.state.phone,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
        };

        try {
            // Make an API request to create a new member
            await axios.post("https://za-rvqp.onrender.com/api/save-data", newMember); // Use the correct API endpoint URL
            // Clear form fields after successful creation
            this.setState({
                id: "",
                name: "",
                dept: "",
                image: "",
                about: "",
                designation: "",
                email: "",
                phone: "",
                facebook: "",
                linkedin: "",
                members: [],
            });
            alert("Member created successfully!");
            this.fetchMembers();
        } catch (error) {
            alert("Failed to create member. Please try again.");
        }
    };


    // Function to handle form submission for deleting a member
    handleDeleteMember = async (event) => {
        event.preventDefault();
        const memberIdToDelete = this.state.id;

        try {
            // Make an API request to delete the member by ID
            await axios.delete(`https://za-rvqp.onrender.com/api/delete-member/${memberIdToDelete}`);
            // Clear the ID field after successful deletion
            this.setState({ id: "" });
            alert("Member deleted successfully!");
            // Refetch members to update the list after deletion
            this.fetchMembers();
        } catch (error) {
            alert("ID= "+this.state.id+" does not exist.");
        }
    };


    render() {
        return (
            <div id="acss">
               
                <div>
                    <h2>Number of members: {this.state.members.length}</h2>
                </div>
                <div>
                    <h2>Delete a member:</h2>
                    <form onSubmit={this.handleDeleteMember}>
                        <div>
                            <label>Member ID:</label>
                            <input
                                type="number"
                                name="id"
                                value={this.state.id}  // Add this line
                                onChange={(e) => this.setState({ id: e.target.value })}  // Add this line
                            />
                        </div>
                        <div>
                            <input type="submit" value="Delete" />
                        </div>
                    </form>
                </div>
                <div>
                    <h2>Members:</h2>
                    {this.state.members ? (
                        <ul>
                            {this.state.members.map((member) => (
                                <li key={member.id}>
                                    ID:{member.id} , Name: {member.name} , Dept: {member.dept} , Email: {member.email}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading members...</p>
                    )}
                </div>
            </div>
        );
    }
}

export default AMember;
