import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PublicRoute from "./components/LoginRegister/Authentication/PublicRoute";
import ProtectedRoute from "./components/LoginRegister/Authentication/ProtectedRoute";
import NotFound from "./components/LoginRegister/Authentication/NotFound.jsx";
import LoadingState from "./LoadingState.jsx";
import LoadingState2 from "./LoadingState2.jsx";

// Lazy load components
const Login = lazy(() => import("./components/LoginRegister/Login.jsx"));
const Register = lazy(() => import("./components/LoginRegister/Register.jsx"));
const ForgotPassword = lazy(() => import("./components/LoginRegister/ForgotPassword.jsx"));
const ForgotEmail = lazy(() => import("./components/LoginRegister/ForgotEmail.jsx"));
const RecoverPassword = lazy(() => import("./components/LoginRegister//Authentication/RecoverPassword.jsx"));
const Header = lazy(() => import("./components/Header.jsx"));
const Footer = lazy(() => import("./components/Footer/Footer.jsx"))
const Home = lazy(() => import("./components/Home/Home.jsx"));
const Cart = lazy(() => import("./components/Tools/Cart.jsx"));
const SearchProduct = lazy(() => import("./components/Menu/Manage/SearchProduct.jsx"));
const MyProfile = lazy(() => import("./components/Menu/Manage/MyProfile.jsx"));
const CompanyProfile = lazy(() => import("./components/Menu/Manage/Mycompany/CompanyProfile.jsx"))
const CreateAccount = lazy(() => import("./components/Menu/Manage/Mycompany/CreateAccount.jsx"))
const Options = lazy(() => import("./components/Menu/Manage/Options.jsx"));
const BroadcastFilters = lazy(() => import("./components/Menu/Manage/BroadcastFilter/BroadcastFilters.jsx"));
const MyBroadcast = lazy(() => import("./components/Menu/Broadcast/MyBroadCast.jsx"));
const BroadCastHistory = lazy(() => import("./components/Menu/Broadcast/BroadCastHistory.jsx"));
const ReplyBroadcast = lazy(() => import("./components/Menu/Broadcast/ReplyBroadcast.jsx"));


const CompanyDetails = lazy(() =>
  import("./components/Popups/CompanyDetails/CompanyDetails.jsx")
);
const MyRFQ = lazy(() => import("./components/Menu/Manage/MyRFQ.jsx"));

const RfqSent = lazy(() => import("./components/Menu/Manage/RfqSent.jsx"));

const RfqReply = lazy(() => import("./components/Menu/Manage/Rfqs/RfqReply.jsx"))

const RfqArcheived = lazy(() => import("./components/Menu/Manage/Rfqs/RfqArchived.jsx"))

const Inventory = lazy(() =>
  import("./components/Menu/Manage/Inventory/Inventory.jsx")
);
const Search = lazy(() =>
  import("./components/Menu/Search/Search.jsx")
);
const SearchCompany = lazy(() =>
  import("./components/Menu/Search/Company/Company.jsx")
);
const CompanySearchResults = lazy(() =>
  import("./components/Menu/Search/Company/CompanySearchResults.jsx")
);
const InventorySearch = lazy(() =>
  import("./components/Menu/Search/Inventory/InventorySearch.jsx")
);

const InventorySearchResult = lazy(() => import("./components/Menu/Search/Inventory/InventorySearchResult.jsx"));

const SearchResult = lazy(() =>
  import("./components/Menu/Search/SearchResults.jsx")
);
const Services = lazy(() =>
  import("./components/Menu/Search/Services.jsx")
);


const FeedBackProfile = lazy(() =>
  import("./components/Menu/Search/FeedBackProfile.jsx")
);



const Manage = lazy(() =>
  import("./components/Menu/Manage/Manage.jsx")
);
const MyServices = lazy(() =>
  import("./components/Menu/Manage/MyServices.jsx")
);


const Person = lazy(() =>
  import("./components/Menu/Search/Person.jsx")
);
const EditDelete = lazy(() =>
  import("./components/Menu/Manage/Inventory/EditDelete.jsx")
);
const Add = lazy(() => import("./components/Menu/Manage/Inventory/Add.jsx"));

