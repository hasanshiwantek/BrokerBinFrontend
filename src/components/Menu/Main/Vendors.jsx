import React from 'react'
import "./SiteColors.css"
const Vendors = () => {
  return (
    <>
    <div style={{ padding: "15px" }}>

<h5>My Vendors</h5>

<div className="email-sec box " id='vendors' style={{fontSize:"11px"}}>
    <p style={{ color: "rgb(218, 63, 24)" }}>Q: What is the MyVendors Page and how do I use it?</p>
    <p> A: The MyVendors Page is where you can add vendors, edit ratings and add notes for specific vendors.<br/>
1. To add a vendor, simply search for the vendor and click on MyVendor icon with the appropriate watch level that is desired.<br/>
2. Once added you can go to you MyVendors page (My Profile/MyVendors) and add notes as well as adjust the display level.<br/>
    Or<br/>
1. Go to My Profile/MyVendors section<br/>
2. Search for companies you would like to add.<br/>
3. Select companies and click Add To MyVendors icon button.</p>
    <p style={{ color: "rgb(218, 63, 24)" }}>
    Q: What are the icons used for?</p>
    <p>A: The icons are used to add or remove companies to your MyVendors List.</p> 
      <p style={{ color: "rgb(218, 63, 24)" }}>
      Q: What is the "Lock" function for?</p>
    <p> A: The Lock function is a tool for administrators to use to "lock" a vendor or contact so that it appears all their users My Vendors or My Contacts page. The notes and rating are also "locked" so that only an administrator can edit them.</p>   


    <div className="boxes" style={{border:"1px solid black",marginTop:'5px' }}>
                    <div className="box-sec" >

                    <div className="box1"></div>
                    <div className="box2"></div>
                    <div className="box3"></div>
                    </div>

                    <div className="box-content">
                        <p  style={{color:"black"}}> - Show Items First, Receive Broadcasts From This Vendor.</p>
                        <p  style={{color:"black"}}>- Watch Items, Do Not Receive Broadcasts From This Vendor.</p>
                        <p  style={{color:"black"}}>- Never Show Items, Do Not Receive Broadcasts From This Vendor</p>


                    </div>

                </div>
</div>

</div>
    </>
  )
}

export default Vendors