import React from 'react'

const Contact = () => {
  return (
    <>
    <div style={{ padding: "15px" }} id='contacts'>

<h5>My Contacts</h5>

<div className="email-sec box " >
    <p style={{ color: "rgb(218, 63, 24)" }}>Q: What is the My Contacts Page and how do I use it?</p>
    <p> A: The My Contacts Page is where you can add contacts, edit ratings and add notes for specific contacts.<br/>
1. To add a contact you can use the "Quick Add" (found on My Profile/My Contacts) which will auto populate results as you type or if you are unsure of the full contact name you can use the "Contact Search" to search through the results.<br/>
2. Once added you can go to you My Contacts page (My Profile/My Contacts) and add notes as well as adjust the rating level.</p>
    <p style={{ color: "rgb(218, 63, 24)" }}>
    Q: What are the icons used for?</p>
    <p>A: The icons are used to add or remove contacts to your My Contacts List.</p> 

      <p style={{ color: "rgb(218, 63, 24)" }}>
Q: What is the "Lock" function for?</p>
    <p> A: The Lock function is a tool for administrators to use to "lock" a vendor or contact so that it appears all their users My Vendors or My Contacts page. The notes and rating are also "locked" so that only an administrator can edit them.</p>   

</div>

</div>
    </>
  )
}

export default Contact