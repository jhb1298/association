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
            aname:"",
            year:"",
            pQuote:"",
            sQuote:"",
            logo:"",
            bkash:"",
            nagad:"",
            rocket:""
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


    // Function to handle form submission for updating username and password
    handleUpdateInfo = async (event) => {
        event.preventDefault();
        

        // Prepare the request body
        const requestBody = {
            name: this.state.aname,
            year: this.state.year,
            logo:this.state.logo,
            pQuote:this.state.pQuote,
            sQuote:this.state.sQuote,
            bkash: this.state.bkash,
            nagad: this.state.nagad,
            rocket:this.state.rock
        };

        try {
            // Make an API request to update the username and password
            const response = await axios.put("https://za-rvqp.onrender.com/api/update-admin", requestBody);

            if (response.status === 200) {
                alert("Username and password updated successfully!");
                // Clear form fields after successful update
                this.setState({
                    aname:"",
                    year:"",
                    pQuote:"",
                    sQuote:"",
                    logo:"",
                    bkash:"",
                    nagad:"",
                    rocket:""
                });
            } else {
                alert("Failed to update info.");
            }
        } catch (error) {
            console.error("Error updating info.", error);
            alert("Failed to update info. Please try again.");
        }
    };

    handleLogoChange(event) {
        const file = event.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'bzaimage'); // Replace with your Cloudinary upload preset

            axios.post(`https://api.cloudinary.com/v1_1/dapnfbeyi/image/upload`, formData)
                .then((response) => {
                    if (response.status === 200) {
                        const imageURL = response.data.secure_url;
                        this.setState({ logo: imageURL })
                        console.log(this.state.image)
                    }
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                });
        }
    }

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
                <div>
                    <h2>Update association information:</h2>
                    <form onSubmit={this.handleUpdateInfo}>
                        <div>
                            <label>Name Of the association:</label>
                            <input
                                type="text"
                                name="name"
                                onChange={(e) => this.setState({ aname: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Logo:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {this.handleLogoChange()}}
                            />
                        </div>
                        <div>
                            <label>Precidents Quote:</label>
                            <textarea
                                name="nname"
                                onChange={(e) => this.setState({ pQuote: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Secratery Quote:</label>
                            <textarea
                                onChange={(e) => this.setState({ sQuote: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>BKash No:</label>
                            <input
                                name="bkash"
                                onChange={(e) => this.setState({ bkash: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Nagad No:</label>
                            <input
                                name="nagad"
                                onChange={(e) => this.setState({ nagad: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Rocket No:</label>
                            <input
                                name="rocket"
                                onChange={(e) => this.setState({ rocket: e.target.value })}
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
