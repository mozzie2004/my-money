import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Counts from '../counts/counts';
import Report from '../report/report';
import Operations from '../opeerations/operations';
import firebaseService from '../../services/fierbaseService';
import { countsLoaded, countsRequested, operationsLoaded, groupesLoaded } from "../../actions";
import './app.css';

const App = ({curentUser, countsLoaded, countsRequested, operationsLoaded, groupesLoaded}) =>{
  useEffect(()=>{
    if (curentUser){
      const firebase = new firebaseService();
      
      firebase.getData(`${curentUser.uid}Operations`, operationsLoaded);
      firebase.getData(`${curentUser.uid}Counts`, countsLoaded, countsRequested);
      firebase.getData(`${curentUser.uid}Groupe`, groupesLoaded);
      
      
  } 
  }, [curentUser, countsLoaded, countsRequested, operationsLoaded, groupesLoaded]);

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

const mapStateToProps = ({curentUser}) => {
  return {
    curentUser
  }
}

const mapDispatchToProps = {
  countsLoaded,
  countsRequested,
  operationsLoaded,
  groupesLoaded
}

export default connect(mapStateToProps, mapDispatchToProps)(App);