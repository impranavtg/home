import React, { createContext, useContext, useEffect, useState } from 'react';

const Currency=createContext();
const CurrContext = ({children}) => {
    const [currency,setCurrency]=useState('INR');
    const [symbol,setSymbol]=useState('₹');
    useEffect(()=>{
        if(currency==='INR')setSymbol('₹');
        if(currency==='USD')setSymbol('$');
    },[currency]);
  return (
  <Currency.Provider value={{currency,setCurrency,symbol}}>
  {children}
  </Currency.Provider>)
};

export default CurrContext;

export const CurrencyState=()=>useContext(Currency);