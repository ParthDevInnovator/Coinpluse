import React from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { CoinOverviewFallback } from './fallback';
import { fetcher } from '@/lib/coingetko.actions';
import { interval } from 'date-fns';
import Candlestickchart from '../CandlestickChart';


const CoinOverview = async () => {
  let coin;
  let coinOHLCdata;

  try {
    [coin, coinOHLCdata] = await Promise.all([
      fetcher<CoinDetailsData>('/coins/bitcoin', {
        dex_pair_format: 'symbol',
      }),
      fetcher<OHLCData>('/coins/bitcoin/ohlc', {
        vs_currency: 'usd',
        days: 1,
        interval: 'hourly',
        precision: 'full',
      }),
    ]);
    return (
    <div id="coin-overview">
      <Candlestickchart data={coinOHLCdata} coinId="bitcoin">
          <div className="header pt-2">
        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
        <div className="info">
          <p>
            {coin.name} / {coin.symbol.toUpperCase()}
          </p>
          <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
        </div>
      </div>
      </Candlestickchart>
      
    </div>
  );

  } catch (error) {
    console.error('Error fetching coin overview:', error);
    return <CoinOverviewFallback />;
  }

};


export default CoinOverview;