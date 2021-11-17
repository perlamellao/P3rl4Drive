import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { read_cookie } from 'sfcookies'

import Login from './components/Login';
import Navbar from './components/Navbar';
import Files from './components/Files';
import Singup from './components/Singup';

function App() {
  if(read_cookie('session_id') === "ERROR"){
    return <Login error={1} />
  }else if(read_cookie('session_id') === "CLOSED_SESSION"){
    return <Login error={2} />
  }else if(read_cookie('session_id') === "SINGUP"){
    return <Singup/>
  }else if(read_cookie('session_id').length < 10) {
    return <Login error={0} />
  }
  
  return(
    
    <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path='/files' component={Files}  />
          <Route exact path='/login' component={Login} />
          
        </Switch>
    </BrowserRouter>
  );
  
}

export default App;