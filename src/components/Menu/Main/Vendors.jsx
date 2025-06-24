import React from "react";
import "./SiteColors.css";
const Vendors = () => {
  return (
    <>
      <div style={{ padding: "15px" }} id="vendors">
        <h5>My Vendors</h5>

        <div
          className="email-sec box "
          id="vendors"
          
        >
          <p style={{ color: "#2c83ec" }}>
            Q: What is the MyVendors Page and how do I use it?
          </p>
          <p>
            A: The My Vendors page allows you to add vendors, edit their
            ratings, and note specific observations about them. Simply search
            for a vendor, use the MyVendor icon to select them, and manage your
            list through the My Profile/My Vendors section where you can also
            adjust display settings.
          </p>
          <p style={{ color: "#2c83ec" }}>
            Q: How do I add vendors to my list?
          </p>
          <p>
            A: To add vendors:
            <br />
            1: Navigate to My Profile/My Vendors.
            <br />
            2: Search for and select the vendors you wish to add.
            <br />
            3: Use the 'Add To MyVendors' button to include them in your list.
            <br />
          </p>
          <p style={{ color: "#2c83ec" }}>
            Q: What are the icons on the My Vendors page used for?
          </p>
          <p>
            A: Icons are tools for adding or removing companies from your My
            Vendors list. They simplify the management of your vendor
            interactions.
          </p>
          <p style={{ color: "#2c83ec" }}>
            Q: What is the "Lock" function for?
          </p>
          <p>
            {" "}
            A: The 'lock' function is designed for administrators to secure
            vendor information on the My Vendors or My Contacts pages, ensuring
            that only authorized edits can be made to the vendor details, notes,
            and ratings.
          </p>

          <div
            className="boxes"
            style={{ border: "1px solid black", marginTop: "5px" }}
          >
            <div className="box-sec">
              <div className="box1"></div>
              <div className="box2"></div>
              <div className="box3"></div>
            </div>

            <div className="box-content">
              <p style={{ color: "black" }}>
                {" "}
                - Show Items First, Receive Broadcasts From This Vendor.
              </p>
              <p style={{ color: "black" }}>
                - Watch Items, Do Not Receive Broadcasts From This Vendor.
              </p>
              <p style={{ color: "black" }}>
                - Never Show Items, Do Not Receive Broadcasts From This Vendor
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendors;
