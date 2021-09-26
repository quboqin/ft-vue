<template>
  <Header title="我的订单"></Header>
  <div class="mt-14">
    <van-tabs v-model:active="active" background="#fee2e2">
      <van-tab v-for="(item, index) in orderStatus" :title="item" :key="index">
        <OrderCell
          v-for="(order, index) in orders"
          :order="order"
          :key="index"
          class="my-2 mx-4"
        ></OrderCell>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'

import Header from '@/components/HeaderWithBack.vue'
import OrderCell from '@/components/OrderCell.vue'

import { userAuthInject } from '@/store/user'
import { Order } from 'quboqin-lib/lib/order'
import { getAllOrders } from '@/apis/order'

export default defineComponent({
  name: 'OrderList',
  components: {
    Header,
    OrderCell,
  },
  setup() {
    const { userInfo } = userAuthInject()

    const state = reactive({
      orderStatus: ['全部订单', '待收货', '待发货', '已发货', '已取消'],
      orders: [] as Order[],
      active: 0,
    })

    const init = async () => {
      state.orders = await getAllOrders({
        phone: userInfo.profile?.phone,
      })
    }
    onMounted(init)

    return {
      ...toRefs(state),
    }
  },
})
</script>
