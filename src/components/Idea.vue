<template>
  <div class="idea">
    <h1>{{ msg }}</h1>
    <router-link to="/">
    <a>home</a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'idea.vue'
    }
  }
}
</script>
