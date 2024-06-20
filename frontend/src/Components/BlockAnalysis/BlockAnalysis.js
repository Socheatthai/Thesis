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
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

const BlockAnalysis = () => {
    const { blockNo } = useParams();
    const [blockDetails, setBlockDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlockDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/block/${blockNo}`);
                setBlockDetails(response.data.result || []);
                setIsLoading(false);
                console.log('Block Details:', response.data.result);
            } catch (error) {
                console.error("Error fetching Block Number details:", error);
                setIsLoading(false);
            }
        };
        fetchBlockDetails();
    }, [blockNo]);

    if (isLoading) {
        return <Loading isLoading={isLoading} />;
    }

    const gasData = blockDetails.map(item => parseFloat(item.gas) || 0);
    const gasUsedData = blockDetails.map(item => parseFloat(item.gasUsed) || 0);
    const valueData = blockDetails.map(item => parseFloat(item.value) / 10 ** 18 || 0);
    const labels = blockDetails.map(item => new Date(item.timeStamp * 1000).toLocaleDateString());

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Gas',
                data: gasData,
                backgroundColor: 'rgba(255, 255, 0, 0.6)',
                borderColor: 'yellow',
                borderWidth: 1,
            },
            {
                label: 'Gas Used',
                data: gasUsedData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
        
                borderWidth: 1,
            },
            {
                label: 'Value',
                data: valueData,
                backgroundColor: 'rgba(255, 0, 0, 0.6)',
                borderColor: 'red',
                borderWidth: 1,
            },
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const index = context.dataIndex;
                        const date = chartData.labels[index];
                        const gas = chartData.datasets[0].data[index];
                        const gasUsed = chartData.datasets[1].data[index];
                        const value = chartData.datasets[2].data[index];
                        return [
                    
                            `Gas: ${gas}`,
                            `Gas Used: ${gasUsed}`,
                            `Value: ${value} ETH`,
                        ];
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Value',
                    font: {
                        size: 14,
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <div className="pb-20 pt-5 w-full h-full container-fluid justify-center p-6 bg-[#111F2C]">
            <div className="w-full mt-4 p-6 bg-gray-100 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Analysis for Block Number: {blockNo}</h2>
                <div className="flex flex-wrap mb-4 justify-center">
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                        <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                            <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                <i className="fa fa-circle text-primary mr-1" style={{ color: 'yellow' }}></i>
                                Total Gas
                            </h5>
                            <div className="font-bold text-gray-800">{gasData.reduce((a, b) => a + b, 0)}</div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                        <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                            <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                <i className="fa fa-circle text-primary mr-1" style={{ color: 'gold' }}></i>
                                Total Gas Used
                            </h5>
                            <div className="font-bold text-gray-800">{gasUsedData.reduce((a, b) => a + b, 0)}</div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                        <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                            <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                <i className="fa fa-circle text-primary mr-1" style={{ color: 'red' }}></i>
                                Total Value
                            </h5>
                            <div className="font-bold text-gray-800">{valueData.reduce((a, b) => a + b, 0)} ETH</div>
                        </div>
                    </div>
                </div>
                <div className="w-full container-fluid mt-4 p-6 ">
                    <Bar data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default BlockAnalysis;
