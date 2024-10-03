import React from 'react'

const Miscalleneous = () => {
  return (
    <>
    <div style={{padding:"15px"}} id='misc'>
        <h5>Miscallenous</h5>

        <div className="email-sec box">
            <p style={{color:"rgb(218, 63, 24)"}}>Q: Do you have a Match Your Hits section?</p>
            <p style={{fontSize:"11px"}}> A: Yes, it can be found on the Reports page.</p>
            <div style={{marginTop:"15px"}}>


            <p style={{color:"rgb(218, 63, 24)"}}>Q: When do parts get deleted?</p>
            <p style={{fontSize:"11px"}}>A: Inventory lists are deleted after 9 days.<br/>
            A: WTB, RFQ, and WTS items are deleted after 5 days.</p>
            </div>
            </div>
    </div>
    </>

  )
}

export default Miscalleneous