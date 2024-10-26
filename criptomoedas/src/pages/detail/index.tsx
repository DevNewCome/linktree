import styles from './detail.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Detail() {
  interface coinProp {
    symbol: string;
    name: string;
    price: string;
    market_cap: string;
    low_24h: string;
    high_24h: string;
    total_volume_24h: string;
    delta_24h: string;
    formatedPrice: string;
    formatedMarket: string;
    formatedLowPrice: string;
    formatedHighPrice: string;
    deltanumber: number;
    rank: string;
    error?: string;
  }

  const { cripto } = useParams();
  const [detail, setDetail] = useState<coinProp>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=30af8872bfec190c&pref=BRL&symbol=${cripto}`)
        .then((response) => response.json())
        .then((data: coinProp) => {
          if (data.error) {
            console.error('Error in API response:', data.error);
            navigate('/');
          } else {
            let price = Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            });

            const resultData = {
              ...data,
              formatedPrice: price.format(Number(data.price)),
              formatedMarket: price.format(Number(data.market_cap)),
              formatedLowPrice: price.format(Number(data.low_24h)),
              formatedHighPrice: price.format(Number(data.high_24h)),
              deltanumber: parseFloat(data.delta_24h.replace(',', '.'))
            };

            setDetail(resultData);
            setLoading(false);
            console.log('API Data:', resultData);
          }
        })
        .catch((error) => {
          console.error('Error during API fetch:', error);
          navigate('/');
        });
    }
    getData();
  }, [cripto, navigate]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.center}>Carregando informações</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{detail?.name}</h1>
      <p className={styles.center}>{detail?.symbol}</p>
      <section className={styles.content}>
        <p>
          <strong>Price:</strong>
          {detail?.formatedPrice}
        </p>
        <p>
          <strong>Higher at 24 hours:</strong>
          {detail?.formatedHighPrice}
        </p>
        <p>
          <strong>lowest at 24 hours:</strong>
          {detail?.formatedLowPrice}
        </p>
        <p>
          <strong>Delta 24 Hours:</strong>
          <span className={detail?.deltanumber && detail?.deltanumber >= 0 ? styles.profit : styles.loss}>
            {detail?.delta_24h}
          </span>
        </p>
        <p>
          <strong>Valor mercado:</strong> {detail?.formatedMarket}
        </p>
        <p>
          <strong>Ranking coin:</strong> {detail?.rank}
        </p>
      </section>
    </div>
  );
}
