<template>
  <div class="hello">
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
        idea: [],
        count: 0,
        address: false,
        showadbutton: true
      }
    }
  },

  methods: {
    // onSubmit: function () {
    //   usersRef.push(this.lists)
    //   this.lists.name = ''
    //   this.lists.idea = ''
    // },
    onSubmit: function () {
      usersRef.push(this.lists)
      this.lists.name = ''
      this.lists.idea = ''
    },
    updatePlace (what) {
      this.place = {
        lat: what.geometry.location.lat(),
        lng: what.geometry.location.lng()
      }
      this.center = this.place
      this.markers[0].position = this.place
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
