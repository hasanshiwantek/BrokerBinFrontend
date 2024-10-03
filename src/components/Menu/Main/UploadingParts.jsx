import React from 'react'

const UploadingParts = () => {
    return (
        <>
            <div style={{ padding: "15px" }} id='uploading'>

                <h5>Uploading Parts</h5>

                <div className="email-sec box " style={{fontSize:"11px"}}>
                    <p style={{ color: "rgb(218, 63, 24)" }}>Q: How many parts can I list at one time?</p>
                    <p>A: As many as you have in stock. The Platinum service offers unlimited part listings. Our Standard service offers up to 100 items.
                    </p>
                    <p style={{ color: "rgb(218, 63, 24)" }}>Q: How do I upload my parts?</p>
                    <p>A: You can send us an inventory list in Excel or CSV to Upload@BrokerBin.com<br />
                        A: You can Upload, Edit, Add, and Delete inventory in the Manage Inventory section.
                        To Upload...<br />
                        1. Click Browse to find your file<br />
                        2. Click Send File, wait for it to display on the screen (it may take a minute)<br />
                        3. Click the Import Parts to Database button (it may take a minute to process) and total parts uploaded will <br />be displayed</p>

                    <p style={{ color: "rgb(218, 63, 24)" }}>Q: Why can't I add parts to the database?</p>
                    <p> A: Check your Access Level (go to My Profile/Options to view your access level). Speak with your company administrator and ask to have your access level increased.</p>
                    <p style={{ color: "rgb(218, 63, 24)" }}>
                        Q: Why do my item conditions not match what I uploaded?
                    </p>

                    <p> A: You need to use our site's condition codes (F/S, NOB, NEW, REF, USED, ASIS, EXC, REP)</p>

                    <p style={{ color: "rgb(218, 63, 24)" }}>Q: Why won't your system take my part list?</p>

                    <p> A: View Our Sample Inventory Files
                        - Use our approved column headings. Click on the drop down box and see if your headings will be accepted.
                        - Submit your spreadsheet for review. If our system can't detect your format you can submit it to our programming staff and they will integrate your format into our system. Submit spreadsheets to Upload@BrokerBin.com.</p>

                    <p style={{ color: "rgb(218, 63, 24)" }}>Q: Can different work groups manage their own inventory?</p>
                    <p> A: Yes, they can. Each rep must have Update Personal Inventory as their Access Level. Note: Company must maintain one Admin login.</p>
                    <p style={{ color: "rgb(218, 63, 24)" }}>Q: Can I add parts to our current list?</p>

                    <p> A: Yes, you can. Go to the Manage Inventory section, click Add, fill in the appropriate info, and click Save.</p>

                    <p style={{ color: "rgb(218, 63, 24)" }}>Q: Why are some of my line items not being displayed?</p>
                    <p>A: Our system will "munch" or group double listed line items together to appear as one line item on your list.</p>
                    <p style={{ color: "rgb(218, 63, 24)" }}>
                        Q: Can I add my own parts to the database?</p>
                    <p> A: Yes, you can. You must have Update Personal Inventory listed as your Access Level, which can be found in the My Profile/Options section. Add them manually, upload them on the site, or send your list to Upload@BrokerBin.com</p>

                </div>

            </div>
        </>
    )
}

export default UploadingParts