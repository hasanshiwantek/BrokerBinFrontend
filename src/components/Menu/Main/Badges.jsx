
import React from 'react'
import "./MenuBar.css"
import "./Badges.css"
import { Link } from 'react-router-dom'
import inv1 from "../../../assets/inv1.png"
import inv2 from "../../../assets/inv2.png"
import inv3 from "../../../assets/inv3.png"
import inv4 from "../../../assets/inv4.png"
import inv5 from "../../../assets/inv5.png"
import inv6 from "../../../assets/inv6.png"

const Badges = () => {

    // Function to copy to clipboard and show alert
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    }

    return (
        <>
            <main>
                <nav className='menu-bar'>
                    <ul>
                        <li>
                            <Link to={'/help'}>Help</Link>
                        </li>
                        <li>
                            <Link to={'/feedback'}>Contact</Link>
                        </li>
                        <li>
                            <Link to={'/ethics'}>Ethics</Link>
                        </li>
                        <li>
                            <Link to={"/sitemap"}>
                                Site Map
                            </Link>

                        </li>
                        <li>
                            <Link to={'/badges'}>Badges</Link>
                        </li>
                    </ul>
                </nav>

                <div className='badge-section'>

                    <div className='badge-sec'>
                        <h1>Available badges ready for display</h1>
                        <p>If you're a member of BrokerBin.com and want to proudly display as such, you now can.  Just copy and paste any of the badge code snippets below to be used on your own website or email signature. If you have any questions or need help getting it to work - give us a call and we will walk you through it.</p>

                        <div className='select-sec'>
                            <label htmlFor="badge-select">Select Type: </label>
                            <select id="badge-select" name="badge-select">
                                <option value="default">Default Badges</option>
                            </select>
                        </div>

                    </div>

                    <div className="inv-column">

                        <div className="inventory-sec1">

                            {/* 1 */}
                            <div>
                                <div className='sec1'>
                                    <h1>See all our inventory on Brokerbin.com:</h1>
                                    <img src={inv1} alt="inv1" srcset="" />
                                    <p>Copy the code and then paste it into your blog or web page:</p>
                                    <textarea name="text-area" id="" readOnly value='<ahref="https://members.brokerbin.com/?loc=invensearch&company=N-T+Spares+Sourcing"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=1&ptype=default" alt="BrokerBin.com Member" border="0" /></a>' />
                                </div>
                                <div>
                                    <button className='inv-btn' onClick={() => copyToClipboard('<ahref="https://members.brokerbin.com/?loc=invensearch&company=N-T+Spares+Sourcing"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=1&ptype=default" alt="BrokerBin.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                                </div>
                            </div>

                            {/* 2 */}
                            <div className='sec1'>
                                <h1>Brokerbin.com member with white background:</h1>
                                <img src={inv2} alt="inv2" srcset="" />
                                <p>Copy the code and then paste it into your blog or web page:</p>
                                <textarea name="text-area" id="" readOnly value='<a href="https://members.brokerbin.com/"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=3&ptype=default" alt="BrokerBin.com Member" border="0" /></a>' />
                                <div>
                                    <button className='inv-btn' onClick={() => copyToClipboard('<a href="https://members.brokerbin.com/"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=3&ptype=default" alt="BrokerBin.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                                </div>
                            </div>

                            {/* 3 */}
                            <div className='sec1'>
                                <h1>BrokerBin.com MyVendors with white background:</h1>
                                <img src={inv3} alt="inv3" srcset="" />
                                <p>Copy the code and then paste it into your blog or web page:</p>
                                <textarea name="text-area" id="" readOnly value='<a href="https://members.brokerbin.com/?loc=myprofile&type=My%20Vendors&add=vY5XJJ3uM84%3D&change=1#vY5XJJ3uM84%3D"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=5&ptype=default" alt="BrokerBin.com Member" border="0" /></a>' />
                                <div>
                                    <button className='inv-btn' onClick={() => copyToClipboard('<a href="https://members.brokerbin.com/?loc=myprofile&type=My%20Vendors&add=vY5XJJ3uM84%3D&change=1#vY5XJJ3uM84%3D"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=5&ptype=default" alt="BrokerBin.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                                </div>
                            </div>

                        </div>

                        <div className="inventory-sec2">

                            {/* 4 */}
                            <div className='sec1'>
                                <h1>Brokerbin.com member with black background:</h1>
                                <img src={inv4} alt="inv4" srcset="" />
                                <p>Copy the code and then paste it into your blog or web page:</p>
                                <textarea name="text-area" id="" readOnly value='<a href="https://members.brokerbin.com/"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=2&ptype=default" alt="BrokerBin.com Member" border="0" /></a>' />
                                <div>
                                    <button className='inv-btn' onClick={() => copyToClipboard('<a href="https://members.brokerbin.com/"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=2&ptype=default" alt="BrokerBin.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                                </div>
                            </div>

                            {/* 5 */}
                            <div className='sec1'>
                                <h1>Brokerbin.com member with white background:</h1>
                                <img src={inv5} alt="inv5" srcset="" />
                                <p>Copy the code and then paste it into your blog or web page:</p>
                                <textarea name="text-area" id="" readOnly value='<a href="https://members.brokerbin.com/"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=4&ptype=default" alt="BrokerBin.com Member" border="0" /></a>' />
                                <div>
                                    <button className='inv-btn' onClick={() => copyToClipboard('<a href="https://members.brokerbin.com/"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=4&ptype=default" alt="BrokerBin.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                                </div>
                            </div>

                            {/* 6 */}
                            <div className='sec1'>
                                <h1>BrokerBin.com MyVendors with white background:</h1>
                                <img src={inv6} alt="inv6" srcset="" />
                                <p>Copy the code and then paste it into your blog or web page:</p>
                                <textarea name="text-area" id="" readOnly value='<a href="https://members.brokerbin.com/?loc=myprofile&type=My%20Vendors&add=vY5XJJ3uM84%3D&change=1#vY5XJJ3uM84%3D"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=6&ptype=default" alt="BrokerBin.com Member" border="0" /></a>' />
                                <div>
                                    <button className='inv-btn' onClick={() => copyToClipboard('<a href="https://members.brokerbin.com/?loc=myprofile&type=My%20Vendors&add=vY5XJJ3uM84%3D&change=1#vY5XJJ3uM84%3D"><img src="//members.brokerbin.com/badge.php?cid=vY5XJJ3uM84%3D&pid=6&ptype=default" alt="BrokerBin.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </main>

            <footer>
                <div className="footerlinks">
                    <li><a href="/">Advertising Programs</a></li>
                    <li><a href="/">Business Solutions</a></li>
                    <li><a href="/">About BrokerBin.com</a></li>
                    <li>©2024 Privacy</li>
                </div>
            </footer>
        </>
    )
}

export default Badges
