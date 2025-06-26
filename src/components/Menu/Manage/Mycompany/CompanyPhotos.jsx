import React, { useEffect, useState } from "react";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import LoadingState from "../../../../LoadingState";
import { useDispatch, useSelector } from "react-redux";
import ErrorStatus from "../../../Error/ErrorStatus";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { submitCompanyPhotos } from "@/ReduxStore/ProfleSlice";
import { setBlurWhileLoading } from "@/ReduxStore/ProfleSlice";

const CompanyPhotos = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const [selectedFilesArray, setSelectedFilesArray] = useState([]);
  const [imageUrlsArray, setImageUrlsArray] = useState([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    // formData,
    blurWhileLoading,
    error,
  } = useSelector((state) => state.profileStore);

  const companyId = Number(Cookies.get("companyId"));
  console.log("Company ID", companyId);
  console.log("TOKEN", token);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFilesArray(files);
    console.log("📂 Selected Files:", files);
  };

  const handleAddImageUrl = () => {
    const trimmedUrl = imageUrlInput.trim();
    if (trimmedUrl) {
      setImageUrlsArray((prev) => [...prev, trimmedUrl]);
      setImageUrlInput("");
      console.log("🌐 Added Image URL:", trimmedUrl);
    } else {
      toast.warning("Please enter a valid image URL.");
    }
  };

  useEffect(() => {
    dispatch(setBlurWhileLoading(true));
  }, []);

  const handleUpload = async (e) => {
  e.preventDefault();

  const trimmedUrl = imageUrlInput.trim();
  let updatedImageUrls = [...imageUrlsArray];

  if (trimmedUrl) {
    updatedImageUrls.push(trimmedUrl);
    console.log("🌐 Auto-added typed URL before submit:", trimmedUrl);
  }

  if (selectedFilesArray.length === 0 && updatedImageUrls.length === 0) {
    toast.error("Please select at least one file or image URL.");
    return;
  }
    try {
      setLoading(true);
      console.log("🚀 Uploading:");
      console.log("📁 Files:", selectedFilesArray);
       console.log("🔗 URLs:", updatedImageUrls);

      const result = await dispatch(
        submitCompanyPhotos({
          token,
          id: companyId,
          files: selectedFilesArray,
          imageUrls: updatedImageUrls,
        })
      ).unwrap();

      if (result?.status) {
        toast.success(
          result?.image?.message || "Photos uploaded successfully!"
        );
        console.log("✅ Server Response:", result?.image);
        setSelectedFilesArray([]);
        setImageUrlsArray([]);
        setImageUrlInput("");
      }
    } catch (err) {
      console.error("❌ Upload failed:", err);
      toast.error(err?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //   if (error) {
  //     return (
  //       <>
  //         <ErrorStatus error={error} />
  //       </>
  //     );
  //   }

  return (
    <>
      {!blurWhileLoading && <LoadingState />}
      {blurWhileLoading && (
        <div className={`${css.profileLayout}  `}>
          <form onSubmit={handleUpload}>
            <div className={`${css.profileInfo} !min-w-[60vw]`}>
              <div className={css.profileInfo_links}>
                <ul>
                  <li>
                    <NavLink
                      to="/mycompany"
                      end
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Primary Contact</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/companyContacts"
                      end
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Company Contacts</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mycompany/CompanyInfo"
                      end
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Company Info</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mycompany/SalesInfo"
                      end
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Sales Info</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/mycompany/Photos"
                      end
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Photos</span>
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className={`${css.profileInfo_form}`}>
                <div className="mb-20  min-w-[54vw]">
                  <h2 className="text-md font-semibold mb-4">
                    Upload Your Company Photos
                  </h2>
                  <div className="mb-3 flex items-center justify">
                    <label htmlFor="image" className="block mb-1 w-32">
                      Upload
                    </label>
                    <input
                      type="file"
                      multiple
                      name="image"
                      id="image"
                      className="border p-1"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    <span className="italic">or</span>
                  </div>

                  <div className="mb-3 flex items-center justify">
                    <label htmlFor="imageUrl" className="block mb-1 w-32">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      className="border p-1"
                      accept="image/*"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-[7.5pt]  mb-4 max-w-[500px] text-center">
                      You can upload JPG, GIF or PNG files.
                      <br />
                      The file size limit is 2MB. If your upload does not work,
                      try uploading a smaller picture.
                      <br />
                      <span className="text-red-600 text-sm font-semibold">
                        *New upload will replace existing file.
                      </span>
                    </p>
                  </div>

                  <div className="flex items-start gap-2 mb-4 mt-10 w-96  justify-center mx-auto my-auto">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      onChange={""}
                    />
                    <label
                      htmlFor="terms"
                      className="!text-[8pt] text-gray-800"
                    >
                      I certify that I have the right to distribute these photos
                      and that they do not violate the{" "}
                      <strong className="!text-[.7vw] !text-gray-800">
                        Terms of Service
                      </strong>
                      .
                    </label>
                  </div>

                  <div className="flex items-center gap-3 mb-6 justify-center mx-auto my-auto">
                    <button
                      type="button"
                      className="bg-[#2c83ec] text-white rounded px-4 py-2 "
                    >
                      Upload Photos
                    </button>
                    <span className=" text-gray-500">or</span>
                    <button
                      type="button"
                      className="bg-[#2c83ec] text-white rounded px-4 py-2 "
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="italic text-sm text-center ">
                    Drag and Drop the photos on the right to reorder them. Click
                    the X to delete a photo.
                  </p>
                  <div className="mt-10 flex items-center  justify-center mx-auto my-auto">
                    {/* Preview Selected Files */}
                    {selectedFilesArray.length > 0 && (
                      <div className="mt-5">
                        <p className="text-sm font-semibold mb-2">
                          Selected Files:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {selectedFilesArray.map((file, i) => (
                            <li key={i}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6"
                  onClick={() => window.location.reload()}
                >
                  Reset
                </button>
                <button
                  className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6"
                  type="submit"
                >
                  Submit Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default CompanyPhotos;
