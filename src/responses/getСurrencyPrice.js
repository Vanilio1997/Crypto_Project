import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const currencyApiHeaders =  {
    'X-RapidAPI-Host': 'currencyconverter9.p.rapidapi.com',
    'X-RapidAPI-Key': 'f0391398e5mshf2ecfbc84b7e8c1p1d6ee1jsncc91bc4b9a82'
  }

  const baseUrl = 'https://currencyconverter9.p.rapidapi.com';

  const createRequest = (url) =>({url , headers:currencyApiHeaders});


  export const currencyApi = createApi({
    reducerPath: 'currencyApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(build)=>({
        getCurrencyValue: build.query({
        query:({from,to,number}) => createRequest(`/convert?to=${to}&amount=${number}&from=${from}`)
        })
    })
})


export const{useGetCurrencyValueQuery} = currencyApi;