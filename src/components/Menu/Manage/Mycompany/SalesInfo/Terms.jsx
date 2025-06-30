import React, {useEffect, useState} from "react";
import css from "../../../../../styles/Menu/Manage/MyProfile.module.css";
import { useFormContext, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyContact } from "@/ReduxStore/SearchProductSlice";

// const Terms = ({ formData, setFormData }) => {
//   const regions = regionsList;

//   const handleChange = () => {
//     console.log("handleChange");
//   };

//   const options = [
//     "Credit Card",
//     "COD",
//     "Wire Transfer",
//     "Cash",
//     "Call",
//     "Net 5",
//     "Net 10",
//     "Net 30",
//     "PayPal",
//     "Other",
//   ];

//   return (
//     <>
//       <div className={``}>
//         <h1>Legal</h1>
//         <h1 className="ml-10">Warranty</h1>

//         <div className="flex ml-52 ">
//           <div className="flex flex-col justify-center   gap-4 flex-wrap ">
//             <div className="flex justify-start gap-4 items-center">
//               <label htmlFor="url" className="w-20">
//                 URL
//               </label>
//               <input type="text" />
//             </div>
//             <div className="flex justify-start gap-4 items-center">
//               <label htmlFor="pdf/Doc" className="w-20">
//                 PDF/DOC
//               </label>
//               <input type="file" />
//             </div>
//             <div className="flex justify-start gap-4 items-center">
//               <label htmlFor="warranty" className="w-20">
//                 Warranty
//               </label>
//               <input type="text" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="my-10">
//         <h1 className="ml-10">Banks and Trades</h1>

//         <div className="flex ml-52 ">
//           <div className="flex flex-col justify-center   gap-4 flex-wrap ">
//             <div className="flex justify-start gap-4 items-center">
//               <label htmlFor="url" className="w-20">
//                 URL
//               </label>
//               <input type="text" />
//             </div>
//             <div className="flex justify-start gap-4 items-center">
//               <label htmlFor="pdf/Doc" className="w-20">
//                 PDF/DOC
//               </label>
//               <input type="file" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="my-10">
//         <h1 className="ml-10">Selling Terms</h1>

//         <div className="flex ml-52 ">
//           <div className="flex flex-col justify-center   gap-4 flex-wrap ">
//             <div className="flex justify-start gap-4 items-center">
//               <label htmlFor="minimumOrder" className="w-20">
//                 Minimum Order
//               </label>
//               <input type="text" />
//             </div>
//             <div className="flex justify-start gap-4 items-center">
//               <label htmlFor="url" className="w-20">
//                 URL
//               </label>
//               <input type="text" />
//             </div>
//             <div className="flex justify-start gap-4 items-center">
//               <label htmlFor="pdf/Doc" className="w-20">
//                 PDF/DOC
//               </label>
//               <input type="file" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="my-10">
//         <h1 className="ml-10">Buying Terms</h1>

//         <div className="flex ml-52 ">
//           <div className="flex flex-col justify-center   gap-4 flex-wrap ">
//             <div className="flex justify-start gap-4 items-center">
//               <label htmlFor="url" className="w-20">
//                 URL
//               </label>
//               <input type="text" />
//             </div>
//             <div className="flex justify-start gap-4 items-center">
//               <label htmlFor="pdf/Doc" className="w-20">
//                 PDF/DOC
//               </label>
//               <input type="file" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <section>
//         <h1>Options</h1>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//           {options.map((option) => (
//             <label key={option} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 className="w-4 h-4"
//               />
//               <span>{option}</span>
//             </label>
//           ))}
//         </div>
//         {/* Other Input */}
//         <div className="mt-4">
//           <label className="mr-2">Other</label>
//           <input
//             type="text"
//             className="border border-gray-300 rounded px-2 py-1 ml-2"
//           />
//         </div>
//         <div className="text-sm text-blue-600 mt-2 underline cursor-pointer">
//           <button
//             type="button"
//             onClick={() => console.log("Check all / Uncheck all logic")}
//           >
//             Check All / Uncheck All
//           </button>
//         </div>
//       </section>
//     </>
//   );
// };

