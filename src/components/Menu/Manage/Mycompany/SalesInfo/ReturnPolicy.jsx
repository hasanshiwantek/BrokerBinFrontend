import Cookies from "js-cookie";
import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import { useFormContext, useController } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyContact } from "@/ReduxStore/SearchProductSlice";
import { ToastContainer } from "react-toastify";

const ReturnPolicy = () => {
  const { control, setValue } = useFormContext();

  const {
    field: { value = "", onChange },
  } = useController({
    name: "returnPolicy",
    control,
  });

  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const companyId = Number(Cookies.get("companyId"));

  const { companyContactData } = useSelector(
    (state) => state.searchProductStore
  );
  const companyData = companyContactData?.data?.company;

  // Fetch company data
  useEffect(() => {
    dispatch(getCompanyContact({ token, id: companyId }));
  }, [dispatch, token, companyId]);

  // Set initial return_policy value
  useEffect(() => {
    if (companyData?.returnPolicy) {
      setValue("returnPolicy", companyData.returnPolicy);
    }
  }, [companyData, setValue]);

  const formats = ["bold", "italic", "underline", "link"];
  const modules = {
    toolbar: [["bold", "italic", "underline"], ["link", "clean"]],
    clipboard: { matchVisual: false },
  };

  return (
    <>
      <div className="min-w-[56vw]">
        <h2 className="text-md font-semibold mb-2">Return Policy Information</h2>
        <p className="text-xl text-[#444] font-semibold my-5">Description of Return Policy</p>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          className="bg-white"
          style={{ height: "10rem", width: "70rem", marginBottom: "5rem" }}
          modules={modules}
          formats={formats}
        />
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default ReturnPolicy;
