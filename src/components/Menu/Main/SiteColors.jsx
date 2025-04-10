
import React from 'react';
import './SiteColors.css';

const SiteColors = () => {
    return (
        <div style={{ padding: "15px" }} id='sitecolors'>
            <h5>
                Site Colors
            </h5>
            <div className="box">
                <div>
                    <div className="boxes">
                        <div className="box-sec">
                            <div className="box1"></div>
                            <div className="box2"></div>
                            <div className="box3"></div>
                            <div className="box4"></div>
                        </div>

                        <div className="box-content">
                            <span>=My Vendors Show First</span>
                            <span>=My Vendors Caution</span>
                            <span>=My Vendors Show Never</span>
                            <span>= "Supply & Demand" Product In Stock</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SiteColors;
