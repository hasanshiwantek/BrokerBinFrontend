
import React from 'react';
import './SiteColors.css';

const SiteColors = () => {
    return (
        <div style={{ padding: "15px" }}>
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
                            <p>=My Vendors Show First</p>
                            <p>=My Vendors Caution</p>
                            <p>=My Vendors Show Never</p>
                            <p>= "Supply & Demand" Product In Stock</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SiteColors;
