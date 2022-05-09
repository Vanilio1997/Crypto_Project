import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    timePeriod : '3h',
    timePeriodChange: ['3h', '24h', '7d', '30d','3m', '1y',  '3y', '5y']
}


export const cryptoHistoryInformation = createSlice({
    name: 'cryptoInfo',
    initialState,
    reducers:{
        timePeriod:(state,action)=>{
                state.timePeriod =  action.payload
        },
    },
})

export const {timePeriod} =cryptoHistoryInformation.actions
export default cryptoHistoryInformation.reducer