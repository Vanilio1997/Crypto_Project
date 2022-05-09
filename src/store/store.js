import { combineReducers,configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { coinsApi } from "../responses/getCoinsApi";
import { newsApi } from "../responses/getCryptoNewsApi";
import {currencyApi} from "../responses/getСurrencyPrice";
import { allCurrencyApi } from "../responses/getAllCurrency";
import { coinInfoApi } from "../responses/getCryptoInfo";
import handelCoinInput from "../reducers/handelCoinInput";
import  cryptoHistoryInformation  from "../reducers/cryptoInfo";
import  coinsData  from "../reducers/allCoinsData";
import  handleNewsSelect  from "../reducers/newsSelect";
import  cryptoCurrency  from "../reducers/CryptoShop";



const rootReudcer = combineReducers({
        handelCoinInput,
        coinsData,
        handleNewsSelect,
        cryptoCurrency,
        cryptoHistoryInformation,
        [currencyApi.reducerPath]: currencyApi.reducer,
        [allCurrencyApi.reducerPath]: allCurrencyApi.reducer,
        [coinsApi.reducerPath]: coinsApi.reducer,
        [coinInfoApi.reducerPath]: coinInfoApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
})

export const store =  configureStore({
    reducer: rootReudcer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(coinsApi.middleware,newsApi.middleware,currencyApi.middleware,allCurrencyApi.middleware,coinInfoApi.middleware)
})