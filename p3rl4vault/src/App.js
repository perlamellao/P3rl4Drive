import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login';


function App() {
  const [token, setToken] = useState();
  if(!token || token == "ERROR") {
    return <Login setToken={setToken} />
  }

  return(
    <BrowserRouter>
        <div>tuputamadre</div>
        <Switch>
          <Route path='/login' exact component={Login}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;