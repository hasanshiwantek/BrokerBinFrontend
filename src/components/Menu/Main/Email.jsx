import React from 'react'

const Email = () => {
  return (
    <>
      <div style={{ padding: "15px" }} id='email'>
        <h5>Email</h5>

        <div className="email-sec box">
          <p style={{ color: "rgb(218, 63, 24)" }}>Q: Why am I no longer receiving emails from BrokerBin.com?</p>
          <p style={{width: "36vw" ,fontSize:"11px"}}> A: Your firewall or ISP may be blocking emails from us due to the large number of emails we send. Check with your network administrator, spam blocker, or ISP and request that emails from BrokerBin.com be white-listed.</p>
          <div style={{ marginTop: "15px" }}>


            <p style={{ color: "rgb(218, 63, 24)" }}>Q:How do I turn my emails on/off from BrokerBin.com?</p>
            <p  style={{width: "36vw" ,fontSize:"11px"}}> A: When logged into BrokerBin.com click on Manage/ My Profile/Options. From this page you can manage all of your emails and Broadcasts. You can always contact your BrokerBin Account Manager for additional help.</p>
          </div>




        </div>



      </div>
    </>
  )
}

export default Email