import React, { useState, useEffect } from "react";

export default function InfiniteList(props) {
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    const list = document.getElementById("list");
    if (props.scrollable) {
      // list has fixed height
      list.addEventListener("scroll", (e) => {
        const el = e.target;
        if (el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      });
    } else {
      // list has auto height
      window.addEventListener("scroll", () => {
        if (
          window.scrollY + window.innerHeight ===
          list.clientHeight + list.offsetTop
        ) {
          setLoadMore(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const list = document.getElementById("list");

    if (list.clientHeight <= window.innerHeight && list.clientHeight) {
      setLoadMore(true);
    }
  }, [props.state]);

  return (
    <ul id="list">
      {props.state.map((img, i) => (
        // <li style={{ backgroundImage: `url(${img})` }} key={i} />
        <li>
          <img src={img.background_image} alt="" />
        </li>
      ))}
    </ul>
  );
}
