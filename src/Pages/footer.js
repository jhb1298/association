import React from "react";
import AOS from 'aos';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

import 'aos/dist/aos.css';
import '../css/footer.css';


class Footer extends React.Component {

    
    componentDidMount() {
        AOS.init({
            // Options go here
        });
    }
    render() {
        return (
            <div>
                <div id="footer">
                    <div id="sc">
                        <div id="supportS">
                            <h3 style={{ borderBottom: '1px solid white', width: 'fit-content' }}>Supports</h3>
                            <a href="getHelp.html" className="ft">Get help</a>
                            <a href="faqs.html" className="ft">FAQs</a>
                        </div>
                        <div id="contacts">
                            <h3 style={{ borderBottom: '1px solid white', width: 'fit-content' }}>Contacts</h3>
                            <a className="ft" href="ljsdkf">Mobile: 01767366050</a>
                            <a className="ft" href="ljsdkf">Email: bza19@gmail.com</a>
                        </div>
                    </div>
                    <div id="extra">
                        <div id="icons">
                            <FontAwesomeIcon className="fab" icon={faFacebook} />
                            <FontAwesomeIcon className="fas" icon={faGoogle} />
                            <FontAwesomeIcon className="fab" icon={faInstagram} />
                            <FontAwesomeIcon className="fab" icon={faTwitter} />
                            <FontAwesomeIcon className="fab" icon={faYoutube} />

                        </div>
                        <div id="dev">
                            <p style={{ color: 'rgb(106, 116, 124)', fontSize: '1.3rem', margin: '0%' }}>Developed by-</p>
                            <p style={{ color: 'rgb(106, 116, 124)', margin: '0% 0% 2% 5%', fontSize: '1rem' }}>Jobayer Hossain</p>
                        </div>
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

export default Footer;
