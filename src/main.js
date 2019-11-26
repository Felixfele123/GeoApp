// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.config.productionTip = false


firebase.initializeApp({
  apiKey: "AIzaSyBTdW60tqLUX4fDraj3hVpJ7lr58TJnxRk",
  authDomain: "geomap-4db2f.firebaseapp.com",
  databaseURL: "https://geomap-4db2f.firebaseio.com",
  projectId: "geomap-4db2f",
  storageBucket: "geomap-4db2f.appspot.com",
  messagingSenderId: "376493967107",
  appId: "1:376493967107:web:97adff077575f15a190b36",
  measurementId: "G-E00R2DKQMG"
});

export const db = firebase.firestore();

let app = null;


firebase.auth().onAuthStateChanged(() => {

  if(!app){
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
/* eslint-disable no-new */
