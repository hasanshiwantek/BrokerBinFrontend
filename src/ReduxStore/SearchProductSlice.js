import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";
import { act } from "react";

export const searchProductQuery = createAsyncThunk(
  "searchProductStore/searchProductQuery",
  async ({ token, page, search, sortBy, sortOrder, filters }) => {
    console.log(search);
    try {
      const response = await axios.post(
        `${brokerAPI}inventory/search`,
        {
          page, // Send 'page' in the request body
          search, // Send 'search' in the request body
          sortBy,
          sortOrder,
          filters,
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
  async ({ token, page, partModel, sortBy, sortOrder, filters }) => {
    console.log(partModel);
    try {
      const response = await axios.post(
        `${brokerAPI}inventory/partmodel`,
        {
          page, // Send 'page' in the request body
          partModel, // Send 'partModel' in the request body
          sortOrder,
          sortBy,
          filters,
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

// export const searchProductFilter = createAsyncThunk(
//   "searchProductStore/searchProductFilter",
//   async ({ token, filters }) => {
//     console.log("Thunk Execution Started"); // Add this line
//     // debugger;
//     console.log(filters); // Debug filters
//     try {
//       const response = await axios.post(
//         `${brokerAPI}inventory/fetch`,
//         filters,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // console.log("RESPONSE.DATA",response.data.data);
//       console.log("RESPONSE.Data", response.data);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       console.error(
//         "Error while searching product:",
//         error.response?.data || error.message
//       );
//       throw error.response?.data || error.message;
//     }
//   }
// );

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
      const response = await axios.put(
        `${brokerAPI}company/companyUpdate/${companyId}`,
        data,
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

export const updateCompanyOptions = createAsyncThunk(
  "toolstore/updateCompanyOptions",
  async ({ token, body }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}company/company-options`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Company Options Response From Redux:", response?.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const partCartNotes = createAsyncThunk(
  "toolstore/partCartNotes",
  async ({ token, notes }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}part-cart/note/add`,
        { notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response From Redux: ", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "toolstore/addToCart",
  async ({ token, inventoryIds }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}part-cart`, // update URL as needed
        { inventory_id: inventoryIds }, // API expects an array or single ID
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

export const fetchCartItems = createAsyncThunk(
  "toolstore/fetchCartItems",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${brokerAPI}part-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data; // Make sure API returns items array
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCartItemsAgain = createAsyncThunk(
  "toolstore/fetchCartItemsAgain",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${brokerAPI}part-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("From Redux Cart:", response.data);

      return response.data; // Make sure API returns items array
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clearCartItems = createAsyncThunk(
  "toolstore/clearCartItems",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${brokerAPI}part-cart/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("All Cart delete response From Redux: ", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "toolsStore/deleteCartItem",
  async ({ token, ids }) => {
    try {
      const response = await axios.delete(
        `${brokerAPI}part-cart/delete`, // Assuming the route
        {
          data: { ids },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ Deleted Part Cart Items Response:", response.data);
      return response.data; // Should include back the `ids` array for cleanup
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "An error occurred while deleting part cart items.";
      throw new Error(message);
    }
  }
);

export const updatePartcartNote = createAsyncThunk(
  "toolstore/updatePartcartNote",
  async ({ token, id, note, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${brokerAPI}part-cart/notes/${id}?note=${note}&quantity=${quantity}`,
        null, // ✅ no body needed since all data is in query params
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Updated note response from redux: ", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const exportPartcart = createAsyncThunk(
  "toolstore/exportPartcart",
  async ({ token, body }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}part-cart/export`,
        body, // API expects an object
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Export Partcart Response from redux: ", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePartCartNotes = createAsyncThunk(
  "toolsStore/deletePartCartNotes",
  async ({ token, ids }) => {
    try {
      const response = await axios.delete(`${brokerAPI}part-cart/note/delete`, {
        data: { note_ids: ids },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete notes."
      );
    }
  }
);

export const partVariance = createAsyncThunk(
  "searchProductStore/partVariance",
  async ({ token, part }) => {
    try {
      const response = await axios.get(
        `${brokerAPI}inventory/inventory-variant?query=${part}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("RESPONSE VARIANT", response.data.variants);
      return response.data.variants || []; // Make sure API returns items array
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const initialState = {
  companiesListingParts: true,
  graphToggle: false,
  filterToggle: null,
  filterMode: "advanced",
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
  cartItems: [],
  // filteredSearchResponse: {},
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
  partVarianceState: [],
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
    setFilterMode: (state, action) => {
      state.filterMode = action.payload; // "advanced" or "standard"
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
    },
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
    clearSearchResponseMatched: (state) => {
      state.searchResponseMatched = {};
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
        state.searchResponseMatched = action.payload;
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

      .addCase(clearCartItems.pending, (state) => {
        console.log("DELETING....");
      })
      .addCase(clearCartItems.fulfilled, (state, action) => {
        state.selectedProductsForCart = state.selectedProductsForCart.filter(
          (item) => item.id != action.payload
        );
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        state.error = action.error.message;
        console.error(action.error.message);
      })
      .addCase(partVariance.pending, (state) => {
        state.error = null;
      })
      .addCase(partVariance.fulfilled, (state, action) => {
        state.partVarianceState = action.payload;
      })
      .addCase(partVariance.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchCartItemsAgain.pending, (state) => {
        console.log("PENDING");
        
      })
      .addCase(fetchCartItemsAgain.fulfilled, (state, action) => {
        console.log("Case Fulfilled: ",action);
        
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItemsAgain.rejected, (state, action) => {
        console.log("REJECTED");

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
  // setFilteredSearchResponse,
  clearSearchResponseMatched,
  setAppliedFilters,
  setFilterMode,
  setSearchPartType,
  setSelectedProductsForCart,
} = searchProductSlice.actions;

export default searchProductSlice.reducer;
