import React from "react";
import "./BroadcastTerm.css"

const FeedBack = () => {
  return (
    <>
      <div style={{ padding: "15px" }} id="feedback">
        <h5>Member Feedback System</h5>

        <div className="email-sec box ">
          <p style={{ color: "#2c83ec" }}>
            Q: How can I view feedback for my company?
          </p>
          <p>
            A: On the main page for members, look for the feedback section on
            the left side displaying comments about your company. Click on the
            stars beneath your company’s name to access a detailed feedback
            page. This star icon is also visible at the top of your company's
            profile page for quick reference.
          </p>
          <p style={{ color: "#2c83ec" }}>
            Q: How do I provide feedback on another company?
          </p>
          <p>
            {" "}
            A: In the search results, click the number below the star icon next
            to the company you want to review. This will direct you to that
            company's specific feedback page. To leave feedback, select the
            'Leave Feedback' option located at the bottom of your screen.
          </p>
          <p style={{ color: "#2c83ec" }}>
            Q: How is the star rating for my company calculated?
          </p>
          <p>
            A: Your company's star rating is based on the cumulative positive
            and negative feedback left by other members.
          </p>
        </div>
      </div>
    </>
  );
};

export default FeedBack;
