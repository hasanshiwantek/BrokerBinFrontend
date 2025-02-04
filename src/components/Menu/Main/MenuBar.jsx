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
                <li>
                    <Link to={"/sitemap"}>
                    Site Map
                    </Link>
                    </li>
                <li>
                <Link to={'/tools'}>
                        Tools
                    </Link>
                </li>
            </ul>
        </nav >
            <div>
                <h2 style={{ backgroundColor: "#bfbfbf", color: "white", fontSize: "20px",fontWeight:"bold", padding: "8px" }}>
                BrokerCell Help Topics
                </h2>
            </div>

            <div className='help-sec'>
                <img src={helpimg} alt="help" srcSet="" />
                <div className="help-content">
                    <h2 style={{fontSize:"1.5em" , fontWeight:"bold"}}>BrokerCell.com Support Center
                    </h2>
                    <p>Explore the BrokerCell.com Support Center to discover tips on maximizing your site experience and addressing any inquiries you might have. We're here for you—don't hesitate to reach out. Call ********** or Toll-Free at ***********.
                    </p>
                </div>
            </div>
        </>

    )
}

export default MenuBar 