<template>
  <div class="idea">
    <h1>{{ msg }}</h1>
    <div class="vote ">
      <div class="voteset" v-for="order in orders" :key="order['.key']">
        <h2>  {{order.name}} </h2>
        <span>想吃"{{order.idea}}"</span>
        <div>
          目前{{order.count}}人想ㄘ
        </div>
        <button v-show="order.showadbutton" type="button" name="button" @click="votesum(order)">選我選我選我</button>
        <button @click="removeUser(order)">刪掉那些沒人投的</button>
        <div class=""  v-show="order.address">
            <googlemap></googlemap>
        </div>
      </div>
    </div>
    <div class="">
      <button type="button" name="button" @click="sortedArray(orders)"></button>
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

import googlemap from '../components/googlemap'

export default {
  name: 'idea',
  data () {
    return {
      msg: '下好離手'
    }
  },

  firebase: {
    orders: usersRef
  },

  ready: {
    set: setTimeout(function (n) {
      console.log(n)
    }, 4000)
  },

  methods: {
    votesum: function (n) {
      n.count ++
      usersRef.child(n['.key']).update({
        count: n.count
      })
    },
    removeUser: function (order) {
      usersRef.child(order['.key']).remove()
    },
    sortedArray: function (n) {
      n.sort(function (a, b) { return b.count - a.count })
      let i = 0
      for (i = 0; i < n.length; i++) {
        n[i].showadbutton = false
      }
      n.showadbutton = !n.showadbutton
      n[0].address = !n[0].address
    }
    // sortedArray: function (n) {
    //   let i = 0
    //   for (i = 0; i < n.length; i++) {
    //     // console.log(n[i].count)
    //     var list = Math.max(n[i].count)
    //     console.log(list)
    //   }
    // }
  },
  computed: {
    evenNumbers: function (n) {
      return n.count.filter(function (number) {
        return number % 2 === 0
      })
    }
  },
  components: {
    googlemap
  }
}
</script>

<style media="screen">
 .vote{
   display:flex;
   justify-content: center;
   flex-wrap: wrap;
 }
 .voteset{
   width:25%;
 }

</style>
