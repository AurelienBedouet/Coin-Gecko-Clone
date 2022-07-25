import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Trending = () => {
  const [trending, setTrending] = useState([]);

  const TRENDING_API_URL = "https://api.coingecko.com/api/v3/search/trending";

  useEffect(() => {
    axios.get(TRENDING_API_URL).then(res => {
      setTrending(res.data.coins);
    });
  }, []);

  return (
    <section className="rounded-div my-12 py-8 text-primary">
      <h2 className="text-2xl font-bold pb-4">Trending Coins</h2>
      <p className="text-gray-500 italic pb-4">
        Top-7 trending coins on CoinGecko as searched by users in the last 24
        hours (Ordered by most popular first)
      </p>
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {trending.map((coin, idx) => (
          <Link key={idx} to={`/coin/${coin.item.id}`}>
            <div className="h-[80px] md:h-[100px] flex items-center border border-secondary px-4 rounded-2xl shadow-xl bg-primary py-4 hover:scale-105 ease-in-out duration-300">
              <div className="flex w-full items-center justify-between">
                {/* Coin Identity */}
                <div className="flex cursor-pointer">
                  <img
                    className="mr-4 rounded-full"
                    src={coin.item.small}
                    alt={coin.item.name}
                  />
                  <div>
                    <p className="font-bold">{coin.item.name}</p>
                    <p>{coin.item.symbol}</p>
                  </div>
                </div>

                {/* Coin Price (in itcoin) */}
                <div className="flex items-center">
                  <img
                    className="w-4 mr-2"
                    src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579"
                    alt="bitcoin logo"
                  />
                  <p>{coin.item.price_btc.toFixed(7)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Trending;
