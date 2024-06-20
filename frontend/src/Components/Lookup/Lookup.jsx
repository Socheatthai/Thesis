import React from 'react';

const Lookup = () => {
    return (
        <div className='lookup flex-1 justify-center p-6 w-full container-fluid bg-[#111F2C]'>
            <div className="container mx-auto p-6 bg-gradient-to-br from-#90EE90 to-indigo-800 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row justify-center items-center py-2 px-4 w-full">
                    <div className="md:w-1/2">
                    <h2 className="text-5xl font-bold text-green-500 mb-5 pb-5  whitespace-nowrap">Looking for any Wallet Address</h2>


                        <p className="text-lg pt-5  text-white py-2 px-4 ml-10 w-full whitespace-nowrap">Search for your Wallet address to check your Cryptocurrency</p>
                        <div className="flex justify-center ml-4 mt-4 py-2 px-4 w-full">
                            <img src="https://coin-tracker-public.s3-us-west-1.amazonaws.com/crypto-icons/cmc/64x64/1.png" alt="Bitcoin" className="mx-2 w-24 h-24 mb-4" />
                            <img src="https://coin-tracker-public.s3-us-west-1.amazonaws.com/crypto-icons/cmc/64x64/1027.png" alt="Ethereum" className="mx-2 w-24 h-24 mb-4" />
                            <img src="https://coin-tracker-public.s3-us-west-1.amazonaws.com/crypto-icons/cmc/64x64/52.png" alt="Ripple" className="mx-2 w-24 h-24 mb-4" />
                        </div>
                        <div className="py-2 px-4 w-full pt-5">
                        <div className="relative">
                            <select className="bg-white rounded-md ml-10 py-2 px-4 w-full appearance-none focus:outline-none">
                                <option value="BTC">BTC</option>
                                <option value="ETH">ETH</option>
                                <option value="XRP">XRP</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
                <div className="mt-8 text-center pb-20">
                    <h4 className="text-lg font-bold text-white mb-2">Crypto & NFT taxes made easy with CoinTracker</h4>
                    <p className="text-white pb-5">Effortlessly sync your wallets and generate tax forms in no time. Trusted by over 2 million users, CoinTracker is your go-to solution for all your crypto and NFT tax needs. Sign up now!</p>
                    <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none">Contact Us</button>
                </div>
            </div>
        </div>
    );
}

export default Lookup;
