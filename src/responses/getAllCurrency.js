import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const allCurrencyApiHeaders =  {
    'X-RapidAPI-Host': 'currencyapi-net.p.rapidapi.com',
    'X-RapidAPI-Key': 'f0391398e5mshf2ecfbc84b7e8c1p1d6ee1jsncc91bc4b9a82'
  }


  const baseUrl = 'https://currencyapi-net.p.rapidapi.com';

  const createRequest = (url) =>({url , headers:allCurrencyApiHeaders});


  export const allCurrencyApi = createApi({
    reducerPath: 'allcurrencyApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(build)=>({
        getAllCurrencyValue: build.query({
        query:() => createRequest('/currencies')
        })
    })
})


export const{useGetAllCurrencyValueQuery} = allCurrencyApi;