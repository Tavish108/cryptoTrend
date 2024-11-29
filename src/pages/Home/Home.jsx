import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {

  const { allCoin = [], currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === ""){
      setDisplayCoin(allCoin)
    }
  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const SearchHandler = async (e) => {
    e.preventDefault();
    const filteredCoins = allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(filteredCoins);
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Largest Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace.</p>
        <form onSubmit={SearchHandler}>
          <input
            onChange={inputHandler} 
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search Crypto..."
            name="search"
            required
          />

          <datalist id='coinlist'>
            {allCoin.map((item,index)=>(<option key={index} value={item.name}/>)) }
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout header">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p>Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item,index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt={item.name} />
              <p>{`${item.name} (${item.symbol.toUpperCase()})`}</p>
            </div>
            <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {item.price_change_percentage_24h?.toFixed(2)}%
            </p>
            <p className="market-cap">
              {currency.symbol}{item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
