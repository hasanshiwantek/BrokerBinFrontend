import React from "react";
import { useState,useEffect } from "react";
import { GrCircleInformation } from "react-icons/gr";
import { useDispatch } from "react-redux";
import {
  setPopupCompanyDetail,
  setTogglePopUp,
  setHoverCompanyDetail,
} from "../../ReduxStore/SearchProductSlice";
import css from "@/styles/SearchProducts.module.css";
import { FaUserPlus } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { addMyVendors, blockMyVendor } from "@/ReduxStore/ToolsSlice";
import Cookies from "js-cookie";
const CompanyListingTable = ({ entries }) => {
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const token = Cookies.get("token"); //

   

    const renderedCompanies = new Set(); // Track unique companies


  // const companyId = entries.filter(([key]) => key === "filters") // Extract company data from entries

  const handleHoverCompanyDetail = (company) => {
    dispatch(setHoverCompanyDetail(company)); // Dispatch company details to Redux store}
  };

  const handleShowPopupCompanyDetails = (company) => {
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  // ADD VENDOR LOGIC

  const addVendorHandler = async (id) => {
    try {
      const companyId = { company_id: id };
      const response = await dispatch(addMyVendors({ companyId, token }));

      const result = response.payload;

      if (response?.error) {
        console.error("Add vendor error:", result?.message);
        toast.error(result?.message || "Vendor already added.");
      } else {
        console.log("Vendor Added Successfully", result?.message);
        toast.success(result?.message || "Vendor added successfully.");
      }
    } catch (error) {
      console.error("Unexpected error adding vendor:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  //   BLOCK VENDOR LOGIC

  const [vendorStatus, setVendorStatus] = useState({});
  console.log("Vendor Status", vendorStatus);

  useEffect(() => {
    if (entries && entries.length > 0) {
      const initialStatus = {};

      entries
        .filter(([key]) => key !== "filters")
        .forEach(([partModel, details]) => {
          (details.data || []).forEach((vendor) => {
            const id = vendor.addedBy?.company?.id;
            const status = Number(vendor.status) ?? 0;
            if (id) {
              initialStatus[id] = status;
            }
          });
        });

      console.log("Initial Status", initialStatus);
      setVendorStatus(initialStatus);
    }
  }, [entries]);



  const blockVendorHandler = (companyId) => {
    const currentStatus = vendorStatus[companyId] ?? 1;
    console.log("Sending Status..", vendorStatus[companyId]);

    const newStatus = currentStatus === 1 ? 0 : 1;

    dispatch(blockMyVendor({ company_id: companyId, status: newStatus, token }))
      .unwrap()
      .then((result) => {
        console.log("Server Result:", result);

        if (result?.status === "success") {
          toast.success(result?.message || "Vendor status updated!");
          setVendorStatus((prev) => ({
            ...prev,
            [companyId]: newStatus,
          }));
        } else {
          toast.info(result?.message || "Failed to update vendor status.");
        }
      })
      .catch((error) => {
        console.error("Block error:", error);
        toast.error(
          error?.message || "Something went wrong. Please try again."
        );
      });
  };

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "12px", // Adjust font size
            width: "8rem",
            textAlign: "center",
            backgroundColor: "var(--primary-color)",
          },
          arrow: {
            color: "var(--primary-color)",
          },
        },
      },
    },
  });

  return (
    <>
      <div className={css.companyListingTable}>
        <div className="overflow-x-auto border-8 border-[#e8e8e8] rounded-md">
          <div className="bg-[#bfbfbf] p-2">
            <h1 className="text-white font-semibold p-1 text-[9pt]">
              Companies Listing Parts
            </h1>
          </div>
          <table className="max-w-full border cursor-pointer">
            <thead className="bg-[#44565b] text-white text-left">
              <tr>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Ctry</th>
                <th className="p-2 border">St</th>
                <th className="p-2 border">Hrs</th>
                <th className="p-2 border">Ship By</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Fax</th>
                <th className="p-2 border">Details</th>
                <th className="p-2 border">MyVen</th>
              </tr>
            </thead>
            <tbody className="">
            {entries.filter(([key]) => key !== "filters")
                            .flatMap(([partModel, details]) =>
                                (details.data || []).filter((row) => {
                                    const id = row.addedBy?.company?.id;
                                    if (!id || renderedCompanies.has(id)) return false;
                                    renderedCompanies.add(id);
                                    return true;
                                }).map((row, i) => (
                    <tr key={`${partModel}-${i}`} className="">
                      <td className="p-2 border">
                        <a
                          className="text-[8pt] font-semibold"
                          onClick={() =>
                            handleShowPopupCompanyDetails(row.addedBy?.company)
                          }
                          onMouseEnter={() =>
                            handleHoverCompanyDetail(row.addedBy?.company)
                          }
                        >
                          {row.addedBy?.company?.name}
                        </a>
                      </td>
                      <td className="p-1 border">
                        {row.addedBy?.company?.country}
                      </td>
                      <td className="p-1 border">
                        {row.addedBy?.company?.state}
                      </td>
                      <td className="p-1 border">
                        {row.addedBy?.company?.open_timing} -{" "}
                        {row.addedBy?.company?.close}{" "}
                      </td>
                      <td className="p-1 border">
                        {row.addedBy?.company?.shipping_deadline}
                      </td>
                      <td className="p-1 border">
                        {row.addedBy?.company?.phone_num}
                      </td>
                      <td className="p-1 border">
                        {row.addedBy?.company?.fax}
                      </td>
                      <td className="p-1 border">
                        <a
                          onClick={() =>
                            handleShowPopupCompanyDetails(row.addedBy?.company)
                          }
                          onMouseEnter={() =>
                            handleHoverCompanyDetail(row.addedBy?.company)
                          }
                        >
                          <GrCircleInformation />
                        </a>
                      </td>
                      <td className="p-1 border flex justify-around">
                        <ThemeProvider theme={theme}>
                          <Tooltip
                            title="Add to My vendors"
                            arrow
                            placement="top"
                          >
                            <span
                              onClick={() =>
                                addVendorHandler(row.addedBy?.company?.id)
                              }
                            >
                              <FaUserPlus size={15} />
                            </span>
                          </Tooltip>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                          <Tooltip
                            title="Block This Vendor"
                            arrow
                            placement="top"
                          >
                            <span
                              onClick={() =>
                                blockVendorHandler(row.addedBy?.company?.id)
                              }
                            >
                              <FaUserXmark size={15} />
                            </span>
                          </Tooltip>
                        </ThemeProvider>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default CompanyListingTable;
