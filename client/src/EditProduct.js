import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import axios from "axios";
import Login from "./Login";
import Home from "./Home";

function EditProduct(props) {
  const [Details, setDetails] = useState(null);
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const [image, setimage] = useState();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let pagePath = window.location.pathname;
    let id = pagePath.slice(6);
    console.log("id :", id);
    axios.get("http://localhost:5000/product/" + id).then((res) => {
      let val = res.data;
      console.log("details :", val);
      if (val.length > 0) {
        setTitle(val[0].title);
        setPrice(val[0].price);
        setRating(val[0].rating);
        setimage(val[0].image);
      }
    });
  }, []);

  async function onSave() {
    console.log("title :", title);
    if (title == undefined) alert("title can not be empty");
    else if (price == undefined) alert("price can not be empty");
    else if (rating == undefined) alert("rating can not be empty");
    else if (image == undefined) alert("image url can not be empty");
    else {
      let data = { title, price, rating, image };
      let pagePath = window.location.pathname;
      let id = pagePath.slice(6);
      console.log("id :", id);
      axios
        .put("http://localhost:5000/updateProduct/" + id, data)
        .then((res) => {
          alert(res.data);
          if (res.data) {
            setTimeout(() => {
              setIsSaved(true);
            }, 1000);
          }
        });
    }
  }
  if (isSaved) return <Home />;
  return (
    <div className="addProductPage">
      <h1 className="heading">Edit Product</h1>
      <div className="addProductForm">
        <div className="addProductRow">
          <h1>Title </h1>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>

        <div className="addProductRow">
          <h1>Price </h1>
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>

        <div className="addProductRow">
          <h1>Rating </h1>
          <input
            type="text"
            onChange={(e) => setRating(e.target.value)}
            value={rating}
          />
        </div>

        <div className="addProductRow">
          <h1>Image Url </h1>
          <input
            type="text"
            onChange={(e) => setimage(e.target.value)}
            value={image}
          />
        </div>

        <button className="addProductBtn" onClick={onSave}>
          {" "}
          Save{" "}
        </button>
      </div>
    </div>
  );
}

export default EditProduct;
