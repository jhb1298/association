import React from "react";
import axios from "axios";

class aManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            nname: "",
            npassword: "",
        };
    }

    // Function to handle form submission for updating username and password
    handleUpdateUser = async (event) => {
        event.preventDefault();
        
        const { name, password, nname, npassword } = this.state;

        // Prepare the request body
        const requestBody = {
            name: name,
            password: password,
            nname: nname,
            npassword: npassword,
        };

        try {
            // Make an API request to update the username and password
            const response = await axios.put("https://za-rvqp.onrender.com/api/update-admin", requestBody);

            if (response.status === 200) {
                alert("Username and password updated successfully!");
                // Clear form fields after successful update
                this.setState({
                    name: "",
                    password: "",
                    nname: "",
                    npassword: "",
                });
            } else {
                alert("Failed to update username and password. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error updating username and password:", error);
            alert("Failed to update username and password. Please try again.");
        }
    };

    render() {
        return (
            <div id="acss">
                <div>
                    <h2>Update Username and Password:</h2>
                    <form onSubmit={this.handleUpdateUser}>
                        <div>
                            <label>Old Username:</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Old Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>New Username:</label>
                            <input
                                type="text"
                                name="nname"
                                value={this.state.nname}
                                onChange={(e) => this.setState({ nname: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>New Password:</label>
                            <input
                                type="password"
                                name="npassword"
                                value={this.state.npassword}
                                onChange={(e) => this.setState({ npassword: e.target.value })}
                            />
                        </div>
                        <div>
                            <input type="submit" value="Update" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default aManager;
