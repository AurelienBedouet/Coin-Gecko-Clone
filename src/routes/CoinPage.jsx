import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from "react-icons/fa";
import DOMPurify from "dompurify";
import { Link, useParams } from "react-router-dom";

const CoinPage = () => {
  const [coin, setCoin] = useState({});
  const params = useParams();

  const COIN_API_URL = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

  useEffect(() => {
    axios.get(COIN_API_URL).then(res => {
      setCoin(res.data);
    });
  }, [COIN_API_URL]);

  const priceChangeColor = price => {
    let result = "";
    if (price < 0) result = "text-red-600";
    else result = "text-green-600";
    return result;
  };

  return (
    <main className="rounded-div mb-16 mt-36 py-4">
      {/* Coin Logo/Name */}
      <div className="flex py-8">
        <img
          className="w-20 mr-8"
          src={coin.image?.large}
          alt={`${coin.name} logo`}
        />
        <div>
          <p className="text-3xl font-bold">{coin?.name}</p>
          <p>{coin.symbol?.toUpperCase()} / EUR</p>
        </div>
      </div>

      {/********************/}
      {/********************/}
      {/* Coin Information */}
      {/********************/}
      {/********************/}

      {/* Grid Container */}
      <div className="grid md:grid-cols-2 gap-8">
        {/****************/}
        {/* Start Left Half  */}
        {/****************/}
        <div className="p-4">
          {/* Coin Current Price */}
          <div className="flex justify-between">
            {coin.market_data?.current_price ? (
              <p className="text-3xl font-bold">
                €{coin.market_data.current_price.eur.toLocaleString()}
              </p>
            ) : null}
            <p>7 Day</p>
          </div>

          {/* 7 day Sparkline Coin Price Evolution */}
          <div>
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>

          <div className="flex justify-between py-4">
            {/* Coin Market Cap */}
            <div>
              <p className="text-gray-500 text-sm">Market Cap</p>
              {coin.market_data?.market_cap ? (
                <p>€{coin.market_data.market_cap.eur.toLocaleString()}</p>
              ) : null}
            </div>

            {/* Coin Volume */}
            <div>
              <p className="text-gray-500 text-sm">Volume (24h)</p>
              {coin.market_data?.market_cap ? (
                <p>€{coin.market_data.total_volume.eur.toLocaleString()}</p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            {/* Coin 24h High Price */}
            <div>
              <p className="text-gray-500 text-sm">24h High</p>
              {coin.market_data?.high_24h ? (
                <p>€{coin.market_data.high_24h.eur.toLocaleString()}</p>
              ) : null}
            </div>

            {/* Coin 24h Low Price */}
            <div>
              <p className="text-gray-500 text-sm">24h Low</p>
              {coin.market_data?.low_24h ? (
                <p>€{coin.market_data.low_24h.eur.toLocaleString()}</p>
              ) : null}
            </div>
          </div>
        </div>
        {/******************/}
        {/* End Left Half  */}
        {/******************/}

        {/*********************/}
        {/* Start Right Half  */}
        {/*********************/}
        <div className="flex flex-col justify-between p-4">
          <p className="text-xl font-bold">Market Stats</p>
          <div className="flex justify-between py-4">
            {/* Market Rank */}
            <div>
              <p className="text-gray-500 text-sm">Market Rank</p>
              {coin.market_cap_rank}
            </div>

            {/* Hashing Algorithm */}
            <div>
              <p className="text-gray-500 text-sm">Hashing Algorithm</p>
              {coin.hashing_algorithm ? <p>{coin.hashing_algorithm}</p> : null}
            </div>

            {/* Trust Score */}
            <div>
              <p className="text-gray-500 text-sm">Trust Score</p>
              {coin.tickers ? <p>{coin.liquidity_score.toFixed(2)}</p> : null}
            </div>
          </div>

          {/* Price Changes Top */}
          <div className="flex justify-between py-4">
            {/* Price Change 24h */}
            <div>
              <p className="text-gray-500 text-sm">Price change (24h)</p>
              {coin.market_data ? (
                <p
                  className={priceChangeColor(
                    coin.market_data.price_change_percentage_24h
                  )}
                >
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              ) : null}
            </div>

            {/* Price Change 7 days */}
            <div>
              <p className="text-gray-500 text-sm">Price change (7d)</p>
              {coin.market_data ? (
                <p
                  className={priceChangeColor(
                    coin.market_data.price_change_percentage_7d
                  )}
                >
                  {coin.market_data.price_change_percentage_7d.toFixed(2)}%
                </p>
              ) : null}
            </div>

            {/* Price Change 14 days */}
            <div>
              <p className="text-gray-500 text-sm">Price change (14d)</p>
              {coin.market_data ? (
                <p
                  className={priceChangeColor(
                    coin.market_data.price_change_percentage_14d
                  )}
                >
                  {coin.market_data.price_change_percentage_14d.toFixed(2)}%
                </p>
              ) : null}
            </div>
          </div>

          {/* Price Changes Bottom */}
          <div className="flex justify-between py-4">
            {/* Price change (30d) */}
            <div>
              <p className="text-gray-500 text-sm">Price Change (30d)</p>
              {coin.market_data ? (
                <p
                  className={priceChangeColor(
                    coin.market_data.price_change_percentage_30d
                  )}
                >
                  {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                </p>
              ) : null}
            </div>

            {/* Price change (60d) */}
            <div>
              <p className="text-gray-500 text-sm">Price Change (60d)</p>
              {coin.market_data ? (
                <p
                  className={priceChangeColor(
                    coin.market_data.price_change_percentage_60d
                  )}
                >
                  {coin.market_data.price_change_percentage_60d.toFixed(2)}%
                </p>
              ) : null}
            </div>

            {/* Price change (1y) */}
            <div>
              <p className="text-gray-500 text-sm">Price Change (1y)</p>
              {coin.market_data ? (
                <p
                  className={priceChangeColor(
                    coin.market_data.price_change_percentage_1y
                  )}
                >
                  {coin.market_data.price_change_percentage_1y.toFixed(2)}%
                </p>
              ) : null}
            </div>
          </div>
        </div>
        {/*******************/}
        {/* End Right Half  */}
        {/*******************/}
      </div>

      {/* Coin Socials */}
      <div className="flex justify-around p-8 text-accent max-w-[570px] mx-auto">
        <a
          href={`https://twitter.com/${coin.links?.twitter_screen_name}`}
          target="_blank"
        >
          <FaTwitter size={20} />
        </a>
        <a href={coin.links?.subreddit_url} target="_blank">
          <FaReddit size={20} />
        </a>
        <a href={coin.links?.repos_url.github[0]} target="_blank">
          <FaGithub size={20} />
        </a>
      </div>

      {/********************/}
      {/********************/}
      {/* Coin Description */}
      {/********************/}
      {/********************/}
      <div className="p-4">
        <p className="text-xl font-bold mb-4">About {coin.name}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              coin.description ? coin.description.en : ""
            ),
          }}
        ></p>
      </div>
    </main>
  );
};

export default CoinPage;
