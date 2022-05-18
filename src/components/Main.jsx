import React from 'react'
import { useGetCoinsQuery } from '../responses/getCoinsApi'
 import millify from 'millify'
import  Cryptocurrencies from './Cryptocurrencies'
import News from './News'

const Main = () => {
const {data: getCoins,isFetching} = useGetCoinsQuery(9)

    if(isFetching) return <h1>'Loading...</h1>
  return (
   <div className='main_wrapper'>
       <div className='main_container'>
           <div className='main_crypto_info_box'>
               <h1>Global Cryptostats</h1>
               <div className="info_block">  
               <div>
                <div className="crypto_parameter">Total Cryptocurrencies</div>
                <div className="crypto_number">{millify(getCoins?.data?.stats?.totalCoins)}</div>
                </div>
                <div>
                <div className="crypto_parameter">Total Market Cap</div>
                <div className="crypto_number">{millify(getCoins?.data?.stats?.totalMarketCap)}</div>
                </div>
                <div>
                <div className="crypto_parameter">Total Markets</div>
                <div className="crypto_number">{millify(getCoins?.data?.stats?.totalMarkets)}</div>
                </div>
                <div>
                <div className="crypto_parameter">Total Exchanges</div>
                <div className="crypto_number">{millify(getCoins?.data?.stats?.totalExchanges)}</div>
                </div>
                <div>
                <div className="crypto_parameter">Total 24h Volume</div>
                <div className="crypto_number">{millify(getCoins?.data?.stats?.total24hVolume)}</div>
                </div>
               </div>
           </div>
           <h1 className='top_crypto_text'>Top 9 Cryptocurrencies in the world</h1>
           <Cryptocurrencies mainPage={true} />
           <h1>Last Crypto News</h1>
           <News mainPage={true}/>
       </div>
   </div>

  )
}

export default Main