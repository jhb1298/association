import React from "react";
import AOS from 'aos';
import axios from "axios";


import 'aos/dist/aos.css';
import '../css/home.css';
import ruetLogo from "../images/Ruet_logo.jpg";
import libraryLogo from "../images/library.png";


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,
            notice: [],
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

    // Create a function to fetch notice data
    async fetchNoticeData() {
        try {
            const response = await axios.get("https://za-rvqp.onrender.com/api/get-notices"); // Replace with your actual API endpoint
            return response.data;
        } catch (error) {
            console.error("Error fetching notice:", error);
            return [];
        }
    }

    async componentDidMount() {
        AOS.init({
            // Options go here
        });
        const noticeData = await this.fetchNoticeData();
        this.setState({ notice: noticeData });
    }

    render() {
        return (
            <div>



                <div id="outer1">
                    <div id="left">
                        <div id="top">
                            <div className="oc" id="pBox">
                                <div style={{ height: '25%' }}>
                                    <img style={{ display: 'inline', width: '15%', borderRadius: '50%', aspectRatio: '1/1' }}
                                        src={ruetLogo} alt="PImage" />
                                    <div style={{ display: 'inlineBlock', height: '100%', width: '50%' }}>
                                        <p style={{ margin: '0% 0% 5% 5%', color: 'aliceblue', fontSize: '1.1rem' }}>Precidents Name</p>
                                        <p style={{ margin: '0% 0% 5% 5%', color: 'aliceblue', fontSize: '.7rem' }}>Precident</p>
                                    </div>
                                </div>
                                <p style={{ color: 'aliceblue', fontSize: '1rem', height: '75%' }}>"Lorem ipsum dolor sit amet consectetur
                                    adipisicing
                                    elit. Ipsam velit corrupti quo a, ratione doloribus porro voluptatum in qui nihil, consequuntur
                                    maiores error dolores unde nobis dicta tempora, fugiat ea."</p>

                            </div>
                            <div className="oc" id="sBox">
                                <div style={{ height: '25%' }}>
                                    <img style={{ display: 'inline', width: '15%', borderRadius: '50%', aspectRatio: '1/1' }}
                                        src={ruetLogo} alt="PImage" />
                                    <div style={{ display: 'inline-block', height: '100%', width: '50%' }}>
                                        <p style={{ margin: '0% 0% 5% 5%', color: 'aliceblue', fontSize: '1.1rem' }}>Secratery Name</p>
                                        <p style={{ margin: '0% 0% 5% 5%', color: 'aliceblue', fontSize: '.7rem' }}>Secretary</p>
                                    </div>
                                </div>
                                <p style={{ color: 'aliceblue', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>"Lorem
                                    ipsum dolor sit amet consectetur adipisicing
                                    elit. Ipsam velit corrupti quo a, ratione doloribus porro voluptatum in qui nihil, consequuntur
                                    maiores error dolores unde nobis dicta tempora, fugiat ea."</p>

                            </div>
                        </div>
                        <div className="oc" id="bottom">
                            <p
                                style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '1%', marginBottom: '3%', borderBottom: '2px dashed black', height: '10%' }}>
                                Notice</p>
                            <div style={{ padding: '5%', maxHeight: '15rem', paddingTop: '0%', overflowY: 'scroll' }}>
                                {this.state.notice.map((item, index) => (
                                    <p key={index} style={{ margin: '1%', fontSize: '1rem', borderBottom:'1px solid black' }}>
                                        {item.text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div id="right">
                        <a href="library">
                            <div className="oc" id="d1">
                                <img style={{ width: '80%', display: 'block', margin: 'auto', borderRadius: '50%', aspectRatio: '1/1' }}
                                    src={libraryLogo} alt="Library" />
                                <p style={{ textAlign: 'center', fontSize: '1rem' }}>Library</p>
                            </div>
                        </a>
                        <a href="events">
                            <div className="oc" id="d2">
                                <img style={{ width: '80%', display: 'block', margin: 'auto', borderRadius: '50%', aspectRatio: '1/1' }}
                                    src={libraryLogo} alt="Library" />
                                <p style={{ textAlign: 'center', fontSize: '1rem' }}>Events</p>
                            </div>
                        </a>
                        <a href="members">
                            <div className="oc" id="d3">
                                <img style={{ width: '80%', display: 'block', margin: 'auto', borderRadius: '50%', aspectRatio: '1/1' }}
                                    src={libraryLogo} alt="Library" />
                                <p style={{ textAlign: 'center', fontSize: '1rem' }}>Members</p>
                            </div>
                        </a>
                        <a href="fund">
                            <div className="oc" id="d4">
                                <img style={{ width: '80%', display: 'block', margin: 'auto', borderRadius: '50%', aspectRatio: '1/1' }}
                                    src={libraryLogo} alt="Library" />
                                <p style={{ textAlign: 'center', fontSize: '1rem' }}>Fund</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div id="outer2">
                    <div className="bcard oc" id="i1" data-aos="fade-left" style={{ opacity: '.6' }}>
                        <p style={{ fontSize: '2rem', marginTop: '0%', borderBottom: '1px solid black' }}>About Us</p>
                        <p style={{ fontSize: '1.2rem' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eaque unde,
                            nisi, placeat saepe deserunt enim fuga, error magni reprehenderit ipsum ullam cupiditate non?
                            Reprehenderit maxime totam odit numquam accusamus?</p>
                    </div>
                    <div className="bcard oc" id="i2" data-aos="fade-right" style={{ opacity: '.6' }}>
                        <p style={{ fontSize: '2rem', marginTop: '0%', borderBottom: '1px solid black' }}>Library</p>
                        <p style={{ fontSize: '1.2rem' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eaque unde,
                            nisi,
                            placeat saepe deserunt enim fuga, error magni reprehenderit ipsum ullam cupiditate non? Reprehenderit
                            maxime totam odit numquam accusamus?</p>
                    </div>
                    <div className="bcard oc" id="i3" data-aos="fade-left" style={{ opacity: .6 }}>
                        <p style={{ fontSize: '2rem', marginTop: '0%', borderBottom: '1px solid black' }}>Events</p>
                        <p style={{ fontSize: '1.2rem' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eaque unde,
                            nisi,
                            placeat saepe deserunt enim fuga, error magni reprehenderit ipsum ullam cupiditate non? Reprehenderit
                            maxime totam odit numquam accusamus?</p>
                    </div>
                    <div className="bcard oc" id="i4" data-aos="fade-right" style={{ opacity: .6 }}>
                        <p style={{ fontSize: '2rem', marginTop: '0%', borderBottom: '1px solid black' }}>Members</p>
                        <p style={{ fontSize: '1.2rem' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eaque unde,
                            nisi,
                            placeat saepe deserunt enim fuga, error magni reprehenderit ipsum ullam cupiditate non? Reprehenderit
                            maxime totam odit numquam accusamus?</p>
                    </div>
                    <div className="bcard oc" id="i5" data-aos="fade-left" style={{ opacity: .6 }}>
                        <p style={{ fontSize: '2rem', marginTop: '0%', borderBottom: '1px solid black' }}>Fund</p>
                        <p style={{ fontSize: '1.2rem' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eaque unde,
                            nisi,
                            placeat saepe deserunt enim fuga, error magni reprehenderit ipsum ullam cupiditate non? Reprehenderit
                            maxime totam odit numquam accusamus?</p>
                    </div>
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

export default Home;
