import React from 'react';
import {Route} from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Counts from '../counts/counts';
import Report from '../report/report';
import Operations from '../opeerations/operations';
import './app.css';

const App = () =>{

  return (
    <>
      <AppHeader/>
      <Route exact path='/'>
        <Counts/>
        <Report/>
      </Route>
      <Route exact path='/operations' component={Operations}/>
    </>
  )
  
}

export default App;