<template>
  <Header>
    <template #left>
      <p class="mdi mdi-tanker-truck"></p>
    </template>

    <template #default>
      <van-search
        v-model="searchQuery"
        placeholder="请输入要搜索的商品"
        background="#4fc08d00"
        shape="round"
        clearable
      />
    </template>

    <template #right>
      <van-badge :content="itemCount">
        <p class="mdi mdi-cart" @click="onCart"></p>
      </van-badge>
    </template>
  </Header>
  <div class="mt-14">
    <van-tabs v-model:active="active" background="#fee2e2" ref="tabsRef">
      <van-tab v-for="(item, index) in categories" :title="item" :key="index">
        <div class="flex flex-wrap justify-start">
          <GoodCell
            v-for="(_item, index) in goodsMatchingCategory(item)"
            :key="_item.id"
            :item="_item"
            class="w-1/2"
            @add-cart="addCart(index)"
          >
          </GoodCell>
        </div>
      </van-tab>
    </van-tabs>
  </div>
  <TabBar></TabBar>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { TabsInstance } from 'vant'

import Header from '@/components/Header.vue'
import GoodCell from '@/components/GoodCell.vue'
import TabBar from '@/components/Tabbar.vue'

import { Good, Category } from 'quboqin-lib/lib/goods'
import { Item } from 'quboqin-lib/lib/item'
import { getAllGoods } from '@/apis/goods'
import { userAuthInject } from '@/store/user'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    GoodCell,
    TabBar,
  },
  setup() {
    const router = useRouter()
    const { userInfo, addItem } = userAuthInject()

    const categories = Object.values(Category)

    const tabsRef = ref<TabsInstance>()

    const state = reactive({
      goods: [] as Good[],
      searchQuery: '',
      itemCount: userInfo.cart?.items ? userInfo.cart.items.length : 0,
      active: 0,
    })

    function onCart() {
      router.push('cart')
    }

    function goodsMatchingCategory(category: string) {
      if (category === Category.ALL) {
        if (state.searchQuery === '') {
          return state.goods
        } else {
          return state.goods.filter((item) => {
            return item.name
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase())
          })
        }
      } else {
        return state.goods.filter((item) => {
          return item.category.includes(category)
        })
      }
    }

    function addCart(index: number) {
      const item = new Item()
      item.amount = 1
      item.goodsId = state.goods[index].id
      item.imgUrl = state.goods[index].imgUrl
      item.price = state.goods[index].price
      item.name = state.goods[index].name
      addItem(item)
      state.itemCount++
    }

    // function onChangeTab(index: number) {
    //   console.log(`${Object.values(Category)[index]}`)
    // }

    watch(
      () => state.searchQuery,
      (newValue) => {
        console.log('The new search value is: ' + newValue)
        tabsRef.value?.scrollTo(0)
      },
    )

    const init = async () => {
      state.goods = (await getAllGoods()) as Good[]
    }
    onMounted(init)

    return {
      ...toRefs(state),
      categories,
      tabsRef,
      onCart,
      addCart,
      goodsMatchingCategory,
    }
  },
})
</script>
