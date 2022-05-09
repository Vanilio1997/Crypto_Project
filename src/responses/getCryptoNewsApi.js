import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const newsApiHeaders= {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': 'f0391398e5mshf2ecfbc84b7e8c1p1d6ee1jsncc91bc4b9a82'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) =>({url , headers:newsApiHeaders})

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(build)=>({
        getNews: build.query({
query:({count ,coinType}) => createRequest(`/news/search?textFormat=Raw&safeSearch=Off&freshness=Day&count=${count}&q=${coinType}`)
        })
    })
})


export const{useGetNewsQuery} = newsApi;