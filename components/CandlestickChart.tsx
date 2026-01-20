'use client'

import { getCandlestickConfig, getChartConfig, PERIOD_BUTTONS, PERIOD_CONFIG } from "@/constants"
import { fetcher } from "@/lib/coingetko.actions";
import { convertOHLCData } from "@/lib/utils";
import { CandlestickSeries, createChart, IChartApi, ISeriesApi, OhlcData } from "lightweight-charts";
import { useEffect, useRef, useState, useTransition } from "react";

const  Candlestickchart=({
  children,
  data,
  coinId,
  height=360,
   initialPeriod='daily',
  }:CandlestickChartProps)=> {
    const charContainerRef=useRef<HTMLDivElement | null>(null);
    const chartRef=useRef<IChartApi | null>(null); 
    const candleSeriesRef=useRef<ISeriesApi<'Candlestick'> | null>(null);
    const [ohlcData,setOhlcData]=useState<OHLCData[]>(data ??[]);
    const [isPending,setTransition]=useTransition();

    const fetchOHLCData= async(selectedPeriod:Period)=>{
      try {
        const {days,interval} = PERIOD_CONFIG[selectedPeriod];
       const newData= await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`,{
          vs_currency:'usd',
          days,
          interval,
          precision:'full',
        });
        setOhlcData(newData?? []);
        
      } catch (e) {
        console.log('Failed to fetch OHLCData',e);
      }
    }
    const [loading ,setloading]=useState(false);
    const [period,setperiod]=useState(initialPeriod);
    const handlePeriodChange = (newPeriod:Period)=>{
      if(newPeriod===period)
        return ;
      setTransition(async()=>{
        setPeriod(newPeriod);
        await fetchOHLCData(newPeriod);
      })
    }
    useEffect(()=>{
      const container=charContainerRef.current;
      if(!container) return ;
      const showTime=['daily','weekly','monthly'].includes(period)
      const chart=createChart(container,{
        ...getChartConfig(height,showTime),
        width:container.clientWidth,
      });
      const series=chart.addSeries(CandlestickSeries,getCandlestickConfig());
      series.setData(convertOHLCData(ohlcData));
    },[height]);
  return (
    <div id="candlestick-chart">
       <div className="chart-header">
        <div className="flex-1">{children}</div>
        <div className="button-group">
          <span className="text-sm mx-2 font-medium text-pruple-100/50">Period:</span>
          {PERIOD_BUTTONS.map(({value,label})=>(
              <button key={value} className={period===value?'config-button-active':'config-button'}
               onClick={()=>handlePeriodChange(value)}
            disabled={loading}>
            {label}
          </button>
          ))}
          
        </div>
       </div>
       <div ref={charContainerRef} className="chart" style={{ height }} />
    </div>
  )
}

export default Candlestickchart
