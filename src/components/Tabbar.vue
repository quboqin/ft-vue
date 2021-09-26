<template>
  <div
    class="fixed z-50 bottom-0 left-0 container flex justify-around bg-red-100"
  >
    <router-link
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      class="
        focus:text-blue-500
        text-gray-400 text-center text-sm
        leading-none
        py-1
      "
    >
      <p :class="tab.icon" class="text-3xl"></p>
      <span>{{ tab.title }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tabbar',
  setup() {
    const tabs = [
      { icon: 'mdi mdi-home', to: 'home', title: '首页' },
      { icon: 'mdi mdi-account', to: 'profile', title: '我的' },
    ]

    return {
      tabs,
    }
  },
})
</script>
