import React from "react";

const Email = () => {
  return (
    <>
      <div style={{ padding: "15px" }} id="email">
        <h5>Email</h5>

        <div className="email-sec box">
          <p style={{ color: "#2c83ec" ,fontSize: "8pt" }}>
            Why am I no longer receiving emails from BrokerCell.com?
          </p>
          <p style={{ fontSize: "8pt" }}>
            A: It's possible that your firewall or internet service provider is
            filtering out our emails due to the volume we send. Please consult
            your network administrator, spam filter settings, or ISP to ensure
            that emails from BrokerCell.com are permitted (whitelisted).
          </p>
          <div style={{ marginTop: "15px" }}>
            <p style={{ color: "#2c83ec" ,fontSize: "8pt"   }}>
              Q: How can I toggle my email preferences on BrokerCell.com?
            </p>
            <p style={{ fontSize: "8pt" }}>
              A: Once logged into BrokerCell.com, navigate to Manage/ My
              Profile/Options. Here, you will find options to adjust all your
              email and broadcast settings. For further assistance, please don't
              hesitate to reach out to your BrokerCell Account Manager.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Email;
