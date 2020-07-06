<template>
  <div>
    <router-link to="/">Home</router-link> <router-link to="/userInfo">User Info</router-link>  <router-link to="/pay">Pay</router-link> <a href="" @click.prevent="logout">Logout</a>
    <hr>
    <div>Money : {{ money }}</div>
    <div v-if="vip >= 0">Vip : {{ vip }}</div>
  </div>
</template>

<script>
    export default {
      methods: {
        logout() {
            // localStorage.removeItem('token');
            this.$store.dispatch("logoutUser")

            this.$router.push('/login');
        }
      },

      computed: {
        money() {
          return this.$store.getters.getMoney
        },
        
        vip() {
          return this.$store.getters.getVip
        },
      }
  }
</script>