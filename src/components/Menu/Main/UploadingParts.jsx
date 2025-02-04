import React from 'react'

const UploadingParts = () => {
    return (
        <>
            <div style={{ padding: "15px" }} id='uploading'>

                <h5>Uploading Parts</h5>

                <div className="email-sec box " style={{ fontSize: "11px" }}>
                    <p style={{ color: "#2c83ec" }}>Q: How many parts can I upload at once?</p>
                    <p>A: You can list as many parts as you have available. Our Platinum service allows for unlimited listings, while our Standard service allows up to 100 items.
                    </p>
                    <p style={{ color: "#2c83ec" }}>Q: How do I upload my parts?</p>
                    <p>A: For uploading, you can use an inventory list in Excel or CSV format. Follow these steps in the Manage Inventory section:<br />
                        A: You can Upload, Edit, Add, and Delete inventory in the Manage Inventory section.
                        1.To Upload, navigate to the appropriate section.<br />
                        2. Click 'Browse' to find your file and then 'Send File' to display it on the screen.<br />
                        3. Click 'Import Parts to Database' to start the upload, which might take a moment to complete. You will see a tally of the total parts uploaded.</p>

                    <p style={{ color: "#2c83ec" }}>Q: Why can't I add parts to the database?</p>
                    <p>A: Ensure you have sufficient access levels by going to My Profile/Options. If necessary, contact your administrator to increase your access.</p>
                    <p style={{ color: "#2c83ec" }}>
                        Q: Why do my item conditions not match what I uploaded?
                    </p>

                    <p>A: Our site utilizes specific condition codes. If there’s a mismatch, ensure your entries correspond to the site’s standards like F/S, NOB, NEW, REF, USED, ASIS, EX, or REP.</p>

                    <p style={{ color: "#2c83ec" }}>Q: Why won't your system take my part list?</p>

                    <p> A: First, check our Sample Inventory Files for acceptable column formats. If your file differs, adjust your headers accordingly and resubmit. If issues persist, our team can assist in integrating your format into our system.
                    </p>

                    <p style={{ color: "#2c83ec" }}>Q: How can different workgroups manage their inventory?</p>
                    <p>A: Each workgroup must update their inventory individually but must maintain a unified administrative oversight.</p>
                    <p style={{ color: "#2c83ec" }}>Q: Can I add parts to our current list?</p>

                    <p>A: Yes. Navigate to the Manage Inventory section, select Add, input the details, and save your updates.</p>

                    <p style={{ color: "#2c83ec" }}>Q:Why are some of my line items not showing up correctly?</p>
                    <p>A: Our system consolidates or 'munches' similar items to streamline displays and searches.</p>
                    <p style={{ color: "#2c83ec" }}>
                    Q: Can I manually add parts to the database?</p>
                    <p> A: Absolutely, you can manually add items if you have the necessary permissions in your profile settings, or you can upload them through the Manage Inventory section.</p>

                </div>

            </div>
        </>
    )
}

export default UploadingParts