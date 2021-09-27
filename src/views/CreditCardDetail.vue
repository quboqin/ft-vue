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
      <van-checkbox v-model="isDefault" shape="square"
        >设置为默认银行卡</van-checkbox
      >
    </div>

    <div class="mx-4 mt-4 flex justify-between">
      <div @click="onSave" class="flex-auto px-4">
        <van-button round type="success" size="large">保存</van-button>
      </div>
      <div @click="onDelete" class="flex-auto px-4" v-if="id">
        <van-button round type="success" size="large">删除</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { stripe, cardNumber, cardExpiry, cardCvc } from '@/utils/stripe'

import Header from '@/components/HeaderWithBack.vue'

import { createCard, deleteCard } from '@/apis/card'
import { Card } from 'quboqin-lib/lib/card'

export default defineComponent({
  name: 'CreditCardDetail',
  components: {
    Header,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      phone: route.params.phone,
      id: route.params.id,
      isDefault: false,
      disabled: false,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stripeTokenHandler = async (token: any) => {
      const result = await stripe.createSource(cardNumber)
      if (result.error) {
        // Inform the user if there was an error.
        state.disabled = false
      } else {
        // Send the token to your server.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const card: Card = await createCard({
          stripeToken: token.id,
          phone: state.phone,
          cardInfo: {
            brand: result.source?.card?.brand,
            country: result.source?.card?.country,
            expirationMonth: result.source?.card?.exp_month,
            expirationYear: result.source?.card?.exp_year,
            last4: result.source?.card?.last4,
          },
        })

        if (card.last4 === result.source?.card?.last4) {
          console.log('')
        }
      }
    }

    async function onSave(): Promise<void> {
      const result = await stripe.createToken(cardNumber)
      if (result.error) {
        // Inform the user if there was an error.
        console.log(result.error.message)
      } else {
        // Send the token to your server.
        await stripeTokenHandler(result.token)
        router.push({
          path: '/credit-card-list',
        })
      }
    }

    async function onDelete() {
      await deleteCard(state)
      router.push({
        path: '/credit-card-list',
      })
    }

    const init = async () => {
      cardNumber.mount('#card-number')
      cardExpiry.mount('#card-expiry')
      cardCvc.mount('#card-cvc')
    }
    onMounted(init)

    cardNumber.addEventListener('change', (error: Error) => {
      const displayError: HTMLElement | null =
        document.getElementById('card-errors')
      if (displayError) {
        if (error) {
          displayError.textContent = error.message
        } else {
          displayError.textContent = ''
        }
      }
    })

    return {
      ...toRefs(state),
      onSave,
      onDelete,
    }
  },
})
</script>
