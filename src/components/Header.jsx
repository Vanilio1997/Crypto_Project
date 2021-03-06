import React ,{useEffect, useState} from 'react'
import {Link } from 'react-router-dom';



const Header = () => {
 
const [headState, setHeadState] = useState({
  activeMenu:0,
  headItemInfo:[
    {id:0,iconStyle:'fa fa-home',name:'Home',to:'/'},
    {id:1,iconStyle:'fa fa-bar-chart',name:'Cryptocurrencies',to:'/cryptocurrencies'},
    {id:2,iconStyle:'fa fa-money',name:'Converter',to:'/exchanger'},
    {id:3,iconStyle:'fa fa-newspaper-o',name:'News',to:'/news'},
]
})

const[hamburgerMenu , setHamburgerMenu] = useState(false);
function toggleActive(index){
  setHeadState({...headState,activeMenu:headState.headItemInfo[index].id})
}

useEffect(()=>{
  if (typeof localStorage.getItem('headerItem') !== 'object'){
setHeadState({...headState,activeMenu:(JSON.parse(window.localStorage.getItem('headerItem')))})
}
},[])

useEffect(()=>{
  window.localStorage.setItem('headerItem' , headState.activeMenu)
},[headState.activeMenu])
  return (
      <>
   <div className='header_wrapper'>
       <div className='header_container'>
       <div className='header_logo_name'>
       <h1 >Crypto Universe</h1>
       <i className="fa fa-btc fa-4x" aria-hidden="true"></i>
       </div>
       <div 
       className="openMenu" 
       onClick={() =>setHamburgerMenu(true)}>
         <i className="fa fa-bars"></i>
         </div>
       <div className={hamburgerMenu? 'header_site_navigate header_site_navigate_hamburgerMenu':'header_site_navigate'}>
         { headState.headItemInfo.map((item,index) =>
       <Link 
       key={item.id} 
       to= {item.to} 
       className={headState.headItemInfo[index].id === headState.activeMenu ? 'activeHeaderItem' : 'notActiveHeaderItem'}

       onClick={() => {toggleActive(index)}}
       >
       <i className={item.iconStyle}  
       aria-hidden="true"></i>
        <p >{item.name}</p>
       </Link>)}
       <div 
       className="closeMenu" 
       onClick={() =>setHamburgerMenu(false)}>
         <i className="fa fa-times"></i></div>
       </div>
       </div>
   </div>

</>

  )
}

export default Header