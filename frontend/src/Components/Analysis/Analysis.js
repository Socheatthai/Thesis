import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import Loading from '../Loading/Loading';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale,
    ArcElement
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale,
    ArcElement
);

export default function Analysis() {
    const { addressId } = useParams();
    const [transactionData, setTransactionData] = useState([]);
    const [ethBalance, setEthBalance] = useState(0);
    const [usdRates, setUsdRates] = useState(0);
    const [currentView, setCurrentView] = useState('ethBalance');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.post(`http://localhost:5001/address/${addressId}`, { offset: 100 }); // Fetch more transactions if necessary
                setTransactionData(response.data.result);
                const balanceResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${addressId}&tag=latest&apikey=U6PTUIYIF6NRAMBC9A97MUSDWX3DCA87M6`);
                setEthBalance(parseFloat(balanceResponse.data.result) / 10 ** 18);
                const usdResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
                setUsdRates(usdResponse.data.ethereum.usd);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [addressId]);

    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    const getEthBalanceData = () => {
        const labels = transactionData.map(txn => new Date(txn.timeStamp * 1000).toLocaleDateString());
        const values = transactionData.map(txn => parseFloat(txn.value) / 10 ** 18);
        const highestValue = Math.max(...values);
        const lowestValue = Math.min(...values);
        const highestValueDate = labels[values.indexOf(highestValue)];
        const lowestValueDate = labels[values.indexOf(lowestValue)];

        const usdValues = values.map(value => value * usdRates);
        const highestUsdValue = Math.max(...usdValues);
        const lowestUsdValue = Math.min(...usdValues);
        const highestUsdValueDate = labels[usdValues.indexOf(highestUsdValue)];
        const lowestUsdValueDate = labels[usdValues.indexOf(lowestUsdValue)];

        return {
            chartData: {
                labels,
                datasets: [
                    {
                        label: 'ETH Value',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        data: values,
                        fill: 'origin',
                        tension: 0.4,
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                    },
                    {
                        label: 'USD Value',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        data: usdValues,
                        fill: 'origin',
                        tension: 0.4,
                        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                    }
                ],
            },
            summary: {
                highestEth: { value: highestValue, date: highestValueDate },
                lowestEth: { value: lowestValue, date: lowestValueDate },
                highestUsd: { value: highestUsdValue, date: highestUsdValueDate },
                lowestUsd: { value: lowestUsdValue, date: lowestUsdValueDate },
            },
        };
    };

    const getTxnFeesData = () => {
        const labels = transactionData.map(txn => new Date(txn.timeStamp * 1000).toLocaleDateString());
        const totalFeesSpentEth = transactionData.filter(txn => txn.from.toLowerCase() === addressId.toLowerCase())
            .reduce((acc, txn) => acc + parseFloat(txn.gasPrice) * parseFloat(txn.gasUsed) / 10 ** 18, 0);
        const totalFeesReceivedEth = transactionData.filter(txn => txn.to.toLowerCase() === addressId.toLowerCase())
            .reduce((acc, txn) => acc + parseFloat(txn.gasPrice) * parseFloat(txn.gasUsed) / 10 ** 18, 0);

        const totalFeesSpentUsd = totalFeesSpentEth * usdRates;
        const totalFeesReceivedUsd = totalFeesReceivedEth * usdRates;

        return {
            chartData: {
                labels,
                datasets: [
                    {
                        label: 'ETH Fees Spent (As a sender)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
                        hoverBorderColor: 'rgba(54, 162, 235, 1)',
                        data: labels.map(() => totalFeesSpentEth),
                    },
                    {
                        label: 'ETH Fees Used (As a recipient)',
                        backgroundColor: 'rgba(201, 203, 207, 0.2)',
                        borderColor: 'rgba(201, 203, 207, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(201, 203, 207, 0.4)',
                        hoverBorderColor: 'rgba(201, 203, 207, 1)',
                        data: labels.map(() => totalFeesReceivedEth),
                    },
                    {
                        label: 'USD Fees Spent',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                        hoverBorderColor: 'rgba(75, 192, 192, 1)',
                        data: labels.map(() => totalFeesSpentUsd),
                    },
                    {
                        label: 'USD Fees Used',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(0, 0, 0, 0.4)',
                        hoverBorderColor: 'rgba(0, 0, 0, 1)',
                        data: labels.map(() => totalFeesReceivedUsd),
                    },
                ],
            },
            summary: {
                totalFeesSpentEth,
                totalFeesReceivedEth,
                totalFeesSpentUsd,
                totalFeesReceivedUsd,
            },
        };
    };

    const getEtherTransfersData = () => {
        const labels = transactionData.map(txn => new Date(txn.timeStamp * 1000).toLocaleDateString());
        const sentOut = transactionData.filter(txn => txn.from.toLowerCase() === addressId.toLowerCase()).map(txn => parseFloat(txn.value) / 10 ** 18);
        const receiveIn = transactionData.filter(txn => txn.to.toLowerCase() === addressId.toLowerCase()).map(txn => parseFloat(txn.value) / 10 ** 18);
        const minerReward = transactionData.filter(txn => txn.from.toLowerCase() === addressId.toLowerCase()).map(txn => parseFloat(txn.gasPrice) * parseFloat(txn.gasUsed) / 10 ** 18);

        const totalSentOut = sentOut.reduce((acc, val) => acc + val, 0);
        const totalReceiveIn = receiveIn.reduce((acc, val) => acc + val, 0);
        const totalMinerReward = minerReward.reduce((acc, val) => acc + val, 0);

        return {
            labels,
            datasets: [
                {
                    label: 'Sent Out (ETH)',
                    backgroundColor: 'rgba(54, 162, 235, 0.4)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(54, 162, 235, 0.6)',
                    hoverBorderColor: 'rgba(54, 162, 235, 1)',
                    data: sentOut,
                },
                {
                    label: 'Receive In (ETH)',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(0, 0, 0, 0.6)',
                    hoverBorderColor: 'rgba(0, 0, 0, 1)',
                    data: receiveIn,
                },
                {
                    label: 'Miner Reward (ETH)',
                    backgroundColor: 'rgba(75, 192, 192, 0.4)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
                    hoverBorderColor: 'rgba(75, 192, 192, 1)',
                    data: minerReward,
                }
            ],
            summary: {
                totalSentOut,
                totalReceiveIn,
                totalMinerReward
            }
        };
    };

    const getTokenTransfersData = () => {
        // Example implementation; you'll need to adjust based on your actual data structure and needs.
        const labels = transactionData.map(txn => new Date(txn.timeStamp * 1000).toLocaleDateString());
        const tokenContractsCount = transactionData.map(txn => txn.tokenContractCount || 0); // Adjust this based on your actual data
        const tokenTransferValue = transactionData.map(txn => txn.tokenTransferValue || 0); // Adjust this based on your actual data

        const totalTokenContractsCount = tokenContractsCount.reduce((acc, val) => acc + val, 0);
        const totalTokenTransferValue = tokenTransferValue.reduce((acc, val) => acc + val, 0);

        return {
            chartData: {
                labels,
                datasets: [
                    {
                        label: 'Token Contracts Count',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(153, 102, 255, 0.4)',
                        hoverBorderColor: 'rgba(153, 102, 255, 1)',
                        data: tokenContractsCount,
                    },
                    {
                        label: 'Token Transfer Value',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255, 159, 64, 0.4)',
                        hoverBorderColor: 'rgba(255, 159, 64, 1)',
                        data: tokenTransferValue,
                    }
                ],
            },
            summary: {
                totalTokenContractsCount,
                totalTokenTransferValue
            }
        };
    };
    const getTransactionAnalysisData = () => {
        const transactionsCount = transactionData.length; // Tổng số giao dịch
        const uniqueOutgoing = new Set(transactionData.map(txn => txn.from.toLowerCase())).size; // Số địa chỉ gửi duy nhất
        const uniqueIncoming = new Set(transactionData.map(txn => txn.to.toLowerCase())).size; // Số địa chỉ nhận duy nhất

        return {
            chartData: {
                labels: ['Ethereum Transactions', 'Unique Outgoing Addresses', 'Unique Incoming Addresses'],
                datasets: [
                    {
                        label: 'Transaction Analysis',
                        data: [transactionsCount, uniqueOutgoing, uniqueIncoming],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            summary: {
                totalTransactions: transactionsCount,
                uniqueOutgoing,
                uniqueIncoming
            }
        };
    };

    const renderChart = () => {
        switch (currentView) {
            case 'ethBalance':
                const ethBalanceData = getEthBalanceData();
                return (
                    <>
                        <div className="flex flex-wrap mb-4 justify-center">
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        ETH Highest Balance
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">{ethBalanceData.summary.highestEth.date}</div>
                                    <div className="font-bold text-gray-800">{ethBalanceData.summary.highestEth.value} ETH</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        ETH Lowest Balance
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">{ethBalanceData.summary.lowestEth.date}</div>
                                    <div className="font-bold text-gray-800">{ethBalanceData.summary.lowestEth.value} ETH</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-square mr-1" style={{ color: 'rgb(67, 67, 72)' }}></i>
                                        USD Highest Value
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">{ethBalanceData.summary.highestUsd.date}</div>
                                    <div className="font-bold text-gray-800">${ethBalanceData.summary.highestUsd.value}</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-square mr-1" style={{ color: 'rgb(67, 67, 72)' }}></i>
                                        USD Lowest Value
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">{ethBalanceData.summary.lowestUsd.date}</div>
                                    <div className="font-bold text-gray-800">${ethBalanceData.summary.lowestUsd.value}</div>
                                </div>
                            </div>
                        </div>
                        <Line
                            data={ethBalanceData.chartData}
                            options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const index = context.dataIndex;
                                                const date = ethBalanceData.chartData.labels[index];
                                                const ethBalance = ethBalanceData.chartData.datasets[0].data[index];
                                                const usdValue = ethBalanceData.chartData.datasets[1].data[index];
                                                return [
                                                    `ETH Balance: ${ethBalance.toFixed(4)} ETH`,
                                                    `Historic USD Value: $${usdValue.toFixed(2)}`
                                                ];
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
                    </>
                );
            case 'txnFees':
                const txnFeesData = getTxnFeesData();
                return (
                    <>
                        <div className="flex flex-wrap mb-4 justify-center">
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        Total Fees Spent (As a Sender)
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">{txnFeesData.summary.totalFeesSpentEth} ETH</div>
                                    <div className="font-bold text-gray-800">${txnFeesData.summary.totalFeesSpentUsd}</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items=center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        <span className='whitespace-nowrap'>Total Fees Used (As a Recipient)</span>
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">{txnFeesData.summary.totalFeesReceivedEth} ETH</div>
                                    <div className="font-bold text-gray-800">${txnFeesData.summary.totalFeesReceivedUsd}</div>
                                </div>
                            </div>
                        </div>
                        <Bar
                            data={txnFeesData.chartData}
                            options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const index = context.dataIndex;
                                                const datasetLabel = context.dataset.label;
                                                const value = context.raw;
                                                return [
                                                    `Total Fees Spent (ETH): ${txnFeesData.summary.totalFeesSpentEth}`,
                                                    `Total Fees Received (ETH): ${txnFeesData.summary.totalFeesReceivedEth}`,
                                                    `Total Fees Spent (USD): ${txnFeesData.summary.totalFeesSpentUsd}`,
                                                    `Total Fees Received (USD): ${txnFeesData.summary.totalFeesReceivedUsd}`
                                                ];
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
                    </>
                );
            case 'etherTransfers':
                const etherTransfersData = getEtherTransfersData();
                return (
                    <>
                        <div className="flex flex-wrap mb-4 justify-center">
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        Sent Out
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">{etherTransfersData.summary.totalSentOut.toFixed(4)} ETH</div>
                                    <div className="font-bold text-gray-800">${(etherTransfersData.summary.totalSentOut * usdRates).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        <span className='whitespace-nowrap'>Received In</span>
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">{etherTransfersData.summary.totalReceiveIn.toFixed(4)} ETH</div>
                                    <div className="font-bold text-gray-800">${(etherTransfersData.summary.totalReceiveIn * usdRates).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items=center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        <span className='whitespace-nowrap'>Miner Reward</span>
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">{etherTransfersData.summary.totalMinerReward.toFixed(4)} ETH</div>
                                    <div className="font-bold text-gray-800">${(etherTransfersData.summary.totalMinerReward * usdRates).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                        <Bar
                            data={etherTransfersData}
                            options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const index = context.dataIndex;
                                                const datasetLabel = context.dataset.label;
                                                const value = context.raw;
                                                return [
                                                    `Sent Out (ETH): ${etherTransfersData.datasets[0].data[index]}`,
                                                    `Received In (ETH): ${etherTransfersData.datasets[1].data[index]}`,
                                                    `Miner Reward (ETH): ${etherTransfersData.datasets[2].data[index]}`
                                                ];
                                            }
                                        }
                                    },
                                    legend: {
                                        display: true,
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'ETH Transferred',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Date',
                                        },
                                    },
                                },
                            }}
                        />
                    </>
                );
            case 'tokenTransfers':
                const tokenTransfersData = getTokenTransfersData();
                return (
                    <>

                        <div className="flex flex-wrap mb-4 justify-center">
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items=center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        <span className='whitespace-nowrap'>Token Transfer Value</span>
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">{tokenTransfersData.summary.totalTokenTransferValue.toFixed(4)} ETH</div>
                                    <div className="font-bold text-gray-800">${(tokenTransfersData.summary.totalTokenTransferValue * usdRates).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items-center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        Token Contracts Count
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">{tokenTransfersData.summary.totalTokenContractsCount}</div>
                                </div>
                            </div>


                        </div>
                        <Bar
                            data={tokenTransfersData.chartData}
                            options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const index = context.dataIndex;
                                                const datasetLabel = context.dataset.label;
                                                const value = context.raw;
                                                return [
                                                    `${datasetLabel}: ${value}`,
                                                    `Token Contracts Count: ${tokenTransfersData.chartData.datasets[0].data[index]}`,
                                                    `Token Transfer Value: ${tokenTransfersData.chartData.datasets[1].data[index]}`
                                                ];
                                            }
                                        }
                                    },
                                    legend: {
                                        display: true,
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Value',
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Date',
                                        },
                                    },
                                },
                            }}
                        />
                    </>
                );
            case 'transactions':
                const transactionAnalysisData = getTransactionAnalysisData();
                return (
                    <>
                        <div className="flex flex-wrap mb-4 justify-center">
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items=center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        Ethereum Transactions
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">Total Transactions</div>
                                    <div className="font-bold text-gray-800">{transactionAnalysisData.summary.totalTransactions}</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items=center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        Unique Outgoing Addresses
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">Unique Outgoing Addresses</div>
                                    <div className="font-bold text-gray-800">{transactionAnalysisData.summary.uniqueOutgoing}</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                                <div className="data-box p-4 bg-white rounded-lg shadow-md text-center">
                                    <h5 className="data-title flex items=center justify-center mb-2 text-lg font-bold">
                                        <i className="fa fa-circle text-primary mr-1" style={{ color: 'rgb(124, 181, 236)' }}></i>
                                        Unique Incoming Addresses
                                    </h5>
                                    <div className="text-gray-500 text-sm mb-1">Unique Incoming Addresses</div>
                                    <div className="font-bold text-gray-800">{transactionAnalysisData.summary.uniqueIncoming}</div>
                                </div>
                            </div>
                        </div>
                        <div className="h-screen flex justify-center items-center">
                        <Pie
                            className="w-48 h-48"
                            data={transactionAnalysisData.chartData}
                            options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const index = context.dataIndex;
                                                const label = transactionAnalysisData.chartData.labels[index];
                                                const value = transactionAnalysisData.chartData.datasets[0].data[index];
                                                return `${label}: ${value}`;
                                            }
                                        }
                                    },
                                    legend: {
                                        display: false, // Hide the legend to make more space for the chart
                                    },
                                },
                                plugins: [{
                                    id: 'labels',
                                    afterDraw(chart, args, pluginOptions) {
                                        const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;
                                        ctx.save();
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.font = '12px Arial';
                                        chart.data.datasets.forEach((dataset, i) => {
                                            dataset.data.forEach((data, index) => {
                                                const { x, y, radius } = chart.getDatasetMeta(i).data[index];
                                                const value = data.toString();
                                                const textWidth = ctx.measureText(value).width;
                                                const textHeight = 12;
                                                const xPos = x - (textWidth / 2);
                                                const yPos = y - (textHeight / 2);
                                                ctx.fillStyle = 'black';
                                                ctx.fillText(value, xPos, yPos);
                                            });
                                        });
                                        ctx.restore();
                                    }
                                }]
                            }}
                        />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full container-fluid justify-center p-6 bg-[#111F2C]">
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                <>
                    <div className="w-full mt-4 p-6 bg-gray-100 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">Analysis for Address: {addressId}</h2>
                        <div className="flex space-x-4 mb-6">
                            <button
                                className={`text-sm text-white px-4 py-2 rounded-md ${currentView === 'ethBalance' ? 'bg-green-600' : 'bg-gray-600'}`}
                                onClick={() => handleViewChange('ethBalance')}
                            >
                                Ether Balance
                            </button>
                            <button
                                className={`text-sm text-white px-4 py-2 rounded-md ${currentView === 'transactions' ? 'bg-green-600' : 'bg-gray-600'}`}
                                onClick={() => handleViewChange('transactions')}
                            >
                                Transactions
                            </button>
                            <button
                                className={`text-sm text-white px-4 py-2 rounded-md ${currentView === 'txnFees' ? 'bg-green-600' : 'bg-gray-600'}`}
                                onClick={() => handleViewChange('txnFees')}
                            >
                                Txn Fees
                            </button>
                            <button
                                className={`text-sm text-white px-4 py-2 rounded-md ${currentView === 'etherTransfers' ? 'bg-green-600' : 'bg-gray-600'}`}
                                onClick={() => handleViewChange('etherTransfers')}
                            >
                                Ether Transfers
                            </button>
                            <button
                                className={`text-sm text-white px-4 py-2 rounded-md ${currentView === 'tokenTransfers' ? 'bg-green-600' : 'bg-gray-600'}`}
                                onClick={() => handleViewChange('tokenTransfers')}
                            >
                                Token Transfers
                            </button>

                        </div>

                        <div>
                            {renderChart()}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
