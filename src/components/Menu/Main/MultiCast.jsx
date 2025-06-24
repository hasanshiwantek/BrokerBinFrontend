import React from 'react'
import "./BroadcastTerm.css"

const MultiCast = () => {
  return (
    <>
    <div style={{padding:"15px"}} id='multicast'>
        <h5>BroadCast and MultiCast</h5>

        <div className="email-sec box" >
                    <p style={{ color: "#2c83ec" }}>Q: Why am I receiving emails about WTB, RFQ, and WTS items?</p>
                    <p>A: Your default setting for Broadcast is active without any filters. You can modify this by going to My Profile/Options to adjust or disable the Broadcast function.</p>
                    <p style={{ color: "#2c83ec" }}>Q: When is it appropriate to use a Multicast?</p>
                    <p>A: Use a Multicast when you need to buy or sell multiple items from your list efficiently.</p>  
                     <p style={{ color: "#2c83ec" }}>Q: Is it necessary to include the manufacturer's name when sending a Multicast?</p>
                    <p> A: Yes, adding the manufacturer's name helps ensure your message is directed to the most relevant contact..</p>
                    
                </div>
    </div>

    </>
  )
}

export default MultiCast