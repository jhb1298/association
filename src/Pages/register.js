import React from "react";
import AOS from 'aos';
import axios from 'axios';
//import { Cloudinary } from "@cloudinary/url-gen";
//import { AdvancedImage } from "@cloudinary/react";
import 'aos/dist/aos.css';
import '../css/register.css';
import ruetLogo from "../images/Ruet_logo.jpg";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,
            id: '',
            name: '',
            dept: '',
            email: '',
            phone: '',
            facebook: '',
            linkedin: '',
            about: '',
            adress:'',
            password: '',
            image: "",
        };
        this.sidebutton = this.sidebutton.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    sidebutton() {
        const { drawerOpened } = this.state;
        const menu = document.getElementById("sideMenu");
        if (drawerOpened) {
            menu.classList.add("sideMenuOut");
            menu.addEventListener("animationend", () => {
                menu.classList.remove("sideMenuOut");
                menu.style.transform = "scaleY(0)";
            }, { once: true });
            this.setState({ drawerOpened: false });
        } else {
            menu.classList.add("sideMenuIn");
            menu.addEventListener("animationend", () => {
                menu.classList.remove("sideMenuIn");
                menu.style.transform = "scaleY(1)";
            }, { once: true });
            this.setState({ drawerOpened: true });
        }
        console.log(this.state.drawerOpened);
    }

    componentDidMount() {
        AOS.init({
            // Options go here
        });
    }

    handleImageChange(event) {
        const file = event.target.files[0];
        
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'bzaimage'); // Replace with your Cloudinary upload preset
    
            axios.post(`https://api.cloudinary.com/v1_1/dapnfbeyi/image/upload`, formData)
                .then((response) => {
                    if (response.status === 200) {
                        const imageURL = response.data.secure_url;
                        console.log(imageURL)
                        this.setState({ image: imageURL });
                    }
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                });
        }
    }
    

    handleSubmit = (event) => {
        //event.preventDefault();

        const formData = {
            id: parseInt(this.state.id),
            name: this.state.name,
            dept: this.state.dept,
            email: this.state.email,
            phone: this.state.phone,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            about: this.state.about,
            adess:this.state.adress,
            password: this.state.password,
            image: this.state.image, // Image URL from Cloudinar
        };

        console.log(formData)

        // Send a POST request to your backend API to save the registration data
        axios.post('https://za-rvqp.onrender.com/api/member', formData)
            .then((response) => {
                console.log('Registration successful', response.data);
                // Handle success, redirect, or display a success message
            })
            .catch((error) => {
                console.error('Error during registration', error);
                // Handle error and display an error message
            });
    };


    render() {
        return (
            <div>
                <form id="rframe" onSubmit={this.handleSubmit}>
                    <img id="rimg" src={ruetLogo} alt="" />
                    <h2>Student Id</h2>
                    <input
                        className="inp"
                        autoFocus
                        placeholder="1903128"
                        type="number"
                        name="id"
                        value={this.state.id}
                        onChange={(e) => this.setState({ id: e.target.value })}
                    />
                    <h2>Name</h2>
                    <input
                        className="inp"
                        placeholder="Jobayer Hossain"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                    <h2>Department</h2>
                    <select
                        className="inp"
                        name="dept"
                        value={this.state.dept}
                        onChange={(e) => this.setState({ dept: e.target.value })}
                        style={{ margin: "0", maxWidth: "none" }}
                    >
                        <option>Civil</option>
                        <option>Mechanical</option>
                        <option>EEE</option>
                        <option>CSE</option>
                    </select>
                    <h2>Email</h2>
                    <input
                        className="inp"
                        placeholder="bza12@gmail.com"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <h2>Phone</h2>
                    <input
                        className="inp"
                        placeholder="0176*****49"
                        type="text"
                        name="phone"
                        value={this.state.phone}
                        onChange={(e) => this.setState({ phone: e.target.value })}
                    />
                    <h2>Facebook</h2>
                    <input
                        className="inp"
                        placeholder="https://www.facebook.com/jobayerhossain.19/"
                        name="facebook"
                        type="text"
                        value={this.state.facebook}
                        onChange={(e) => this.setState({ facebook: e.target.value })}
                    />
                    <h2>LinkedIn</h2>
                    <input
                        className="inp"
                        placeholder="www.linkedin.com/in/jobayer-hossain-164895288"
                        name="linkedin"
                        type="text"
                        value={this.state.linkedin}
                        onChange={(e) => this.setState({ linkedin: e.target.value })}
                    />
                    <h2>Image</h2>
                    <input
                        className="inp"
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={this.handleImageChange}
                    />
                    <h2>About</h2>
                    <textarea
                        className="inp"
                        placeholder="I am a..."
                        name="about"
                        value={this.state.about}
                        onChange={(e) => this.setState({ about: e.target.value })}
                    />
                    <h2>Address</h2>
                    <textarea
                        className="inp"
                        placeholder="12/2 Santahar, Bogura"
                        name="adress"
                        value={this.state.adress}
                        onChange={(e) => this.setState({ adress: e.target.value })}
                    />
                    <h2>Set Password</h2>
                    <input
                        className="inp"
                        placeholder="bZ@623"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />

                    <h3>Aready registered? <a href="logIn">Log-in</a></h3>
                    <div style={{ width: '100%', marginBottom: '5%' }}>
                        <input style={{ display: 'inline' }} type="checkbox" name="option1" value="Option 1" />
                        <h3 style={{ display: 'inline' }}>Accept <a href="t&c">terms & conditions.</a></h3>
                    </div>
                    <input type="submit" value={"Submit"}></input>
                </form>
            </div>
        );
    }
}

export default Register;
