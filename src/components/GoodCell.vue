<template>
  <div class="p-2">
    <div class="rounded-md bg-white">
      <div class="relative">
        <img
          class="h-48 mx-auto rounded-t-md"
          :src="item.imgUrl"
          style="object-fit: cover"
        />
        <div
          class="
            absolute
            top-0
            mt-2
            ml-2
            py-1
            px-2
            rounded-md
            text-sm text-white
            bg-red-600
          "
        >
          {{ Math.round((item.discount ?? 0) * 100).toFixed(0) }}% off
        </div>
      </div>
      <div class="text-sm text-left truncate px-2 pt-1">
        {{ item.desc }}
      </div>
      <div class="text-base text-left text-red-500 font-semibold pl-2">
        ${{ item.price }}
      </div>
      <p class="mdi mdi-plus-circle-outline text-2xl" @click="onAdd()"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Good } from 'quboqin-lib/lib/goods'

export default defineComponent({
  name: 'GoodCell',
  props: {
    item: {
      type: Object as PropType<Good>,
      required: true,
    },
  },
  setup(props, { emit }) {
    function onAdd() {
      emit('add-cart')
    }

    return {
      onAdd,
    }
  },
})
</script>
