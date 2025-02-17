import React from 'react'
import safeTrading from "../../assets/safe-trading-center.png"
import whatWeDo from "../../assets/what-we-do2.png"
import whatYouDo from "../../assets/what-you-do2.png"
import yourDedicated from "../../assets/your-dedicated.png"
import css from "../../styles/SafeTrading.module.css"

const SafeTrading = () => {
    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl w-full mx-auto mt-24 border border-gray-300 text-[#444]">
                {/* Header */}
                <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                    <span className="relative inline-block">
                        <img src={safeTrading} alt="Safe-Trading" />
                    </span>
                </h1>
                <div className={`${css.safeTradingContainer} grid md:grid-cols-3 gap-5 mt-16 `}>
                    {/* Application Process */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">Application Process</h2>
                        <ol className="list-decimal list-inside ml-4  space-y-1 font-normal">
                            <li>Business qualification
                                <ul className="list-disc list-inside ml-5">
                                    <li>Certifications</li>
                                    <li>Tax ID, VAT</li>
                                    <li>Business registration documents</li>
                                </ul>
                            </li>
                            <li>Require and verify 3 references</li>
                            <li>Bank & Trade References</li>
                        </ol>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            {/* Safe Trading Process */}
                            <div >
                                <h2 className="text-2xl font-semibold mb-3 whitespace-nowrap">Safe Trading Process</h2>
                                <ol className="list-decimal list-inside  space-y-1 whitespace-nowrap  ml-4 ">
                                    <li>Broker Deal via BrokerBin.com</li>
                                    <li>Get Bank and Trades</li>
                                    <li>Escrow Deal</li>
                                    <li>Test Equipment</li>
                                    <li>Provide Feedback on Deal</li>
                                    <li>Add Vendor to My Vendors List</li>
                                </ol>

                            </div>
                            <div>
                                <img src={whatYouDo} className='ml-[12rem]' alt="what-you-do" srcset="" />
                            </div>
                        </div>

                    </div>
                    <div>
                        <img src={whatWeDo} alt="what-we-do" srcset="" />
                    </div>
                    {/* Safe Trading Resources */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3 ">Safe Trading Resources</h2>
                        <ul className="list-disc list-inside text-[8pt] space-y-1  ml-4 ">
                            <li><a href="#" >Ethics Complaint</a></li>
                            <li><a href="#" >Report an Issue</a></li>
                            <li><a href="#" >Testing Houses & Services</a></li>
                            <li>Company Ratings</li>
                            <li>Transparent Company Profiles
                                <ul className="list-disc list-inside ml-5 !text-gray-500">
                                    <li>Full Company Profile with Pictures</li>
                                    <li>References</li>
                                    <li>Bank and Trades</li>
                                    <li>Sales and Purchasing Terms</li>
                                    <li>Associations</li>
                                </ul>
                            </li>
                            <li>Dedicated Account Managers</li>
                            <li>Network established April 1, 2002</li>
                            <li>My Vendors (AVL) List</li>
                            <li>Vetted Members</li>
                            <li>Tech Specs and Advanced Data</li>
                            <li>Watch List Companies</li>
                            <li>Feedback Rating System</li>
                            <li>RoadShows
                                <ul className="list-disc list-inside ml-5 !text-gray-500">
                                    <li>Meet Vendors in Person</li>
                                    <li>Seminars</li>
                                    <li>Fraud Advisory Panel Discussion</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <img src={yourDedicated} alt="Dedicated-accoun-manager" srcset="" />
                </div>
            </div>
            <div className={`${css.accountManagaerContainer}`}>
                {/* Dedicated Account Manager */}
                <div className="border  max-w-6xl w-full mx-auto border-gray-300 rounded-lg p-4  flex items-center justify-around  mt-4  gap-5  ">
                    <div className='flex items-center justify-around gap-12'>
                        <img src="/path-to-image.jpg" alt="Account Manager" className="w-24 h-24 rounded-lg" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Rikk Wassmer</h3>
                        <p className="text-gray-600">14.9 years experience</p>
                    </div>
                    <div>
                        <p><strong>Company:</strong> BrokerBin.com</p>
                        <p><strong>Title:</strong> Senior Account Manager</p>
                        <p><strong>Phone:</strong> 507-535-7563 x1113</p>
                        <p><strong>Toll:</strong> 888-241-0639</p>
                        <p><strong>Fax:</strong> 507-292-5747</p>
                        <p><strong>Email:</strong> <a href="mailto:Rikk@BrokerBin.com" className="text-blue-600 hover:underline">Rikk@BrokerBin.com</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SafeTrading