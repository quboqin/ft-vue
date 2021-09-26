<template>
  <Header title="结账"></Header>
  <div class="mt-14 mx-4">
    <div class="flex justify-between items-center m-4 mx-12">
      <div class="bg-green-500 text-white rounded-full p-2 px-3">
        <p class="text-xs">7/10</p>
        <p class="text-sm font-extrabold">周六</p>
      </div>
      <div class="bg-white text-gray-800 rounded-full p-2 px-3">
        <p class="text-xs">7/11</p>
        <p class="text-sm font-extrabold">周日</p>
      </div>
      <div class="bg-white text-gray-800 rounded-full p-2 px-3">
        <p class="text-xs">7/12</p>
        <p class="text-sm font-extrabold">周一</p>
      </div>
    </div>
    <div class="text-left text-sm">配送信息</div>
    <div
      class="
        my-1
        text-gray-600
        bg-white
        rounded-md
        flex
        items-center
        justify-between
        p-2
      "
    >
      <div class="w-2/3">
        <div class="text-left font-semibold text-base text-gray-800">
          {{ `${user?.firstName} ${user?.lastName}` }}
        </div>
        <div class="text-left text-xs text-gray-400 overflow-ellipsis">
          {{ address.street }}
        </div>
        <br />
        <div class="text-left text-xs text-gray-400 overflow-ellipsis">
          {{ address.zipCode }}
        </div>
        <div class="text-left text-xs text-gray-400 overflow-ellipsis">
          {{ address.city }}
        </div>
      </div>
      <p class="mdi mdi-chevron-right text-3xl text-center leading-none"></p>
    </div>
    <div class="text-left text-sm mt-2">选择信用卡</div>
    <div
      class="
        my-1
        text-gray-600
        bg-white
        rounded-md
        flex
        items-center
        justify-between
        p-2
      "
    >
      <div class="text-left text-xs text-gray-400 overflow-ellipsis">
        请选择您的支付方式
        {{
          `${creditCard.brand} ${creditCard.expirationMonth}/${creditCard.expirationYear}`
        }}
      </div>
      <p class="mdi mdi-chevron-right text-3xl text-center leading-none"></p>
    </div>
    <div class="text-left text-sm mt-2">司机小费</div>
    <div
      class="
        flex
        justify-between
        items-center
        text-gray-800
        font-medium
        py-2
        mx-2
      "
    >
      <div class="rounded-md bg-green-400 p-1 px-8">$1</div>
      <div class="rounded-md bg-green-400 p-1 px-8">$2</div>
      <div class="rounded-md bg-green-400 p-1 px-8">$3</div>
    </div>
    <div class="text-left text-sm mt-2">订单总结</div>
    <div class="my-1 text-sm text-gray-500 bg-white rounded-md p-2">
      <div class="flex justify-between py-1">
        <p>税</p>
        <p class="text-right">$0.00</p>
      </div>
      <div class="flex justify-between py-1">
        <p>运费</p>
        <p class="text-right">$0.00</p>
      </div>
      <div class="flex justify-between py-1">
        <p>小费</p>
        <p class="text-right">$0.00</p>
      </div>
      <div class="flex justify-between py-1">
        <p>合计</p>
        <p class="text-right">${{ totalPrice?.toFixed(2) }}</p>
      </div>
    </div>
    <div
      class="
        rounded-full
        bg-blue-500
        flex
        justify-between
        items-center
        m-3
        mx-4
      "
      @click="onPay"
    >
      <div></div>
      <div class="text-white font-semibold text-lg my-2">付款</div>
      <div class="rounded-full bg-blue-700 mr-2 px-2 py-1 text-white text-sm">
        ${{ totalPrice?.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  Ref,
  reactive,
  toRefs,
  onMounted,
  computed,
} from 'vue'
import { useRouter } from 'vue-router'

import Header from '@/components/HeaderWithBack.vue'

import { userAuthInject } from '@/store/user'
import { payOrder } from '@/apis/order'
import { getUserByPhone } from '@/apis/user'
import { Card } from 'quboqin-lib/lib/card'
import { User } from 'quboqin-lib/lib/user'
import { Address } from 'quboqin-lib/lib/address'

export default defineComponent({
  name: 'Checkout',
  components: {
    Header,
  },
  setup() {
    const router = useRouter()
    const { userInfo, setUser } = userAuthInject()

    const state = reactive({
      totalPrice: userInfo.cart?.totalPrice,
      user: userInfo.profile,
    })

    const address: Ref<Address> = computed(() => {
      const defaultAddress = userInfo.profile?.defaultAddress
      if (userInfo.profile?.addresses) {
        const _address = userInfo.profile.addresses.find((address) =>
          defaultAddress?.includes(address.id),
        ) as Address
        return _address
      } else {
        return {} as Address
      }
    })

    const creditCard: Ref<Card> = computed(() => {
      const defaultCard = userInfo.profile?.defaultCard
      if (userInfo.profile?.cards) {
        const _card = userInfo.profile.cards.find((card) =>
          defaultCard?.includes(card.last4),
        ) as Card
        return _card
      } else {
        return {} as Card
      }
    })

    async function onPay() {
      await payOrder({
        last4: creditCard.value.last4,
        amount: userInfo.cart?.totalPrice,
        phone: userInfo.profile?.phone,
        items: userInfo.cart?.items,
      })
      router.push({
        path: '/',
      })
    }

    const init = async () => {
      const user = (await getUserByPhone({
        phone: userInfo.profile?.phone,
      })) as User

      setUser(user)
    }
    onMounted(init)

    return {
      ...toRefs(state),
      onPay,
      address,
      creditCard,
    }
  },
})
</script>
