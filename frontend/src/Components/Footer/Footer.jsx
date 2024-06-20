import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/wallet.png'
import instagram_icon from '../Assets/instagram_icon.png'
import whatup_icon from '../Assets/whatsapp_icon.png'
import printerest_icon from '../Assets/pintester_icon.png'
import logo5 from '../Assets/logo5.png'

const Footer = () => {
    return (
        <div className='footer'>
            <hr />
            <div className='footer-logo'>
                <img src={logo5} alt="" className="w-24 h-24 mr-2" />
                <p>Wallet Watcher</p>
            </div>

            <ul className='footer-links'>
                <li>Company</li>
                <li>Wallet Address</li>
                <li>About</li>
                <li>Contact</li>
                <li>Location</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={printerest_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatup_icon} alt="" />
                </div>
            </div>
            {/* <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved </p>
            </div> */}

        </div>
    )
}

export default Footer