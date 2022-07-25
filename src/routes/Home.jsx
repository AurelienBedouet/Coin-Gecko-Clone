import React from "react";
import CoinSearch from "../components/CoinSearch/CoinSearch";
import Trending from "../components/Trending";

const Home = ({ coins }) => {
  return (
    <main>
      <CoinSearch coins={coins} />
      <Trending />
    </main>
  );
};

export default Home;
