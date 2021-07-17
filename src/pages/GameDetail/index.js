import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { AiOutlineLike, AiOutlinePlusCircle } from "react-icons/ai";
import clientApi from "../../api/config";
import HeaderNav from "../../components/HeaderNav";
import Loading from "../../components/Loading";
import Rating from "../../components/Rating";

const GameDetail = () => {
  const { gameId } = useParams();
  const [readMore, setReadMore] = useState(false);

  const [gameData, setGameData] = useState(null);
  const [listImg, setListImg] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await clientApi.get(`/games/${gameId}`);
      setGameData(data);
      const imgs = await clientApi.get(
        `/games/${data.id}/screenshots?page_size=20&key=a79b604533c44c4cbae3074607508b7f`
      );
      setListImg(imgs.results);
    };
    getData();
  }, []);

  if (gameData === null) return <Loading />;

  return (
    <div
      className="backgroud-img"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 15, 15, 0.7), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${gameData.background_image_additional})`,
      }}
    >
      <div className="detai-container">
        <HeaderNav />

        <div className="game-detail-content">
          <div className="game-detail">
            <div className="game-detail__header">
              <div className="game__img-container">
                <div
                  className="game__img"
                  style={{
                    backgroundImage: `url(${gameData.background_image})`,
                  }}
                ></div>
                <div className="game-actions">
                  <div className="game-actions__item game-actions__item--pink">
                    <AiOutlineLike />
                    <p>Like</p>
                  </div>
                  <div className="game-actions__item game-actions__item--white">
                    <AiOutlinePlusCircle />
                    <p>Collection</p>
                  </div>
                </div>
              </div>

              <div className="game__content">
                <div className="game__name">{gameData.name}</div>
                <div className="game__alternative-name">
                  <ul>
                    {gameData.alternative_names.map((el) => (
                      <li>{el}</li>
                    ))}
                  </ul>
                </div>
                <div className="game__heading">
                  Released Date
                  <div className="game__context ">{gameData.released}</div>
                </div>
                <Rating rating={gameData.metacritic} />
                <div className="game__heading">
                  Genres
                  <div className="list">
                    <ul>
                      {gameData.genres.map((el) => (
                        <li>
                          <Link to={`/?genres=${el.slug}`}>{el.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="game__heading">
                  Homepage
                  <div className="game__context">
                    <a
                      href={gameData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {gameData.website}
                    </a>
                  </div>
                </div>
                <div className="game__heading">
                  Description
                  <div className="game__context game__desc">
                    {readMore
                      ? gameData.description_raw
                      : gameData.description_raw.toString().slice(0, 400)}

                    <span onClick={() => setReadMore((p) => !p)}>
                      {!readMore ? "...read more" : ".read less"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="game-detail-content">
              <div className="game-detail-content__left">
                {listImg.map((el) => (
                  <img src={el.image} />
                ))}
              </div>
              <div className="game-detail-content__right">
                <h3>Tag</h3>
                <ul>
                  {gameData.tags.map((el) => (
                    <li>
                      <Link to={`/?tags=${el.slug}`}>{el.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="game-detail__footer">
              <p>Power by RAWG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
