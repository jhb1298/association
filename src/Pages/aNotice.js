import React from "react";
import axios from "axios";

class aNotice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notice: ""
        };
    }

    postNotice = async (event) => {
        event.preventDefault();

        // Prepare the request body
        const requestBody = {
            notice: this.state.notice,
        };

        try {
            // Make a POST request to your server's /api/postnotice endpoint
            const response = await axios.post("https://za-rvqp.onrender.com/api/postnotice", requestBody);

            if (response.status === 201) {
                alert("Notice posted successfully");
                // Clear form fields after successful update
                this.setState({
                    notice: ""
                });
            } else {
                alert("Failed to post notice.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to post notice. Please try again.");
        }
    };

    render() {
        return (
            <div id="acss">
                <div>
                    <h2>Notice:</h2>
                    <form onSubmit={this.postNotice}>
                        <textarea
                            name="notice"
                            value={this.state.notice}
                            onChange={(e) => this.setState({ notice: e.target.value })}
                            style={{ backgroundColor: 'rgba(200, 200, 200, 0.5)', width: '500px', height: '100px', fontSiz:"1.2rem" }}
                        ></textarea>
                        <div>
                            <input type="submit" value="Post" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default aNotice;
