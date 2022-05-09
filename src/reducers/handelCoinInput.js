import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    coinInput: '',

}

export const handleCoinInput = createSlice({
    name: 'coinInput',
    initialState,
    reducers:{
        setCoinInput:(state,action)=>{
                state.coinInput =  action.payload
        },
    },
})

export const {setCoinInput} = handleCoinInput.actions
export default handleCoinInput.reducer