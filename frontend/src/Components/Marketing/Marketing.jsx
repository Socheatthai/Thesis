import React from 'react';

const Marketing = () => {
    return (
        <section id="marketing" className="blockonomics-page  bg-[#111F2C]">
            <div className=" px-4 py-8 text-white">
                {/* First Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 md:pb-12">
                    <div className="flex justify-center md:justify-end order-2 md:order-1">
                        <div className="w-[500px] md:px-12 text-center md:text-left">
                            <h2 className="text-2xl font-bold mb-6">Accept Bitcoin Payments in Your Ecommerce Store</h2>
                            <p className="font-mono text-lg">
                                Each online sale is deposited directly into your wallet. No KYC documentation required. Get set up in
                                under 5 minutes
                            </p>
                            <a href="/merchants" className="font-mono text-tertiary text-lg my-6 block">Explore →</a>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-start order-1 md:order-2">
                        <img src="/img/accept-example.png" width="500" height="286" alt="Accept Bitcoin Payments in Your Ecommerce Store" className="rounded-lg shadow-[10px_10px_0px_0px_rgba(13,21,29,1)]" />
                    </div>
                </div>

                {/* Second Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 md:py-12">
                    <div className="flex justify-center order-2 md:justify-start">
                        <div className="w-[500px] md:px-12 text-center md:text-left">
                            <h2 className="text-2xl font-bold mb-6">Create and Send Bitcoin Invoices</h2>
                            <p className="font-mono text-lg">
                                Invoice in fiat, get paid in Bitcoin. No signup required. Our invoicing tool ensures you’re paid in the
                                correct BTC amount according to the current Bitcoin price.
                            </p>
                            <a href="/invoicecreate/#" className="font-mono text-tertiary text-lg my-6 block">Explore →</a>
                        </div>
                    </div>
                    <div className="flex justify-center order-1 md:justify-end">
                        <img src="/img/invoice-example.png" width="500" height="324" alt="Create and Send Bitcoin Invoices" className="rounded-lg shadow-[10px_10px_0px_0px_rgba(13,21,29,1)]" />
                    </div>
                </div>

                {/* Third Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 md:py-12">
                    <div className="flex justify-center md:justify-end order-2 md:order-1">
                        <div className="w-[500px]  md:px-12 text-center md:text-left">
                            <h2 className="text-2xl font-bold mb-6">Track Your Bitcoin</h2>
                            <p className="font-mono text-lg">
                                Using our wallet watcher, you can track multiple wallets and addresses, and receive email notifications
                                when transactions occur.
                            </p>
                            <a href="/blockonomics" className="font-mono text-tertiary text-lg my-6 block">Explore →</a>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-start order-1 md:order-2">
                        <img src="/img/wallet-watcher-example.png" width="500" height="368" alt="Track Your Bitcoin" className="rounded-lg shadow-[10px_10px_0px_0px_rgba(13,21,29,1)]" />
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-6">
                    <a href="/register" onClick={() => { /* handle click event */ }} className="bg-tertiary inline-block px-8 py-4 text-secondary font-bold text-lg rounded-full">
                        Sign Up For Free
                    </a>
                </div>
            </div>

            {/* Horizontal Rule */}
            <hr className="w-1/2 my-16 md:border-gray-700 mx-auto" />

            {/* Title */}
            <div className="text-center py-8 md:mt-18">
                <h1 className="text-4xl font-black wavy-underline">
                    Blockonomics helps you to <br />track and accept<br /> Bitcoin payments
                </h1>
            </div>

            {/* Timeline Section */}
            <div className="flex flex-col items-center px-6 xl:relative xl:pt-36">
                {/* Timeline entries */}
            </div>

            {/* Additional Call to Action */}
            <div className="pb-16 text-center">
                <a href="/register" onClick={() => { /* handle click event */ }} className="bg-tertiary inline-block px-8 py-4 text-secondary font-bold text-lg rounded-full">
                    Sign Up For Free
                </a>
                <div className="w-2/3 mx-auto mt-8 p-6 rounded-xl border-2 border-gray-700 flex flex-wrap justify-center text-center">
                    <img src="/img/book-icon.svg" width="24" height="25" alt="Read our blog" className="w-[24px] h-[25px] mr-3" />
                    <p className="font-bold text-lg text-primary mr-2">Read our latest blog post:</p>
                    <a rel="noopener noreferrer" href="https://insights.blockonomics.co/top-3-bitcoin-wallets-to-watch-out-for-in-2024/" target="_blank" className="font-mono underline">Top 3 Bitcoin Wallets to Watch Out for in 2024</a>
                </div>
            </div>
        </section>
    );
}

export default Marketing;
