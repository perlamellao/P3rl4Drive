import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState();
  if(!user) {
    return <Login setUser={setUser} error={0} />
  }else if(user === "ERROR"){
    return <Login setUser={setUser} error={1} />
  }else if(user === "CLOSED_SESSION"){
    return <Login setUser={setUser} error={2} />
  
  }else{
    return(
      <BrowserRouter>
        
          <Switch>
            <Navbar setUser={setUser}/>
            <Route path='/login' exact component={Login}/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;