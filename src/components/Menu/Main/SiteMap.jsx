
import React from 'react';
import './SiteMap.css';
import { Link } from 'react-router-dom';
import siteIcon from '../../../assets/sitemapdocbullet.gif'; // Import your icon
import styles from "../../../styles/Menu/Search/Person.module.css"

const SiteMap = () => {
    return (
        <>
            <main className='main-sec'>
                <nav className='menu-bar'>
                    <ul>
                        <li><Link to={'/help'}>Help</Link></li>
                        <li><Link to={'/feedback'}>Contact</Link></li>
                        <li><Link to={'/ethics'}>Ethics</Link></li>
                        <li><Link to={"/sitemap"}>SiteMap</Link></li>
                        <li><Link to={'/badges'}>Badges</Link></li>
                    </ul>
                </nav>
                <div className="container">
                    <div className='sections'>
                        <div id="box1">
                            <ul>
                                <li><img src={siteIcon} alt="icon" /> Main</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Home</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Help</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Contact</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Site Map</li>
                            </ul>
                        </div>
                        <div id="box2">
                            <ul>
                                <li><img src={siteIcon} alt="icon" /> Tools</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> My Vendors</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Hot List</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Track Shipment</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Part Cart</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> More Tools...</li>
                            </ul>
                        </div>
                        <div id="box3">
                            <ul>
                                <li><img src={siteIcon} alt="icon" /> Search</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Inventory</li>
                                <li style={{ marginLeft: "24px" }}><img src={siteIcon} alt="icon" /> Multiple Part</li>
                                <li style={{ marginLeft: "24px" }}><img src={siteIcon} alt="icon" /> Advanced Part</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Company</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Person</li>
                            </ul>
                        </div>
                        <div id="box4">
                            <ul>
                                <li><img src={siteIcon} alt="icon" /> Manage</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Manage Inventory</li>
                                <li style={{ marginLeft: "16px" }}><img src={siteIcon} alt="icon" /> Upload</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Email Parts List</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Example.xls</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Example.csv</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Auto updated settings</li>
                                <li><img src={siteIcon} alt="icon" /> Edit</li>
                                <li><img src={siteIcon} alt="icon" /> Add</li>
                                <li><img src={siteIcon} alt="icon" /> Export/Remove</li>
                                <li><img src={siteIcon} alt="icon" /> My Profile</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Personal Info</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Options</li>
                                <li style={{ marginLeft: "18px" }}><img src={siteIcon} alt="icon" /> BroadCast</li>
                                <li style={{ marginLeft: "18px" }}><img src={siteIcon} alt="icon" /> Email</li>
                                <li><img src={siteIcon} alt="icon" />Supply & Demand</li>
                                <li><img src={siteIcon} alt="icon" /> Multiple Part Search</li>
                                <li><img src={siteIcon} alt="icon" /> My Vendors</li>
                                <li><img src={siteIcon} alt="icon" />Broadcast Filters</li>
                                <li><img src={siteIcon} alt="icon" />Company Role</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" />Company Info</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Contacts</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Options [Admin]</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Billing Info [Admin]</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Accounts [Admin]</li>


                                
                            </ul>
                        </div>
                        <div id="box5">
                            <ul>
                                <li><img src={siteIcon} alt="icon" /> Reports</li>
                                <li><img src={siteIcon} alt="icon" /> Company</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Company Inventory</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> My Inventory</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Want To Buy</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Want To Sell</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" />MYH Basic</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> MYH Detailed</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> show My Vendors</li>
                                <li><img src={siteIcon} alt="icon" /> SiteWide</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" />Top 200 - 30 Days</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Top 200 - 7 Days</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" />Top 200 Yesterday</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" />Want To Buy</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" />Want To Sell</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" />Supply & Demand</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Company Inventory</li>
                                <li><img src={siteIcon} alt="icon" /> Email</li>

                            </ul>
                        </div>
                        <div id="box6">
                            <ul>
                                <li><img src={siteIcon} alt="icon" /> Broadcast</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Send Broadcast</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> View</li>
                                <li style={{ marginLeft: "20px" }}><img src={siteIcon} alt="icon" /> Want to buy</li>
                                <li style={{ marginLeft: "20px" }}><img src={siteIcon} alt="icon" /> Want to sell</li>

                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Set Filters</li>
                                <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> History</li>
                            </ul>
                        </div>
                        <div id="box7">
                            <ul>
                                <li><img src={siteIcon} alt="icon" /> Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer">
                <div className="footer-content">
                    <p>Copyright 2024 BrokerBin.com</p>
                    <p>Questions / Comments</p>
                </div>
            </div>
            </main>
            <footer>
                <div className={styles.footerlinks}>
                    <li><a href="/">Advertising Programs</a></li>
                    <li><a href="/">Business Solutions</a></li>
                    <li><a href="/">About BrokerBin.com</a></li>
                    <li>©2024 Privacy</li>
                </div>
            </footer>
         
        </>
    );
}

export default SiteMap;