const Terms = ({setTermsFormData}) => {
  const { register, getValues, reset } = useFormContext();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const companyId = Number(Cookies.get("companyId"));

  const { companyContactData } = useSelector(
    (state) => state.searchProductStore
  );

  console.log("CompanyContactsData", companyContactData, "TOKEN" ,token);
  
  useEffect(() => {
      dispatch(getCompanyContact({ token, id: companyId }));
    }, [dispatch, token, companyId]);

  useEffect(() => {
    setTermsFormData(() => () => {
      const values = getValues();
      const formData = new FormData();
      formData.append("companyId", companyId); // if available
      formData.append("warrantyUrl", values.warrantyUrl);
      formData.append("warrantyText", values.warrantyText);
      if (values.warrantyPdf?.[0]) {
        formData.append("warrantyPdf", values.warrantyPdf[0]);
      }
      formData.append("bankTradeUrl", values.bankTradeUrl);
      if (values.bankTradePdf?.[0]) {
        formData.append("bankTradePdf", values.bankTradePdf[0]);
      }
      formData.append("sellingMinOrder", values.sellingMinOrder);
      formData.append("sellingUrl", values.sellingUrl)
      if (values.sellingPdf?.[0]) {
        formData.append("sellingPdf", values.sellingPdf[0]);
      }
      formData.append("buyingUrl", values.buyingUrl);
      if (values.buyingPdf?.[0]) {
        formData.append("buyingPdf", values.buyingPdf[0]);
      }
      // formData.append("paymentOptions", values.paymentOptions);
      if (Array.isArray(values.paymentOptions)) {
        values.paymentOptions.forEach((opt) =>
          formData.append("paymentOptions[]", opt)
        );
      }
      formData.append("optionsOther", values.optionsOther);
      return formData;
    });
  }, []);

useEffect(() => {
  if (!companyContactData?.data?.company?.legalInfo) return;

  const legal = companyContactData.data.company.legalInfo;

  reset({
    warrantyUrl: legal.warranty?.url || "",
    warrantyText: legal.warranty?.text || "",
    // skip file: cannot prefill file inputs
    bankTradeUrl: legal.bankTrade?.url || "",
    sellingMinOrder: legal.sellingTerms?.minOrder || "",
    sellingUrl: legal.sellingTerms?.url || "",
    buyingUrl: legal.buyingTerms?.url || "",
    paymentOptions: legal.paymentOptions || [],
    otherOptions: "", // backend doesn't send? leave empty or map if exists
  });
}, [companyContactData]);


  const options = [
    "Credit Card",
    "COD",
    "Wire Transfer",
    "Cash",
    "Call",
    "Net 5",
    "Net 10",
    "Net 30",
    "PayPal",
    "Other",
  ];

  return (
    <>
      <div>
        <h1>Legal</h1>
        <h1 className="ml-10">Warranty</h1>
        <div className="flex ml-52 flex-col gap-4">
          <div className="flex gap-4 items-center">
            <label className="w-20">URL</label>
            <input type="text" {...register("warrantyUrl")} />
          </div>
          <div className="flex gap-4 items-center">
            <label className="w-20">PDF/DOC</label>
            <input type="file" {...register("warrantyPdf")} />
          </div>
          <div className="flex gap-4 items-center">
            <label className="w-20">Warranty</label>
            <input type="text" {...register("warrantyText")} />
          </div>
        </div>
      </div>

      <div className="my-10">
        <h1 className="ml-10">Banks and Trades</h1>
        <div className="flex ml-52 flex-col gap-4">
          <div className="flex gap-4 items-center">
            <label className="w-20">URL</label>
            <input type="text" {...register("bankTradeUrl")} />
          </div>
          <div className="flex gap-4 items-center">
            <label className="w-20">PDF/DOC</label>
            <input type="file" {...register("bankTradePdf")} />
          </div>
        </div>
      </div>

      <div className="my-10">
        <h1 className="ml-10">Selling Terms</h1>
        <div className="flex ml-52 flex-col gap-4">
          <div className="flex gap-4 items-center">
            <label className="w-20">Minimum Order</label>
            <input type="text" {...register("sellingMinOrder")} />
          </div>
          <div className="flex gap-4 items-center">
            <label className="w-20">URL</label>
            <input type="text" {...register("sellingUrl")} />
          </div>
          <div className="flex gap-4 items-center">
            <label className="w-20">PDF/DOC</label>
            <input type="file" {...register("sellingPdf")} />
          </div>
        </div>
      </div>

      <div className="my-10">
        <h1 className="ml-10">Buying Terms</h1>
        <div className="flex ml-52 flex-col gap-4">
          <div className="flex gap-4 items-center">
            <label className="w-20">URL</label>
            <input type="text" {...register("buyingUrl")} />
          </div>
          <div className="flex gap-4 items-center">
            <label className="w-20">PDF/DOC</label>
            <input type="file" {...register("buyingPdf")} />
          </div>
        </div>
      </div>
      <div className="ml-10">
      <section>
        <h1>Options</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                value={option}
                {...register("paymentOptions")}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <div className="mt-4">
          <label className="mr-2">Other</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1 ml-2"
            {...register("optionsOther")}
          />
        </div>
      </section>
      </div>
    </>
  );
};

export default Terms;