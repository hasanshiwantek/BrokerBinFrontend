import React from "react";

const UploadInventoryContent = () => {
  return (
    <div className="w-full px- py-2 max-w-[80rem] mx-auto my-auto text-sm">
      <table className="w-full table-auto">
        <tbody>
          <tr>
            <td>
              {/* 🚩 Guidelines Section */}
              <table className="w-full mb-6">
                <tbody>
                  {[
                    "All inventory listed on BrokerBin should be shipped within 24-48 business hours or otherwise noted with a specific lead time (not to exceed 14 days) in the description field. Example: Lead Time 14 days.",
                    "The description field must be used for the description of the product you are listing, not for marketing or 'call for pricing'.",
                    "The listing company must be authorized to represent the inventory being posted. BrokerBin may ask for supplier details.",
                    "Know & vet your suppliers.",
                    "Quantity & price information must be accurate and honored.",
                  ].map((text, idx) => (
                    <tr key={idx}>
                      <div className="my-2">
                        <td className="align-top w-6">
                          <img
                            src="https://static.brokerbin.com/version/v8.3.3/images/arrow.jpg"
                            alt=""
                          />
                        </td>
                        <td className="text-[9pt] text-[#444] font-semibold ">
                          {text}
                        </td>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="text-[9pt] text-[#444] font-semibold   mb-3">
                Having problems uploading your inventory? Try the following...
              </p>

              {/* 🚩 Upload Tips Table */}
              <table className="w-full mb-6">
                <tbody>
                  <tr>
                    <td className="align-top w-6">
                      <img
                        src="https://static.brokerbin.com/version/v8.3.3/images/arrow.jpg"
                        alt=""
                      />
                    </td>
                    <td className="text-[9pt] text-[#444] font-semibold   ">
                      Try our approved column headings. Telecom vendors can now
                      upload lists with HECI / CLEI codes.
                    </td>
                  </tr>
                  <tr>
                    <td className="align-top w-6">
                      <img
                        src="https://static.brokerbin.com/version/v8.3.3/images/arrow.jpg"
                        alt=""
                      />
                    </td>
                    <td className="text-[9pt] text-[#444] font-semibold  ">
                      Any lead time MUST be stated in the description field and
                      MUST not exceed two weeks.
                    </td>
                  </tr>
                  <tr >
                    <td colSpan={2}>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-xs text-left my-10">
                          <thead>
                            <tr>
                              {[
                                [
                                  "part number",
                                  "item",
                                  "item#",
                                  "item_#",
                                  "itemnumber",
                                  "item number",
                                  "manufacturer_part_number",
                                ],
                                [
                                  "manufacturer",
                                  "mfg",
                                  "manufacture",
                                  "manf.#",
                                  "manuf",
                                  "mftr",
                                  "mfr",
                                ],
                                [
                                  "condition",
                                  "cond",
                                  "new or used",
                                  "status",
                                  "N/U/R",
                                ],
                                ["price", "$", "cost", "us$", "sellprice"],
                                ["quantity", "amount", "qty", "available"],
                                [
                                  "description",
                                  "desc",
                                  "sku",
                                  "item description",
                                ],
                              ].map((options, idx) => (
                                <td key={idx} className="border p-2">
                                  <select className="w-full border rounded p-1">
                                    {options.map((opt, i) => (
                                      <option key={i}>{opt}</option>
                                    ))}
                                  </select>
                                </td>
                              ))}
                            </tr>
                          </thead>

                          <tbody>
                            {[
                              [
                                "176496-B22",
                                "COMPAQ",
                                "NOB",
                                "450",
                                "23",
                                "36.4 GB HD U3",
                              ],
                              [
                                "176496-B22",
                                "COMPAQ",
                                "NEW",
                                "495.95",
                                "11",
                                "36.4 GB HD U3",
                              ],
                            ].map((row, idx) => (
                              <tr key={idx} className="">
                                {row.map((cell, i) => (
                                  <td
                                    key={i}
                                    className="border p-2 font-medium text-[8pt]"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}

                            <tr>
                              <td
                                colSpan={6}
                                className="text-center border p-2 font-semibold text-[9pt]"
                              >
                                Column order will not affect auto detection.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="align-top w-6">
                      <img
                        src="https://static.brokerbin.com/version/v8.3.3/images/arrow.jpg"
                        alt=""
                      />
                    </td>
                    <td className="text-[9pt] text-[#444] font-semibold ">
                      Try our approved conditions. Use the dropdowns to match
                      condition codes.
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={2}>
                      <div className="overflow-auto">
                        <table className="w-full border text-xs text-left my-4">
                          <tbody>
                            <tr>
                              {[
                                "F/S",
                                "NOB",
                                "NEW",
                                "REF",
                                "OEMREF",
                                "USED",
                                "ASIS",
                                "EXC",
                              ].map((label, i) => (
                                <td key={i} className="p-2 border">
                                  <select className="w-full border p-1 rounded">
                                    <option>{label}</option>
                                  </select>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="align-top w-6">
                      <img
                        src="https://static.brokerbin.com/version/v8.3.3/images/arrow.jpg"
                        alt=""
                      />
                    </td>
                    <td className="text-[9pt] text-[#444] font-semibold ">Condition Definitions</td>
                  </tr>

                  <tr>
                    <td colSpan={2}>
                      <ul className="list-disc pl-5 text-sm leading-7 mt-2">
                        <li className="text-[9pt] text-[#444] font-medium ">
                          <span>F/S</span>: Factory sealed, unused, with
                          manufacturer warranty.
                        </li>
                        <li  className="text-[9pt] text-[#444] font-medium ">
                          <span>NOB</span>: New, seal broken, with warranty.
                        </li>
                        <li className="text-[9pt] text-[#444] font-medium ">
                          <span>NEW</span>: Unused, may be bulk/pull, with
                          warranty.
                        </li>
                        <li className="text-[9pt] text-[#444] font-medium ">
                          <span>OEMREF</span>: Refurbished by OEM, sealed
                          and warranted.
                        </li>
                        <li className="text-[9pt] text-[#444] font-medium ">
                          <span>REF</span>: Refurbished by vendor, may have
                          vendor warranty.
                        </li>
                        <li className="text-[9pt] text-[#444] font-medium ">
                          <span>USED</span>: Tested, no warranty, not
                          refurbished.
                        </li>
                        <li className="text-[9pt] text-[#444] font-medium ">
                          <span>ASIS</span>: Unknown condition, no warranty.
                        </li>
                        <li className="text-[9pt] text-[#444] font-medium ">
                          <span>EXC</span>: Exchangeable or returnable core.
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UploadInventoryContent;
