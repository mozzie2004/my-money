import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import store from './store/store';
import {BrowserRouter as Router} from 'react-router-dom';
import firebase from "firebase/app";
import {addUser, removeUser, countsLoaded, operationsLoaded, groupesLoaded} from './actions';


import 'bootstrap/dist/css/bootstrap.min.css';

  
  firebase.initializeApp({
    apiKey: "AIzaSyD3GsPewhQ8IlQDR7mivOGvGmQMtw3IcUA",
    authDomain: "moneytracker-d6b75.firebaseapp.com",
    projectId: "moneytracker-d6b75",
    storageBucket: "moneytracker-d6b75.appspot.com",
    messagingSenderId: "222855189906",
    appId: "1:222855189906:web:cc8f408c5fd8a41b729d4b",
    measurementId: "G-JZL3CB20NN"
  });

  

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      store.dispatch(addUser(user));
    } else {
      store.dispatch(removeUser());
      store.dispatch(countsLoaded(store.getState().countsDef));
      store.dispatch(operationsLoaded(store.getState().operationsDef));
      store.dispatch(groupesLoaded(store.getState().groupeDef));
    }
  });

  ReactDOM.render(
    <Provider store={store}>
      <Router>
          <App />  
      </Router>
    </Provider>,
    document.getElementById('root')
  );



