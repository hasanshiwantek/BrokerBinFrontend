import React from 'react'

const Profile = () => {
  return (
    <>
    <div style={{ padding: "15px" }} id='profile'>

<h5>My Profile</h5>

<div className="email-sec box " style={{fontSize:"11px"}}>
    <p style={{ color: "rgb(218, 63, 24)" }}>Q: How can I stop receiving Inter-site emails?</p>
    <p>A: Go to My Profile/Options section and set the Receive Emails option to "Off."</p>
    <p style={{ color: "rgb(218, 63, 24)" }}>Q: How can I stop receiving Broadcast emails?</p>
    <p>A: Go to My Profile/Options to filter or turn "Off" the Broadcast.</p> 
  

</div>

</div>
    </>
  )

}

export default Profile