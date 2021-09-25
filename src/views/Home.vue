<template>
  <Good
    v-for="(item, index) in goods"
    :key="index"
    :item="item"
    class="w-1/2"
    @add-cart="addCart(index)"
  />
  <div>
    total price ${{ userInfo.cart?.totalPrice.toFixed(2) }} total count
    {{ userInfo.cart?.items?.length }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Good from '@/components/GoodCell.vue'
import { Item } from '@/store/user'
import { userAuthInject } from '@/store/user'

export default defineComponent({
  name: 'Home',
  components: {
    Good,
  },
  setup() {
    const { addItem, userInfo } = userAuthInject()

    const items: Item[] = [
      {
        name: 'burge',
        price: 3.2,
        amount: 1,
      },
      {
        name: 'pizza',
        price: 2.6,
        amount: 2,
      },
    ]

    const goods = reactive(items)

    function addCart(index: number) {
      const item = new Item()
      item.amount = goods[index].amount
      item.price = goods[index].price
      item.name = goods[index].name
      addItem(item)
    }

    return {
      goods,
      addCart,
      userInfo,
    }
  },
})
</script>
