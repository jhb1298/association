import React from "react";
import axios from "axios"; // Import Axios for making API requests
import AOS from "aos";
import {
  NavLink,
  Outlet,
} from "react-router-dom";
import "aos/dist/aos.css";
import "../css/admin.css";
import ruetLogo from "../images/Ruet_logo.jpg";

function AdminBody() {
    return (
        <div id="adminBody">
            <Outlet />
        </div>
    );
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      isAuthenticated: false, 
    };
  }

  // Function to make an API request to authenticate the admin
  authenticateAdmin = async () => {
    const { user, pass } = this.state;
    try {
      // Make an API request to authenticate the admin
      const response = await axios.post("https://za-rvqp.onrender.com/api/admin-login", {
        name: user,
        password: pass,
      });

      if (response.status === 200) {
        // Authentication successful
        this.setState({ isAuthenticated: true, invalid: false });
      } else {
        // Authentication failed
        this.setState({ invalid: true });
      }
    } catch (error) {
      console.error("Error during admin authentication:", error);
      this.setState({ invalid: true });
    }
  };

  componentDidMount() {
    AOS.init({
      // Options go here
    });
  }

  render() {
    return (
      <div id="adminFrame">
        {!this.state.isAuthenticated && (
          <div id="auth">
            <div id="frame">
              <img id="logimg" src={ruetLogo} alt="" />
              <h2>Username</h2>
              <input
                className="inp"
                autoFocus
                placeholder="Jobayer Hossain"
                type="text"
                onChange={(e) => this.setState({ user: e.target.value })}
              />
              <h2>Password</h2>
              <input
                className="inp"
                placeholder="bz@623"
                type="password" // Change to password type for security
                onChange={(e) => this.setState({ pass: e.target.value })}
              />
              {this.state.invalid && <p>Wrong username or password.</p>}
              <p></p>
              <button onClick={this.authenticateAdmin}>Log-in</button>
            </div>
          </div>
        )}

        {/* Conditional rendering based on authentication status */}
        {this.state.isAuthenticated && (
          <div>
            {/* Render your admin dashboard content here */}
            <div id="adminNav">
              <div id="aLogoandName">
                <img className="logo" src={ruetLogo} alt="" />
                <h1 id="ah1">BZA Admin Dashboard</h1>
              </div>

              <div id="aNavLinks">
                <NavLink to="/admin/amember">Member</NavLink>
                <NavLink to="/admin/alibrary">Library</NavLink>
                <NavLink to="/admin/aevents">Events</NavLink>
                <NavLink to="/admin/afund">Fund</NavLink>
                <NavLink to="/admin/anotice">Notice </NavLink>
                <NavLink to="/admin/amanager">Access manager</NavLink>
              </div>
            </div>
            <AdminBody />
          </div>
        )}
      </div>
    );
  }
}

export default Register;
