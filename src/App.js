import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css' 
import Main from './components/Main'
import {Route ,Routes} from 'react-router-dom';
import Cryptocurrencies from './components/Cryptocurrencies'
import Exchanger from './components/Exchanger'
import News from './components/News'
import  CryptoInfo  from './components/CryptoInfo';

const App = () => {
  return (
      <>
 <Header />
 <Routes>
       <Route path='/' element={<Main />} />
       <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
       <Route path='/exchanger' element={<Exchanger />} />
       <Route path='/news' element={< News/>} />
       <Route path='/crypto/:coinId' element={<CryptoInfo />} />
   </Routes>
   <Footer />
</>
  )
}

export default App