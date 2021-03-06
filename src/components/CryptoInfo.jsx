import { useParams } from "react-router-dom";
import { useGetCoinInfoQuery ,useGetCryptoHistoryQuery} from "../responses/getCryptoInfo";
import millify from 'millify';
import { useDispatch,useSelector } from "react-redux";
import HTMLReactParser from 'html-react-parser';
import { LineChart } from "./LineChart";
import { timePeriod } from "../reducers/cryptoInfo";



 const CryptoInfo = () => {
    const dispatch = useDispatch();

    const {coinId} = useParams();
    const allTime = useSelector(state=>state.cryptoHistoryInformation.timePeriodChange)
    const cryproPeriod = useSelector(state=>state.cryptoHistoryInformation.timePeriod)
    const {data:getCoinInfo, isFetching} = useGetCoinInfoQuery(coinId);
    const {data:cryptoPrice} = useGetCryptoHistoryQuery({id:coinId,period:cryproPeriod} );
    const cryptoDetails = getCoinInfo?.data?.coin;
   const price = cryptoPrice?.data?.history[cryptoPrice?.data?.history.length-1].price;
    if (isFetching) return <h1>Loading...</h1>

    const cryptoInfo = [
        {logo: 'fa-solid fa-sack-dollar',text:'Price to USD', value :cryptoDetails?.price && millify(cryptoDetails?.price) +'$'},
        {logo: 'fa-solid fa-trophy',text:'Rank', value : cryptoDetails.rank},
        {logo: 'fa-solid fa-bolt-lightning',text:'24 Volume', value :price && millify(price) +'$'},
        {logo: 'fa-solid fa-sack-dollar',text:'Market Cap', value :cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)},
        {logo: 'fa-solid fa-arrow-up-right-dots',text:'All-time-high(daily avg.)', value :cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price) +'$'},
    ]
    const cryptoStat = [
        {logo: 'fa-solid fa-chart-column',text:'Number Of Markets', value :cryptoDetails?.numberOfMarkets},
        {logo: 'fa-solid fa-arrow-right-arrow-left',text:'Number Of Exchanges', value :cryptoDetails?.numberOfExchanges},
        {logo: 'fa-solid fa-arrow-right-arrow-left',text:'Aprroved Supply', value :cryptoDetails?.supply?.confirmed ? 
        <i class="fa-solid fa-check"></i>:
       <i class="fa-solid fa-xmark"></i>},
        {logo: 'fa-regular fa-circle-exclamation',text:'Total Supply', value :'$'+cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)},
        {logo: 'fa-regular fa-circle-exclamation',text:'Circulating Supply', value :'$'+cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)},
    ]
  return (
    <div className="cryptoInfo_wrapper">
    <div className="coinChart_Wrapper">
            <h1>{cryptoDetails?.name} ({cryptoDetails?.symbol}) Price</h1>
           <p> {cryptoDetails?.name} live price in US dollars. View value statistics ,marcet cap and supply.</p>
           <h3>Pick Period</h3> <select onChange={(e)=> dispatch(timePeriod(e.target.value))}>
               {allTime.map((time)=>(
                   <option>{time}</option>
               ))}
           </select>
           
           <div className="priceChart_head">
           <h1>{cryptoDetails?.name} Price Chart</h1>
           <div className="priceChart_stats">
           <p>Current {cryptoDetails?.name} price: {cryptoDetails?.price && millify(cryptoDetails?.price)} </p>
           <p>Change {cryptoPrice?.data?.change}% </p>
           </div>
           </div>
           <LineChart  coinHistory={cryptoPrice} />
        </div>
        <div className="cryptoInfo_stats">
            <div className="cryptoInfo">
               <h1> {cryptoDetails?.name} Value stats</h1> 
               <p>
             An ovierview showing the stats of  {cryptoDetails?.name}
           </p>
           {
               cryptoInfo.map((item,index) =>(
                <div  
                key={index} 
                className="cryptoStat_elem">
                <div className="cryptoStat_elemLogoInfo">
                <i class={item.logo}></i>
                {item.text}
                </div>
                <span className="cryptoState_elemValue">{item.value}</span>
            </div>
               ))
           }
            </div>
            <div className="cryptoInfo">
               <h1>Other Statistics</h1> 
               <p>
               An ovierview showing the stats of all cryptocurrencies
           </p>
           {
               cryptoStat.map((item,index) =>(
                <div
                key={index} 
                className="cryptoStat_elem">
                <div className="cryptoStat_elemLogoInfo">
                <i class={item.logo}></i>
                {item.text}
                </div>
                <span className="cryptoState_elemValue">{item.value}</span>
            </div>
               ))
           }
            </div>
        </div>
        <div className="cryptoInfo_block">
            <div className="cryptoInfoText">
       <h1 > What is {cryptoDetails?.name}?</h1>
        {HTMLReactParser(cryptoDetails?.description)}
            </div>
            <div className="cryptoLink crypto_block">
                <h1>{cryptoDetails.name} Links</h1>
                { cryptoDetails.links.map((link)=>
                <div className="cryptoStat_elem ">
                    <div className="link_type">{link.type}</div>
                    <a href={link.url} target='_blank' className="link">{link.name}</a>
                </div>)}
            </div>

        </div>
    </div>
  )
}


export default CryptoInfo
