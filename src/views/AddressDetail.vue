<template>
  <Header title="我的地址"></Header>
  <div class="mt-14">
    <van-cell-group inset>
      <van-field v-model="street" type="text" label="Street" />
      <van-field v-model="city" type="text" label="City" />
      <van-field v-model="zipCode" type="text" label="Zip Code" />
    </van-cell-group>
    <div class="flex justify-center items-center pt-4">
      <van-checkbox v-model="isDefault" shape="square"
        >设置为默认地址</van-checkbox
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
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Header from '@/components/HeaderWithBack.vue'

import { createAddress, deleteAddress } from '@/apis/user'

export default defineComponent({
  name: 'AddressDetail',
  components: {
    Header,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      phone: route.params.phone,
      street: route.params.street,
      city: route.params.city,
      zipCode: route.params.zipCode,
      id: route.params.id,
      isDefault: false,
    })

    async function onSave() {
      await createAddress(state)
      router.push({
        path: '/address-list',
      })
    }

    async function onDelete() {
      await deleteAddress(state)
      router.push({
        path: '/address-list',
      })
    }

    return {
      ...toRefs(state),
      onSave,
      onDelete,
    }
  },
})
</script>
