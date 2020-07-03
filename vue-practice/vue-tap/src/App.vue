<template>
  <div id="app">
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from './components/Tab.vue'

export default {
  name: 'App',
  components: {
    Tab
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
