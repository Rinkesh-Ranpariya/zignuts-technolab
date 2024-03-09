import { Rating } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const Description = ({ productInfo }) => {
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
      <div>
        <p className="pre">{brand}</p>
        <p>{category}</p>
      </div>
      <h1>{title}</h1>
      <p className="desc">{description}</p>
      <div className="price">
        <div className="main-tag">
          <p>${price}</p>
          <p>{discountPercentage}%</p>
        </div>
      </div>
      <div
        className={`flex items-center font-bold ${
          stock > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {stock > 0 ? (
          <>
            <TagFacesIcon className="mr-2" />
            <span>{stock} in stock</span>
          </>
        ) : (
          <>
            <SentimentDissatisfiedIcon className="mr-2" />
            <span>Out of stock</span>
          </>
        )}
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
