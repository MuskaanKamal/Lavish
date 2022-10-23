import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import axios from "axios";
import Login from "./Login";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [isLogin, setIsLogin] = useState(false);
  const [loginInfo, setLoginInfo] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/loginInfo").then((res) => {
      console.log("received loginInfo :", res.data);
      let val = res.data;
      if (val.length > 0) {
        setLoginInfo(val);
        setIsLogin(true);
        if (val[0].type == "Admin") setIsAdmin(true);
      }
    });
  }, []);
  function signOut() {
    let id = loginInfo[0]._id;
    console.log("id :", id);
    console.log("login info :", loginInfo);

    axios.delete("http://localhost:5000/removeLogin/" + id).then((res) => {
      let val = res.data;
      console.log("sign out result :", val);
      if (val > 0) setIsLogin(false);
    });
  }
  return (
    <div className="header">
      {/* <Link to="/">
        <img  className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"/>
      </Link> */}
      <Link to="/">
        <div>
          <h1 className="lavishLogo">Lavish</h1>
        </div>
      </Link>
      <div className="header__nav">
        <div>
          {isLogin ? (
            <h1 className="loginBox" onClick={signOut}>
              Hello {loginInfo[0].name}
            </h1>
          ) : (
            <Link to="/login">
              <h1 className="loginBox signOut">Log In</h1>
            </Link>
          )}
        </div>
        {isLogin ? (
          <h1 className="loginBox signOut" onClick={signOut}>
            Log Out
          </h1>
        ) : (
          <></>
        )}
        {!isAdmin && (
          <Link to="/checkout">
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        )}
        <div className="header__search">
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" />
        </div>
      </div>
    </div>
  );
}

export default Header;
