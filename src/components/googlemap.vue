<template>
<div class="gmap" >
  <gmap-map
    :center="center"
    :zoom="17"
  >
    <gmap-marker
      v-for="m in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
</div>
</template>

<script type="text/javascript">
// New in 0.4.0
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCg-F7NdWvmOLTkUdsU1vtXXCIWh5_T2Yo',
    v: 'OPTIONAL VERSION NUMBER',
    libraries: 'places'
  }
})

export default {
  data () {
    return {
      center: {lat: 23.0199732, lng: 120.22267740000007},
      markers: [{
        position: {lat: 23.0199732, lng: 120.22267740000007}
      }]
    }
  }
}
</script>

<style>

.gmap{
  width:50%;
}

.vue-map-container{
   width: 100%;
   height: 50vh;
}
</style>
