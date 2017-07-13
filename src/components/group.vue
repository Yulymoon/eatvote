<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <input type="text" v-model="group.id" placeholder="邊緣人主揪">
    <select v-model="group.select">
      <option disabled value="">要什麼時候吃</option>
      <option>早餐</option>
      <option>午餐</option>
      <option>下午茶</option>
      <option>晚餐</option>
    </select>
    <input type="text"  onkeyup="value=value.replace(/[^\d]/g,'') " value="" v-model="group.time" placeholder="投票時間 分鐘">
    <input type="submit" value="快想想" @click.prevent="onSubmit">
    <div class="group cursor" v-for="g in groups" :key="g['.key']">
      <div class="">
        <span class="hightlight">{{g.id}}</span>
        <span>正在揪人一起吃 <span class="hightlight">{{g.select}}</span></span>
        <span>距離投票結束還有 <span class="hightlight">{{g.time}}</span> 分鐘</span>
        <span  @click="toggle()">想被揪</span>
      </div>
      <div class="" v-show="toggleshow">
        <input type="text" v-model="ideallists.name" placeholder="名字" >
        <input type="text" v-model="ideallists.idea" placeholder="我想吃">
        <input class="subbutton" type="submit" value="想吃" @click.prevent="gridonSubmit(g)">
        <div class="vote">
          <div class="voteset" v-for="order in groups" :key="order['.key']">
            <h2>  {{order.name}} </h2>
            <span>想吃"{{order.idea}}"</span>
            <div>
              目前{{order.count}}人想ㄘ
            </div>
            <button v-show="order.showadbutton" type="button" name="button" @click="votesum(order)">選我選我選我</button>
            <button @click="removeUser(order)">刪掉那些沒人投的</button>
            <div class=""  v-show="order.address">
                <!-- <googlemap></googlemap> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- <router-link  to="/hello" style="text-decoration:none; color:#2c3e50;">
      </router-link> -->
</template>

<script>
import firebase from 'firebase'
let db = firebase.database()
let usersRef = db.ref('users')

export default {
  name: 'hello',
  data () {
    return {
      msg: '工作就是想吃飯！？',
      group: {
        id: '',
        select: '',
        time: null,
        lists: []
      },
      ideallists: {
        name: '',
        idea: '',
        count: 0,
        address: false,
        showadbutton: true
      },
      toggleshow: false,
      voteshow: false
    }
  },

  firebase: {
    groups: usersRef
  },

  methods: {
    toggle: function (n) {
      this.toggleshow = !this.toggleshow
    },
    onSubmit: function () {
      usersRef.push(this.group)
      this.group.id = ''
      this.group.select = ''
      this.group.time = ''
    },
    gridonSubmit: function (g) {
      console.log(g)
      let listkey = usersRef.child(g['.key'])
      listkey.child('lists').push(this.ideallists)
      this.ideallists.name = ''
      this.ideallists.idea = ''
      this.voteshow = !this.voteshow
    },
    votesum: function (n) {
      n.count ++
      usersRef.child(n['.key']).update({
        count: n.count
      })
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

.group{
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /*height:20vh;*/
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
  a{
    text-decoration:none;
  }
}

.hightlight{
  font-size: 2rem;
}

.subbutton{
  background: none;
  border-radius: 20px;
  font-size: 1.3rem;
  padding:1% 2%;
  color:white;
  border-color: white;
}
</style>
