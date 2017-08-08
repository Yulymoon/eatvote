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
    {{testtime()}}
    <div class="group" v-for="g in groups" :key="g['.key']">
      <div class="">
        <span class="hightlight">{{g.id}}</span>
        <span>正在揪人一起吃 <span class="hightlight">{{g.select}}</span></span>
        <span>距離投票結束還有 <span class="hightlight">{{g.lasttime}}</span> 分鐘</span>
        <span class="wh" @click="toggle(g)">想被揪</span>
        <div class="voteresult" v-show="g.toggleshow">
          <div class="left">
            <h1 v-if="g.lasttime === 0 ">投票已結束</h1>
            <h1><span v-if="g.lasttime !== 0 ">目前</span>由{{g.firstvote.name}}提出的{{g.firstvote.idea}}</h1>
            <h2><span v-if="g.lasttime === 0 ">總共</span>獲得{{g.firstvote.count}}票<span v-if="g.lasttime !== 0 ">領先</span></h2>
          </div>
          <div class="right">
            <span>腫麼去</span>
            <googlemap></googlemap>
          </div>
      </div>
      </div>
      <!-- <div class=""> -->
      <div class="" v-show="g.toggleshow">
        <div class="ideagrid" v-if="g.lasttime > 0">
          <input class="ideasub" type="text" v-model="ideallists.name" placeholder="名字" >
          <input class="ideasub" type="text" v-model="ideallists.idea" placeholder="我想吃">
          <input class="ideasub subbutton cursor" type="submit" value="想吃" @click.prevent="gridonSubmit(g)">
        </div>
        <div class="vote" v-if="g.lasttime > 0">
          <div class="voteset" v-for="(order,index) in g.lists" :key="order['.key']">
            <h2>  {{order.name}} </h2>
            <span>想吃"{{order.idea}}"</span>
            <div>
              目前{{order.count}}人想ㄘ
            </div>
            <button v-show="order.showadbutton" type="button" name="button" @click="votesum(g,index)">選我選我選我</button>
            <!-- <button @click="removeUser(order)">刪掉那些沒人投的</button> -->
            <div class="">
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
import googlemap from '../components/googlemap'
import firebase from 'firebase'
let db = firebase.database()
let usersRef = db.ref('users')

export default {
  name: 'hello',
  data () {
    return {
      msg: '工作就是想吃飯！？',
      clcl: false,
      group: {
        id: '',
        select: '',
        time: '',
        toggleshow: false,
        lists: [],
        lasttime: 0,
        selectshow: true,
        firstvote: {
          name: '',
          idea: '',
          count: ''
        }
      },
      ideallists: {
        name: '',
        idea: '',
        count: 0,
        countshow: 0,
        address: false,
        showadbutton: true
      },
      voteshow: false
    }
  },

  firebase: {
    groups: usersRef
  },

  methods: {
    get: function () {
      return this.groups
    },
    testtime: function () {
      if (this.clcl === false) {
        setInterval(function () {
          let rett = new Date()
          let t = rett.getTime()
          let minutes = 1000 * 60
          for (let val of this.groups) {
            let y = (val.time - t) / minutes
            if (y < 0) {
              y = 0
            }
            val.lasttime = Math.round(y)
          }
        }.bind(this), 10)
        this.clcl = true
      }
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
      if (g.lasttime === 0) {
        g.selectshow = false
      }
      g.lists[index].count ++
      let votecount = g.lists[index].count
      let votecountshow = -votecount
      let listkey = usersRef.child(g['.key']).child('lists').child(index)
      listkey.update({
        count: votecount,
        countshow: votecountshow
      })
      let arr = []
      for (var n in g.lists) {
        arr.push(g.lists[n])
      }
      let arrsort = arr.sort(function (a, b) { return b.count - a.count })
      let firstkey = usersRef.child(g['.key']).child('firstvote')
      firstkey.update({
        name: arrsort[0].name,
        idea: arrsort[0].idea,
        count: arrsort[0].count
      })
      // g.firstvote.name = arrsort[0].name
      // g.firstvote.idea = arrsort[0].idea
      // g.firstvote.count = arrsort[0].count
      // console.log(g.firstvote)
      // 排完之後重整會變成只剩下數字
      // let arr = {}
      // for (var variable in g.lists) {
      //   arr.push(g.lists[variable])
      // }
      // arr.sort(function (a, b) { return b.count - a.count })
      // for (let val of this.groups) {
      //   if (val.id === g.id) {
      //     val.lists = arr
      //   }
      // }
      // this.groups = this.groups.concat()
      // let objlist = {}
      // usersRef.child(g['.key']).child('lists').orderByChild('countshow').on('child_added', function (snapshot) {
      //   objlist[snapshot.key] = snapshot.val()
        // let listtext = objlist[snapshot.key]
        // listtext = snapshot.val()
        // console.log(objlist)
        // let keylists = usersRef.child(g['.key'])
        // g.lists = objlist
        // keylists.update({
        //   lists: objlist
        // })
      // })
    },
    sortedArray: function (g) {
    }
    // removeUser: function (order) {
    //   usersRef.child(order['.key']).remove()
    // }
  },
  components: {
    googlemap
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
  flex-wrap:wrap;
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

.voteresult{
  display:flex;
  .left{
    width:50vw;
  }
  .right{
    width:50vw;
  }
}
</style>
