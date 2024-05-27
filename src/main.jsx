import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./components/Tools/Cart.jsx";
// import ProductsTable from "./components/RfqTable.jsx";
import MyProfile from "./components/Menu/Manage/MyProfile.jsx";
import Options from "./components/Menu/Manage/Options.jsx";
import CompanyDetails from "./components/Popups/CompanyDetails/CompanyDetails.jsx";
import MyRFQ from "./components/Menu/Manage/MyRFQ.jsx";
import SearchProduct from "./components/Menu/Manage/SearchProduct.jsx";
import Inventory from "./components/Menu/Manage/Inventory/Inventory.jsx";
import Advanced from "./components/Menu/Search/Advanced.jsx";
import Header from "./components/Header.jsx";
import EditDelete from "./components/Menu/Manage/Inventory/EditDelete.jsx";
import Add from "./components/Menu/Manage/Inventory/Add.jsx";
import ExportRemove from "./components/Menu/Manage/Inventory/ExportRemove.jsx";
import VenBlock from "./components/Menu/Manage/Inventory/VenBlock.jsx";
import VenPrice from "./components/Menu/Manage/Inventory/VenPrice.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/LoginRegister/Login.jsx";
import Register from "./components/LoginRegister/Register.jsx";
import Map from "./components/Map/Map.jsx";
// import WorldMap from "./components/Map/MyWorldMap.jsx";
import MyWorldMap from "./components/Map/MyWorldMap.jsx";
import ProtectedRoute from "./components/LoginRegister/Authentication/ProtectedRoute";
import NotFound from "./components/LoginRegister/Authentication/NotFound.jsx";
import PublicRoute from "./components/LoginRegister/Authentication/PublicRoute.jsx";
import Form from "./Form.jsx";
const router = createBrowserRouter([
  {
    element: <PublicRoute />, // Wrap public routes in PublicRoute
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <ProtectedRoute />, // Wrap protected routes in ProtectedRoute
    children: [
      {
        path: "/",
        element: (
          <>
            <Header />
            <Home />
          </>
        ),
      },
      {
        path: "/cartpart",
        element: (
          <>
            <Header />
            <Cart />
          </>
        ),
      },
      {
        path: "/search",
        element: (
          <>
            <div>
              <Header />
            </div>
            <SearchProduct />
          </>
        ),
      },
      {
        path: "/myprofile",
        element: (
          <>
            <Header />
            <MyProfile />
          </>
        ),
      },
      {
        path: "/myprofile/Options",
        element: (
          <>
            <Header />
            <Options />
          </>
        ),
      },
      // {
      //   path: "/compinfo",
      //   element: (
      //     <>
      //       <Header />
      //       <CompanyDetails />
      //     </>
      //   ),
      // },
      {
        path: "/rfq",
        element: (
          <>
            <Header />
            <MyRFQ />
          </>
        ),
      },
      {
        path: "/inventory",
        element: (
          <>
            <Header />
            <Inventory />
          </>
        ),
      },
      {
        path: "/inventory/Upload",
        element: (
          <>
            <Header />
            <Inventory />
          </>
        ),
      },
      {
        path: "/inventory/Edit-Delete",
        element: (
          <>
            <Header />
            <EditDelete />
          </>
        ),
      },
      {
        path: "/inventory/Add",
        element: (
          <>
            <Header />
            <Add />
          </>
        ),
      },
      {
        path: "/inventory/Export-Remove",
        element: (
          <>
            <Header />
            <ExportRemove />
          </>
        ),
      },
      {
        path: "/venblock",
        element: (
          <>
            <Header />
            <VenBlock />
          </>
        ),
      },
      {
        path: "/venprice",
        element: (
          <>
            <Header />
            <VenPrice />
          </>
        ),
      },
      {
        path: "/advanced",
        element: (
          <>
            <Header />
            <Advanced />
          </>
        ),
      },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/worldmap",
        element: <MyWorldMap />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
