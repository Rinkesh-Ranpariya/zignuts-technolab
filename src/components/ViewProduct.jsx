import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../store/productsManagement/productsManagementSlice";
import Gallery from "./Gallery";
import Description from "./Description";
import { Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <div className="flex justify-center gap-5 max-[768px]:flex-col">
      <div className="flex-1">
        <Skeleton variant="rectangular" height={400} />
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          <Skeleton variant="rectangular" width={100} height={100} />
          <Skeleton variant="rectangular" width={100} height={100} />
          <Skeleton variant="rectangular" width={100} height={100} />
          <Skeleton variant="rectangular" width={100} height={100} />
          <Skeleton variant="rectangular" width={100} height={100} />
        </div>
      </div>

      <div className="flex-1">
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rectangular" height={70} />
        <div className="flex gap-2 mt-2">
          <Skeleton className="flex-1" variant="rectangular" height={50} />
          <Skeleton className="flex-1" variant="rectangular" height={50} />
        </div>
      </div>
    </div>
  );
};

const ViewProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, productInfo } = useSelector(
    (state) => state.productsManagement
  );

  useEffect(() => {
    dispatch(getProductById(params.productId));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center gap-5 max-[768px]:flex-col">
          <div className="flex-1">
            <Gallery productInfo={productInfo} />
          </div>
          <div className="flex-1">
            <Description productInfo={productInfo} />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProduct;
