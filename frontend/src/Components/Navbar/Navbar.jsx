import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo1.png'
import wallet_icon from '../Assets/wallet.png'
import logo3 from '../Assets/N03-removebg-preview.png'
import logo4 from '../Assets/No3a-removebg-preview.png'
import logo5 from '../Assets/logo5.png'
import { Link } from 'react-router-dom'

const Navbar = () => {


    const [menu, setMenu] = useState("home");



    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <Link to="/home">
                    <img src={logo5} alt="" />
                </Link>
                <p className='text-red-400'>WALLET WATCHER</p>
            </div>
            <ul className='nav-menu'>
                <Link style={{ textDecoration: 'none', color: '#626262' }} to={"/home"}> <li onClick={() => { setMenu("home") }}>Home{menu === "home" ? <hr /> : <></>}</li></Link>
                <Link style={{ textDecoration: 'none', color: '#626262' }} to={"/about"}> <li onClick={() => { setMenu("about") }}>About{menu === "about" ? <hr /> : <></>}</li></Link>
                <Link style={{ textDecoration: 'none', color: '#626262' }} to={"/contact"}> <li onClick={() => { setMenu("contact") }}>Contact{menu === "contact" ? <hr /> : <></>}</li></Link>
                <Link style={{ textDecoration: 'none', color: '#626262' }} to={"/wallet"}> <li onClick={() => { setMenu("wallet") }}><img src={logo4} alt="" />{menu === "wallet" ? <hr /> : <></>}</li></Link>

            </ul>

        </div>
    )
}

export default Navbar