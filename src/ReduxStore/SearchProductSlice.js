import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";
import { act } from "react";

export const searchProductQuery = createAsyncThunk(
  "searchProductStore/searchProductQuery",
  async ({ token, page, search, sortBy, sortOrder }) => {
    console.log(search);
    try {
      const response = await axios.post(
        `${brokerAPI}inventory/search`,
        {
          page, // Send 'page' in the request body
          search, // Send 'search' in the request body
          sortBy,
          sortOrder,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error while searching product:",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
);

export const searchByKeyword = createAsyncThunk(
  "searchProductStore/searchByKeyword",
  async ({ token, page, partModel, sortBy, sortOrder }) => {
    console.log(partModel);
    try {
      const response = await axios.post(
        `${brokerAPI}inventory/partmodel`,
        {
          page, // Send 'page' in the request body
          partModel, // Send 'partModel' in the request body
          sortOrder,
          sortBy,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error while searching product:",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
);

export const searchProductFilter = createAsyncThunk(
  "searchProductStore/searchProductFilter",
  async ({ token, filters }) => {
    console.log("Thunk Execution Started"); // Add this line
    // debugger;
    console.log(filters); // Debug filters
    try {
      const response = await axios.post(
        `${brokerAPI}inventory/fetch`,
        filters,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("RESPONSE.DATA",response.data.data);
      console.log("RESPONSE.Data", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      console.error(
        "Error while searching product:",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
);

export const searchProductHistory = createAsyncThunk(
  "searchProductStore/searchProductHistory",
  async ({ token }) => {
    try {
      const response = await axios.get(`${brokerAPI}inventory/search/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data.history;
    } catch (error) {
      console.error(
        "Error while searching product:",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
);

export const addToHotList = createAsyncThunk(
  "searchProductStore/addToHotList",
  async ({ token, hotlists }) => {
    console.log(JSON.stringify({ hotlists }));
    try {
      const response = await axios.post(
        `${brokerAPI}hot-lists/store`,
        JSON.stringify({ hotlists }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error while searching product:",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
);

// COMPANY CONTACT THUNK

export const getCompanyContact = createAsyncThunk(
  "searchProductStore/getCompanyContact ",
  async ({ id, token }) => {
    try {
      const response = await axios.get(`${brokerAPI}company/show/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Company Contact FROM bACKEND", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Company Data Not Available:",
        error.response?.data || error.message
      );
      throw new Error("Company Data Not Available ");
    }
  }
);


// export const applyFilters = (filters) => (dispatch, getState) => {
//   const { searchResponseMatched, page, pageSize } = getState().searchProductStore;
//   const filteredData = {};

//   Object.entries(searchResponseMatched).forEach(([partModel, details]) => {
//     const currentPageData = details.data.slice((page - 1) * pageSize, page * pageSize);
//     const filteredPartData = currentPageData.filter((item) => {
//       return Object.entries(filters).every(([key, values]) =>
//         values.includes(item[key]?.toString())
//       );
//     });

//     if (filteredPartData.length > 0) {
//       filteredData[partModel] = {
//         ...details,
//         data: filteredPartData,
//       };
//     }
//   });
//   console.log("Filtered Data:", filteredData);
//   dispatch(setFilteredSearchResponse(filteredData)); // Update Redux state
//   console.log("Filtered Data:", filteredData);
// };

export const sortInventory = createAsyncThunk(
  "inventoryStore/sortInventory",
  async ({ token, payload }) => {
    try {
      const response = await axios.post(`${brokerAPI}inventory/sort`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response From AsyncThunk: " + response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error Sorting Inventory",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  }
);


export const deleteCompanyContact = createAsyncThunk(
  "toolsStore/deleteCompanyContact",
  async ({ token, ids }) => {
    try {
      const response = await axios.delete(
        `${brokerAPI}company/delete_contacts`, // Assuming the route
        {
          data: { ids }, // Payload: { ids: [1,2,3] }
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ Deleted Contacts Response:", response.data);
      return response.data; // Should include back the `ids` array for cleanup
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "An error occurred while deleting contacts.";
      throw new Error(message);
    }
  }
);





export const updateCompanyPrimaryInfo = createAsyncThunk(
  "profile/updateCompanyPrimaryInfo",
  async ({ token, data, companyId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${brokerAPI}company/companyUpdate/${companyId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateCompanyBio = createAsyncThunk(
  "toolstore/updateCompanyBio",
  async ({ token, company_id, description }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}company/company/description`,
        { company_id, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const partCartNotes = createAsyncThunk(
  "toolstore/partCartNotes",
  async ({ token, body }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}part-cart/2/notes`,
        { body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response From Redux: ",response.data);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const initialState = {
  companiesListingParts: true,
  graphToggle: false,
  filterToggle: true,
  popUpRfq: false,
  togglePopUp: false,
  searchResponseMatched: {},
  searchResponseNotMatched: [],
  popupCompanyDetail: [],
  hoverCompanyDetail: [],
  selectedProducts: [],
  selectedProductsForCart: [],
  searchHistory: [],
  companyContactData: [],
  filteredSearchResponse: {},
  appliedFilters: {},
  error: null,
  page: 1,
  pageSize: 20,
  totalCount: 0,
  gettingProducts: false,
  gettingHistory: false,
  keywordPage: null,
  keywordPageSize: null,
  keywordTotalCount: null,
  searchType: null,
};

const searchProductSlice = createSlice({
  name: "searchProductStore",
  initialState,
  reducers: {
    setCompaniesListingParts: (state, action) => {
      state.companiesListingParts = !state.companiesListingParts;
    },
    setGraphToggle: (state, action) => {
      state.graphToggle = !state.graphToggle;
    },
    setFilterToggle: (state, action) => {
      state.filterToggle = !state.filterToggle;
    },
    setPopUpRfq: (state, action) => {
      state.popUpRfq = !state.popUpRfq;
    },

    // setTogglePopUp: (state, action) => {
    //   state.togglePopUp = !state.togglePopUp;
    //   console.log("Popup",action.payload)
    //   console.log("Popup state",state)

    // },

    setTogglePopUp: (state, action) => {
      // If a payload is provided, use it to set the state, otherwise toggle
      state.togglePopUp =
        action.payload !== undefined ? action.payload : !state.togglePopUp;
      console.log("Popup Toggle:", state.togglePopUp);
    },
    setSearchResponse: (state, action) => {
      state.searchResponseMatched = action.payload.data;
      if (Object.keys(state.filteredSearchResponse || {}).length === 0) {
        state.filteredSearchResponse = action.payload.data; // Default filtered data
      }
    },
    //   setSearchResponse: (state, action) => {
    //     state.searchResponseMatched = action.payload.data;
    //     if (!state.filteredSearchResponse || Object.keys(state.filteredSearchResponse).length === 0) {
    //         state.filteredSearchResponse = action.payload.data; // Set only if it's initially empty
    //     }
    // },
    setPopupCompanyDetail: (state, action) => {
      state.popupCompanyDetail = action.payload;
      console.log("CompanyDetails", action.payload);
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.page = 1;
    },
    setCurrentPagePrev: (state, action) => {
      state.page -= 1;
    },
    setCurrentPageNext: (state, action) => {
      state.page += 1;
    },
    setGettingProducts: (state) => {
      state.gettingProducts = !state.gettingProducts;
    },
    setHoverCompanyDetail: (state, action) => {
      state.hoverCompanyDetail = [action.payload];
    },
    setFilteredSearchResponse: (state, action) => {
      state.filteredSearchResponse = action.payload;
    },
    clearSearchResponseMatched: (state) => {
      state.searchResponseMatched = {};
      state.filteredSearchResponse = {}; // Optional: Clear filtered data as well
    },
    setAppliedFilters: (state, action) => {
      state.appliedFilters = action.payload; // Save filters
    },
    setSearchPartType: (state, action) => {
      state.searchType = action.payload;
    },
    setSelectedProductsForCart: (state, action) => {
    state.selectedProductsForCart = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProductQuery.pending, (state) => {
        state.gettingProducts = true; // Set to true when starting the fetch
        state.error = null;
      })
      .addCase(searchProductQuery.fulfilled, (state, action) => {
        console.log("Payload from searchProductQuery:", action.payload);
        state.searchResponseMatched = {
          ...state.searchResponseMatched, // Keep existing matched data
          ...action.payload, // Merge new response payload
        };
        console.log(
          "Updated searchResponseMatched:",
          state.searchResponseMatched
        );
        state.searchResponseNotMatched = action.payload.notFoundKeywords || [];
        state.totalCount += Object.values(action.payload || {}).reduce(
          (acc, part) => acc + (part.totalCount || 0),
          0
        );
        state.gettingProducts = false; // Set to false after fetching is done
      })
      .addCase(searchProductQuery.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error while searching:", action.error.message);
        state.gettingProducts = false; // Set to false if the fetch fails
      })
      .addCase(searchByKeyword.pending, (state) => {
        state.gettingProducts = true; // Set to true when starting the fetch
        state.error = null;
      })
      .addCase(searchByKeyword.fulfilled, (state, action) => {
        console.log("Payload from searchByKeyword:", action.payload);
        state.keywordPage = action.payload.page;
        state.keywordPageSize = action.payload.pageSize;
        state.keywordTotalCount = action.payload.totalCount;
        console.log(
          "Page from Keyword: ",
          state.keywordPage +
            " " +
            "Page Size from Keyword: " +
            state.keywordPageSize +
            " " +
            "keyword TotalCount: " +
            state.keywordTotalCount
        );
        const foundItems = action.payload.foundItems;
        const structuredResponse = foundItems.reduce((acc, item) => {
          const { partModel } = item;
          if (!acc[partModel]) {
            acc[partModel] = { data: [] };
          }
          acc[partModel].data.push(item);
          return acc;
        }, {});

        state.searchResponseMatched = structuredResponse;

        state.searchResponseNotMatched =
          action.payload.notFoundPartModels || [];
        state.totalCount = Object.values(structuredResponse).reduce(
          (acc, part) => acc + part.data.length,
          0
        );

        console.log(
          "Updated searchResponseMatched From Redux:",
          state.searchResponseMatched
        );
        state.gettingProducts = false;
      })
      .addCase(searchByKeyword.rejected, (state, action) => {
        state.error = action.error.message;
        console.error(
          "Error while searching by keyword:",
          action.error.message
        );
        state.gettingProducts = false; // Set to false if the fetch fails
      })
      .addCase(searchProductFilter.pending, (state) => {
        state.gettingProducts = true; // Set to true when starting the fetch
        state.error = null;
      })
      // .addCase(searchProductFilter.fulfilled, (state, action) => {
      //   console.log("Filter data from Redux ",action.payload);
      //   // state.searchResponseMatched = action.payload;
      //   state.filteredSearchResponse = action.payload;
      //   // state.searchResponseMatched = action.payload
      //   state.gettingProducts = false; // Set to false after fetching is done
      // })
      .addCase(searchProductFilter.fulfilled, (state, action) => {
        state.filteredSearchResponse = action.payload;
        // state.searchResponseMatched=action.payload
        state.page = action.meta.arg.filters.page;
        // state.page = action.payload.page; // Current page
        state.pageSize = action.payload.pageSize; // Items per page
        state.totalCount = action.payload.totalCount; // Total items
        state.gettingProducts = false;
      })
      .addCase(searchProductFilter.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error while filtering:", action.error.message);
        state.gettingProducts = false; // Set to false if the fetch fails
      })
      .addCase(searchProductHistory.pending, (state) => {
        state.gettingHistory = true; // Set to true when starting the fetch
        state.error = null;
      })
      .addCase(searchProductHistory.fulfilled, (state, action) => {
        state.searchHistory = action.payload;
        state.gettingHistory = false; // Set to false after fetching is done
      })
      .addCase(searchProductHistory.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error while fetching history:", action.error.message);
        state.gettingHistory = false; // Set to false if the fetch fails
      })
      .addCase(addToHotList.pending, (state) => {
        // state.gettingHistory = true; // Set to true when starting the fetch
        // state.error = null;
      })
      .addCase(addToHotList.fulfilled, (state, action) => {
        // state.searchHistory = action.payload;
        console.log(action.payload);
        state.gettingHistory = false; // Set to false after fetching is done
      })
      .addCase(addToHotList.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error while adding to hotlist:", action.error.message);
        state.gettingHistory = false; // Set to false if the fetch fails
      })
      .addCase(getCompanyContact.pending, (state) => {
        // state.gettingHistory = true; // Set to true when starting the fetch
        // state.error = null;
        console.log("PENDING....");
      })
      .addCase(getCompanyContact.fulfilled, (state, action) => {
        state.companyContactData = action.payload;
        console.log(action.payload);
      })
      .addCase(getCompanyContact.rejected, (state, action) => {
        state.error = action.error.message;
        console.error(" Data Not Available:");
      })
      .addCase(deleteCompanyContact.pending, (state) => {
        // state.gettingHistory = true; // Set to true when starting the fetch
        // state.error = null;
        console.log("DELETING....");
      })
      .addCase(deleteCompanyContact.fulfilled, (state, action) => {
        const deletedIds = action.payload?.ids || [];
        if (Array.isArray(state.companyContactData?.data?.contacts)) {
          state.companyContactData.data.contacts =
            state.companyContactData.data.contacts.filter(
              (contact) => !deletedIds.includes(contact.id)
            );
        }

        console.log("🧹 Deleted contact ID:", deletedIds);
      })

      .addCase(deleteCompanyContact.rejected, (state, action) => {
        state.error = action.error.message;
        console.error(action.error.message);
      })

      .addCase(sortInventory.pending, (state) => {
        console.log("PENDING!!!!!");
      })
      .addCase(sortInventory.fulfilled, (state, action) => {
        state.searchResponseMatched = action.payload;

        console.log("Payload of Sorting from Redux", action.payload);
      })
      .addCase(sortInventory.rejected, (state, action) => {
        console.error("ERROR FETCHING SORTED INVENTORY DATA", action.error);
      });
  },
});

export const {
  setCompaniesListingParts,
  setGraphToggle,
  setFilterToggle,
  setPopUpRfq,
  setTogglePopUp,
  setSelectedProducts,
  setSearchResponse,
  setCurrentPagePrev,
  setCurrentPageNext,
  setCurrentPage,
  setPopupCompanyDetail,
  setHoverCompanyDetail,
  setFilteredSearchResponse,
  clearSearchResponseMatched,
  setAppliedFilters,
  setSearchPartType,
  setSelectedProductsForCart,
} = searchProductSlice.actions;

export default searchProductSlice.reducer;
