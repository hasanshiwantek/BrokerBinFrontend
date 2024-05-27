import React from "react";
import Header from "../../Header";
import myprofile from "../../../styles/Menu/Manage/MyProfile.module.css";
// import css from "../../../styles/Menu/Manage/Options.module.css"

const Options = () => {
  return (
    <>
      <div className={myprofile.profileLayout}>
        <div className={myprofile.profileBtn}>
          <p>my profile</p>
          <span>
            <button type="button">submit changes</button>
            <button type="button">view profile</button>
          </span>
        </div>
        <div className={myprofile.profileInfo}>
          <div className={myprofile.profileInfo_links}>
            <ul>
              <li>
                <a href="/myprofile">
                  <span>Personal Info</span>
                </a>
              </li>
              <li>
                <a href="/myprofile/Options">
                  <span>Options</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span>My Vendors</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span>My Contacts</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span>Broadcast Filters</span>
                </a>
              </li>
            </ul>
          </div>
          <div className={myprofile.profileInfo_form}>
            <div >
              <div>
                <span>options and filters</span>
                <button>options and filters</button>
              </div>
              <div>
                <span>Email Reports</span>
                <button>options and filters</button>
              </div>
            </div>

            <div className={myprofile.profileInfo_form_IMScreenNames}>
              <h1>IM Screen Names</h1>
              <div>
                <span>
                  <label htmlFor="firstName">skype</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="purchasing"
                  />
                </span>
                <span>
                  <label htmlFor="firstName">whatsapp</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="team one"
                  />
                </span>
                <span>
                  <label htmlFor="firstName">Trillian</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="team one"
                  />
                </span>
              </div>
            </div>
            <div className={myprofile.profileInfo_form_socialNetworking}>
              <h1>Social Networking</h1>
              <div>
                <span>
                  <label htmlFor="firstName">facebook</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="purchasing"
                  />
                </span>
                <span>
                  <label htmlFor="firstName">twitter</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="team one"
                  />
                </span>
                <span>
                  <label htmlFor="firstName">linked-in</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="team one"
                  />
                </span>
              </div>
            </div>
            <div className={myprofile.profileInfo_form_phone}>
              <h1>Phone</h1>
              <div>
                <span>
                  <label htmlFor="firstName">direct number</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="purchasing"
                  />
                </span>
                <span>
                  <label htmlFor="firstName">toll free</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="team one"
                  />
                </span>
                <span>
                  <label htmlFor="firstName">cellular</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="team one"
                  />
                </span>
                <span>
                  <label htmlFor="firstName">fax</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="team one"
                  />
                </span>
              </div>
            </div>
            <div className={myprofile.profileInfo_form_signature}>
              <h1>signature</h1>
              <div className={myprofile.profileInfo_form_signature_group}>
                <ul className={myprofile.profileInfo_form_signature_checkbox}>
                  <div>
                    <li>
                      <label htmlFor="sigcheck1">Name</label>
                      <input type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="sigcheck2">Position</label>
                      <input type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="sigcheck4">Phone</label>
                      <input type="checkbox" />
                    </li>
                  </div>
                  <div>
                    <li>
                      <label htmlFor="sigcheck7">Cell</label>
                      <input type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="sigcheck8">Email</label>
                      <input type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="sigcheck3">Company</label>
                      <input type="checkbox" />
                    </li>
                  </div>
                  <div>
                    <li>
                      <label htmlFor="sigcheck5">Toll</label>
                      <input type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="sigcheck6">Fax</label>
                      <input type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="sigcheck9">IM</label>
                      <input type="checkbox" />
                    </li>
                  </div>
                </ul>
              </div>
              <div
                className={myprofile.profileInfo_form_signature_checkbox_checkUncheck}
              >
                <button type="button">check all</button>
                <button type="button">uncheck all</button>
              </div>
            </div>
            <div className={myprofile.profileInfo_form_customSignature}>
              <h1>Custom Signature</h1>
              <div>
                <label htmlFor="CustomSignature">
                  Use Custom Signature
                  <input type="checkbox" name="" id="" />
                </label>
                <label htmlFor="Signature">
                  Signature
                  <textarea
                    name="Signature"
                    id="Signature"
                    cols="50"
                    rows="3"
                  ></textarea>
                </label>
              </div>
            </div>
            <h1>Update Your Password</h1>
            <div className={myprofile.profileInfo_form_updatePassword}>
              <div className={myprofile.profileInfo_form_updatePassword_left}>
                <div>
                  <label htmlFor="Current Password">Current Password</label>
                  <input type="text" />
                </div>
                <div>
                  <label htmlFor="New Password">New Password</label>
                  <input type="text" />
                </div>
                <div>
                  <label htmlFor="Confirm New Password">
                    Confirm New Password
                  </label>
                  <input type="text" />
                </div>
              </div>
              <div className={myprofile.profileInfo_form_updatePassword_right}>
                <h1>Password Requirements</h1>
                <strong>Your password must contain:</strong>
                <ul>
                  <li>* 1 uppercase letter</li>
                  <li>* 1 lowercase letter</li>
                  <li>* 1 digit</li>
                  <li>* 8 characters minimum</li>
                  <li>* 24 characters maximum</li>
                </ul>
                <strong>password can not contain:</strong>
                <ul>
                  <li>your login name</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Options;
