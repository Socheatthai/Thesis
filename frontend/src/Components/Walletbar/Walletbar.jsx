import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
// import { TbChartArrowsVertical } from 'react-icons/tb';
import './Walletbar.css'
import Imageno3a from '../Assets/No3a-removebg-preview.png';
import clogo from '../Assets/clogo.png.png';

const Walletbar = () => {
    const [balance, setBalance] = useState("");
    const [userAccount, setUserAccount] = useState('');
    const [price, setPrice] = useState({});
    const [etherSupply, setEtherSupply] = useState({});
    const [updatedPriceDate, setUpdatedPriceDate] = useState("");
    const [error, setError] = useState(null);
    const [openModel, setOpenModel] = useState(true); // Define openModel state

    const API_ETHER_KEY = "U6PTUIYIF6NRAMBC9A97MUSDWX3DCA87M6";

    const getEtherPrice = async () => {
        try {
            const priceResponse = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${API_ETHER_KEY}`);
            setPrice(priceResponse.data.result);

            const timestamp = Number(priceResponse.data.result.ethusd_timestamp);
            const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
            setUpdatedPriceDate(
                `Updated at: ${date.toLocaleString()}`
            );

            const supplyResponse = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${API_ETHER_KEY}`);
            setEtherSupply(supplyResponse.data.result);
        } catch (error) {
            setError("Error fetching data from Ethereum API");
            console.log(error);
        }
    };

    const checkIfAccountExist = async () => {
        try {
            if (!window.ethereum) {
                setError("Please install MetaMask");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
                setUserAccount(accounts[0]);
            } else {
                setError("No Ethereum account found");
            }
        } catch (error) {
            setError("Error checking MetaMask account");
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                setError("Please install MetaMask");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length > 0) {
                setUserAccount(accounts[0]);
            } else {
                setError("No Ethereum account found");
            }
            window.location.reload();
        } catch (error) {
            setError("Error connecting MetaMask");
            console.log("Something went wrong: ", error);
        }
    };

    // OPEN MODAL BOX
    const openUserInfo = () => {
        setOpenModel(!openModel); // Toggle openModel state
    };

    useEffect(() => {
        checkIfAccountExist();
        getEtherPrice();
    }, []);

    return (
        <div className="w-full h-full container-fluid flex-1 justify-center p-6 container-fluid bg-[#111F2C]">
            <div className="navbarr bg-slate-200">
                <div className="navbarr_container">
                    <div className="left bg-slate-200">
                        <a href="/">
                            <div>
                                <h1 className="desktop"> Your Wallet Watcher</h1>
                                <h1 className="mobile">
                                    <img src={Imageno3a} alt="logo" width={50} height={50} />
                                </h1>
                            </div>
                        </a>
                    </div>

                    {/* Right Side of Header */}
                    <div className="right">
                        {error && <p>{error}</p>}
                        {userAccount.length > 0 ? (
                            <div className="connected">
                                <button onClick={openUserInfo}>
                                    Account: {userAccount.slice(0, 10)}...
                                </button>
                                {openModel ? (
                                    <div className="userModel">
                                        <div className="user_box">
                                            <div className="closeBtn">
                                                <FaTimes onClick={openUserInfo} />
                                            </div>
                                            <img src={Imageno3a} alt="User logo" width={50} height={50} />
                                            <p>Account: &nbsp; {userAccount}</p>
                                            <p>Balance: &nbsp; {balance}</p>
                                            <p>Total Transaction: &nbsp; count ETH</p>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ) : (
                            <button onClick={connectWallet} className="text-sm text-white bg-gradient-to-br from-green-600 to-green-500 rounded-md px-4 py-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out">Connect Wallet</button>
                        )}
                    </div>
                </div>
            </div>
            <div className="price">
                <div className="price__box">
                    <div className="tokenBox_logo">
                        <img src={clogo} alt="" width={100} height={100} />
                    </div>
                    <div className="logoWidth">
                        <p>Bitcoin</p>
                        <p>Ethereum</p>
                        <p>XRP</p>

                    </div>
                </div>
                <div className="price__box ">
                    <div className="tokenBox_logo">
                        <img src={Imageno3a} alt="" width={200} height={200} />
                    </div>
                    <div className="logoWidth">
                        <p>ERC20</p>
                        <p>ERC21</p>
                        <p>ERC1155</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Walletbar;
