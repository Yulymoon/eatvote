<template>
  <div class="idea">
    <h1>{{ msg }}</h1>
    <div class="">
      <button type="button" name="button" @click="show">偷窺一下</button>
    </div>
    <!-- <div v-for="n in oooo">
      <h2>  {{n.name}} </h2>
      <span>想吃{{n.idea}}</span>
    </div> -->
    <router-link to="/">
    <a>home</a>
    </router-link>
  </div>
</template>

<script>
// import firebase from 'firebase'
// let config = {
//   apiKey: 'AIzaSyBSb4j-zRLaZhcFbjLi5t-KTRZeHiOA_Ss',
//   authDomain: 'eatwhat-5599f.firebaseapp.com',
//   databaseURL: 'https://eatwhat-5599f.firebaseio.com',
//   projectId: 'eatwhat-5599f',
//   storageBucket: 'eatwhat-5599f.appspot.com',
//   messagingSenderId: '729588192084'
// }
// firebase.initializeApp(config)
// const usersRef = firebase.database().ref('users')
export default {
  name: 'idea',
  data () {
    return {
      msg: 'idea.vue'
    }
  },
  firebase: {
    // oooo: usersRef
    // readyCallback: function (res) {
    //       // localStorage.setItem('token', res.token)
    //   this.oooo = res.users
    // }.bind(this)
  },

  methods: {
    show: function () {
    }
  }
}
</script>
