<template>
  <div>
    total price ${{ userInfo.cart?.totalPrice.toFixed(2) }} total count
    {{ userInfo.cart?.items?.length }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userAuthInject } from '@/store/user'

export default defineComponent({
  name: 'About',
  setup() {
    const { userInfo } = userAuthInject()

    return {
      userInfo,
    }
  },
})
</script>
