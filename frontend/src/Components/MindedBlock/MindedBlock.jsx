// import React from 'react';
// import { AiFillEye } from 'react-icons/ai'; // Corrected import
// import { Link } from 'react-router-dom';
// import './MindedBlock.css';

//     const MindedBlock = ({ blockMindedByAddress }) => {
//         return (
//             <div>
//                 {blockMindedByAddress.length === 0 ? (
//                     <div className='sorry'>
//                         <p>Sorry There is no Data</p>
//                     </div>
//                 ) : (
//                     <div className="dataTable">
//                         <div className="column"> {/* Corrected class name */}
//                             <div className="tableTitle">
//                                 <p>Block Number</p>
//                             </div>
//                             <div className="tableinfo">
//                                 {blockMindedByAddress.map((el, i) => (
//                                     <div key={i + 1} className='transHash'>
//                                         <AiFillEye /> {/* Corrected icon component */}
//                                         <p className='toLink'>
//                                             <Link to={{ pathname: "/block", query: { number: el.blockNumber } }}>
//                                                 {el.blockNumber}
//                                             </Link>
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="column"> {/* Corrected class name */}
//                             <div className="tableTitle">
//                                 <p>Block Reward</p>
//                             </div>
//                             <div className="tableinfo">
//                                 {blockMindedByAddress.map((el, i) => (
//                                     <div key={i + 1} className='transHash'>
//                                         {/* Corrected icon component */}
//                                         <p>{el.blockReward.slice(0, 10)}...</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>


//                         <div className="column"> {/* Corrected class name */}
//                             <div className="tableTitle">
//                                 <p>TimeStamp</p>
//                             </div>
//                             <div className="tableinfo">
//                                 {blockMindedByAddress.map((el, i) => (
//                                     <div key={i + 1} className='transHash'>
//                                         {/* Corrected icon component */}
//                                         <p>{el.timeStamp}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         );
//     }

// export default MindedBlock;
