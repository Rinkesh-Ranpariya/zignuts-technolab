import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../store/productsManagement/productsManagementSlice";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    dispatch(getProductById(params.productId)).then((res) => {
      setProductInfo(res.payload);
    });
  }, []);

  return <div>{productInfo.title}</div>;
};

export default ViewProduct;
