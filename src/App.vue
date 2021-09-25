<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import { userAuthProvide, UserInfo, Profile, Item } from '@/store/user'
import { checkHealth } from '@/apis/health'
import { Greeter } from 'quboqin-lib/lib'

export default defineComponent({
  name: 'App',
  setup() {
    const profile = new Profile()
    profile.phone = '+13233013227'
    profile.firstName = 'Qubo'
    profile.lastName = 'Qin'

    const userInfo: UserInfo = {
      profile: profile,
      cart: {
        totalPrice: 0.0,
        items: [] as Item[],
      },
    }

    userAuthProvide(userInfo)

    const init = async () => {
      checkHealth()
      console.log(Greeter(`Qubo`))
    }
    onMounted(init)
  },
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
