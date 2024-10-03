import React from 'react'
import "./MenuBar.css"
import helpimg from "../../../assets/help.png"
import { Link } from 'react-router-dom'
const MenuBar = () => {
    return (
        <>
            <nav className='menu-bar'>
                <ul>
                    <li>

                        <Link to={'/help'}>
                            Help
                        </Link>
                    </li>
                    <li>
                        <Link to={'/feedback'}>
                            Contact
                        </Link>
                    </li>
                <li>
                    <Link to={'/ethics'}>
                        Ethics
                    </Link>
                </li>
                <li>Site Map</li>
                <li>
                <Link to={'/badges'}>
                        Ethics
                    </Link>
                </li>
            </ul>
        </nav >
            <div>
                <h2 style={{ backgroundColor: "#bfbfbf", color: "white", fontSize: "20px",fontWeight:"bold", padding: "8px" }}>
                    BrokerBinHelpTopics
                </h2>
            </div>

            <div className='help-sec'>
                <img src={helpimg} alt="help" srcset="" />
                <div className="help-content">
                    <h2 style={{fontSize:"1.5em" , fontWeight:"bold"}}>BrokenBin.com Help Center</h2>
                    <p>Use the BrokerBin.com Help Center to find out how to get the most out of our site and answer any questions you may have encountered. Feel free to call us, we're here to help. Call 507-535-7563 or TF at 866-241-0639</p>
                </div>
            </div>
        </>

    )
}

export default MenuBar