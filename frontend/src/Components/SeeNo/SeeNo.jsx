import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import Loading from '../Loading/Loading';

const SeeNo = () => {
    const { seeNo } = useParams();
    const [see, setSee] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchSee = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/see/${seeNo}`);
                setSee(response.data.result);
                setIsLoading(false); // Updated loading state
                console.log(response.data.result);
            } catch (error) {
                console.log("Error fetching seeNo details:", error);
            }
        };
        fetchSee();
    }, [seeNo]);

    const formatTimestampToVietnamTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    };

    return (
        <div className="w-full h-full container-fluid flex-1 justify-center p-6 container-fluid bg-[#111F2C]">
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                <div className="pb-20 pt-1 mb-20 mt-10 flex-1 justify-center p-6 w-full container-fluid bg-[#111F2C] ">
                    <div className="container mx-auto mt-8 mb-12 pb-10">
                        <h1 className="text-3xl font-bold mb-8 text-gray-200">Checking Details</h1>
                        {see && (
                            <div className="bg-gray-400 shadow-md rounded-lg p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-semibold">Block Number</p>
                                        <p className="text-green-600 text-lg">{see.blockNumber}</p>
                                    </div>
                                    <div>
                                        <p className=" font-semibold">Timestamp</p>
                                        <p className="text-gray-600 text-lg">{formatTimestampToVietnamTime(see.timeStamp)}</p>
                                    </div>
                                    <div>
                                        <p className=" font-semibold">Block Miner</p>
                                        <p className="text-gray-600 text-lg">{see.blockMiner}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Block Reward</p>
                                        <p className="text-gray-600 text-lg">{see.blockReward}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Uncle Inclusion Reward</p>
                                        <p className="text-gray-600  text-lg">{see.uncleInclusionReward}</p>
                                    </div>
                                    <div>
                                        <p className=" font-semibold">Uncles</p>
                                        <p className="text-gray-600 text-lg">{see.uncles.length === 0 ? 'None' : see.uncles.join(', ')}</p>
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

export default SeeNo;