const ExportRemove = lazy(() =>
  import("./components/Menu/Manage/Inventory/ExportRemove.jsx")
);
const VenBlock = lazy(() =>
  import("./components/Menu/Manage/Inventory/VenBlock.jsx")
);
const VenPrice = lazy(() =>
  import("./components/Menu/Manage/Inventory/VenPrice.jsx")
);
const Send = lazy(() => import("./components/Menu/Broadcast/Send/Send.jsx"));
// const Advanced = lazy(() => import("./components/Menu/Search/Advanced.jsx"));
const Map = lazy(() => import("./components/Map/Map.jsx"));
const MyWorldMap = lazy(() => import("./components/Map/MyWorldMap.jsx"));
const Form = lazy(() => import("./Form.jsx"));
const TextEditor = lazy(() => import("./components/TextEditor.jsx"));
const Tools = lazy(() => import("./components/Menu/Tools/Tools.jsx"))
const MyVendors = lazy(() => import("./components/Menu/Tools/MyVendors.jsx"));
const MyContact = lazy(() => import("./components/Menu/Tools/MyContact.jsx"));
const Company = lazy(() => import("./components/Menu/Reports/Company/Company.jsx"));
const SiteWide = lazy(() => import("./components/Menu/Reports/SiteWide.jsx"));
const Email = lazy(() => import("./components/Menu/Reports/Email.jsx"));
const ServiceStats = lazy(() => import("./components/Menu/Reports/ServiceStats.jsx"));
const MatchYourHits = lazy(() =>
  import("./components/Menu/Reports/Company/MatchYourHits.jsx")
);
const Detailed = lazy(() =>
  import("./components/Menu/Reports/Company/Detailed.jsx")
);
const SupplyAndDemand = lazy(() =>
  import("./components/Menu/Reports/SupplyAndDemand.jsx")
);
const TopSearches = lazy(() =>
  import("./components/Menu/Reports/TopSearches.jsx")
);
const CompanyInventory = lazy(() =>
  import("./components/Menu/Reports/CompanyInventory.jsx")
);
const TopSearchWithManufacturer = lazy(() =>
  import("./components/Menu/Reports/TopSearchWithManufacturer.jsx")
);

const HotListAdd = lazy(() => import("./components/Menu/Tools/HotListAdd.jsx"));
const HotListView = lazy(() =>
  import("./components/Menu/Tools/HotListView.jsx")
);
const HotListEdit = lazy(() =>
  import("./components/Menu/Tools/HotListEdit.jsx")
);

const SafeTrading = lazy(() =>
  import("./components/ui/SafeTrading.jsx")
);
import Crousel from "./Crousel.jsx";
import { Provider } from "react-redux";
import store from "./ReduxStore/Store.js";
import Contact from "./components/Menu/Main/Contact.jsx";
import Ethics from "./components/Menu/Main/Ethics.jsx";
import Help from "./components/Menu/Main/Help.jsx";
import SvgMap from "./components/SvgMap.jsx";
import Badges from "./components/Menu/Main/Badges.jsx";
import SiteMap from "./components/Menu/Main/SiteMap.jsx";



