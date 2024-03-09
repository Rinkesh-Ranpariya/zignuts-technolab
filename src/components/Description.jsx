import { Rating } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Description = ({ productInfo }) => {
  console.log(productInfo, "productInfo");

  const {
    title,
    price,
    rating,
    stock,
    discountPercentage,
    description,
    category,
    brand,
  } = productInfo;

  return (
    <section className="description">
      <p className="pre">{brand}</p>
      <h1>{title}</h1>
      <p className="desc">{description}</p>
      <div className="price">
        <div className="main-tag">
          <p>${price}</p>
          <p>{discountPercentage}%</p>
        </div>
      </div>
      <Rating name="read-only" value={rating} readOnly />
      <div className="buttons">
        <div className="amount">
          <button className="minus">
            <RemoveIcon />
          </button>
          <p>1</p>
          <button className="plus">
            <AddIcon />
          </button>
        </div>
        <button className="add-to-cart">
          <ShoppingCartIcon />
          add to cart
        </button>
      </div>
    </section>
  );
};

export default Description;
