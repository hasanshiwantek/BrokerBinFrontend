import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import { companyList } from "../../../../data/tableData";
import { AiFillMail } from "react-icons/ai";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsGlobeAmericas } from "react-icons/bs";

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
          <a href="/venprice">Vendor Pricing</a>
          <a href="/venblock">block inventory</a>
        </div>
        <div className={css.vanBlock_p}>
          <p>Block Inventory From Vendors</p>
        </div>
        {/* <InventoryButtons /> */}
        <div className={css.vanBlock}>
          <div className={css.vanBlock_view}>
            <h1>Inventory Blocking</h1>
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
                    <a href="##">#</a>
                    <a href="#A">A</a>
                    <a href="#B">B</a>
                    <a href="#C">C</a>
                    <a href="#D">D</a>
                    <a href="#E">E</a>
                    <a href="#F">F</a>
                    <a href="#G">G</a>
                    <a href="#H">H</a>
                    <a href="#I">I</a>
                    <a href="#J">J</a>
                    <a href="#K">K</a>
                    <a href="#L">L</a>
                    <a href="#M">M</a>
                    <a href="#N">N</a>
                    <a href="#O">O</a>
                    <a href="#P">P</a>
                    <a href="#Q">Q</a>
                    <a href="#R">R</a>
                    <a href="#S">S</a>
                    <a href="#T">T</a>
                    <a href="#U">U</a>
                    <a href="#V">V</a>
                    <a href="#W">W</a>
                    <a href="#X">X</a>
                    <a href="#Y">Y</a>
                    <a href="#Z">Z</a>
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
