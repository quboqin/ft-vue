<template>
  <div class="flex justify-between items-center px-2">
    <div class="flex justify-start items-center">
      <img
        :src="item.imgUrl"
        alt=""
        class="w-12 h-12 rounded-md"
        style="object-fit: cover"
      />
      <div class="pl-2 text-left">
        <div class="py-1 text-sm">{{ item.name }}</div>
        <div class="text-sm font-semibold py-1 text-red-500">
          ${{ item.price }}
        </div>
      </div>
    </div>
    <div>
      <p
        class="
          mdi mdi-close
          text-base text-right
          leading-none
          my-1
          text-gray-500
        "
        @click="onDelete"
      ></p>
      <p class="rounded bg-gray-200 p-2 py-1 my-1 text-right leading-none">
        {{ item.amount }}
      </p>
    </div>
  </div>
  <hr class="bg-gray-800 my-2 ml-10" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Item } from 'quboqin-lib/lib/item'

export default defineComponent({
  name: 'CartItemCell',
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
  setup(props, { emit }) {
    function onDelete() {
      emit('del-item')
    }

    return {
      onDelete,
    }
  },
})
</script>
