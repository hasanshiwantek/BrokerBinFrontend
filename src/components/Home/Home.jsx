import React, { useEffect, useRef, useState } from "react";
import css from "../../styles/Home/Home.module.css";
import person from "../../imgs/logo/shadow.png";
import spares from "../../imgs/logo/spares.png";
import { MdMail } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import ToggleStats from "./ToggleStats";
import HoverPieChart from "./HoverPieChart";
import Cookies from "js-cookie";
import LoadingState2 from "../../LoadingState2";

const Home = () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("user_id");
  const [user, setUser] = useState(null);
  const [blurWhileLoading, setBlurWhileLoading] = useState(false);

  // JSON.parse() to convert the string into a JavaScript object
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const id = localStorageUser.user.id || userId;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://brokerbinbackend.advertsedge.com/api/user/fetch/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.data);
        setUser(data.data);
        setBlurWhileLoading(true);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const bomFileRef = useRef(null);
  // <----------------------------------------------------- Access uploaded file name ------------------------------------------------------->
  const handleFileChange = (e) => {
    console.log(e.target.files[0].name);
  };
  const handleBOMButtonClick = (e) => {
    bomFileRef.current.click();
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {!blurWhileLoading ? (
        <LoadingState2 />
      ) : (
        <div className={css.gridHome}>
          <div className={css.gridHome1}>
            <div className={css.gridHome1_Bar}>
              <MdMail />
              <p>service directory</p>
              <BiDotsHorizontalRounded />
            </div>
            <div className={css.gridHome1_MemberDetail}>
              <div className={css.gridHome1_MemberDetail_profile}>
                <img
                  src={user?.profileImage ? user.profileImage : person}
                  alt="person"
                />
                <h3>
                  welcome back,
                  {user.firstName}
                </h3>
                <BiDotsHorizontalRounded />
              </div>
              <div className={css.gridHome1_MemberDetail_list}>
                <ul>
                  <li className={css.gridHome1_MemberDetail_list_options}>
                    <a href="#">MYH</a>
                    <ul>
                      <li className={css.gridHome1_MemberDetail_list_numbers}>
                        <a href="#">
                          {(11)
                            .toLocaleString("en-US")
                            .toString()
                            .padStart(2, "0")}
                          /
                        </a>
                        <a href="#">
                          {(25)
                            .toLocaleString("en-US")
                            .toString()
                            .padStart(2, "0")}
                          /
                        </a>
                        <a href="#">
                          {(7)
                            .toLocaleString("en-US")
                            .toString()
                            .padStart(2, "0")}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className={css.gridHome1_MemberDetail_list_options}>
                    <a href="#">RFQ</a>
                    <ul>
                      <li className={css.gridHome1_MemberDetail_list_numbers}>
                        <a href="#">
                          {(1)
                            .toLocaleString("en-US")
                            .toString()
                            .padStart(2, "0")}
                          /
                        </a>
                        <a href="#">
                          {(7)
                            .toLocaleString("en-US")
                            .toString()
                            .padStart(2, "0")}
                          /
                        </a>
                        <a href="#">
                          {(9)
                            .toLocaleString("en-US")
                            .toString()
                            .padStart(2, "0")}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className={css.gridHome1_MemberDetail_list_options}>
                    <a href="#">my contacts</a>
                    <ul>
                      <li className={css.gridHome1_MemberDetail_list_numbers}>
                        <a href="#">
                          {(51)
                            .toLocaleString("en-US")
                            .toString()
                            .padStart(2, "0")}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className={css.gridHome1_MemberDetail_list_options}>
                    <a href="#">my vendors</a>
                    <ul>
                      <li className={css.gridHome1_MemberDetail_list_numbers}>
                        <a href="#">
                          {(6)
                            .toLocaleString("en-US")
                            .toString()
                            .padStart(2, "0")}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className={css.gridHome1_MemberDetail_list_options}>
                    <a href="#">hot list</a>
                    <ul>
                      <li className={css.gridHome1_MemberDetail_list_numbers}>
                        <a href="#">
                          {(0)
                            .toLocaleString("en-US")
                            .toString()
                            .padStart(2, "0")}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className={css.gridHome1_MemberDetail_logo}>
                <img src={spares} alt="spares" />
              </div>
              <div className={css.gridHome1_MemberDetail_reviews}>
                <div className={css.gridHome1_MemberDetail_reviews_stars}>
                  <div>
                    <a href="#">
                      <BsStarFill style={{ color: "yellow" }} />
                    </a>
                    <a href="#">
                      <BsStarFill style={{ color: "yellow" }} />
                    </a>
                    <a href="#">
                      <BsStarFill style={{ color: "yellow" }} />
                    </a>
                    <a href="#">
                      <BsStarFill style={{ color: "yellow" }} />
                    </a>
                    <a href="#">
                      <BsStarFill style={{ color: "yellow" }} />
                    </a>
                  </div>
                  <a href="#">100%</a>
                </div>
                <div className={css.gridHome1_MemberDetail_reviews_watchList}>
                  <a href="#">
                    Watch List Companies{" "}
                    <span className={css.newW}>
                      ({(3).toLocaleString("en-US").toString().padStart(2, "0")}{" "}
                      New)
                    </span>
                  </a>
                </div>
                {/* </div> */}
                <div className={css.gridHome1_MemberDetail_comments}>
                  <a href="#">
                    Comments{" "}
                    <span>
                      {(1).toLocaleString("en-US").toString().padStart(2, "0")}
                    </span>
                  </a>
                  <a href="#" className={css.newW}>
                    New
                    <span>
                      {(0).toLocaleString("en-US").toString().padStart(2, "0")}
                    </span>
                  </a>
                  <a href="#">
                    Who's New:{" "}
                    <span>
                      {(43).toLocaleString("en-US").toString().padStart(2, "0")}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={css.gridHome2}>
            <div className={css.gridHome2_Bar}>
              <div>
                <MdMail />
                <p>manage</p>
                <BiDotsHorizontalRounded />
              </div>
              <div>
                <MdMail />
                <p>manage</p>
                <BiDotsHorizontalRounded />
              </div>
            </div>
            <div className={css.gridHome2_Details}>
              <div className={css.gridHome2_Details_Upper}>
                {/* <div className={css.gridHome2_Details_Upper_Ad}></div> */}
                <div className={css.gridHome2_Details_Upper_Right}>
                  <div className={css.gridHome2_Details_Upper_Right_PartSearch}>
                    <h1>Parts Search</h1>
                    <textarea
                      name="parts"
                      id="dashboard-searchbox"
                      cols="30"
                      rows="10"
                      placeholder="(List multiple search strings separated by returns for the same search category)"
                      style={{ height: "10rem" }}
                    ></textarea>
                    <div>
                      <button
                        type="button"
                        id={css.gridHome2_Details_Upper_Right_PartSearch_btn}
                      >
                        submit
                      </button>
                      <div>
                        <label>
                          part#
                          <input type="radio" name="clm" value="partclei" />
                        </label>
                        <label>
                          HECI / CLEI
                          <input type="radio" name="clm" value="partclei" />
                        </label>
                        <label>
                          keyword
                          <input type="radio" name="clm" value="partclei" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={css.gridHome2_Details_Upper_Right_Bom}>
                    <div>
                      <h3>BOM Utility</h3>
                      <p>(Bill of Materials)</p>
                    </div>
                    <div>
                      <input
                        type="file"
                        name="bomFile"
                        id="uploadBomFile"
                        hidden
                        ref={bomFileRef}
                        onChange={handleFileChange}
                      />
                      <button type="file" onClick={handleBOMButtonClick}>
                        LOAD BOM FILE
                      </button>
                      <a href="#">Load test file .xls</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={css.gridHome2_Details_Bottom}>
                <ToggleStats />
                <HoverPieChart />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
