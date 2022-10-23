import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import Header from "./Header";
import Home from "./Home";

function AddProduct() {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isSaved, setIsSaved] = useState(false);

  async function onSave() {
    console.log("title :", title);
    if (title == undefined) alert("title can not be empty");
    else if (price == undefined) alert("price can not be empty");
    else if (rating == undefined) alert("rating can not be empty");
    else if (imageUrl == undefined) alert("image url can not be empty");
    else {
      let data = { title, price, rating, imageUrl };
      axios.post("http://localhost:5000/addProduct", data).then((res) => {
        alert(res.data);
        if (res.data == "Saved successfully") {
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
      <h1 className="heading">Add Product</h1>
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
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
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

export default AddProduct;
