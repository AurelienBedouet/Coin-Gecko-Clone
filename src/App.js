import React, {useEffect, useState} from "react";
import {ThemeProvider} from "./context/ThemeContext";
import {AuthContextProvider} from "./context/AuthContext";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Account from "./routes/Account";
import CoinPage from "./routes/CoinPage";
import axios from "axios";

function App() {
  const [coins, setCoins] = useState([]);

  const COINS_API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=true";

  useEffect(() => {
    axios.get(COINS_API_URL).then(res => {
      setCoins(res.data);
    });
  }, [COINS_API_URL]);

  return (
    <ThemeProvider>
      <AuthContextProvider>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home coins={coins} />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/coin/:coinId" element={<CoinPage />}>
            <Route path=":coinId" />
          </Route>
        </Routes>

        <Footer />

      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
