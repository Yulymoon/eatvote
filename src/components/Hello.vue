<template>
  <div class="hello">
    <h3>我是大金剛，住在森林裡，每天都要吃些不同的東西，今天要吃手，明天要吃腳，後天要吃什麼</h3>
    <h1>{{ msg }}</h1>
    <input type="text" name="" value="" placeholder="名字">
    <input type="text" name="" value="" placeholder="我想吃">
    <router-link  to="/idea">
      <a>Idea</a>
    </router-link>
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
</script>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '吃什麼'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
