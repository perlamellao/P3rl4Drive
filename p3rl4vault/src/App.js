import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  const [token, setToken] = useState();
  if(!token || token == "ERROR") {
    return <Login setToken={setToken} />
  }

  return(
    <BrowserRouter>
      
        <Switch>
          <Navbar setToken={setToken}/>
          <Route path='/login' exact component={Login}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;