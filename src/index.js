import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {BrowserRouter as Router} from 'react-router-dom';
import firebase from "firebase/app";


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

ReactDOM.render(
  <Router>
       <App />  
  </Router>,
  document.getElementById('root')
);


