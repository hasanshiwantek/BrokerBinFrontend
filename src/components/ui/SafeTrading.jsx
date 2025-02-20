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
                        <h2 className="text-2xl font-semibold mb-3">Application Procedure</h2>
                        <ol className="list-decimal list-inside ml-4  space-y-1 font-normal">
                            <li>Business Verification
                                <ul className="list-disc list-inside ml-5">
                                    <li>Certifications</li>
                                    <li>Tax Identification, VAT</li>
                                    <li>Company Registration Documents</li>
                                </ul>
                            </li>
                            <li>Request and Confirm 3 References</li>
                            <li>Financial & Commercial References</li>
                        </ol>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            {/* Safe Trading Process */}
                            <div >
                                <h2 className="text-2xl font-semibold mb-3 whitespace-nowrap">Secure Transaction Procedure</h2>
                                <ol className="list-decimal list-inside  space-y-1 whitespace-nowrap  ml-4 ">
                                    <li>Facilitate Deal through BrokerCell.com</li>
                                    <li>Acquire Financial and Trade References</li>
                                    <li>Engage in Escrow Transaction</li>
                                    <li>Conduct Equipment Verification</li>
                                    <li>Submit Transaction Feedback</li>
                                    <li>Incorporate Vendor into Preferred Vendor List</li>
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
                        <h2 className="text-2xl font-semibold mb-3 ">Reliable Trading Support</h2>
                        <ul className="list-disc list-inside text-[8pt] space-y-1  ml-4 ">
                            <li><a href="#" >Ethical Concerns Reporting</a></li>
                            <li><a href="#" >Issue Documentation</a></li>
                            <li><a href="#" >Evaluation Services & Testing</a></li>
                            <li>Business Ratings</li>
                            <li>Detailed Business Profiles
                                <ul className="list-disc list-inside ml-5 !text-gray-500">
                                    <li>Complete Profiles with Images</li>
                                    <li>Reference Checks</li>
                                    <li>Financial and Trade Background</li>
                                    <li>Terms of Sales and Purchases</li>
                                    <li>Professional Affiliations</li>
                                </ul>
                            </li>
                            <li>Personal Account Management</li>
                            <li>Network Founded April 1, 2002</li>
                            <li>My Vendors (AVL) List</li>
                            <li>Preferred Vendors List</li>
                            <li>Certified Members                            </li>
                            <li>Technical Details and Comprehensive Data</li>
                            <li>Monitoring List for Businesses</li>
                            <li>Feedback and Evaluation System</li>
                            <li>Industry Events
                                <ul className="list-disc list-inside ml-5 !text-gray-500">
                                    <li>In-Person Vendor Meetings</li>
                                    <li>Educational Seminars</li>
                                    <li>Panel Discussions on Fraud Prevention</li>
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
                        <p><strong>Company:</strong> Brokercell.com</p>
                        <p><strong>Title:</strong> Senior Account Manager</p>
                        <p><strong>Phone:</strong> 507-535-7563 x1113</p>
                        <p><strong>Toll:</strong> 888-241-0639</p>
                        <p><strong>Fax:</strong> 507-292-5747</p>
                        <p><strong>Email:</strong> <a href="mailto:hassan.asif@shiwantek.com" className="text-blue-600 hover:underline">Rikk@BrokerBin.com</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SafeTrading