
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import Loading from '../Loading/Loading';



const WatchHash = () => {
    const { watchHash } = useParams();
    const [watch, setWatch] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchWatch = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/watch/${watchHash}`);
                setWatch(response.data.result);
                setIsLoading(false); // Updated loading state
                console.log(response.data.result);
            } catch (error) {
                console.log("Error fetching Watch details:", error);
            }
        };
        fetchWatch();
    }, [watchHash]);

    return (
        <div className="w-full h-full container-fluid flex-1 justify-center p-6 container-fluid bg-[#111F2C]">
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                <>
                    <div className="pb-20 pt-10 mb-20 flex-1 justify-center p-6 w-full container-fluid bg-[#111F2C]">
                        <div className="container mx-auto mt-8 mb-12">
                            <h1 className="text-3xl font-bold mb-8 text-gray-200">Checking Details</h1>
                            {watch && (
                                <div className="bg-gray-400 shadow-md rounded-lg p-6">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <p className="text-black font-semibold">Transaction Hash:</p>
                                            <p className="text-lg text-green-500">{watchHash}</p>
                                        </div>
                                        <div>
                                            <p className="text-black font-semibold">Description:</p>
                                            <p className="text-lg">{watch.errDescription}</p>
                                        </div>
                                        <div>
                                            <p className="text-black font-semibold">Error:</p>
                                            <p className="text-lg text-red-600">{watch.isError}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default WatchHash;
