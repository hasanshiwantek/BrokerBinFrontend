import React from 'react'

const MultiCast = () => {
  return (
    <>
    <div style={{padding:"15px"}}>
        <h5>BroadCast and MultiCast</h5>

        <div className="email-sec box" style={{fontSize:'11px'}}>
                    <p style={{ color: "rgb(218, 63, 24)" }}>Q: Why am I receiving emails about WTB, RFQ, and WTS items?</p>
                    <p> A: Your default Broadcast setting is set to "On" with no filters. Go to My Profile/Options to filter or turn "Off" the Broadcast.</p>
                    <p style={{ color: "rgb(218, 63, 24)" }}>Q: When should I use a Multicast?</p>
                    <p>A: When you have several items in a list you need to buy/sell.</p>  
                     <p style={{ color: "rgb(218, 63, 24)" }}>Q: Does it help to include the optional field, Manufacturer, when sending a Multicast?</p>
                    <p> A: Yes, include a manufacturer so we can route it to the proper person.</p>
                    
                </div>
    </div>

    </>
  )
}

export default MultiCast