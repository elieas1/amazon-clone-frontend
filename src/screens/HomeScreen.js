import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import Product from "../components/product";
import { listProducts } from "../redux/actions/ProductActions";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products
            ? products.map((product,index) => (
                <Product key={index} product={product} />
              ))
            : "empty"}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
