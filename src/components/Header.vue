<template>
  <div
    class="
      fixed
      z-50
      top-0
      left-0
      container
      flex
      justify-between
      items-center
      p-2
      bg-opacity-95 bg-red-100
    "
  >
    <div class="text-2xl text-center leading-none">
      <slot name="left"></slot>
    </div>
    <main class="flex-auto">
      <slot></slot>
    </main>
    <div class="text-2xl text-center leading-none">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
})
</script>
