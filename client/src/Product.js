import React, { useEffect, useState } from "react";
import "./Product.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";

import axios from "axios";
import Home from "./Home";
import Header from "./Header";
import EditProduct from "./EditProduct";
function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const [goToHome, setGoToHome] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/loginInfo").then((res) => {
      let val = res.data;
      if (val.length > 0) {
        if (val[0].type == "Admin") setIsAdmin(true);
      }
    });
  });
  async function onDelete() {
    axios.delete("http://localhost:5000/deleteProduct/" + id).then((res) => {
      alert(res.data);
    });
  }
  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  if (isEdit)
    return (
      <>
        <EditProduct id={id} />
      </>
    );
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small className="bold">Rs </small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />
      <div className="productBtn">
        {isAdmin && (
          <button className="productDeleteBtn" onClick={onDelete}>
            {" "}
            Delete
          </button>
        )}
        {!isAdmin && (
          <button className="productAddToCart" onClick={addToBasket}>
            Add to Cart
          </button>
        )}
        {isAdmin && (
          <Link to={"/Edit/" + id}>
            <button className="productAddToCart">Edit</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Product;
