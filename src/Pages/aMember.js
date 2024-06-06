import React from "react";
import axios from "axios";

import 'aos/dist/aos.css';
import '../css/a.css';



class AMember extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            rank: 1000,
            name: "",
            dept: "",
            image: "",
            about: "",
            adress: "",
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
            //this.state.members = members
            this.setState({ members: members });
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    /*// Function to handle form submission for creating a member
    handleCreateMember = async (event) => {
        event.preventDefault();
        const newMember = {
            id: parseInt(this.state.id), // Parse the ID as an integer
            name: this.state.name,
            dept: this.state.dept,
            image: this.state.image,
            about: this.state.about,
            adress:this.state.adress,
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
                adress:"",
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
    };*/


    // Function to handle form submission for deleting a member
    handleDeleteMember = async (event) => {
        event.preventDefault();
        const memberIdToDelete = this.state.id;

        try {
            // Make an API request to delete the member by ID
            await axios.delete(`https://za-rvqp.onrender.com/api/delete-member/${memberIdToDelete}`);
            // Clear the ID field after successful deletion
            this.setState({ id: 0 });
            alert("Member deleted successfully!");
            // Refetch members to update the list after deletion
            this.fetchMembers();
        } catch (error) {
            alert("ID= " + this.state.id + " does not exist.");
        }
    };



    handleAsignRank = () => {
       let member={...this.state.members.find((m)=>(m.id==this.state.id)),rank:120}

      const id=this.state.id

        axios.put(`https://za-rvqp.onrender.com/api/updateMember/${id}`, member)
            .then((response) => {
                console.log("Member information updated successfully");
                localStorage.setItem("Members",JSON.stringify(response))
            })
            .catch((error) => {
                console.error("Error updating member information:", error);
            });
    };


    handleClearRank = async () => {

        // Send the updated member information in the body of the PUT request
        axios.put(`https://za-rvqp.onrender.com/api/clearRank`)
            .then((response) => {
                console.log("Member information updated successfully");
            })
            .catch((error) => {
                console.error("Error updating member information:", error);
            });
    };


    render() {
        return (
            <div id="acss">
                <div>
                    <h2>Number of members: {this.state.members.length}</h2>
                </div>
                <div>
                    <h2>Delete a member:</h2>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        this.handleDeleteMember()}}>
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
                    <h2>Asign Rank:</h2>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        this.handleAsignRank()}}>
                        <div>
                            <label>Member ID:</label>
                            <input
                                type="number"
                                name="id"
                                onChange={(e) => this.setState({ id: parseInt(e.target.value) })}  // Add this line
                            />
                        </div>
                        <div>
                            <label>Rank:</label>
                            <select
                                name="rank"
                                onChange={(e) => this.setState({ rank: e.target.value })}  // Add this line
                            >
                                <option value={1000}>Choose Rank</option>
                                <option value={1}>Precident</option>
                                <option value={2}>Secratery</option>
                                <option value={3}>Librarian</option>
                            </select>
                        </div>
                        <div>
                            <input type="submit" value="Update" />
                        </div>
                    </form>
                </div>
                <div>
                    <button style={{ backgroundColor: "red", height: "30px" }} onClick={() => { this.handleClearRank() }}>Clear Rank</button>
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
