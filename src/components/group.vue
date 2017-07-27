<template>
  <div class="hello" id="demo">
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
    <div class="group" v-for="g in groups" :key="g['.key']">
      <div class="">
        <span class="hightlight">{{g.id}}</span>
        <span>正在揪人一起吃 <span class="hightlight">{{g.select}}</span></span>
        <span>距離投票結束還有 <span class="hightlight">{{testtime(g.time)}}</span> 分鐘</span>
        <span @click="testtime(g)">測試用的function</span>
        <span class="wh" @click="toggle(g)">想被揪</span>
      </div>
      <div class="">
        <!-- <div class="" v-show="g.toggleshow"> -->
        <div class="ideagrid">
          <input class="ideasub" type="text" v-model="ideallists.name" placeholder="名字" >
          <input class="ideasub" type="text" v-model="ideallists.idea" placeholder="我想吃">
          <input class="ideasub subbutton cursor" type="submit" value="想吃" @click.prevent="gridonSubmit(g)">
        </div>
        <div class="vote">
          <div class="voteset" v-for="(order,index) in g.lists" :key="order['.key']" @click="">
            <h2>  {{order.name}} </h2>
            <span>想吃"{{order.idea}}"</span>
            <div>
              目前{{order.count}}人想ㄘ
            </div>
            <button v-show="order.showadbutton" type="button" name="button" @click="votesum(g,index)">選我選我選我</button>
            <!-- <button @click="removeUser(order)">刪掉那些沒人投的</button> -->
            <div class=""  v-show="order.address">
                <!-- <googlemap></googlemap> -->
            </div>
          </div>
        </div>
        <div class="">
          <button type="button" name="button" @click="sortedArray(g.lists)">test</button>
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
        time: '',
        toggleshow: false,
        lists: []
      },
      ideallists: {
        name: '',
        idea: '',
        count: 0,
        address: false,
        showadbutton: true
      },
      voteshow: false
    }
  },

  firebase: {
    groups: usersRef
  },

  // created: {
  //   test: setInterval(
  //     function () {
  //       console.log(usersRef)
  //     }, 1000
  //   )
  // },

  methods: {
    testtime: function (g) {
      let rett = new Date()
      let t = rett.getTime()
      let minutes = 1000 * 60
      let y = (g - t) / minutes
      // if (y < 0) {
      //   this.y = 0
      // }
      g = Math.round(y)
      return g
    },
    toggle: function (g) {
      g.toggleshow = !g.toggleshow
    },
    onSubmit: function () {
      let ret = new Date()
      let n = ret.getTime()
      // let d = ret.setMinutes(this.group.time)
      let d = this.group.time * 1000 * 60
      this.group.time = n + d
      // this.group.time = d
      // console.log(typeof n)
      // console.log(ret)
      // console.log(typeof d)
      // console.log(this.group.time )
      usersRef.push(this.group)
      this.group.id = ''
      this.group.select = ''
      this.group.time = ''
    },
    gridonSubmit: function (g) {
      let listkey = usersRef.child(g['.key'])
      let key = listkey.child('lists').push(this.ideallists).key
      console.log('push key = ' + key)
      this.ideallists.name = ''
      this.ideallists.idea = ''
    },
    votesum: function (g, index) {
      g.lists[index].count ++
      let votecount = g.lists[index].count
      let listkey = usersRef.child(g['.key']).child('lists').child(index)
      // listkey.orderByValue().limitToLast(4).on('value', function (snapshot) {
      //   console.log(snapshot)
        // snapshot.forEach(function (data) {
        //   console.log(data.key + data.val())
        // })
      // })
      listkey.update({
        count: votecount
      })
    },
    sortedArray: function (g) {
      console.log(g)
      // n.sort(function (a, b) { return b.count - a.count })
      // let i = 0
      // for (i = 0; i < n.length; i++) {
      //   n[i].showadbutton = false
      // }
      // n.showadbutton = !n.showadbutton
      // n[0].address = !n[0].address
    }
    // removeUser: function (order) {
    //   usersRef.child(order['.key']).remove()
    // }
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
.wh{
  color:#fff;
}
.ideagrid{
  display:flex;
  width:50vw;
}

.ideasub{
  background: none;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 5px;
  flex:3
}


.group{
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width:100vw;
  /*height:20vh;*/
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
  a{
    text-decoration:none;
  }
}
.vote{
  width:100vw;
  display:flex;
}
.voteset{
  width:25%;
}

.hightlight{
  font-size: 2rem;
}

.subbutton{
  background: none;
  border-radius: 20px;
  padding:1% 2%;
  color:white;
  border-color: white;
}
</style>
