<template>
  <Header>
    <template #default>
      <div>我的</div>
    </template>
  </Header>
  <div class="mt-14">
    <div
      class="
        my-2
        mx-4
        flex
        items-center
        justify-between
        bg-white
        rounded-md
        px-2
      "
    >
      <div class="flex items-center justify-start">
        <van-image
          class="my-2"
          round
          width="3rem"
          height="3rem"
          :src="avatar"
        />
        <div class="ml-2 text-gray-600 text-left">
          <div class="font-semibold">QQB</div>
          <div class="text-sm text-gray-400">ID: weee7343219</div>
        </div>
      </div>
      <p
        class="
          mdi mdi-chevron-right
          text-3xl text-center
          leading-none
          text-gray-500
        "
      ></p>
    </div>
    <div
      class="mx-4 my-2 text-gray-600 bg-white rounded-md"
      @click="onOrderList"
    >
      <div class="pl-2 pt-2 text-left">我的订单</div>
      <hr class="bg-gray-800 my-2" />
      <div class="flex justify-between py-2 px-4">
        <div class="" v-for="(type, index) in orderTypes" :key="index">
          <img class="mx-auto h-8 w-8" :src="orderIcons[index]" />
          <div class="text-center text-xs">
            {{ type }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        mx-4
        my-2
        text-gray-600
        bg-white
        rounded-md
        flex
        items-center
        justify-between
        p-2
      "
      @click="onAddressList"
    >
      <div>我的地址</div>
      <p
        class="
          mdi mdi-chevron-right
          text-3xl text-center
          leading-none
          text-gray-500
        "
      ></p>
    </div>
    <div
      class="
        mx-4
        my-2
        text-gray-600
        bg-white
        rounded-md
        flex
        items-center
        justify-between
        p-2
      "
      @click="onCreditCardList"
    >
      <div>我的信用卡</div>
      <p
        class="
          mdi mdi-chevron-right
          text-3xl text-center
          leading-none
          text-gray-500
        "
      ></p>
    </div>
    <div class="mx-4 mt-4">
      <van-button round type="success" size="large" @click="onLogout"
        >退出</van-button
      >
    </div>
  </div>
  <TabBar></TabBar>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Header from '@/components/Header.vue'
import TabBar from '@/components/Tabbar.vue'

import { signOut } from '@/utils/aws-auth'
import { userAuthInject } from '@/store/user'
import { User } from 'quboqin-lib/lib/user'
import { getUserByPhone } from '@/apis/user'

export default defineComponent({
  name: 'Profile',
  components: {
    Header,
    TabBar,
  },
  setup() {
    const router = useRouter()
    const { userInfo, setUser } = userAuthInject()

    const state = reactive({
      orderTypes: ['全部订单', '待付款', '待发货'],
      avatar: require('../assets/avatar.jpg'),
      orderIcons: [
        require('../assets/icons8-clock-64.png'),
        require('../assets/icons8-box-64.png'),
        require('../assets/icons8-boot-open-64.png'),
      ],
    })

    function onOrderList() {
      router.push('order-list')
    }

    function onAddressList() {
      router.push('address-list')
    }

    function onCreditCardList() {
      router.push('credit-card-list')
    }

    async function onLogout() {
      await signOut()
      setUser(new User())
      router.push({
        path: '/',
      })
    }

    const init = async () => {
      const user = await getUserByPhone({
        phone: userInfo.profile?.phone,
      })

      setUser(user)
    }
    onMounted(init)

    return {
      ...toRefs(state),
      onOrderList,
      onAddressList,
      onCreditCardList,
      onLogout,
    }
  },
})
</script>
