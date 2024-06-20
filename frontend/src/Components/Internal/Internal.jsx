// import React, {useState, useEffect} from 'react';
// import { FaFilter } from 'react-icons/fa';
// import { AiFillEye } from 'react-icons/ai';
// import { Link } from 'react-router-dom';

// import './Internal.css';

// const Internal = ({internalByAddress, handleClick}) => {
//   return (
//     <div className='dataTable'>
//         <div className="coloum">
//             <div className="tableTitle">
//                 <p>Block No</p>
//             </div>
//             <div className="tableInfo">
//                 {internalByAddress.map((el, i)=>(
//                     <div key={i + 1} className='transHash'>
                        
//                         <p>
//                             <Link href={{pathname: '/block/', query: el.blockNumber}}>
//                                 <a>{el.blockNumber}</a>
//                             </Link>
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         <div className="coloum">
//             <div className="tableTitle">
//                 <p>TraceId</p>
//             </div>
//             <div className="tableInfo">
//                 {internalByAddress.map((el, i)=>(
//                     <div key={i + 1} className='transHash'>
                        
//                         <p>{el.traceId}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//         <div className="coloum">
//             <div className="tableTitle">
//                 <p>TimeStamp</p>
//             </div>
//             <div className="tableInfo">
//                 {internalByAddress.map((el, i)=>(
//                     <div key={i + 1} className='transHash'>
                        
//                         <p>{el.timeStamp}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>


//         <div className="coloum">
//             <div className="tableTitle">
//                 <p>From</p>
//             </div>
//             <div className="tableInfo">
//                 {internalByAddress.map((el, i)=>(
//                     <div key={i + 1} className='transHash'>
                        
//                         <p>
//                             <Link href={{pathname: '/account/', query: el.from}}>
//                                 <a onClick={handleClick}>{el.from.slice(0,10)}...</a>
//                             </Link>
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//         <div className="coloum">
//             <div className="tableTitle">
//                 <p>To</p>
//             </div>
//             <div className="tableInfo">
//                 {internalByAddress.map((el, i)=>(
//                     <div key={i + 1} className='transHash'>
                        
//                         <p>{el.to.slice(0,10)}...</p>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         <div className="coloum">
//             <div className="tableTitle">
//                 <p>Value</p>
//             </div>
//             <div className="tableInfo">
//                 {internalByAddress.map((el, i)=>(
//                     <div key={i + 1} className='transHash'>
                        
//                         <p>{el.value.slice(0,10)}...</p>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         <div className="coloum">
//             <div className="tableTitle">
//                 <p>Gas Used</p>
//             </div>
//             <div className="tableInfo">
//                 {internalByAddress.map((el, i)=>(
//                     <div key={i + 1} className='transHash'>
                        
//                         <p>{el.gasUsed}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//         <div className="coloum">
//             <div className="tableTitle">
//                 <p>isError</p>
//             </div>
//             <div className="tableInfo">
//                 {internalByAddress.map((el, i)=>(
//                     <div key={i + 1} className='transHash'>
                        
//                         <p>{el.isError}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         <div className="coloum">
//             <div className="tableTitle">
//                 <p>Gas</p>
//             </div>
//             <div className="tableInfo">
//                 {internalByAddress.map((el, i)=>(
//                     <div key={i + 1} className='transHash'>
                        
//                         <p>{el.gas}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     </div>
//   );
// };

// export default Internal;