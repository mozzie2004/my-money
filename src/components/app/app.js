import React from 'react';
import AppHeader from '../app-header/app-header';
import Counts from '../counts/counts';
import MyChart from '../chart/chart';
import Report from '../report/report';
import './app.css';

const App = () =>{
  return (
  <>
	<AppHeader/>
	<Counts/>
  <Report/>
  <MyChart/>
  </>
  )
  
}

export default App;