import React, { useEffect, useState } from "react";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import css from "../../../styles/Menu/Tools/MyVendors.module.css";
import { companyList } from "../../../data/tableData";
import { AiFillMail } from "react-icons/ai";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsGlobeAmericas } from "react-icons/bs";
import { Link } from "react-router-dom";
import SearchCompany from "../Main/SearchCompany";
import SearchMyVendor from "./SearchMyVendor";

const VenBlock = () => {
  let [viewAsCompany, setViewAsCompany] = useState(true);
  let [viewAsShow, setViewAsShow] = useState(false);
  let [viewAsCountry, setViewAsCountry] = useState(false);
  let [viewAsState, setViewAsState] = useState(false);
  const handleChange = (e) => {
    if (e.target.value === "company") {
      setViewAsCompany(true);
      setViewAsShow(false);
      setViewAsCountry(false);
      setViewAsState(false);
    } else if (e.target.value === "show") {
      setViewAsCompany(false);
      setViewAsShow(true);
      setViewAsCountry(false);
      setViewAsState(false);
    } else if (e.target.value === "country") {
      setViewAsCompany(false);
      setViewAsShow(false);
      setViewAsCountry(true);
      setViewAsState(false);
    } else if (e.target.value === "state") {
      setViewAsCompany(false);
      setViewAsShow(false);
      setViewAsCountry(false);
      setViewAsState(true);
    }
  };

  return (
    <>
      <div className={css.inventory}>
        <div className={css.vanBlock_vanLink}>
          <div className={myProfile.profileInfo_links}>
            <ul>
              <li>
                <Link to={"/myprofile"}>
                  <span>Personal Info</span>
                </Link>
              </li>
              <li>
                <Link to={"/myprofile/Options"}>
                  <span>Options</span>
                </Link>
              </li>
              <li>
                <Link to={"/myprofile/MyVendors"}>
                  <span>My Vendors</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span>My Contacts</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span>Broadcast Filters</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={css.vanBlock_p}>
          <p>Block Inventory From Vendors</p>
        </div>
        {/* <InventoryButtons /> */}
        <div className={css.vanBlock}>
          <div className={css.vanBlock_view}>
            <div className={css.searchVendor}>
              <div className={css.searchVendor_search}>
                <SearchMyVendor />
              </div>
            </div>
            <div>
              <p>view by</p>
              <select onChange={handleChange}>
                <option value="company">Company</option>
                <option value="show">Display</option>
                <option value="country">Country</option>
                <option value="state">State</option>
              </select>
            </div>
          </div>
          <div className={css.vanBlockList}>
            {viewAsCompany && (
              <>
                <div className={css.vanBlockList_link}>
                  <div>
                    <Link to={"##"}>#</Link>
                    <Link to={"#A"}>A</Link>
                    <Link to={"#B"}>B</Link>
                    <Link to={"#C"}>C</Link>
                    <Link to={"#D"}>D</Link>
                    <Link to={"#E"}>E</Link>
                    <Link to={"#F"}>F</Link>
                    <Link to={"#G"}>G</Link>
                    <Link to={"#H"}>H</Link>
                    <Link to={"#I"}>I</Link>
                    <Link to={"#J"}>J</Link>
                    <Link to={"#K"}>K</Link>
                    <Link to={"#L"}>L</Link>
                    <Link to={"#M"}>M</Link>
                    <Link to={"#N"}>N</Link>
                    <Link to={"#O"}>O</Link>
                    <Link to={"#P"}>P</Link>
                    <Link to={"#Q"}>Q</Link>
                    <Link to={"#R"}>R</Link>
                    <Link to={"#S"}>S</Link>
                    <Link to={"#T"}>T</Link>
                    <Link to={"#U"}>U</Link>
                    <Link to={"#V"}>V</Link>
                    <Link to={"#W"}>W</Link>
                    <Link to={"#X"}>X</Link>
                    <Link to={"#Y"}>Y</Link>
                    <Link to={"#Z"}>Z</Link>
                  </div>
                </div>
                <div className={css.vanBlockList_company}>
                  {companyList.map((group, index) => {
                    const companyName = Object.keys(group)[0]; // Get the company group name (e.g., 'Company A')
                    const companies = group[companyName]; // Get the array of companies in this group
                    return (
                      <div
                        key={index}
                        className={css.vanBlockList_company_name}
                      >
                        <a name={companyName.split(" ")[1]}>
                          <h2>
                            {companyName.split(" ")[0]}:{" "}
                            {companyName.split(" ")[1]}
                          </h2>
                        </a>
                        <div className={css.vanBlockList_company_name_list}>
                          {companies.map((company, index) => {
                            return (
                              <div
                                key={company.name}
                                className={
                                  css.vanBlockList_company_name_list_specified
                                }
                              >
                                <div
                                  className={
                                    css.vanBlockList_company_name_list_specified_main
                                  }
                                >
                                  <div
                                    className={
                                      css.vanBlockList_company_name_list_specified_img
                                    }
                                  >
                                    <img src={company.img} alt="company logo" />
                                    <span>
                                      <AiFillMail />
                                      <p>{company.name}</p>
                                      <BsGlobeAmericas />
                                    </span>
                                  </div>
                                  <div
                                    className={
                                      css.vanBlockList_company_name_list_specified_desc
                                    }
                                  >
                                    <div>
                                      <div>
                                        <strong>{company.name}</strong>
                                        <p>{company.address}</p>
                                      </div>
                                      {/* <span> */}
                                      <p>
                                        <strong>phone: </strong>
                                        {company.phone}
                                      </p>
                                      {/* </span> */}
                                    </div>
                                    <p>{company.description}</p>
                                  </div>
                                </div>
                                <div
                                  className={
                                    css.vanBlockList_company_name_list_specified_feedback
                                  }
                                >
                                  <img
                                    src={company.feedbackImg}
                                    alt="feedback"
                                  />
                                  <span>
                                    <p>{company.ratingCount[0]}%</p>
                                    <p>({company.ratingCount[1]})</p>
                                  </span>
                                  <p>{company.ratingMember}</p>
                                </div>
                                <div
                                  className={
                                    css.vanBlockList_company_name_list_specified_add
                                  }
                                >
                                  <MdPersonAddAlt1 />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {viewAsShow && (
              <div className={css.vanBlockList_company_display}>
                <h1>Display: Normal</h1>
                {companyList.map((group, index) => {
                  const companyName = Object.keys(group)[0]; // Get the company group name (e.g., 'Company A')
                  const companies = group[companyName]; // Get the array of companies in this group
                  return (
                    <div key={index} className={css.vanBlockList_company_name}>
                      <div className={css.vanBlockList_company_name_list}>
                        {companies.map((company, index) => {
                          return (
                            <div
                              key={company.name}
                              className={
                                css.vanBlockList_company_name_list_specified
                              }
                            >
                              <div
                                className={
                                  css.vanBlockList_company_name_list_specified_main
                                }
                              >
                                <div
                                  className={
                                    css.vanBlockList_company_name_list_specified_img
                                  }
                                >
                                  <img src={company.img} alt="company logo" />
                                  <span>
                                    <AiFillMail />
                                    <p>{company.name}</p>
                                    <BsGlobeAmericas />
                                  </span>
                                </div>
                                <div
                                  className={
                                    css.vanBlockList_company_name_list_specified_desc
                                  }
                                >
                                  <div>
                                    <div>
                                      <strong>{company.name}</strong>
                                      <p>{company.address}</p>
                                    </div>
                                    <p>
                                      <strong>phone: </strong>
                                      {company.phone}
                                    </p>
                                  </div>
                                  <p>{company.description}</p>
                                </div>
                              </div>
                              <div
                                className={
                                  css.vanBlockList_company_name_list_specified_feedback
                                }
                              >
                                <img src={company.feedbackImg} alt="feedback" />
                                <span>
                                  <p>{company.ratingCount[0]}%</p>
                                  <p>({company.ratingCount[1]})</p>
                                </span>
                                <p>{company.ratingMember}</p>
                              </div>
                              <div
                                className={
                                  css.vanBlockList_company_name_list_specified_add
                                }
                              >
                                <MdPersonAddAlt1 />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VenBlock;
