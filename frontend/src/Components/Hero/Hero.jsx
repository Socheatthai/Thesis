import React, { useState } from 'react';
import Swipe_down from '../Assets/swipe2-removebg.png';
import Number_one from '../Assets/No1b-removebg-preview.png';
import Number_two from '../Assets/No2-removebg-preview.png';
import Number_three from '../Assets/No3b.png';
import Number_four from '../Assets/No4a-removebg-preview.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function Hero() {
    const [searchInput, setSearchInput] = useState("");
    const [focus, setFocus] = useState(false);

    const changeHandler = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        window.location.href = `/address/${searchInput}`;
    };

    const allSuggestions = [
        "0x1f9090aae28b8a3dceadf281b0f12828e676c326",
        "0x06c2e6b734fa0ac3abb1b6619d9b2b61d3ee846b",
        "0x58a497019644d8c383c8d3764c32ffd43506e836",
        "0x51c72848c68a965f66fa7a88855f9f7784502a7f",
        "0x127620319bcace9a4b2d9c2b4b67d5b2d85654d6",
        "0x6f1cdbbb4d53d226cf4b917bf768b94acbab6168",
        "0x0237181ae2d655decb0b548872eb746437dc29c6"
    ];

    const filteredSuggestions = allSuggestions.filter((suggestion) => 
        suggestion.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className="w-full bg-[#111F2C]">
            <section id="search-container" className="w-full p-4 pt-[121px] sm:pt-[191px] text-center transition-all bg-[#111F2C]">
                <h1 className="text-4xl md:text-5xl font-bold pb-[40px] text-green-400">Wallet Address Lookup</h1>
                <div className="min-h-[128px]">
                    <form className="mb-9 w-full pb-20 max-w-[656px] mx-auto relative" onSubmit={handleSearch}>
                        <div className="relative z-10 w-full">
                            <div className="w-full">
                                <Tippy
                                    content={
                                        <div className="w-full text-black bg-white font-gray-500 outline-none rounded-lg shadow-lg" style={{ width: '630px' }}>
                                            {filteredSuggestions.map((suggestion, index) => (
                                                <div
                                                    key={index}
                                                    className="w-full p-2 cursor-pointer hover:bg-[#d4d4d4]"
                                                    onClick={() => {
                                                        setSearchInput(suggestion);
                                                        setFocus(false);
                                                    }}
                                                >
                                                    {suggestion}
                                                </div>
                                            ))}
                                        </div>
                                    }
                                    interactive={true}
                                    visible={focus}
                                    onClickOutside={() => setFocus(false)}
                                    placement='bottom-start'
                                >
                                    <input
                                        id="inputField"
                                        placeholder='Search...'
                                        className="w-full p-[18px] sm:p-[24px] pr-[86px] md:pr-[114px] h-[72px] text-[0.65em] sm:text-sm text-ellipsis text-black bg-white font-black outline-none rounded-lg shadow-lg"
                                        value={searchInput}
                                        onChange={changeHandler}
                                        onFocus={() => setFocus(true)}
                                    />
                                </Tippy>
                                <div className="absolute right-0 bottom-0">
                                    <button type="submit" aria-label="Search" className="bg-white text-center w-[52px] h-[66px] pr-2 rounded-r-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[0] top-[10px] absolute bg-white rounded-lg transition-all pt-[62px] px-8 overflow-hidden text-[#AFAFAF] font-sans font-semibold text-xs text-left">
                            <p className="pt-[41px]">You can search for your xpub to view your entire wallet balance. <a href="https://help.blockonomics.co/support/solutions/articles/33000248743-bitcoin-wallet-and-xpub" target="_blank" rel="noopener noreferrer" className="text-primary">What is an Xpub?</a></p>
                            <p className="pt-[31px]">Search multiple addresses at once by separating with spaces.</p>
                        </div>
                    </form>
                </div>
            </section>

            <section id="marketing" className="blockonomics-page mt-10 pt-20">
                <div className="mt-10 px-10 py-10 text-white">
                    {/* First Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 md:pb-12">
                        <div className="flex justify-center md:justify-end order-2 md:order-1">
                            <div className="w-[500px] md:px-12 text-center md:text-left">
                                <h2 className="text-2xl font-bold mb-6 text-green-400">Monitor Balances Across Multiple Addresses</h2>
                                <p className="font-mono text-lg">
                                    Gain comprehensive insights into your cryptocurrency holdings by effortlessly monitoring balances across multiple addresses with our advanced monitoring solution. Whether you're managing personal or business assets, our platform offers unparalleled flexibility and convenience. No KYC documentation required. Get started in minutes and take control of your crypto portfolio with ease.
                                </p>
                                <a href="/merchants" className="font-mono text-tertiary text-lg my-6 block text-green-400">Explore More →</a>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start order-1 md:order-2">
                            <picture className="w-[500px]">
                                <img src={Number_one} width="500" height="286" alt="Accept Bitcoin Payments in Your Ecommerce Store" className="rounded-lg shadow-[10px_10px_0px_0px_rgba(13,21,29,1)]" />
                            </picture>
                        </div>
                    </div>

                    {/* Second Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 md:py-12">
                        <div className="flex justify-center order-2 md:justify-start">
                            <div className="w-[500px] md:px-12 text-center md:text-left">
                                <h2 className="text-2xl font-bold mb-6 text-green-400">Informed with Email Notifications for Transactions</h2>
                                <p className="font-mono text-lg">
                                    Keep track of your cryptocurrency transactions effortlessly with our instant email notification feature. Receive real-time alerts for credits and debits, ensuring you're always up-to-date on your account activity. No need for manual checks; our system notifies you automatically, providing peace of mind and convenience.
                                </p>
                                <a href="/invoicecreate/#" className="font-mono text-tertiary text-lg my-6 block text-green-400">Explore More →</a>
                            </div>
                        </div>
                        <div className="flex justify-center order-1 md:justify-end">
                            <img src={Number_two} width="500" height="324" alt="Create and Send Bitcoin Invoices" className="rounded-lg shadow-[10px_10px_0px_0px_rgba(13,21,29,1)]" />
                        </div>
                    </div>

                    {/* Third Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 md:py-12">
                        <div className="flex justify-center md:justify-end order-2 md:order-1">
                            <div className="w-[500px] md:px-12 text-center md:text-left">
                                <h2 className="text-2xl font-bold mb-6">Track and Export Payment History</h2>
                                <p className="font-mono text-lg">
                                    Seamlessly track and manage your cryptocurrency payment history with our intuitive payment tracking feature. Easily monitor transactions across multiple wallets and addresses, and conveniently export your payment history for detailed analysis. Stay organized and in control of your finances with our comprehensive tracking solution.
                                </p>
                                <a href="/blockonomics" className="font-mono text-tertiary text-lg my-6 block text-green-400">Explore More →</a>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start order-1 md:order-2">
                            <img src={Number_three} width="500" height="368" alt="Track Your Bitcoin" className="rounded-lg shadow-[10px_10px_0px_0px_rgba(13,21,29,1)]" />
                        </div>
                    </div>

                    {/* Fourth Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 md:py-12">
                        <div className="flex justify-center order-2 md:justify-start">
                            <div className="w-[500px] md:px-12 text-center md:text-left">
                                <h2 className="text-2xl font-bold mb-6">Label and Aggregate Wallet Addresses</h2>
                                <p className="font-mono text-lg">
                                    Simplify your wallet management process with our intuitive labeling and aggregation feature. Easily organize and categorize your wallet addresses to streamline your crypto transactions. No complex setups required. Our innovative tool ensures accurate aggregation of transactions, allowing you to track your crypto assets more efficiently.
                                </p>
                                <a href="/invoicecreate/#" className="font-mono text-tertiary text-lg my-6 block text-green-400">Explore More →</a>
                            </div>
                        </div>
                        <div className="flex justify-center order-1 md:justify-end">
                            <img src={Number_four} width="500" height="324" alt="Create and Send Bitcoin Invoices" className="rounded-lg shadow-[10px_10px_0px_0px_rgba(13,21,29,1)]" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
