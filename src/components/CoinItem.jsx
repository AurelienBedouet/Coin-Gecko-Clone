import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const CoinItem = ({ coin }) => {
  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = UserAuth();
  const coinPath = doc(db, "users", `${user?.email}`);

  // When Coin is saved by clicking on the star symbol,
  // coin data is sent in the user's watchList Array of the firestore database
  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
    } else {
      alert("Please sign in to save a coin to your watch list");
    }
  };

  return (
    <tr className="h-[80px] border-b overflow-hidden">
      {/* Star Symbol used to save Coin to the watchlist */}
      <td onClick={saveCoin}>
        {savedCoin ? <AiFillStar /> : <AiOutlineStar />}
      </td>

      {/* Coin market Cap Rank */}
      <td>{coin.market_cap_rank}</td>

      {/* Coin Image and Name // Clicking on it link to the coin page */}
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className="flex items-center">
            <img
              className="w-6 mr-2 rounded-full"
              src={coin.image}
              alt={coin.id}
            />
            <p className="hidden sm:table-cell">{coin.name}</p>
          </div>
        </Link>
      </td>

      {/* Coin symbol */}
      <td>{coin.symbol.toUpperCase()}</td>

      {/* Coin Current Price */}
      <td>€{coin.current_price.toLocaleString()}</td>

      {/* Coin price change (in percentage) in the last 24hours */}
      <td>
        {coin.price_change_percentage_24h < 0 ? (
          <p className="text-red-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-green-600">
            +{coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>

      {/* Coin Total Volume last 24hours */}
      <td className=" w-[150px] hidden md:table-cell">
        €{coin.total_volume.toLocaleString()}
      </td>

      {/* Coin Market Cap */}
      <td className="w-[150px] hidden sm:table-cell">
        €{coin.market_cap.toLocaleString()}
      </td>

      {/* Sparkline showing price evolution in the last 7 days */}
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
