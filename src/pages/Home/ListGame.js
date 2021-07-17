import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "../../components/GameCard";
import Loading from "../../components/Loading";
import { nextPage } from "../../features/games";

const ListGame = () => {
  const [listGame, setListGame] = useState([]);
  const { router, games } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [pending, setPending] = useState(
    games[`GENER_COLLECTION_TYPE|${router.option}`].loading
  );

  const typing = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (games[`GENER_COLLECTION_TYPE|${router.option}`].loading) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        if (typing.current) {
          clearTimeout(typing.current);
        }
        typing.current = setTimeout(() => {
          dispatch(
            nextPage({
              slug: router.option,
              nextUrl: games[`GENER_COLLECTION_TYPE|${router.option}`].nextUrl,
            })
          );
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [games[`GENER_COLLECTION_TYPE|${router.option}`].loading]);

  useEffect(() => {
    if (games && games[`GENER_COLLECTION_TYPE|${router.option}`]) {
      const listGamex = games[`GENER_COLLECTION_TYPE|${router.option}`];

      setListGame(listGamex.games);
    }
  }, [router, games]);

  return (
    <>
      <div className="list-game">
        {listGame.length > 0 &&
          listGame.map((el) => {
            if (el != null) {
              return <GameCard key={el.id} cardData={el} />;
            }
          })}
      </div>
      {games[`GENER_COLLECTION_TYPE|${router.option}`].loading && <Loading />}
    </>
  );
};

export default ListGame;
