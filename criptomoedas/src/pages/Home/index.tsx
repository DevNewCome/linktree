import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

interface CoinProps {
  name: string;
  delta_24h: string;
  formatedPrice: number;
  symbol: string;
  volume_24h: string;
  formatedMarket: number;
}

export default function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          "https://sujeitoprogramador.com/api-cripto/?key=30af8872bfec190c"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const DataCoins = data.coins.slice(0, 15);

        const price = Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const formatResult = DataCoins.map(
          (item: { price: number; market_cap: number }) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
            };
            return formated;
          }
        );
        console.log(formatResult);
        setCoins(formatResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      /*fetch('https://sujeitoprogramador.com/api-cripto/?key=30af8872bfec190c')
        .then((response) => response.json())
        .then((data) => {
            let coins = data.coins.slice(0,15)
            
   
        console.log(formatResult)
        setCoins(coins)
        })*/
    }
    console.log(coins);
    getData();
  }, []);


  function handleSearch(e: FormEvent){
    e.preventDefault()
        if(inputValue === ''){
            return
        }
        navigate(`/detail/${inputValue}`)
  }

  return (
    <main className={styles.container}>
      <form action="" className={styles.form}  onSubmit={handleSearch}>
        <input type="text" value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="digite o simbolo da moeda: BTC..." />
        <button type="submit">
          <BiSearch size={30} color="#FFF" />
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {coins.map((coin, i) => (
            <tr key={i} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>
              <td className={styles.tdLabel} data-label="Mercado">
                {coin.formatedMarket}
              </td>
              <td className={styles.tdLabel} data-label="Preco">
                {coin.formatedPrice}
              </td>
              <td className={
                          Number(parseFloat(coin?.delta_24h)) >= 0
                          ? styles.tdProfit
                          : styles.tdLoss
                       } data-label="Volume">
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
