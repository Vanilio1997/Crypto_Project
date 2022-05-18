import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer_wrapper'>
        <div className='footer_container'>
        <h3>Crypto Universe</h3>
        <div className='footer_link'>
            <Link to={'/'}>Home</Link>
            <Link to={'/cryptocurrencies'}>Cryptocurrencies</Link>
            <Link to={'/exchanger'}>Converter</Link>
            <Link to={'/news'}>News</Link>
        </div>
        </div>
    </div>
  )
}

export default Footer