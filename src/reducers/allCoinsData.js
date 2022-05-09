import { createSlice,current } from "@reduxjs/toolkit";

const initialState = {
    coinsData: [],
    currentPage: 1,
}

 export const coinsData = createSlice ({
        name: 'coinData',
        initialState,
        reducers:{
            setFilterData:(state,action)=>{
                state.coinsData =  [];
                state.coinsData = action.payload;
            },
            setAllCoinsData:(state,action) =>{
              let currentPageData =  action.payload.filter((elem,index) => index >= action.payload.length/5*state.currentPage - 20  && index <action.payload.length /5*state.currentPage);
              debugger
              console.log(action.payload);
              state.coinsData = []
              currentPageData.forEach( item => state.coinsData.push(item))
        
            },
        setCurrentPage:(state,action)=>{
            state.currentPage = action.payload;
        },
        setdecrementPage:(state)=>{
            console.log("Work decrement")
            if(state.currentPage > 1){
            state.currentPage = state.currentPage - 1;}
        },
        setincrementPage:(state)=>{
           console.log("Work increment")
            if(state.currentPage < 5){
            state.currentPage++;}
        },
        setFirstPage:(state)=>{
        state.currentPage = 1;
        },
        setLastPage:(state)=>{
        state.currentPage = 5;
        },
    }
 })


 export const {setAllCoinsData ,setCurrentPageCoins,setCurrentPage,setdecrementPage,setincrementPage,setFirstPage,setLastPage,setFilterData} = coinsData.actions
 export default coinsData.reducer