/* eslint-disable array-callback-return */
import React,{useEffect} from 'react'
import {useGetNewsQuery} from '../responses/getCryptoNewsApi';
import {useGetCoinsQuery} from '../responses/getCoinsApi';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {setSelectNews} from '../reducers/newsSelect';


const News = ({mainPage}) => {
 const handleNewsSelector = useSelector(state=>state.handleNewsSelect.newsSelect);
  const {data: getNews , isFetching} = useGetNewsQuery( {  coinType:handleNewsSelector, count:mainPage?6:12})
  const {data:getCoins} = useGetCoinsQuery(100)

const dispatch = useDispatch();

useEffect(()=>{
  if(mainPage){
  dispatch(setSelectNews('Cryptocurrencies'))}
},[getNews])
debugger

  if(isFetching) return <h1>Loading...</h1>
  return (


    
    <>
    {!mainPage&&(

    <div className='news_header'> 
      <h1>Cryptocurrencies news</h1>
      <p  className='select_box_info'> On this page you can select crypto and read news about this crypto</p>
      <div className='select_box'>
      <p>Select ctypto</p>
    <select   
    onChange={(e) =>  dispatch(setSelectNews(e.target.value))}>
      <option value='Cryptocurrency'>Cryptocurrency</option>
    {getCoins?.data?.coins.map((coin) =>coin.name === handleNewsSelector?<option value={coin.name} selected> {coin.name}</option>:<option value={coin.name}> {coin.name}</option>)}
    </select>
    </div>
    <h3>{handleNewsSelector} news</h3>
    </div>
    )}
    <div className='content-wrapper'>
     {getNews?.value.length ?
       getNews?.value.map((news)=>(
        <div className="news-card">
        <a href="#" className="news-card__card-link"/>
        <img src= {news?.image?.thumbnail?.contentUrl} alt="" class="news-card__image" />
        <div className="news-card__text-wrapper">
          <h2 className="news-card__title">{news.name}</h2>
          <div className="news-card__post-date">{news.datePublished}</div>
          <div className="news-card__details-wrapper">
            <p className="news-card__excerpt">{news.description}</p>
            <a href={news.url} className="news-card__read-more">Read more <i className="fas fa-long-arrow-alt-right"></i></a>
          </div>
        </div>
      </div>
     
)):
<h1>No news yet</h1>
}
    </div>
    </>)
    }

export default News 