import React from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { read_cookie } from 'sfcookies'

import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Files from './components/Files/Files';
import Singup from './components/Singup/Singup';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  if(read_cookie('session_id') === "ERROR"){
    return <Login error={1} />
  }else if(read_cookie('session_id') === "CLOSED_SESSION"){
    return <Login error={2} />
  }else if(read_cookie('session_id') === "SINGUP"){
    return <Singup />
  }else if(read_cookie('session_id').length < 10) {
    return <Login error={0} />
  }
  
  return(
    <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Redirect to="/main" />
          </Route>
          <Route exact path='/main' component={Dashboard}/>
          <Route exact path='/files' component={Files}  />
          <Route exact path='/login' component={Login} />
        </Switch>
    </BrowserRouter>
  );
  
}

export default App;