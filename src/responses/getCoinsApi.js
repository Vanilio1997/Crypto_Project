import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const coinsApiHeaders= {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': 'f0391398e5mshf2ecfbc84b7e8c1p1d6ee1jsncc91bc4b9a82'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) =>({url , headers:coinsApiHeaders})

export const coinsApi = createApi({
    reducerPath: 'coinsApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(build)=>({
        getCoins: build.query({
query:(count) => createRequest(`/coins?limit=${count}`)
        })
    })
})


export const{useGetCoinsQuery} = coinsApi;