const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<LoadingState />}>
        <PublicRoute />
      </Suspense>
    ), // Wrap public routes in PublicRoute
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/password/forgot",
        element: (
          <Suspense fallback={<LoadingState />}>
            <ForgotPassword/>
          </Suspense>
        ),
      },
      {
        path: "/login/forgot",
        element: (
          <Suspense fallback={<LoadingState />}>
            <ForgotEmail/>
          </Suspense>
        ),
      },

      {
        path: "/recover/password",
        element: (
          <Suspense fallback={<LoadingState />}>
            <RecoverPassword/>
          </Suspense>
        ),
      },
    ],
    
  },
  {
    element: (
      <Suspense fallback={<LoadingState />}>
        <ProtectedRoute />
      </Suspense>
    ), // Wrap protected routes in ProtectedRoute
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Home />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/loading",
        element: <LoadingState />,
      },
      {
        path: "/loading2",
        element: <LoadingState2 />,
      },
      {
        path: "/cartpart",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Cart />
            <Footer />

          </Suspense>
        ),
      },
      {
        path: "/inventory/search",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <SearchProduct />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/myprofile",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <MyProfile />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/mycompany",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <CompanyProfile />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/mycompany/Createaccount",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <CreateAccount />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/myprofile/Options",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Options />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/myprofile/broadcastfilter",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <BroadcastFilters />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/broadcasts",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <MyBroadcast />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/broadcasthistory",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <BroadCastHistory />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/ReplyBroad",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <ReplyBroadcast />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/compinfo",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <CompanyDetails />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/rfq",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <MyRFQ />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/rfqSent",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <RfqSent />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/rfqArchived",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <RfqArcheived />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Search />
            <Footer />

          </Suspense>
        ),
      },
      {
        path: "/search/Company",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <SearchCompany />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/search/company-searchresults",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <CompanySearchResults />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/search/Inventory",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <InventorySearch />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/person",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Person />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/search-result",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <SearchResult />
            <Footer />
          </Suspense>
        ),
      },
        {
          path: "/inventory-searchResult",
          element: (
            <Suspense fallback={<LoadingState />}>
              <Header />
              <InventorySearchResult/>
              <Footer />
            </Suspense>
          ),
      },
      {
        path: "/services",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Services />
            <Footer />

          </Suspense>
        ),
      },
      {
        path: "/feedbackprofile",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <FeedBackProfile />
            <Footer />
          </Suspense>
        ),
      },

      {
        path: "/manage",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Manage />
            <Footer />
          </Suspense>
        ),
      },

      {
        path: "/manage/my-services",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <MyServices />
            <Footer />
          </Suspense>
        ),
      },


      {
        path: "/rfq/create",
        element: (
          <Suspense fallback={<LoadingState />}>
            {/* <Header /> */}
            <RfqReply />
            {/* <Footer /> */}
          </Suspense>
        ),
      },


      {
        path: "/inventory",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Inventory />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/inventory/Upload",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Inventory />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/inventory/Edit-Delete",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <EditDelete />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/inventory/Add",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Add />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/inventory/Export-Remove",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <ExportRemove />
            <Footer />
          </Suspense>
        ),
      },
      // {
      //   path: "/venblock",
      //   element: (
      //     <Suspense fallback={<LoadingState />}>
      //       <Header />
      //       <VenBlock />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/venprice",
      //   element: (
      //     <Suspense fallback={<LoadingState />}>
      //       <Header />
      //       <VenPrice />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/advanced",
      //   element: (
      //     <Suspense fallback={<LoadingState />}>
      //       <Header />
      //       <Advanced />
      //     </Suspense>
      //   ),
      
      {
        path: "/map",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Map />
          </Suspense>
        ),
      },
      {
        path: "/form",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Form />
          </Suspense>
        ),
      },
      {
        path: "/worldmap",
        element: (
          <Suspense fallback={<LoadingState />}>
            <MyWorldMap />
          </Suspense>
        ),
      },
      {
        path: "/crousel",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Crousel />
          </Suspense>
        ),
      },
      {
        path: "/texteditor",
        element: (
          <Suspense fallback={<LoadingState />}>
            <TextEditor />
          </Suspense>
        ),
      },
      {
        path: "/sendbroad",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Send />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/help",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Help />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/feedback",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Contact />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/ethics",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Ethics />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/badges",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Badges />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/sitemap",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <SiteMap />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/tools",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Tools />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/myprofile/MyVendors",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <MyVendors />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/myprofile/MyContact",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <MyContact />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/reports/Company",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Company />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/reports/sitewide",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <SiteWide />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/reports/email",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Email />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/reports/serviceStats",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <ServiceStats />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/reports/MatchYourHits",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <MatchYourHits />
            <Footer />
          </Suspense>
        ),
      },
      // {
      //   path: "/reports/Detailed",
      //   element: (
      //     <Suspense fallback={<LoadingState />}>
      //       <Header />
      //       <Detailed />
      //     </Suspense>
      //   ),
      // },
      {
        path: "/reports/SupplyAndDemand",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <SupplyAndDemand />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/reports/Detailed",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Detailed />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/reports/TopSearches",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <TopSearches />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/reports/companyInventory",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <CompanyInventory />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/reports/topSearchWithManufacturer",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <TopSearchWithManufacturer />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/hotlist/add",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <HotListAdd />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/hotlist/view",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <HotListView />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/hotlist/edit",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <HotListEdit />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: "/safe_trading",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <SafeTrading/>
            <Footer />

          </Suspense>
        ),
      },
      {
        path: "/svgmap",
        element: <SvgMap />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingState />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
