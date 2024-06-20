// import React, {useState, useEffect} from 'react';
// import {FaFilter} from 'react-icons/fa';
// import {AiFillEye} from 'react-icons/ai';
// import '../Table.css';
// import Transaction from './Transaction';
// import Internal from './Internal';
// import ERC20Token from './ERC20Token';
// import ERC21Token from './ERC21Token';
// import ERC1155Token from './ERC1155Token';
// import MindedBlock from './MindedBlock';
// import BlockRange from './BlockRange';


// const Table = ({
//     accountHistory,
//     totalTransaction,
//     internalByAddress,
//     ERC20,
//     ERC21,
//     ERC1155,
//     accountData,
//     blockMindedByAddress,
//     blockRangeTransaction,

// }) => {

//     const [historyAccount, setHistoryAccount] = useState(true);
//     const [addressInternalTransaction, setAddressInternalTransaction] = useState(false);
//     const [openERC20, setOpenERC20] = useState(false);
//     const [addressByMindedBlock, setAddressByMindedBlock] = useState(false);
//     const [TransactionRangeBlock, setTransactionRangeBlock] = useState(false);
//     const [openERC21, setOpenERC21] = useState(false);
//     const [openERC1155, setOpenERC1155] = useState(false);

//     const tabs = (e) => {
//         const buttonText = e.target.innerText;
//         if(buttonText === "Transaction"){
//             setHistoryAccount(true);
//             setAddressInternalTransaction(false);
//             setAddressByMindedBlock(false);
//             setOpenERC1155(false);
//             setOpenERC20(false);
//             setOpenERC21(false);
//             setTransactionRangeBlock(false);
//         }else if(buttonText === "Internal"){

//             setHistoryAccount(false);
//             setAddressInternalTransaction(true);
//             setAddressByMindedBlock(false);
//             setOpenERC1155(false);
//             setOpenERC20(false);
//             setOpenERC21(false);
//             setTransactionRangeBlock(false);

//         }else if(buttonText === "Trans") {

//             setHistoryAccount(false);
//             setAddressInternalTransaction(false);
//             setAddressByMindedBlock(false);
//             setOpenERC1155(false);
//             setOpenERC20(false);
//             setOpenERC21(false);
//             setTransactionRangeBlock(true);

//         }else if (buttonText === "Mined"){
            
//             setHistoryAccount(false);
//             setAddressInternalTransaction(false);
//             setAddressByMindedBlock(true);
//             setOpenERC1155(false);
//             setOpenERC20(false);
//             setOpenERC21(false);
//             setTransactionRangeBlock(false);

//         }else if (buttonText === "ERC-20") {
            
//             setHistoryAccount(false);
//             setAddressInternalTransaction(false);
//             setAddressByMindedBlock(false);
//             setOpenERC1155(false);
//             setOpenERC20(true);
//             setOpenERC21(false);
//             setTransactionRangeBlock(false);

//         }else if(buttonText === "ERC-21") {

//             setHistoryAccount(false);
//             setAddressInternalTransaction(false);
//             setAddressByMindedBlock(false);
//             setOpenERC1155(false);
//             setOpenERC20(false);
//             setOpenERC21(true);
//             setTransactionRangeBlock(false);

//         }else if (buttonText === "ERC-1155") {
//             setHistoryAccount(false);
//             setAddressInternalTransaction(false);
//             setAddressByMindedBlock(false);
//             setOpenERC1155(true);
//             setOpenERC20(true);
//             setOpenERC21(false);
//             setTransactionRangeBlock(false);

//         }
//     };


//   return (
//     <div className='table'>
//         <div className="table__head">
//             <button className='btn' onClick={(e)=> tabs(e)}>
//                 Transaction
//             </button>
//             <button className='btn' onClick={(e)=> tabs(e)}>
//                 Internal
//             </button>
//             <button className='btn' onClick={(e)=> tabs(e)}>
//                 Trans
//             </button>
//             <button className='btn' onClick={(e)=> tabs(e)}>
//                 Mined
//             </button>
//             <button className='btn' onClick={(e)=> tabs(e)}>
//                 ERC-20
//             </button>
//             <button className='btn' onClick={(e)=> tabs(e)}>
//                 ERC-21
//             </button>
//             <button className='btn' onClick={(e)=> tabs(e)}>
//                 ERC-1155
//             </button>
//         </div>

//         <div className="numberOfTrans">
//             <FaFilter/>
//             <p>
//                 Latest 10 from a total pf <span>{totalTransaction}</span>
//             </p>
//         </div>

//         {historyAccount? (
//             <Transaction handleClick={accountData}
//             accountHistory={accountHistory}/>
//         ) : (
//             ""
//         )}

//         {addressInternalTransaction ? (
//             <Internal
//                 internalByAddress={internalByAddress}
//                 handleClick={accountData} 
//             />
//         ) : (
//             ""
//         )}

//         {
//             openERC20 ? <ERC20Token ERC20={ERC20}/> : ""
//         }

//         {addressByMindedBlock ? (
//             <MindedBlock blockMindedByAddress={blockMindedByAddress}
//             handleClick={accountData}/>

//         ) : (
//             ""

//         )}

//         {TransactionRangeBlock ? (
//             <BlockRange blockRangeTransaction={blockRangeTransaction} handleClick={blockRangeTransaction}/>
//         ): ""}

//         { openERC21 ? <ERC21Token ERC21={ERC21} handleClick={accountData}/> : ""}

//         {openERC1155 ? (
//             <ERC1155Token ERC1155={ERC1155} handleClick={accountData}/>
//         ) : (
//             ""

//         )}


//     </div>
//   )
// };

// export default Table