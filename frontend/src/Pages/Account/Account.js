// import React, { useState, useEffect, useContext } from 'react;'
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { ethers } from 'ethers';
// import logo5 from "../../src/Components/Assets/logo5";
// import Table from "../Components/Table/Table";
// import './Account.css'


// ////// INTERNAL IMPORT
// import { Etherescan } from '../Context/Ether';

// const Account = () => {
//     const { provider } = useContext(Etherescan);
//     const router = useRouter();
//     const { query } = router;
//     const acc = Object.keys(query)[0];


//     //// USESTATE SECTION
//     const [account, setAccount] = useState('');
//     const [balance, setbalance] = useState('');
//     const [totalTransaction, setTotalTransaction] = useState('');
//     const [name, setName] = useState('');
//     const [open, setOpen] = useState(false);
//     const [loading, setLoading] = useState(true);



//     ///// API USESTATE
//     const [accountHistory, setAccountHistory] = useState([]);
//     const [internalByAddress, setInternalByAddress] = useState([]);
//     const [ERC20, setERC20] = useState([]);
//     const [ERC21, setERC21] = useState([]);
//     const [ERC1155, setERC1155] = useState([]);
//     const [blockMindedByAddress, setBlockMindedByAddress] = useState([]);
//     const [blockRangeTransaction, setBlockRangeTransaction] = useState([]); \

//     const accountData = async () => {
//         try {
//             setAccount(acc);

//             if (open) {
//                 setOpen(false);
//             }

//             ///ACCOUNT NAME

//             const ESN = await provider.lookupAddress(acc);
//             if (ESN === null) {
//                 setName(ESN);
//                 setLoading(false);
//             } else {
//                 setName(ESN);
//                 setLoading(false);
//             }

//             ///GET ACCOUNT BALANCE DATAILS
//             const accountBalance = await provider.getBalance(acc);
//             const showBalance = ethers.utils.formatEther(accountBalance);
//             setBalance(showBalance);

//             /// API CALL ETHER SCAN API
//             const API_KEY = "U6PTUIYIF6NRAMBC9A97MUSDWX3DCA87M6";

//             /// TRANSACTION HISTORY
//             await fetch('https://api.etherscan.io/api?module=account&action=txlist&address=${acc}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}')
//             .then((response) => response.json())
//             .then((data) => setAccountHistory(data.result));
            
//             //// TRANSACTION BY INTERNAL HASH 

//             axios.get('https://api.etherscan.io/api?module=account&action=txlistinternal&address=${acc}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${API_KEY}')
//             .then((response) => {
//                 const dataInter = response.data.result;
//                 setInternalByAddress(dataInter);
//             });

//             ///ETHERSCAN API ERC20 TOKEN

//             axios.get('https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&address=${acc}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${API_KEY}').then((response)=> {
//                 const tokenERC20 = response.data.result;
//                 setERC20(tokenERC20);

//             });

//             /// ETHERSCAN API BLOCKED Validated BY ADDRESS
//             axios.get('https://api.etherscan.io/api?module=account&action=getminedblocks&address=${acc}&blocktype=blocks&page=1&offset=10&apikey=${API_KEY}')
//             .then((response)=>{
//                 const blockMindedByAddress = response.data.result;
//                 setBlockMindedByAddress(blockMindedByAddress);

//             });


//             //ETHERSCAN API BLOCK RANGE 
//             axios.get('https://api.etherscan.io/api?module=account&action=txlistinternal&startblock=13481773&endblock=13491773&page=1&offset=10&sort=asc&apikey=${API_KEY}')
//             .then((response)=>{
//                 const transitionByBlockRange = response.data.result;
//                 setBlockRangeTransaction(transitionByBlockRange);

//             });

//             ///ETHERSCAN API ERC21 TOKEN

//             axios.get('https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x06012c8cf97bead5deae237070f9587f8e7a266d&address=${acc}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${API_KEY}')
//             .then((response) => {
//                 const tokenERC21 = response.data.result;
//                 setERC21(tokenERC21);
//             });

//             ////ETHERSCAN API ERC1155 TOKEN

//             axios.get('https://api.etherscan.io/api?module=account&action=token1155tx&contractaddress=0x76be3b62873462d2142405439777e971754e8e77&address=${acc}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}')
//             .then((response) => {
//                 const tokenERC1155 = response.data.result;
//                 setERC21(tokenERC1155);


//             });



//             /////GET TOTAL COUNT

//             const totalTransaction = await provider.getTransactionCount(acc);
//             setTotalTransaction(totalTransaction);


//         } catch (error) {
//             console.log("Something went wrong in API call, error");

//         }
//     }


//     return (
//         <div className='accountDIV'>
//             {open ? (
//                 <div className='btnContainer'>
//                     <h1>
//                         {open ? "Welcome To Ether Finance"
//                             : "Please wait we are loading data"}
//                     </h1>

//                     <button className='openBtn' onClick={() => accountData()}> Click Me</button>

//                 </div>

//             ) : (
//                 <div>
//                     <div className='loading'>
//                         <img src={logo5} width={70} height={70} />
//                     </div>
//                     ): (
//                     ""
//                 )}

//                     {!loading ? (
//                         <div className='container'>
//                             <div className='box'>
//                                 <div className='account'>
//                                     <img src={logo5} />
//                                     <p>
//                                         Address: <span>{acc}</span>
//                                     </p>
//                                 </div>
//                                 <div className='owner'>
//                                     <p onClick={() => accountData()}></p>
//                                     {name || "Hello Brother"}

//                                 </div>
//                             </div>
//                             <div className='overviewBox'>
//                                 <div className='overview'>
//                                     <div className='overviewTitle'>
//                                         <p>Overview</p>
//                                         <p className='miner'>
//                                             {name || "Miner"}: &nbsp; {account.slice(0, 10)}...
//                                         </p>
//                                     </div>
//                                     <div className='accountBalance'>
//                                         <p className='color'>Balance</p>
//                                         <p>{balance} ETH</p>

//                                     </div>

//                                     {/* //////////////////// */}
//                                     <div className='accountValue'>
//                                         <p className='color'>Balance</p>
//                                         <p>$ {balance * 1057.28}</p>
//                                     </div>
//                                     {/* /////////////////// */}
//                                 </div>

//                                 <div className='branding'>
//                                     <h2>
//                                         Welcome <br />
//                                         Ether Finance Tracker
//                                     </h2>

//                                     <p>
//                                         Hey, Welcometo ether Finance tracker, find out your transactions
//                                         {name || account.slice(0, 10)} &nbsp; financial status
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     ) : (
//                         ""
//                     )}

//                     {!loading ? <Table 
//                         accountHistory={accountHistory}
//                         totalTransaction={totalTransaction}
//                         internalByAddress={internalByAddress}
//                         ERC20={ERC20}
//                         ERC21={ERC21}
//                         ERC1155={ERC1155}
//                         accountData={accountData}
//                         blockMindedByAddress={blockMindedByAddress}
//                         blockRangeTransaction={blockRangeTransaction}
//                      />
//                       : ""}


//                 </div>

//             )}

//         </div>
//     )
// };

// export default Account;