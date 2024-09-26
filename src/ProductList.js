import React, { useEffect } from "react";
import Product from "./Product";
import { selectAll, getProductsIds, fetchProducts } from "./app/productsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function ProductList() {
  const dispatch = useDispatch();
  const productIds = useSelector(getProductsIds);
  const loading = useSelector((store) => store.products.status);

  const handleDispatch = () => {
    dispatch(fetchProducts());
  };

  return (
    <div>
      <button onClick={handleDispatch}>Fetch Products</button>
      <p>{loading}</p>
      {productIds.map((productId) => (
        <p>{productId}</p>
      ))}
      <Product />
    </div>
  );
}
