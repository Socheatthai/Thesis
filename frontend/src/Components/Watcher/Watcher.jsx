import React from 'react';
import Image1 from '../Assets/image-1.png'
import Image2 from '../Assets/image2.png'
import Image3 from '../Assets/image3.png'


const Watcher = () => {
    return (
        <div className='watcher'>
            <div className="w-full container-fluid bg-[#111F2C]">
                <div className="row">
                    <div className="col-sm-10 col-sm-offset-1 intro-section" style={{ minHeight: '612px' }}>
                        <div className="row">
                            <div className="col-sm-12 text-center text-white" style={{ fontFamily: "'Roboto Slab', serif", paddingTop: '20px' }}>
                                <h1 className="bigger-heading text-green-500" style={{ fontSize: '36px', marginBottom: '20px' }}>#Discover Our Unique Service for Managing Your Wallet Addresses</h1>
                            </div>
                        </div>
                        <section id="marketing" className="blockonomics-page mt-40">
                            <div className="mt-20 px-10 py-20 text-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 md:pb-12">
                                    <div className="flex justify-center md:justify-end order-2 md:order-1">
                                        <div className="w-[500px] md:px-12 text-center md:text-left">
                                            <h2 className="text-2xl font-bold mb-6">Upgrade to a Multichain Crypto Wallet for Enhanced Flexibility</h2>
                                            <p className="font-mono text-lg">
                                                manage multiple cryptocurrencies across various blockchains with our advanced multichain crypto wallet solution. No KYC documentation required. Get set up in under 5 minutes
                                            </p>
                                            <a href="/merchants" className="font-mono text-tertiary text-lg my-6 block text-green-400">Discover Now →</a>
                                        </div>
                                    </div>
                                    <div className="flex justify-center md:justify-start order-1 md:order-2">
                                        <picture className="w-[500px]">
                                            {/* <source type="image/webp" srcSet="../img/accept-example.webp" /> */}
                                            <img src={Image3} width="500" height="286" alt="Accept Bitcoin Payments in Your Ecommerce Store" className="rounded-lg shadow-[10px_10px_0px_0px_rgba(13,21,29,1)]" />
                                            {/* <img src="" width="500" height="286" alt="Accept Bitcoin Payments in Your Ecommerce Store" className="rounded-lg shadow-[10px_10px_0px_0px_rgba(13,21,29,1)]" /> */}
                                        </picture>
                                    </div>
                                </div>
                                {/* Second Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-20 md:py-22">
                                    <div className="flex justify-center order-2 md:justify-start">
                                        <div className="w-[500px] md:px-12 text-center md:text-left">
                                            <h2 className="text-2xl font-bold mb-6">Effortlessly Create and Send Digital Transaction Invoices</h2>
                                            <p className="font-mono text-lg">
                                                Streamline your invoicing process with our seamless digital transaction invoicing solution. No cumbersome sign-up required. Our innovative tool guarantees precise BTC payments, adapting to real-time Bitcoin values effortlessly.
                                            </p>
                                            <a href="/invoicecreate/#" className="font-mono text-tertiary text-lg my-6 block  text-green-400">Discover More →</a>
                                        </div>
                                    </div>
                                    <div className="flex justify-center order-1 md:justify-end">
                                        <img src={Image1} width="500" height="324" alt="Create and Send Bitcoin Invoices" className="rounded-lg shadow-[10px_10px_0px_0px_rgba(13,21,29,1)]" />
                                    </div>
                                </div>

                                {/* Third Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 md:py-12">
                                    <div className="flex justify-center md:justify-end order-2 md:order-1">
                                        <div className="w-[500px]  md:px-12 text-center md:text-left">
                                            <h2 className="text-2xl font-bold mb-6">Track Your Wallet Address</h2>
                                            <p className="font-mono text-lg">
                                                Keep tabs on your cryptocurrency holdings effortlessly with our advanced wallet address tracking feature. Monitor multiple wallets and addresses with ease and receive instant email notifications for any transactions.
                                            </p>
                                            <a href="/blockonomics" className="font-mono text-tertiary text-lg my-6 block  text-green-400">Discover More →</a>
                                        </div>
                                    </div>
                                    <div className="flex justify-center md:justify-start order-1 md:order-2">
                                        <img src={Image2} width="500" height="368" alt="Track Your Bitcoin" className="rounded-lg shadow-[10px_10px_0px_0px_rgba(13,21,29,1)]" />
                                    </div>
                                </div>


                            </div>
                        </section>

                        <div className="get-started-container text-center mt-10">
                            <div className="seperator mt-10"></div>
                            <a href="/register#/?redirect_url=blockonomics" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full inline-block text-xl gap:20 mb-20">
                                Find Your Wallet Address
                            </a>

                        </div>




                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watcher;
