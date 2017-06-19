<template>
  <div class="idea">
    <h1>{{ msg }}</h1>
    <div class="vote">
      <div v-for="order in orders" :key="order['.key']">
        <h2>  {{order.name}} </h2>
        <span>想吃{{order.idea}}</span>
        <div>
          目前{{order.count}}人想ㄘ
        </div>
        <button type="button" name="button" @click="votesum(order)">選我選我選我</button>
        <!-- <button @click="removeUser(order)">刪掉那些沒人投的</button> -->
      </div>
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
      msg: '下好離手'
    }
  },

  firebase: {
    orders: usersRef
  },

  methods: {
    votesum: function (n) {
      n.count ++
      usersRef.child(n['.key']).update({
        count: n.count
      })
      // usersRef.child('count').setValue(n.count)
      // const childkey = n['.key']
      // delete n['.key']
      // this.$firebaseRefs.orders(childkey).set(n)
      // console.log(usersRef)
      // usersRef.transaction(function (n) {
      //   return n.count ++
      // })
      // console.log(addcount)
      // n.count = addcount
      // console.log(n.count\)
    },
    removeUser: function (order) {
      usersRef.child(order['.key']).remove()
    }
  }
}
</script>

<style media="screen">
 .vote{
   display:flex;
   justify-content: center;

 }
</style>
