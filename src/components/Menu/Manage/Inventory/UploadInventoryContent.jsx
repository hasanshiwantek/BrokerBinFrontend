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
                  <tr>
                    <td colSpan={2}>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300  text-left my-10">
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
                                  "manufacturer part number",
                                  "manufactuer's part number",
                                  "manufacturer_part_#",
                                  "mfg part#",
                                  "mfg. part #",
                                  "mfg. part#",
                                  "model",
                                  "model#",
                                  "model_#",
                                  "module number",
                                  "module_number",
                                  "parts",
                                  "part no",
                                  "part",
                                  "part#",
                                  "partnumber",
                                  "part_number",
                                  "part_no",
                                  "part_#",
                                  "part / model",
                                  "p/n",
                                  "mfg p/n",
                                  "item_code",
                                  "item id",
                                  "part no.",
                                  "mfg part #",
                                  "part #",
                                  "part.",
                                  "pn",
                                  "model/part #",
                                  "oem part #",
                                  "mfg part no.",
                                  "mfg. part #",
                                  "modelnr",
                                  "part / model #",
                                  "fru#",
                                  "model .",
                                  "model.",
                                  "manuf_part",
                                  "OEM part #",
                                ],

                                [
                                  "manufacturer",
                                  "mfg",
                                  "manufacture",
                                  "manf.#",
                                  "manf#",
                                  "mfgr",
                                  "mfg.",
                                  "make",
                                  "part oem",
                                  "manuf",
                                  "mftr",
                                  "mft",
                                  "mfr",
                                ],
                                [
                                  "condition",
                                  "con",
                                  "cond",
                                  "new or used",
                                  "cond.",
                                  "status",
                                  "conditioncode",
                                  "N/U/R",
                                ],
                                [
                                  "price",
                                  "$",
                                  "cost",
                                  "us$",
                                  "sellprice",
                                  "to sell",
                                  "ConsumerPrice",
                                  "price ea",
                                  "price6",
                                ],
                                [
                                  "quantity",
                                  "amt",
                                  "amount",
                                  "avail",
                                  "available",
                                  "qty",
                                  "qty on hand",
                                  "qty.",
                                  "qty's",
                                  "qtyavailable",
                                  "fg",
                                  "quanity",
                                  "eti stock",
                                  "stock",
                                  "instock",
                                  "quantit",
                                  "q",
                                  "quan",
                                  "qty available",
                                ],
                                [
                                  "description",
                                  "descriptio",
                                  "desc",
                                  "desc/",
                                  "Description",
                                  "sku",
                                  "descriptn",
                                  "item description",
                                  "descr",
                                  "part description",
                                  "Product Description",
                                  "product description",
                                  "descrip",
                                ],
                                [
                                  "heci/clei",
                                  "Heci/Clei",
                                  "heci/Clei",
                                  "Heci/clei",
                                  "HECI/CLEI",
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
                                "176496B21",
                              ],
                              [
                                "176496-B22",
                                "COMPAQ",
                                "NEW",
                                "495.95",
                                "11",
                                "36.4 GB HD U3",
                                "176496-B22",
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
                                [
                                  "F/S",
                                  "FACTORY SEALED",
                                  "FACTORY_SEALED",
                                  "FAC SEALED",
                                  "FAC_SEALED",
                                  "FAC SEAL",
                                  "FAC_SEAL",
                                  "FS",
                                  "F_S",
                                  "F S",
                                  "FACT SEALED",
                                  "FACT. SEALED",
                                  "RETAIL",
                                ],

                                [
                                  "NOB",
                                  "NEW OPEN BOX",
                                  "NEW OPEN",
                                  "NEW_OPEN_BOX",
                                  "NEW_OPEN",
                                  "N O B",
                                  "N/O",
                                  "OB",
                                  "NEW- OPEN BOX",
                                ],

                                ["NEW", "UNUSED", "NEW PULL", "NEW BULK", "N"],

                                ["NEW", "UNUSED", "NEW PULL", "NEW BULK", "N"],

                                [
                                  "REF",
                                  "REFURBURISHED",
                                  "REFURB",
                                  "REFURB.",
                                  "FACTORY REFURBISHED",
                                  "FACTORY_REFURBISHED",
                                  "FACTORY REFURB",
                                  "FACTORY_REFURB",
                                  "RFB",
                                  "REFURBED",
                                  "RECERTIFIED",
                                  "MFR RECERT",
                                  "REFURBS",
                                  "GRADE A",
                                  "GRADE B",
                                  "GRADE C",
                                  "GRADE D",
                                  "GRADE E",
                                  "GRADE F",
                                  "FAC R",
                                  "R",
                                  "BULK",
                                  "BLK",
                                  "BK",
                                ],
                                ["OEMREF"],
                                [
                                  "USED",
                                  "NOT NEW",
                                  "PREVIOUSLY USED",
                                  "PREVIOUSLY OWNED",
                                  "P O",
                                  "USED/REFURB",
                                  "UNTESTED",
                                  "USED BULK",
                                  "USED PULLS",
                                  "USED PULL",
                                  "U",
                                ],

                                ["ASIS", "AS IS"],
                                ["EXC"],
                              ].map((options, i) => (
                                <td key={i} className="p-2 border">
                                  <select className="w-full border p-1 rounded ">
                                    {options.map((opt, j) => (
                                      <option key={j} value={opt}>
                                        {opt}
                                      </option>
                                    ))}
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
                    <td className="text-[9pt] text-[#444] font-semibold ">
                      Condition Definitions
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={2}>
                      <ul className="list-disc pl-5 text-sm leading-7 mt-2">
                        <li className="text-[8pt] text-[#444] font-medium ">
                          <span>F/S</span>: Product is unused and factory sealed
                          in original manufacturer retail packaging. Product
                          contains warranty.
                        </li>
                        <li className="text-[8pt] text-[#444] font-medium ">
                          <span>NOB</span>:Product is unused, but original
                          manufacturer packaging seal is broken or cut. Product
                          contains warranty.
                        </li>
                        <li className="text-[8pt] text-[#444] font-medium ">
                          <span>NEW</span>: Product is unused with or without
                          original manufacturer packaging, such as bulk, pulls,
                          or spares. Product contains warranty.
                        </li>
                        <li className="text-[8pt] text-[#444] font-medium ">
                          <span>OEMREF</span>: Product is refurbished and
                          recertified by the original manufacturer, is sealed in
                          original manufacturer packaging, and contains
                          manufacturer warranty.
                        </li>
                        <li className="text-[8pt] text-[#444] font-medium ">
                          <span>REF</span>:Product that has been cleaned and
                          refurbished by a vendor. Product may contain vendor
                          warranty.
                        </li>
                        <li className="text-[8pt] text-[#444] font-medium ">
                          <span>USED</span>:Product that has been tested to
                          work, has no warranty, and has not been refurbished.
                        </li>
                        <li className="text-[8pt] text-[#444] font-medium ">
                          <span>ASIS</span>:Product is in unknown condition,
                          does not contain a warranty.
                        </li>
                        <li className="text-[8pt] text-[#444] font-medium ">
                          <span>EXC</span>: Product that is available for
                          exchange or contain a returnable core.
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
