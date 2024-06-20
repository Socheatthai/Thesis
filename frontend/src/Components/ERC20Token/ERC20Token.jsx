// import React, { useState, useEffect } from 'react';
// import { FaFilter } from 'react-icons/fa';
// import { AiFillEye } from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import './ERC20Token.css';

// const ERC20Token = ({ ERC20 }) => {
//     return (
//         <div>
//             {ERC20.length === 0 ? (
//                 <div className='sorry'>
//                     <p>Sorry There is no Data</p>
//                 </div>
//             ) : (
//                 <div className="dataTable">
//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>Hash</p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <AiFillEye />
//                                     <p>{el.hash.slice(0, 35)}...</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>


//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>Block</p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p className='toLink'>
//                                         <link href={{ pathname: '/block/', query: el.blockNumber }}>
//                                             <a onClick={handleClick}>{el.blockNumber}</a>
//                                         </link>
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>


//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>TimeStamp</p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p className='toLink'>
//                                         {el.timeStamp}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>From</p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p className='toLink'>
//                                         {el.from.slice(0, 10)}...
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>To</p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p className='toLink'>
//                                         <link href={{ pathname: '/account/', query: el.to }}>
//                                             <a onClick={handleClick}>{el.to.slice(0, 10)}...</a>
//                                         </link>
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>Value</p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p >{el.value.slice(0, 5)}...

//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>Gas Used </p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p >{el.gasUsed}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>Token Name </p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p >{el.tokenName}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>Token Symbol </p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p >{el.tokenSymbole}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>Token Decimal </p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p >{el.tokenDecimal}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>Input </p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p >{el.input ? el.input : "No Data"}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>Type</p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p >{el.type}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>TraceId </p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p >{el.traceId}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>isError </p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p >{el.isError}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="coloum">
//                         <div className="tableTitle">
//                             <p>Contract Address</p>
//                         </div>
//                         <div className="tableInfo">
//                             {ERC20.map((el, i) => (
//                                 <div key={i + 1} className='transHash'>
//                                     <p >{el.contractAddress ? el.contractAddress : "No Address"}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

























//                 </div>
//             )}
//         </div>
//     );
// }

// export default ERC20Token;