import React from "react";
import css from "@/styles/SearchProducts.module.css";
import { useDispatch, useSelector, } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setFilterToggle, setPopUpRfq } from "@/ReduxStore/SearchProductSlice";
import { setSelectedProductsForCart } from "@/ReduxStore/SearchProductSlice";
import MyRFQNew from "../Popups/MyRFQNew";
import Cookies from "js-cookie";
import { addToCart } from "@/ReduxStore/SearchProductSlice";


const ProductTableBtn = React.memo(() => {
  console.log("Rendered From PrdouctTableDetail...");
    
  const { popUpRfq } = useSelector((store) => store.searchProductStore);
  const selectedProducts = useSelector(state => state.searchProductStore.selectedProducts);

  console.log("POPUP RFQ",popUpRfq)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const handleShowPopupMyRFQNew = React.useCallback(
    (event) => {
      event.stopPropagation();
      dispatch(setPopUpRfq());
    },
    [dispatch]
  );

//   const handleCartClick = () => {
//     const inventoryIds = selectedProducts.map(item => item.id);
//     dispatch(addToCart({ token, inventoryIds }))
//       .then(() => {
//         dispatch(setSelectedProductsForCart(selectedProducts));
//         navigate("/cartpart");
//       })
//       .catch(() => {
//         alert("Failed to add items to cart.");
//       });
// };

const handleCartClick = () => {
  const inventoryIds = selectedProducts.map(item => item.id);

  if (inventoryIds.length > 0) {
    dispatch(addToCart({ token, inventoryIds }))
      .then(() => {
        dispatch(setSelectedProductsForCart(selectedProducts));
        navigate("/cartpart");
      })
      .catch(() => {
        alert("Failed to add items to cart.");
        navigate("/cartpart");
      });
  } else {
    navigate("/cartpart");
  }
};

  return (
    <div className={css.productTableBtn}>
      <button type="button" onClick={handleShowPopupMyRFQNew}>
        RFQ
      </button>
      {popUpRfq && <MyRFQNew />}
      <button>
        <NavLink to={"/inventory/add"} className="!text-2xl !ml-4">
          Add
        </NavLink>
      </button>
      <button onClick={handleCartClick}>
        {/* <a href="/cartpart" style={{ fontSize: "1em", color: "#444" }}>Cart</a> */}
        Cart
      </button>
      <button type="button" onClick={() => dispatch(setFilterToggle())}>
        Filters
      </button>
      {/* <button type="button" onClick={() => dispatch(setGraphToggle())}>
          GraphView
        </button> */}
    </div>
  );
});

export default ProductTableBtn