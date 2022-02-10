import React from 'react';
import { AppBar,Container,Toolbar,Typography ,Select,MenuItem,makeStyles,createTheme,ThemeProvider} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { CurrencyState } from '../CurrContext';
const useStyles=makeStyles(()=>({
  link:{
    flex:1
  },
  logo:{
    color:'#F76E11',
    fontFamily:'inherit',
    fontWeight:'bold',
    cursor:'pointer'
  },
}));
const Navbar = () => {
  const classes=useStyles();
  const darkTheme = createTheme({
    palette: {
      primary: {main:'#212121'},
      type:'dark'
    },
  })
   
  const {currency,setCurrency} = CurrencyState();
  return(
     <ThemeProvider theme={darkTheme}>
     <AppBar position='static'>
       <Container>
       <Toolbar>
       <Link to='/' className={classes.link}><Typography className={classes.logo} variant='h5'>Crypto Geeks</Typography></Link>
       <Select variant='outlined' value={currency} style={{
         width:100,
         height:40,
       }}
       onChange={(e)=>setCurrency(e.target.value)}
       >
         <MenuItem value={'INR'} style={{color:'#F76E11'}}>INR</MenuItem>
         <MenuItem value={'USD'} style={{color:'#F76E11'}}>USD</MenuItem>
       </Select>
       </Toolbar>
       </Container>
     </AppBar>
     </ThemeProvider>);
};

export default Navbar;
