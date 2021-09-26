<template>
  <div class="bg-white rounded-md">
    <div class="flex justify-between items-center px-2 pt-1">
      <p class="text-sm text-gray-500">到货时间 {{ order.deliverAt }}</p>
      <p class="text-sm text-gray-400">{{ order.status }}</p>
    </div>
    <hr class="bg-gray-800 my-2" />
    <div>
      <div class="flex justify-start items-center">
        <div
          v-for="(item, index) in order.items"
          :key="index"
          class="relative m-2"
        >
          <img
            :src="item.imgUrl"
            alt=""
            class="w-12 h-12 rounded-md"
            style="object-fit: cover"
          />
          <p
            class="
              absolute
              -top-2
              -right-2
              rounded
              bg-red-700
              text-xs text-center
              leading-none
              p-1
              text-white
            "
          >
            {{ item.amount }}
          </p>
        </div>
      </div>
      <div class="flex justify-between items-center px-2">
        <p class="text-xs text-gray-400">订单编号: {{ order.id }}</p>
        <p class="text-xs text-red-600 font-semibold">
          ${{ order.totalPrice }}
        </p>
      </div>
    </div>
    <hr class="bg-gray-800 my-2" />
    <div class="flex justify-end items-center pb-2">
      <div
        class="
          bg-gray-200
          rounded
          text-xs text-center
          leading-none
          py-1
          px-3
          mx-2
        "
      >
        查看物流
      </div>
      <div
        class="
          bg-gray-200
          rounded
          text-xs text-center
          leading-none
          py-1
          px-3
          mx-2
        "
      >
        售后
      </div>
      <div
        class="
          bg-gray-200
          rounded
          text-xs text-center
          leading-none
          py-1
          px-3
          mx-2
        "
      >
        再来一单
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Order } from 'quboqin-lib/lib/order'

export default defineComponent({
  name: 'OrderCell',
  props: {
    order: {
      type: Object as PropType<Order>,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
