// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";

// const apiKey = "2faf431949c740aebd1b92148b804007";
// const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${apiKey}`);

// export const Etherescan = React.createContext();

// export const EtherProvider = ({ children }) => {
//     const [currentBlock, setCurrentBlock] = useState(0);
//     const [topTenBlock, setTopTenBlock] = useState([]);
//     const [transactions, setTransactions] = useState([]);
//     const [gasPrice, setGasPrice] = useState("");

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const getCurrentBlock = await provider.getBlockNumber();
//                 setCurrentBlock(getCurrentBlock);

//                 const blockTransaction = await provider.getBlock(getCurrentBlock);
//                 setTransactions(blockTransaction.transactions);

//                 const previousBlock = getCurrentBlock - 10;
//                 const listTenBlock = [];

//                 for (let i = getCurrentBlock; i > previousBlock; i--) {
//                     listTenBlock.push(i);
//                 }

//                 const getBlockDetails = await Promise.all(listTenBlock.map(el => provider.getBlock(el)));
//                 setTopTenBlock(getBlockDetails);

//                 const gasPrice = await provider.getGasPrice();
//                 const latestGasPrice = ethers.utils.formatUnits(gasPrice);
//                 setGasPrice(latestGasPrice);
//             } catch (error) {
//                 console.log('Something went wrong while fetching data', error)
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <Etherescan.Provider value={{ currentBlock, topTenBlock, transactions, gasPrice, provider }}>
//             {children}
//         </Etherescan.Provider>
//     );
// };
