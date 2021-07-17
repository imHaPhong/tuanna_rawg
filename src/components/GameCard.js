import React from "react";
import LazyLoad from "react-lazyload";
import { FaPlaystation, FaWindows, FaXbox } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import { IoIosAppstore } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { Link, Redirect } from "react-router-dom";
import Rating from "./Rating";
import { useSelector } from "react-redux";

const GameCard = ({ cardData }) => {
  const user = useSelector((state) => state.user);

  const userLikeHandler = () => {
    if (!user.isLogin) window.location = "/sign-in";
  };

  const getPlatfromImg = (id) => {
    switch (id) {
      case 3:
        return <IoIosAppstore />;
      case 4:
        return <FaWindows />;
      case 187:
        return <FaPlaystation />;
      case 1:
        return <FaXbox />;
      case 7:
        return <SiNintendoswitch />;
      default:
        return;
    }
  };

  return (
    <LazyLoad height={200}>
      <Link to={`/${cardData.slug}`}>
        <div className="card-container">
          <div className="card-container__img">
            <img src={cardData.background_image} alt="anh" />
          </div>
          <div className="card-container__title">
            <div className="cart-container-title">
              <div className="cart-container-title__header">
                <ul className="cart-container-title__header--left">
                  {cardData.platforms.map((el) => {
                    if (getPlatfromImg(el.platform.id)) {
                      return <li>{getPlatfromImg(el.platform.id)}</li>;
                    }
                  })}
                </ul>
                <div className="cart-container-title__header--right">
                  <Rating rating={cardData.metacritic} />
                </div>
              </div>
              <div className="cart-container-title__bottom">
                <div className="cart-container-title__bottom--left">
                  {cardData.name}
                </div>
                <div className="cart-container-title__bottom--right">
                  <AiFillLike onClick={userLikeHandler} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </LazyLoad>
  );
};

export default GameCard;
