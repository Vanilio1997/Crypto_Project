
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    changeType: 'Money',
    getСurrency: {},
    getСrypto: {},
    getFromValue: '',
    getToValue: '',
    getFromType: '',
    getToType: '',
    changeFromMoney: false,
    
}

export const cryptoCurrency = createSlice({
    name: 'coinInput',
    initialState,
    reducers:{
        setChangeType:(state,action)=>{
                state.changeType =  action.payload
        },
        getCurrency:(state,action)=>{
                state.getСurrency =  action.payload
        },
        getCrypto:(state,action)=>{
                state.getСrypto =  action.payload
        },
        getFromValue:(state,action)=>{
                state.getFromValue =  action.payload
        },
        getFromValueUSD:(state,action)=>{
                state.getFromValue =  action.payload
        },
        getToValue:(state ,action)=>{
                state.getToValue =  action.payload
        },
        getFromType:(state,action)=>{
                state.getFromType = action.payload
              }
                ,
       getToType:(state,action)=>{
                state.getToType =  action.payload
        },
        changeFromMoney:(state,action) =>{
                state.changeFromMoney = action.payload
        }
    },
})

export const {setChangeType,getCurrency,getCrypto,getFromValue,getToValue,getFromType,getToType,getFromValueUSD,changeFromMoney} = cryptoCurrency.actions
export default cryptoCurrency.reducer