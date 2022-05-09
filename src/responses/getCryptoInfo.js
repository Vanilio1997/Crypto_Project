import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const coinInfoApiHeaders= {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': 'f0391398e5mshf2ecfbc84b7e8c1p1d6ee1jsncc91bc4b9a82'
  }

  const baseUrl = 'https://coinranking1.p.rapidapi.com';

  const createRequest = (url) =>({url , headers:coinInfoApiHeaders});


  export const coinInfoApi = createApi({
    reducerPath: 'coinInfoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(build)=>({
        getCoinInfo: build.query({
query:(coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: build.query({
          query: ({ id,period }) => createRequest(`/coin/${id}/history?timePeriod=${period}`),
        }),
    })
})


export const{useGetCoinInfoQuery,useGetCryptoHistoryQuery} = coinInfoApi;