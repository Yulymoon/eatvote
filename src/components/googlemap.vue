<template>
<div class="gmap" >
  <gmap-map
    :center="center"
    :zoom="15"
  >
    <gmap-marker
      v-for="m in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
  <gmap-place-input default-place="" @place_changed="updatePlace" placeholder="腫麼走">
  </gmap-place-input>
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
  },
  installComponents: true
})

export default {
  data () {
    return {
      center: {lat: 0, lng: 0},
      markers: [{
        position: {lat: 0, lng: 0}
      }],
      place: null
    }
  },
  methods: {
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

<style>

.gmap{
  width:100%;
}

.vue-map-container{
   width: 100%;
   height: 50vh;
}
</style>
