<template>
  <Header>
    <template #left>
      <p class="mdi mdi-chevron-left" @click="onBack"></p>
    </template>

    <template #default>
      <div>{{ title }}</div>
    </template>
  </Header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import Header from './Header.vue'

export default defineComponent({
  name: 'header',
  components: {
    Header,
  },
  props: ['title'],
  setup() {
    const router = useRouter()
    function onBack() {
      router.go(-1)
    }
    return {
      onBack,
    }
  },
})
</script>
