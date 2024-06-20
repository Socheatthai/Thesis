import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ReactLoading from "react-loading";
import Loading from '../Loading/Loading';

const Check = () => {
    const { checkId } = useParams();
    const [check, setCheck] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCheck = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/check/${checkId}`);
                setCheck(response.data.result[0]);
                setIsLoading(false);
            } catch (error) {
                console.log("Error fetching Check details:", error);
            }
        };
        fetchCheck();
    }, [checkId]);

    return (
        <div className="w-full h-full container-fluid flex-1 justify-center p-6 container-fluid bg-[#111F2C]">
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                
                    <div className="flex-1 justify-center p-6 w-full container-fluid bg-[#111F2C] ">
                        <div className="container mx-auto mt-8 mb-12">
                            <h1 className="text-3xl font-bold mb-8 text-gray-200">All of the Details</h1>
                            {check && (
                                <div className="bg-gray-400 shadow-md rounded-lg p-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600 font-semibold">Address:</p>
                                            <p className="text-lg">{checkId}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-semibold">Contract Name:</p>
                                            <p className="text-lg">{check.ContractName}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-semibold">Implementation:</p>
                                            <p className="text-lg">{check.Implementation}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-semibold">Proxy:</p>
                                            <p className="text-lg">{check.Proxy}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-semibold">Runs:</p>
                                            <p className="text-lg">{check.Runs}</p>
                                        </div>

                                        <div>
                                            <p className="text-gray-600 font-semibold">Constructor Arguments:</p>
                                            <p className="text-lg">{check.ConstructorArguments}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-semibold">EVM Version:</p>
                                            <p className="text-lg">{check.EVMVersion}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-semibold">Optimization Used:</p>
                                            <p className="text-lg">{check.OptimizationUsed}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-semibold">License Type:</p>
                                            <p className="text-lg">{check.LicenseType}</p>
                                        </div>

                                        <div>
                                            <p className="text-gray-600 font-semibold">Library:</p>
                                            <p className="text-lg">{check.Library}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 font-semibold">ABI Information:</p>
                                            <p className="text-lg">{JSON.stringify(check.ABI, null, 2)}</p>
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

            export default Check;
