// import React from 'react';
// import { AiFillEye } from 'react-icons/ai';
// import { Link } from 'react-router-dom';

// import './Transaction.css'

// const Transaction = ({ accountHistory, handleClick }) => {
//     return (
//         <div className="dataTable">
//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>Txn Hash</p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <AiFillEye />
//                             <p>{el.hash.slice(0, 35)}...</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>Method</p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>

//                             <p>Transfer</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>Block</p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p className='toLink'>
//                                 <link href={{ pathname: '/block/', query: el.blockNumber }}>
//                                     <a onClick={handleClick}>{el.blockNumber}</a>
//                                 </link>
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>


//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>TimeStamp</p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p>
//                                 {el.timeStamp}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>From</p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p className='toLink'>
//                                {el.from.slice(0,10)}...
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>To</p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p className='toLink'>
//                             <link href={{ pathname: '/account/', query: el.to }}>
//                                     <a onClick={handleClick}>{el.to.slice(0, 10)}...</a>
//                                 </link>
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>Value</p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p >{el.value.slice(0, 5)}...
                            
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>Gas price </p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p >{el.gasPrice}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>BlockHash </p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p >{el.blockHash.slice(0,10)}...
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>Confirmation </p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p >{el.confirmations}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>CumulativeGas</p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p >{el.cumulativeGasUsed}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>Gas </p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p >{el.gas}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>Gas Used </p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p >{el.gasUsed}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>Nonce</p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p >{el.nonce}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>Index</p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p >{el.transactionIndex}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="coloum">
//                 <div className="tableTitle">
//                     <p>Status </p>
//                 </div>
//                 <div className="tableInfo">
//                     {accountHistory.map((el, i) => (
//                         <div key={i + 1} className='transHash'>
//                             <p >{el.txreceipt_status}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

















            
                



//         </div>
//     )
// };

// export default Transaction;