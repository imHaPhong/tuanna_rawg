import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import clientApi from "../../api/config";
import ListTag from "./ListTag";
import ListGame from "./ListGame";
import HeaderNav from "../../components/HeaderNav";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Home = ({ routers }) => {
  const isMobile = useMediaQuery("(max-width: 400px)");

  return (
    <div className="container">
      <HeaderNav />
      <ListTag isMobile={isMobile} />
      <ListGame />
    </div>
  );
};

export default Home;
