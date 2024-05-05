import React, { useState,useEffect } from 'react';
import { CoinList } from '../Api/Api';
import { CurrencyState } from '../CurrContext';
import axios from 'axios';
import { Container, createTheme, CircularProgress, TableContainer, TextField, ThemeProvider, Typography,Table, TableHead, TableRow, TableCell, TableBody,Select,MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {useNavigate} from 'react-router-dom';
import { numComa } from './LandingPage/Carousel';
import { Pagination } from '@material-ui/lab';

const useStyles=makeStyles({
    table:{
      width:"100%",
      backgroundColor:'#1A1E25',
      boxShadow: '-2px 2px 5px 2px rgba(0,0,0,0.75)'
    },
    row:{
      cursor:"pointer",
      "&:hover":{
        backgroundColor:"#101216",
        transition:"0.2s ease-in-out"
      },
    },
      pagination:{
        "& .MuiPaginationItem-root":{
          color:"#FF9F45",
        },
      }
});
const CoinsTable = () => {
    const [coins,setCoins]=React.useState([]);
    const [loading,setLoading]=React.useState(false);
    const [search,setSearch]=React.useState('');
    const {currency,symbol}=CurrencyState();
    const [page,setPage]=React.useState(1);
    const [rows,setRows]=React.useState(10);
    const [sort,setSort]=React.useState(1);
    const navigate=useNavigate();

    const fetchCoins=async()=>{
    setLoading(true);
    const {data}=await axios.get(CoinList(currency));
    console.log(CoinList);
  //   const {data}=await axios.post(CoinList(),{
  //     "currency": `${currency}`,
	// "sort": "rank",
	// "order":'ascending',
	// "offset": 0,
	// "limit": 100,
	// "meta": true
  //   }, {
  //     headers: {
  //       'content-type': 'application/json',
  //       'x-api-key':'d8fe361a-70b2-4159-a4c8-01388a2a5ecb'
  //     }
  //   });
    console.log(data);
    setCoins(data);
    setLoading(false);
  };
  
  useEffect(()=>{
      fetchCoins();
       //eslint-disable-next-line react-hooks/exhaustive-deps
  },[currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {main:'#252A34'},
      type:'dark'
    },
  });
 
  const classes=useStyles();

  const handleSearch=()=>{
    return (coins.filter(coin=>coin?.name?.toLowerCase().includes(search) || coin?.code?.toLowerCase().includes(search)));
  }

  const handleSort=(e)=>{
    const value=e.target.value;
    let sortedCoins=JSON.parse(JSON.stringify(coins) || "{}");
    if(sortedCoins && Object.keys(sortedCoins)?.length===0)return;
    if(value===-1){
      sortedCoins.sort((a,b)=>b.market_cap_rank-a.market_cap_rank);
    }
    else{
      sortedCoins.sort((a,b)=>a.market_cap_rank-b.market_cap_rank);
    }
    console.log("----->",sortedCoins);
    setCoins(sortedCoins);
    setSort(value);
    setPage(1);
  }
  return (
    <ThemeProvider theme={darkTheme}>
    <Container className={classes.table} style={{textAlign:'center'}}>
    <Typography variant='h4' style={{borderBottom:'2px solid #FF2E63',padding:20,color:'#F4F4F4',margin:15}}>Check and Compare Cryptocurrency Prices by Market Cap</Typography>
    <Container>
    <TextField label="Search Crypto Currency" placeholder='Type here...' variant='outlined' style={{width:'70%',marginBottom:20}} onChange={(e)=>setSearch(e.target.value)}></TextField>

    <Select variant='outlined' value={rows} style={{
         width:"10%",
       }}
       onChange={(e)=>{setRows(e.target.value);setPage(1)}}
       >
         <MenuItem value={10} style={{color:'#08D9D6'}}>10</MenuItem>
         <MenuItem value={20} style={{color:'#08D9D6'}}>20</MenuItem>
         <MenuItem value={50} style={{color:'#08D9D6'}}>50</MenuItem>
         </Select>
         <Select variant='outlined' value={sort} style={{
         width:"20%",
       }}
       onChange={handleSort}
       >
         <MenuItem value={1} style={{color:'#08D9D6'}}>Ascending Order</MenuItem>
         <MenuItem value={-1} style={{color:'#08D9D6'}}>Descending Order</MenuItem>
         </Select>
    </Container>
    <TableContainer>
      {loading?
      (<CircularProgress/>):(
        <Table>
          <TableHead style={{backgroundColor:"#08D9D6"}}>
            <TableRow>
              {["Rank","Coin","Price","24h %","Market Cap","Volume"].map(head=>(
                <TableCell style={{color:"#212121",fontSize:18,fontWeight:700}} key={head} 
                align={head==="Coin"||head==="Rank"?"left":"right"}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* .slice((page-1)*10,(page-1)*10+15) */}
          <TableBody>{handleSearch().slice((page-1)*rows,(page-1)*rows+rows).map(row=>{
            let profit=row?.price_change_percentage_24h>=0;
            return(
              <TableRow className={classes.row} onClick={()=>navigate(`/coins/${row?.id}`)} key={row?.symbol} >
              <TableCell align='left' style={{fontSize:16}}>{row?.market_cap_rank}.</TableCell>
                <TableCell component="th" scope="row" style={
                  {
                    display:"flex",
                    gap:15
                  }
                }>
                <img src={row?.image} alt={row?.name} height='50' />
                <div style={{display:"flex",flexDirection:"column"}}>
                  <span style={{fontSize:20,textTransform:"uppercase"}}>{row?.symbol}</span>
                  <span style={{color:"#B4C6A6"}}>{row?.name}</span>
                </div>
                </TableCell>
                <TableCell align="right" style={{fontSize:16}}>{symbol+" "} {numComa(row?.current_price.toFixed(2))}</TableCell>
                <TableCell align="right" style={{color:profit?"#4BB543":"red",fontSize:16}}>
                  {profit && "+"}{row?.price_change_percentage_24h?.toFixed(2)}%
                </TableCell>
                <TableCell align="right" style={{fontSize:15}}>{symbol+" "} {numComa(row?.market_cap)}</TableCell>
                <TableCell align="right" style={{fontSize:15}}>{symbol+" "} {numComa(row?.total_volume)}</TableCell>
              </TableRow>
            )
          })}</TableBody>
        </Table>
      )
      }
    </TableContainer>
    <Pagination
      count={(handleSearch()?.length/rows)}
      style={{
        display:"flex",
        justifyContent:"center",
        width:"100%",
        padding:20
      }}
      classes={{ul:classes.pagination}}
      onChange={(_,value)=>{
        setPage(value);
        window.scroll(0,450);
      }}
    />
    </Container>
    </ThemeProvider>
    
  )
};

export default CoinsTable;