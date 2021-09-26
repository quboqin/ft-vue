<template>
  <Header title="编辑信用卡"></Header>
  <div class="mt-14">
    <div class="bg-indigo-500 rounded-md p-2 m-4">
      <div class="flex justify-between items-center text-center">
        <p class="text-white pb-2">Card Number</p>
        <div id="card-number" class="flex-auto px-4 py-2"></div>
      </div>
      <div class="flex justify-between items-center text-center">
        <p class="text-white pb-2">Expiration Date</p>
        <div id="card-expiry" class="flex-auto px-4 py-2"></div>
      </div>
      <div class="flex justify-between items-center text-center">
        <p class="text-white pb-2">CVV</p>
        <div id="card-cvc" class="flex-auto px-4 py-2"></div>
      </div>
      <div id="card-errors" role="alert"></div>
    </div>

    <div class="flex justify-center items-center pt-4">
      <van-checkbox shape="square">设置为默认银行卡</van-checkbox>
    </div>

    <div class="mx-4 mt-4 flex justify-between">
      <div class="flex-auto px-4">
        <van-button round type="success" size="large">保存</van-button>
      </div>
      <div class="flex-auto px-4" v-if="true">
        <van-button round type="success" size="large">删除</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Header from '@/components/HeaderWithBack.vue'

export default defineComponent({
  name: 'CreditCardDetail',
  components: {
    Header,
  },
})
</script>
