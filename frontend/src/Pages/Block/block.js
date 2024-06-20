// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { ethers } from 'ethers';
// import './block.css';
// import { Etherescan } from '../../Context/Ether';
// import { AiFillEye } from 'react-icons/ai';

// const Block = () => {
//     const { provider } = useContext(Etherescan);
//     const [blockData, setBlockData] = useState(null);
//     const [transaction, setTransaction] = useState([]);
//     const [ethGasLimit, setEthGasLimit] = useState('');
//     const [ethDifficulty, setEthDifficulty] = useState('');
//     const [ethGasUsed, setEthGasUsed] = useState('');
//     const [blockNo, setBlockNo] = useState(true);
//     const [transactionTab, setTransactionTab] = useState(false);

//     const router = useRouter();
//     const { query } = router;
//     const blockNumber = Number(Object.keys(query)[0]);

//     const getBlockDetails = async () => {
//         try {
//             const getBlock = await provider.getBlock(blockNumber);
//             setBlockData(getBlock);

//             const gasLimit = ethers.utils.formatEther(getBlock.gasLimit);
//             setEthGasLimit(gasLimit);

//             const gasUsed = ethers.utils.formatEther(getBlock.gasUsed);
//             setEthGasUsed(gasUsed);

//             const difficulty = ethers.utils.formatEther(getBlock.difficulty); // corrected _difficulty to difficulty
//             setEthDifficulty(difficulty);

//             setTransaction(getBlock.transactions);
//             console.log(getBlock.transactions);
//         } catch (error) {
//             console.log("Something Wrong");
//         }
//     };

//     useEffect(() => {
//         getBlockDetails();
//     }, []);

//     const openTab = () => {
//         if (blockNo) {
//             setBlockNo(false);
//             setTransactionTab(true);
//         } else if (transactionTab) {
//             setBlockNo(true);
//         }
//     };

//     return (
//         <div className='block'>
//             <div className='box'>
//                 <div className='box__header'>
//                     <h3>Block Number</h3>
//                     <p>{blockNumber}</p>
//                 </div>

//                 <div className='blockTable'>
//                     <div className='blockBtn'>
//                         <button onClick={openTab}>Block Details</button>
//                         <button onClick={openTab}>Block Transaction</button>
//                     </div>

//                     {blockNo ? (
//                         <div>
//                             <div className='dataRow'>
//                                 <p>Number</p>
//                                 <p>{blockData.number}</p>
//                             </div>

//                             <div className='dataRow'>
//                                 <p>TimeStamp</p>
//                                 <p>{blockData.timestamp}</p>
//                             </div>

//                             <div className='dataRow'>
//                                 <p>Miner</p>
//                                 <Link href={{ pathname: '/account', query: blockData.miner }}>
//                                     <p className='color'>{blockData.miner}</p>
//                                 </Link>
//                             </div>

//                             <div className='dataRow'>
//                                 <p>Hash</p>
//                                 <p>{blockData.hash}</p>
//                             </div>

//                             <div className='dataRow'>
//                                 <p>ParentHash</p>
//                                 <p>{blockData.parentHash ? blockData.parentHash : "No data"}</p>
//                             </div>

//                             <div className='dataRow'>
//                                 <p>Nonce</p>
//                                 <p>{blockData.nonce}</p>
//                             </div>

//                             <div className='dataRow'>
//                                 <p>Extra Data</p>
//                                 <p>{blockData.extraData}</p>
//                             </div>

//                             <div className='dataRow'>
//                                 <p>Difficulty</p>
//                                 <p>{blockData.difficulty ? blockData._difficulty : "No Data"}</p>
//                             </div>

//                             <div className='dataRow'>
//                                 <p>Gas Limit</p>
//                                 <p>{ethGasLimit} ETH</p>
//                             </div>

//                             <div className='dataRow'>
//                                 <p>Gas Limit</p>
//                                 <p>{ethGasUsed} ETH</p>
//                             </div>

//                             <div className='dataRow'>
//                                 <p>Gas Limit</p>
//                                 <p>{ethDifficulty} ETH</p>
//                             </div>


//                         </div>
//                     ) : (

//                         <div className='dataTable'>
//                             <div className="coloum">
//                                 <div className="tableTitle">
//                                     <p>All Transaction in the block {transaction.length}</p>
//                                 </div>
//                                 <div className="tableInfo">
//                                     {transaction.map((el, i) => (
//                                         <div key={i + 1} className='transHash'>
//                                             <span>{i + 1}</span>
//                                             <link href={{ pathname: '/transaction/', query: blockData.hash }}>
//                                                 <p className='color'>{el}</p>
//                                             </link>

//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                         </div>

//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Block;
