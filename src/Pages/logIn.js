import React from "react";
import AOS from 'aos';

import 'aos/dist/aos.css';
import styles from '../css/logIn.css';
import ruetLogo from "../images/Ruet_logo.jpg";

class LogIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    AOS.init({
      // Options go here
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    
    fetch("https://za-rvqp.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Authentication successful
          this.setState({ id: data.id });
          
          localStorage.setItem("id",data.id)
          // Redirect to the home page or perform any necessary action.
          window.location.href = "/";
        } else {
          // Authentication failed
          alert("Authentication failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });

    // For simplicity, I'm just logging the form values here.
    console.log("Email:", email);
    console.log("Password:", password);
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1 className={styles.h1} style={{ textAlign: 'center' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h1>
        <form id="frame" onSubmit={this.handleFormSubmit}>
          <img id="logimg" src={ruetLogo} alt="" />

          <h2>Email</h2>
          <input
            className="inp"
            autoFocus
            placeholder="example@gmail.com"
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />
          <h2>Password</h2>
          <input
            className="inp"
            placeholder="bz@623"
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />

          <h3>Don't have an account? <a href="register">Register</a></h3>
          <div style={{ width: '100%', marginBottom: '5%' }}>
            <input style={{ display: 'inline' }} type="checkbox" name="option1" value="Option 1" />
            <h3 style={{ display: 'inline' }}>Accept <a href="t&c">terms & conditions.</a></h3>
          </div>
          <button type="submit">Log-in</button>
        </form>
      </div>
    );
  }
}

export default LogIn;
