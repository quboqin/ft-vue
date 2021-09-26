<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import { userAuthProvide, UserInfo } from '@/store/user'
import { checkHealth } from '@/apis/health'
import { Greeter } from 'quboqin-lib/lib'
import { Item } from 'quboqin-lib/lib/item'
import { User } from 'quboqin-lib/lib/user'

export default defineComponent({
  name: 'App',
  setup() {
    const profile = new User()
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
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fee2e2;
}
</style>
