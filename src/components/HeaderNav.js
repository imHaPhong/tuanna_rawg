import React from "react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { getUser } from "../features/user";

const HeaderNav = () => {
  const [value, setValue] = useState("");
  const history = useHistory();

  const handlerUserSubmit = (e) => {
    if (e.keyCode === 13) {
      history.push(`/?search=${value}`);
    }
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="header">
      <span className="logo">
        <Link to="/">RAWGC</Link>
      </span>
      <div className="header__search">
        <AiOutlineSearch />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handlerUserSubmit}
          type="text"
          className="header__search-input"
          placeholder="Search for game"
        />
      </div>
      <div className="header__actions">
        {user.isLogin ? (
          <div className="header__actions-login">{user.userName}</div>
        ) : (
          <div className="header__actions-login">
            <Link to="/sign-in">Login</Link>
          </div>
        )}

        {user.isLogin && (
          <div
            className="header__actions-signup"
            onClick={() => {
              dispatch(
                getUser({
                  userName: "",
                  isLogin: false,
                })
              );
            }}
          >
            Log out
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderNav;
