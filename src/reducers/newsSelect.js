import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    newsSelect: 'Cryptocurrency',

}

export const handleNewsSelect = createSlice({
    name: 'newsSelect',
    initialState,
    reducers:{
        setSelectNews:(state,action)=>{
                state.newsSelect =  action.payload
        },
    },
})

export const {setSelectNews} =handleNewsSelect.actions
export default handleNewsSelect.reducer