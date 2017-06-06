<template>
  <div class="idea">
    <h1>{{ msg }}</h1>
    <div class="">
      <button type="button" name="button" @click="show">偷窺一下</button>
    </div>
    <div v-for="order in orders">
      <h2>  {{order.name}} </h2>
      <span>想吃{{order.idea}}</span>
    </div>
    <router-link to="/">
    <a>home</a>
    </router-link>
  </div>
</template>

<script>
import firebase from 'firebase'
let db = firebase.database()
let usersRef = db.ref('users')

export default {
  name: 'idea',
  data () {
    return {
      msg: 'idea.vue'
    }
  },

  firebase: {
    orders: usersRef
  },

  methods: {
    show: function () {
    }
  }
}
</script>
