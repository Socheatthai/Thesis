// import React, { useState, useEffect, useContext } from "react";
// import { ethers } from "ethers";
// import { Link } from "react-router-dom";
// import { SiMinutemailer } from "react-icons/si";
// import logo5 from "../Components/Assets/logo5.png";
// import { Etherescan } from "../Context/Ether";
// import '../indix.css'
// const Indix = () => {
//     const { data, yourBlockTrans } = useContext(Etherescan);

//     // USESTATE SECTION
//     const [userAccount, setUserAccount] = useState('');

//     //CONVERT ETHER
//     const converIntoETH = (amount) => {
//         const ETH = ethers.utils.formatUnits(amount, "ether");
//         return ETH;
//     }

//     //////// Input Address

//     const accountAddress = (event) => {
//         event.preventDefault();
//         const address = document.getElementById("accountAddress").ariaValueMax.trim();
//         setUserAccount(address);
//         Router.push('/account?${address}')
//         address = " ";


//     }

//     return (
//         <div>
//             <div className="header">
//                 <form className="accountAddress">
//                     <input type="text" placeholder="Ether Account address" id="accountAddress" />
//                     <Link to={{ pathname: '/account', query: userAccount }}>
//                         <a>
//                             <SiMinutemailer />
//                         </a>
//                     </Link>
//                 </form>
//             </div>

//             {/* MAIN SECTION OF HOME PAGE */}
//             <div className="container">
//                 <div className="container__box">
//                     <h3>Latest Blocks</h3>
//                     <div className="container__block">
//                         {yourBlockTrans.map((el, i) => (
//                             <React.Fragment key={i + 1}>
//                                 <div className="oneBlock">
//                                     <div className="block">
//                                         <div className="info">
//                                             <p className="bk">BK</p>
//                                             <Link to={{ pathname: "/block", query: el.number }}>
//                                                 {el.number}
//                                             </Link>
//                                         </div>
//                                         <p>{el.timestamp}</p>
//                                     </div>
//                                 </div>
//                                 <div className="miner">
//                                     <p>
//                                         <samp>
//                                             Miner: &nbsp;&nbsp;
//                                             <link className="link" href={{ pathname: '/account', query: el.miner }}>
//                                                 <a> {el.miner.slice(0, 4
//                                                     5)}...</a>
//                                             </link>
//                                         </samp>
//                                     </p>
//                                     <span>
//                                         <Link href={{ pathname: "/block", query: el.number }}>
//                                             <a>{el.transactions.length}</a>
//                                         </Link>
//                                         &nbsp;TNS in 3sec
//                                     </span>

//                                 </div>
//                                 <div className="reward">
//                                     <p>
//                                         {convertIntoETH(el.baseFeePerGas)} <span>ETH</span>
//                                     </p>
//                                     <img src={logo5} className="eth" width={10} height={10} />
//                                 </div>
//                             </React.Fragment>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Indix;
