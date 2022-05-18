/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sequences */
import React,{ useEffect,useState } from 'react'
import { useGetCoinsQuery } from '../responses/getCoinsApi'
import millify from 'millify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {setCoinInput} from '../reducers/handelCoinInput';
import {setAllCoinsData,setCurrentPage,setdecrementPage,setLastPage,setFirstPage,setincrementPage,setFilterData} from '../reducers/allCoinsData';




const Cryptocurrencies = ({mainPage}) => {


const count = mainPage ? 9 : 100
  const {data: getCoin ,isFetching} = useGetCoinsQuery(count);
  const handleInputText = useSelector(state=>state.handelCoinInput.coinInput);
  const dispatch = useDispatch();
  const coinsData = useSelector(state=>state.coinsData.coinsData)
  const currentPage =useSelector(state=>state.coinsData.currentPage);
  const a = useSelector(state=>state)

  const [pageState, setPageState] = useState({
    activePage:0,
    pageItemInfo:[
      {id:0,pageNumber:1},
      {id:1,pageNumber:2},
      {id:2,pageNumber:3},
      {id:3,pageNumber:4},
      {id:4,pageNumber:5},
  ]
  })


function incrementPage(){
  if(pageState.activePage<4){
    console.log(pageState.activePage)
  setPageState( prevState => ({
    ...prevState ,
    activePage: prevState.activePage + 1,
   }))}
  dispatch(setincrementPage());
}
function decrementPage(){
  if(pageState.activePage>0){
    console.log(pageState.activePage)
  setPageState( prevState => ({
    ...prevState ,
    activePage: prevState.activePage - 1,
   }))}
   dispatch(setdecrementPage())
}
function firstPage(){
  setPageState( prevState => ({
    ...prevState ,
    activePage: 0,
   }))
   console.log(pageState.activePage)
   dispatch(setFirstPage())
  }

function lastPage(){
  setPageState( prevState => ({
    ...prevState ,
    activePage: 4,
   }))
   dispatch(setLastPage())
  }

  function toggleActive(index){
  setPageState({...pageState,activePage:pageState.pageItemInfo[index].id})
  dispatch(setCurrentPage(index+1))
  }



useEffect(()=>{
  setPageState( prevState => ({
    ...prevState ,
    activePage: currentPage - 1,
   }))
  },[])

  useEffect(()=>{
    if(getCoin && getCoin?.data?.coins && !mainPage){
      console.log(1234)
  dispatch(setAllCoinsData(getCoin?.data?.coins))}
   else if(getCoin){
    dispatch(setFilterData(getCoin?.data?.coins))}
  }
  ,[getCoin]);

  useEffect(()=>{
    if(getCoin && !mainPage){
   dispatch(setAllCoinsData(getCoin?.data?.coins))
  }}
  ,[currentPage])


  useEffect(()=>{
    if(handleInputText && getCoin && !mainPage){
      console.log(handleInputText);
  const filtredData = getCoin?.data?.coins.filter((elem) => elem.name.toLowerCase().includes(handleInputText.toLowerCase()))  
  dispatch(setAllCoinsData(filtredData))} 
    else if(getCoin && getCoin?.data?.coins && !handleInputText && !mainPage){
    dispatch(setAllCoinsData(getCoin?.data?.coins))
    
  }}
  ,[ handleInputText])

  if(isFetching && !coinsData.length) return <h1>Loading...</h1>


  return (
    <>
    <div className='crypto_wrapper'>
      {mainPage?
      null:
      <div className='crypto_input_wrapper'>
      <input value={handleInputText}  onChange={(e) => dispatch(setCoinInput(e.target.value)) } type='search' placeholder='Search...' style={{textAlign:'center'}}></input>
      </div>  
    }
      <div className='crypto_wrapper_margin'>
{  
  coinsData && coinsData.length ?
  coinsData.map((item,index) => (
        <div key={index} 
        style={{color:'black'}}
        className='crypto_element_container'>
          <Link to={`/crypto/${item?.uuid}`}> 
          <div className='crypto_element'>
          <div className='crypto_element_head'>
            <div className='crypto_name'>{item?.rank}. {item?.name} </div>
            <div className='crypto_logo'> <img src={item?.iconUrl} alt="" /></div>
            </div>

          <div className='crypto_element_footer'>
            Price: {millify(item?.price)}$ <br/>
            Market cap:  {millify(item?.marketCap)} <br />
            DailyChange:  {millify(item?.change)}%
            </div>
          </div>
          </Link>
           </div>
      )):
      null
}
    </div>
    { !mainPage?
<div className='pagination_count_wrapper'>
<i class="fa-solid fa-angles-left" onClick={() => firstPage()}></i>
<i class="fa-solid fa-angle-left" onClick={() => decrementPage()}></i>
{pageState.pageItemInfo.map((item,index)=>(
<div 
className={pageState.pageItemInfo[index].id === pageState.activePage ? 'page_number_active' : 'page_number_no_active'}
key={item.id} 
data-value={item.pageNumber} 
onClick={()=> toggleActive(index)}
>
  {item.pageNumber}</div>
))}
<i class="fa-solid fa-angle-right" onClick={() => incrementPage()}></i> 
<i class="fa-solid fa-angles-right" onClick={() => lastPage()}></i>
<i class="icon-btc"></i>
    </div>:
    null
}
    </div>
    </>
  )
}

export default Cryptocurrencies