import React from 'react';

const BroadCast = () => {
    return (
        <>
            <div style={{ padding: "15px" }} id='broadcast'>
                <h5>
                    BroadCast Terms
                </h5>

                <div className='broadCast-sec box'>
                    <div>
                        <span style={{ color: "red" }}>WTS =</span>
                        <span> Want to Sell indicates just arrived, special purchase(s), clearance items, or new stock you want to sell</span>
                    </div>
                    <div>
                        <span style={{ color: "blue"}}>WTB =</span>
                        <span> Want to Buy indicates parts you want to purchase</span>
                    </div>
                    <div>
                        <span style={{ color: "green"}}>RFQ =</span>
                        <span> Request for Quote indicates a desire to receive a quote for an item</span>
                    </div>

                    <div style={{ marginTop: "2px" }}>
                        <p>Bulk = Product which is grouped together by a container or a pallet.</p>
                        <p>Container = Product which is grouped together in a large container.</p>
                        <p>Pallet = Product which is grouped together on a pallet.</p>
                        <p>Whole Unit = Product which is grouped together as a complete system.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BroadCast;
