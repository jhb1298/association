import React from "react";
import AOS from 'aos';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';

import 'aos/dist/aos.css';
import '../css/nav.css';
import ruetLogo from "../images/Ruet_logo.jpg";


class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,
        };
        this.sidebutton = this.sidebutton.bind(this);
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
    render() {
        return (
            <div>
                <div className="sm sss" id="sideMenu">
                    <a href="/" className="mt">Home</a>
                    <a href="library" className="mt">Library</a>
                    <a href="events" className="mt">Events</a>
                    <a href="members" className="mt">Members</a>
                    <a href="fund" className="mt">Fund</a>
                    <a href="register" className="mt">Register</a>
                    <a href="logIn" className="mt">Log-in</a>
                    <a href="profile" className="mt">Profile</a>
                </div>

                <div id="topBar">
                    <div></div>
                    <div id="logoAndName">
                        <img className="logo" src={ruetLogo} alt="BGA Logo" />
                        <div id="nameBox">
                            <h1>Bogura Zilla Association</h1>
                            <h4>since 1998</h4>
                        </div>
                    </div>
                    {/*<i id="barButton" className="fas fa-bars"></i>*/}
                    <FontAwesomeIcon id="barButton" className="fab" onClick={this.sidebutton} icon={faBars} />
                </div>

               

                <script src="../images/home.js"></script>
                <script src="../images/cmn.js"></script>
                <script src="../images/https://unpkg.com/aos@next/dist/aos.js"></script>
                <script>
                    AOS.init(),
                </script>

            </div>);
    }
}

export default Nav;
