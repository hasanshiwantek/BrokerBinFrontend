import React from 'react'

const Profile = () => {
  return (
    <>
    <div style={{ padding: "15px" }} id='profile'>

<h5>My Profile</h5>

<div className="email-sec box " style={{fontSize:"11px"}}>
    <p style={{ color: "#2c83ec" }}>Q: How can I stop receiving emails from within the site?</p>
    <p>A: Navigate to the My Profile/Options section and toggle the Receive Emails setting to "Off."
    </p>
    <p style={{ color: "#2c83ec" }}>Q: How can I stop receiving Broadcast emails?</p>
    <p>A: You can manage Broadcast emails by adjusting the settings in My Profile/Options to either filter out unwanted emails or completely turn off the Broadcast feature.</p> 
  

</div>

</div>
    </>
  )

}

export default Profile