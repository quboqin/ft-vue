<template>
  <Header title="我的信用卡"></Header>
  <div class="mt-14">
    <div class="text-left mx-4">我的信用卡</div>
    <CreditCardCell
      v-for="(card, index) in cards"
      :key="index"
      :card="card"
      :isDefault="card.last4 === defaultCard"
      @click="onEditCreditCard()"
      class="my-2 mx-4"
    ></CreditCardCell>
    <div class="text-left mx-4 text-blue-400" @click="onAddCreditCard">
      添加新的信用卡
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Header from '@/components/HeaderWithBack.vue'
import CreditCardCell from '@/components/CreditCardCell.vue'

import { userAuthInject } from '@/store/user'
import { getAllCards } from '@/apis/card'
import { getUserByPhone } from '@/apis/user'

export default defineComponent({
  name: 'CreditCardList',
  components: {
    Header,
    CreditCardCell,
  },
  setup() {
    const router = useRouter()
    const { userInfo, setUser } = userAuthInject()

    const state = reactive({
      phone: userInfo.profile?.phone,
      defaultCard: userInfo.profile?.defaultCard,
      cards: userInfo.profile?.cards ? userInfo.profile.cards : [],
    })

    function onEditCreditCard() {
      router.push({
        name: 'CreditCardDetail',
        params: {
          phone: state.phone,
        },
      })
    }

    function onAddCreditCard() {
      router.push({
        name: 'CreditCardDetail',
        params: {
          phone: state.phone,
        },
      })
    }

    const init = async () => {
      state.cards = await getAllCards({
        phone: state.phone,
      })

      const user = await getUserByPhone({
        phone: state.phone,
      })

      setUser(user)
    }
    onMounted(init)

    return {
      ...toRefs(state),
      onEditCreditCard,
      onAddCreditCard,
    }
  },
})
</script>
