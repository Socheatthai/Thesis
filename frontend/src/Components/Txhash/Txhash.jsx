import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';

const Txhash = () => {
    const { txhashId } = useParams();
    const [transaction, setTransaction] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactionDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/hash/${txhashId}`);
                console.log(response.data.result);
                setTransaction(response.data.result);
                setIsLoading(false); // Update loading state when data is fetched
            } catch (error) {
                console.log("Error fetching transaction details:", error);
                setIsLoading(false); // Set loading to false even on error
            }
        };
        fetchTransactionDetails();
    }, [txhashId]);

    return (
        <div className="w-full h-full container-fluid flex-1 justify-center p-6 container-fluid bg-[#111F2C]">
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                <div className="flex-1 justify-center p-6 w-full container-fluid bg-[#111F2C]">
                    {transaction && (
                        <div className="mt-4 p-6 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
                            <div className="flex-1">
                                <p className="font-semibold text-green-400">Transaction Hash:</p>
                                <p className='text-blue-400'>{transaction.hash}</p>
                            </div>
                            <div className="flex-1 text-right">
                                <button className="text-sm text-white bg-gradient-to-br from-green-600 to-green-500 rounded-md px-4 py-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out">
                                    <Link to={`/txhanalysis/${txhashId}`}>Analysis</Link>
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center p-6">
                        {transaction && (
                            <div className="flex flex-col space-y-6">
                                <div className="bg-gray-400 p-6 rounded-lg shadow-md">
                                    {/* Flex container for heading and button */}
                                    <div className="flex items-center space-x-4 mb-4">
                                        <h2 className="text-xl font-bold"> Transaction Details </h2>
                                        <button className="text-sm text-white bg-gradient-to-br from-blue-600 to-blue-500 rounded-md px-4 py-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out">
                                            <span className="flex items-center">
                                                <Link to={`/watch/${txhashId}`}>
                                                    Check
                                                </Link>
                                                <svg className="w-4 h-4 text-gray-800 dark:text-white ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z" />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="flex flex-col md:flex-row space-y-2 md:space-x-4">
                                        <div className="flex-1">
                                            <p className="font-semibold">Transaction Index:</p>
                                            <p>{transaction.transactionIndex}</p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Status:</p>
                                            <p className="text-green-600 font-semibold">Success</p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Nonce:</p>
                                            <p>{transaction.nonce}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row space-y-4 md:space-x-4">
                                        <div className="flex-1">
                                            <p className="font-semibold">Block Number:</p>
                                            <p className='text-green-500'>{transaction.blockNumber}</p>
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-semibold mr-10">Chain ID:</p>
                                            <p>{transaction.chainId}</p>
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-semibold">Block Hash:</p>
                                            <p className='text-green-500'>{transaction.blockHash}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-400 p-6 rounded-lg shadow-md">
                                    {/* Flex container for heading and button */}
                                    <div className="flex items-center space-x-4 mb-4">
                                        <h2 className="text-xl font-bold">Transaction Action</h2>

                                    </div>
                                    <div className="flex flex-col md:flex-row space-y-2 md:space-x-4">
                                        <div className="flex-1">
                                            <p className="font-semibold">From:</p>
                                            <Link to={`/address/${transaction.from}`}>
                                                <p className='text-blue-500'>{transaction.from}</p>
                                            </Link>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">To:</p>
                                            <p className='text-blue-500'>{transaction.to}</p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Value:</p>
                                            <p>{transaction.value}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row space-y-2 md:space-x-4">
                                        <div className="flex-1">
                                            <p className="font-semibold">Gas:</p>
                                            <p className='text-green-600'>{transaction.gas}</p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Gas Price:</p>
                                            <p className='text-green-600'>{transaction.gasPrice}</p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Type:</p>
                                            <p>{transaction.type}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-400 p-6 rounded-lg shadow-md">
                                    <h2 className="text-xl font-bold mb-4">More Details</h2>
                                    <div className="flex flex-col md:flex-row space-y-2 md:space-x-4">
                                        <div className="flex-1">
                                            <p className="font-semibold">R Value:</p>
                                            <p>{transaction.r}</p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">S Value:</p>
                                            <p>{transaction.s}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Txhash;
