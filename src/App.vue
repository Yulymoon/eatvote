<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase'
let config = {
  apiKey: 'AIzaSyBSb4j-zRLaZhcFbjLi5t-KTRZeHiOA_Ss',
  authDomain: 'eatwhat-5599f.firebaseapp.com',
  databaseURL: 'https://eatwhat-5599f.firebaseio.com',
  projectId: 'eatwhat-5599f',
  storageBucket: 'eatwhat-5599f.appspot.com',
  messagingSenderId: '729588192084'
}
firebase.initializeApp(config)
// let db = firebase.database()
// let usersRef = db.ref('users')
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
