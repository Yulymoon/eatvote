<template>
  <div class="hello">
    <h3>我是大金剛，住在森林裡，每天都要吃些不同的東西，今天要吃手，明天要吃腳，後天要吃什麼</h3>
    <h1>{{ msg }}</h1>
    <input type="text" name="" value="" v-model="lists.name" placeholder="名字">
    <input type="text" name="" value="" v-model="lists.idea" placeholder="我想吃">
    <input type="submit" value="快想想" @click.prevent="onSubmit">
    <router-link  to="/idea">
      <a>投票頁</a>
    </router-link>
  </div>
</template>

<script>
import firebase from 'firebase'
let db = firebase.database()
let usersRef = db.ref('users')

export default {
  name: 'hello',
  data () {
    return {
      msg: '吃什麼！？',
      lists: {
        name: '',
        idea: []
      }
    }
  },

  firebase: {
    orders: usersRef
  },

  methods: {
    onSubmit: function () {
      usersRef.push(this.lists)
      this.lists.name = ''
      this.lists.idea = []
    },
    removeUser: function (order) {
      usersRef.child(order['.key']).remove()
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
