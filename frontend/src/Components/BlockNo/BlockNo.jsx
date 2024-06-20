import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import Loading from '../Loading/Loading';

const BlockNo = () => {
    const { blockNo } = useParams();
    const [blockDetails, setBlockDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchBlockDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/block/${blockNo}`);
                setBlockDetails(response.data.result[0]);
                setIsLoading(false); // Updated loading state
                console.log(response.data.result);
            } catch (error) {
                console.error("Error fetching Block Number details:", error);
            }
        };
        fetchBlockDetails();
    }, [blockNo]);

    const formatTimestampToVietnamTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    };

    return (
        <div className="w-full h-full container-fluid flex-1 justify-center p-6 container-fluid bg-[#111F2C]">
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                <div className="flex-1 justify-center p-6 w-full container-fluid bg-[#111F2C]">
                    <div>
                        {blockDetails && (
                            <div>
                                <div className="mt-4 p-6 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-green-400">Block Number : <span className='text-blue-400'>{blockNo}</span></p>
                                    </div>
                                    <div className="flex-1 text-right">
                                        <button className="text-sm text-white bg-gradient-to-br from-green-600 to-green-500 rounded-md px-4 py-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out">
                                            <Link to={`/blockanalysis/${blockNo}`}>
                                                Analysis
                                            </Link>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-6 mb-4 justify-center p-6">
                                    <div className="bg-gray-400 p-6 rounded-lg shadow-md">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <h2 className="text-xl font-bold">Block Details</h2>
                                            <button className="text-sm text-white bg-gradient-to-br from-blue-600 to-blue-500 rounded-md px-4 py-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out">
                                                <span className="flex items-center">
                                                    <Link to={`/see/${blockNo}`}>
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
                                                <p className="font-semibold">Hash:</p>
                                                <p className="text-green-600">{blockDetails.hash}</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold ml-9">Status:</p>
                                                <p className="text-green-600 font-semibold ml-9">Success</p>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold">Timestamp:</div>
                                                <div className="text-gray-900">{formatTimestampToVietnamTime(blockDetails.timeStamp)}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row space-y-2 md:space-x-4">
                                            <div className="flex-1">
                                                <p className="font-semibold">From:</p>
                                                <p className="text-blue-600">{blockDetails.from}</p>
                                            </div>
                                            <div className="flex-1 ">
                                                <p className="font-semibold ml-6">Gas:</p>
                                                <p className='text-gray-600 ml-6'>{blockDetails.gas}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row space-y-2 md:space-x-4">
                                            <div className="flex-1">
                                                <p className="font-semibold">To:</p>
                                                <p className="text-blue-600">{blockDetails.to}</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold ml-6">Gas Used:</p>
                                                <p className='text-gray-600 ml-6'>{blockDetails.gasUsed}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-400 p-6 rounded-lg shadow-md">
                                        <h2 className="text-xl font-bold mb-4">More Details</h2>
                                        <div className="flex flex-col md:flex-row space-y-2 md:space-x-4">
                                            <div className="flex-1">
                                                <p className="font-semibold">Trace ID:</p>
                                                <p>{blockDetails.traceId}</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold">Type:</p>
                                                <p>{blockDetails.type}</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold">Value:</p>
                                                <p>{blockDetails.value}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row space-y-2 md:space-x-4">
                                            <div className="flex-1">
                                                <p className="font-semibold">Contract Address:</p>
                                                <p>{blockDetails.contractAddress}</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold">Error Code:</p>
                                                <p className='text-blue-500'>{blockDetails.errCode}</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold">Is Error:</p>
                                                <p className='text-red-500'>{blockDetails.isError}</p>
                                            </div>
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
};

export default BlockNo;
