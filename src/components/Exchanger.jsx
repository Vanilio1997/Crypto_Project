import React, { useEffect } from 'react'
import { useGetCurrencyValueQuery } from '../responses/getСurrencyPrice';
import { useGetCoinsQuery } from '../responses/getCoinsApi';
import { useGetAllCurrencyValueQuery } from '../responses/getAllCurrency'
import { useDispatch,useSelector } from 'react-redux';
import { setChangeType, getCurrency,getCrypto,getToValue,getFromValue,getFromType,getToType,changeFromMoney, cryptoCurrency} from '../reducers/CryptoShop';



const Exchanger = () => {
  const [skip, setSkip] = React.useState(true)
  let valueFromInput = useSelector(state=>state.cryptoCurrency.getFromValue);
  const valueToInput = useSelector(state => state.cryptoCurrency.getToValue);
  const startFromType = useSelector (state=>state.cryptoCurrency.getFromType);
  const typeToCoin = useSelector (state=> state.cryptoCurrency.getToType);
  const changeType = useSelector(state=>state.cryptoCurrency.changeType);
  const changeFromMoneya = useSelector(state=>state.cryptoCurrency.changeFromMoney)
  const {data:getAllCurrency } = useGetAllCurrencyValueQuery();
  const {data:getCurrencyValue} = useGetCurrencyValueQuery({from:startFromType,to:'USD',number:+valueFromInput},{
    skip,
  })
  const {data: getAllCryptoCoins,isFetching} = useGetCoinsQuery(100);


 function getResponse(){
  setSkip(false);
 dispatch(changeFromMoney(!changeFromMoneya))
  }

  function stopResponse(e){
    dispatch(getFromValue(e.target.value));
    setSkip(true);
  }
const dispatch = useDispatch();
const arrayGetAllCurrncy = [];
if(getAllCurrency){
for (let value of Object.entries(getAllCurrency.currencies)) {
  arrayGetAllCurrncy.push(value)
}}
if( arrayGetAllCurrncy.length  && getAllCryptoCoins && !startFromType){
  // eslint-disable-next-line no-lone-blocks
  dispatch(getFromType( arrayGetAllCurrncy[0][0])) 
  dispatch (getToType(getAllCryptoCoins.data.coins[0].name))
}

function choiseCrypto(){
  dispatch(setChangeType('Crypto'))
}
function choiseMoney(){
  dispatch(setChangeType('Money'))
}

  const exchangeGetType = useSelector(state=>state);
  console.log(exchangeGetType.cryptoCurrency.changeFromMoney);

  if(valueFromInput){
  valueFromInput =  valueFromInput.split('').filter(item => parseInt(item.charAt(0))).join('');}

useEffect(()=>{
  console.log('ПОСЛЕ---------->'+ startFromType);
  if(changeType === 'Money'){
const coinToChangePrice = getAllCryptoCoins?.data?.coins.filter(item => item.name === typeToCoin )
debugger
  if(getCurrencyValue && coinToChangePrice && startFromType.length===3){
    console.log(getCurrencyValue , valueFromInput)
    console.log('ПОСЛЕ---------->'+ startFromType);
    console.log(valueFromInput)
    debugger
dispatch(getToValue(getCurrencyValue?.result.USD / +coinToChangePrice[0]?.price))}} 
else{
  const coinToChangePrice = getAllCryptoCoins?.data?.coins.filter(item => item.name === typeToCoin )
  const coinFromChangePrice = getAllCryptoCoins?.data?.coins.filter(item => item.name === startFromType )

  dispatch(getToValue(+coinFromChangePrice[0]?.price * valueFromInput / +coinToChangePrice[0]?.price))
}
},[changeFromMoneya])

useEffect(()=>{
if(  changeType==='Crypto'){
  dispatch(getFromType( getAllCryptoCoins?.data?.coins[0].name))
} else if( arrayGetAllCurrncy.length && changeType==='Money'){
  dispatch(getFromType( arrayGetAllCurrncy[0][0]))
}
},[changeType])

useEffect(()=>{
  if(changeType === 'Money'){
  arrayGetAllCurrncy.forEach(item => {
    if(item[1] === startFromType){
      dispatch(getFromType(item[0]))
    }
  })} 
  dispatch(getFromValue(''));
  dispatch(getToValue(''));
},[startFromType])

useEffect(()=>{

if(getAllCryptoCoins && arrayGetAllCurrncy){
dispatch(getCurrency(arrayGetAllCurrncy));
dispatch(getCrypto(getAllCryptoCoins?.data?.coins))
}
// eslint-disable-next-line react-hooks/exhaustive-deps
},[getAllCryptoCoins,getAllCurrency])

if(isFetching) return<h1>Loading...</h1>
  return (
    
    <div className='convert_wrapper'>
      <h1>Сryptocurrency converter</h1>
      <h3 className=''>Change for money or for cryptocurrency?</h3>
      <div className='crypto_change_box'>
      <div  className= {changeType === 'Money' ? 'money_crypto_box active_box' :'money_crypto_box' }
      onClick={() => choiseMoney()} >
          <div  className='payment_type'>Money</div>
          <i className="fa-solid fa-sack-dollar"></i>
        </div>
      
        <div
        className= {changeType === 'Crypto' ? 'money_crypto_box active_box' :'money_crypto_box' }
        onClick={() => choiseCrypto()}>
      <div  className='payment_type'>Crypto</div>
      <i className="fa-brands fa-bitcoin"></i>
      </div>
    </div>
    <div className='change_block_wrapper'>
    <div className='change_block change_block_margin'>
      <div>
  Amount
    <input
        type="text"
        value={valueFromInput}
        onChange={(e) => stopResponse(e)} />
    </div>
        <div>
          From
        <select         
          onChange={(e) => dispatch(getFromType(e.target.value))}
        >
          {changeType === 'Money'?
          getAllCurrency && Object.values(getAllCurrency?.currencies).map((currency) => (
            <option value={currency}>{currency}</option>
          )) :
          getAllCryptoCoins?.data?.coins?.map((cryptoCoinName) => (
            <option value={cryptoCoinName.name}>{cryptoCoinName.name}</option>
          ))}
        </select>        
        </div>
       </div>
       <div className='change_block change_block_margin'>
         <div>
     Amount
      <input type="text" value={valueToInput} />
      </div>
      <div>
      To
      <select onChange={(e) => dispatch(getToType(e.target.value))}>
        {getAllCryptoCoins?.data?.coins?.map((cryptoCoinName) => (
          <option value={cryptoCoinName.name}>{cryptoCoinName.name}</option>
        ))}
      </select>
      </div>
      </div>
      </div>
      <button 
      className='converter_btn'
      onClick={() => getResponse()}>Exchange</button>
</div>

  )
}

export default Exchanger
