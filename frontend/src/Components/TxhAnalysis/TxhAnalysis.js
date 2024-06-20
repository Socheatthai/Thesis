import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Loading from '../Loading/Loading';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const TxhAnalysis = () => {
    const { txhashId } = useParams();
    const [analysisData, setAnalysisData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysisData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:5001/txhanalysis/${txhashId}`);
                console.log("API Response Data:", response.data);
                setAnalysisData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log("Error fetching analysis data:", error);
                setIsLoading(false);
            }
        };
        fetchAnalysisData();
    }, [txhashId]);

    if (isLoading) {
        return <Loading isLoading={isLoading} />;
    }

    // Default values in case analysisData is not available
    const gasLimit = analysisData ? parseInt(analysisData.gas, 16) : 0;
    const gasPrice = analysisData ? parseInt(analysisData.gasPrice, 16) / 1e9 : 0; // Convert to Gwei
    const maxFeePerGas = analysisData ? parseInt(analysisData.maxFeePerGas, 16) / 1e9 : 0; // Convert to Gwei
    const maxPriorityFeePerGas = analysisData ? parseInt(analysisData.maxPriorityFeePerGas, 16) / 1e9 : 0; // Convert to Gwei

    const chartData = {
        labels: ['Gas Limit', 'Gas Price (Gwei)', 'Max Fee Per Gas (Gwei)', 'Max Priority Fee Per Gas (Gwei)'],
        datasets: [{
            label: 'Transaction Metrics',
            data: [gasLimit, gasPrice, maxFeePerGas, maxPriorityFeePerGas],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    return (
        <div className="w-full h-full container-fluid justify-center p-6 container-fluid bg-[#111F2C]">
            <div className="w-full container-fluid mt-4 p-6 bg-gray-100 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Analysis for Transaction: {txhashId}</h2>
                <div className="flex flex-wrap mb-4 justify-center">
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                        <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                            <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                <i className="fa fa-circle text-primary mr-1" style={{ color: 'blue' }}></i>
                                Gas Limit
                            </h5>
                            <div className="font-bold text-gray-800">{gasLimit}</div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                        <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                            <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                <i className="fa fa-circle text-primary mr-1" style={{ color: 'green' }}></i>
                                Gas Price (Gwei)
                            </h5>
                            <div className="font-bold text-gray-800">{gasPrice}</div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                        <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                            <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                <i className="fa fa-circle text-primary mr-1" style={{ color: 'yellow' }}></i>
                                Max Fee Per Gas (Gwei)
                            </h5>
                            <div className="font-bold text-gray-800">{maxFeePerGas}</div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                        <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                            <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                <i className="fa fa-circle text-primary mr-1" style={{ color: 'purple' }}></i>
                                Max Priority Fee Per Gas (Gwei)
                            </h5>
                            <div className="font-bold text-gray-800">{maxPriorityFeePerGas}</div>
                        </div>
                    </div>
                </div>

                <div>
                    <Bar
                        data={chartData}
                        options={{
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: (context) => {
                                            const index = context.dataIndex;
                                            const metric = chartData.labels[index];
                                            const value = chartData.datasets[0].data[index];
                                            return `${metric}: ${value}`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TxhAnalysis;
