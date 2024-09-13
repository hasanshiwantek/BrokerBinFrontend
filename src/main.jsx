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
const Header = lazy(() => import("./components/Header.jsx"));
const Home = lazy(() => import("./components/Home/Home.jsx"));
const Cart = lazy(() => import("./components/Tools/Cart.jsx"));
const SearchProduct = lazy(() =>
  import("./components/Menu/Manage/SearchProduct.jsx")
);
const MyProfile = lazy(() => import("./components/Menu/Manage/MyProfile.jsx"));
const Options = lazy(() => import("./components/Menu/Manage/Options.jsx"));
const CompanyDetails = lazy(() =>
  import("./components/Popups/CompanyDetails/CompanyDetails.jsx")
);
const MyRFQ = lazy(() => import("./components/Menu/Manage/MyRFQ.jsx"));
const Inventory = lazy(() =>
  import("./components/Menu/Manage/Inventory/Inventory.jsx")
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
const Advanced = lazy(() => import("./components/Menu/Search/Advanced.jsx"));
const Map = lazy(() => import("./components/Map/Map.jsx"));
const MyWorldMap = lazy(() => import("./components/Map/MyWorldMap.jsx"));
const Form = lazy(() => import("./Form.jsx"));
const TextEditor = lazy(() => import("./components/TextEditor.jsx"));
const MyVendors = lazy(() => import("./components/Menu/Tools/MyVendors.jsx"));

import Crousel from "./Crousel.jsx";
import { Provider } from "react-redux";
import store from "./ReduxStore/Store.js";
import Contact from "./components/Menu/Main/Contact.jsx";
import Ethics from "./components/Menu/Main/Ethics.jsx";

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
          </Suspense>
        ),
      },
      {
        path: "/inventory/search",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <SearchProduct />
          </Suspense>
        ),
      },
      {
        path: "/myprofile",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <MyProfile />
          </Suspense>
        ),
      },
      {
        path: "/myprofile/Options",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Options />
          </Suspense>
        ),
      },
      {
        path: "/compinfo",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <CompanyDetails />
          </Suspense>
        ),
      },
      {
        path: "/rfq",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <MyRFQ />
          </Suspense>
        ),
      },
      {
        path: "/inventory",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Inventory />
          </Suspense>
        ),
      },
      {
        path: "/inventory/Upload",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Inventory />
          </Suspense>
        ),
      },
      {
        path: "/inventory/Edit-Delete",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <EditDelete />
          </Suspense>
        ),
      },
      {
        path: "/inventory/Add",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Add />
          </Suspense>
        ),
      },
      {
        path: "/inventory/Export-Remove",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <ExportRemove />
          </Suspense>
        ),
      },
      {
        path: "/venblock",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <VenBlock />
          </Suspense>
        ),
      },
      {
        path: "/venprice",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <VenPrice />
          </Suspense>
        ),
      },
      {
        path: "/advanced",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Advanced />
          </Suspense>
        ),
      },
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
          </Suspense>
        ),
      },
      {
        path: "/feedback",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/ethics",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <Ethics />
          </Suspense>
        ),
      },
      {
        path: "/myprofile/MyVendors",
        element: (
          <Suspense fallback={<LoadingState />}>
            <Header />
            <MyVendors />
          </Suspense>
        ),
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
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
