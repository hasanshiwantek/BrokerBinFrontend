import React from 'react'

const Searching = () => {
  return (
    <>
      <div style={{ padding: "15px" }} id='searching'>

        <h5>Searching</h5>

        <div className="email-sec box" style={{ fontSize: "11px" }}>
          <p style={{ color: "#2c83ec" }}>Q: Do you charge per Search</p>
          <p> A: No! The more searches and activity on the site the better BrokerCell becomes.</p>
          <div style={{ marginTop: "15px" }}>


            <p style={{ color: "#2c83ec" }}>Q:Can i enter more than one number</p>
            <p>A: Yes, you may enter up to 50 part numbers at a time. </p>
          </div>


          <div>
            <p style={{ color: "#2c83ec" }}>Q:How can i view parts in my area</p>
            <p>A: Navigate to My Profile/Options, select your region, country, or state, and the items available in your selected area will be displayed.
            </p>
            <div style={{ marginTop: "15px" }}>


              <p style={{ color: "#2c83ec" }}>Q: How do I perform a more detailed search?</p>
              <p>A: For a detailed search, go to Advanced Search and specify the necessary criteria. Alternatively, you can adjust the dropdowns under My Profile/Options next to Preferred Sorting to refine your search results.</p>




              <p style={{ color: "#2c83ec" }}>Q: Why can't I find contact information for companies listing parts?</p>
              <p>A: Hovering over the company's name will show their contact information at the upper right of your screen. For a more comprehensive company profile, click on the company name.</p>



            </div>
            <p style={{ color: "#2c83ec" }}>Q: How can I find other companies using your service?</p>
            <p>A: Visit the Advanced Search/Company Search section to locate other companies registered on our service.</p>
          </div>

        </div>
      </div>

    </>
  )
}

export default Searching