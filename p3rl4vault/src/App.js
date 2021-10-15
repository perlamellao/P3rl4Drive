import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import PopUp from './PopUp';
import Header from './Header';
import Inicio from './Inicio';

function App() {
  return(
    <BrowserRouter>
      <Header />
        <Switch>
          <Route path='/' exact component={Inicio}/>
          <Route path='/popup' exact component={PopUp}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
