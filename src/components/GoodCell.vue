<template>
  <div>
    <button @click="onAdd()">
      {{ item.name }}(*{{ item.amount }}) ${{ item.price }} +
    </button>
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Item } from '@/store/user'

export default defineComponent({
  name: 'GoodCell',
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
  setup(props, { emit }) {
    function onAdd() {
      emit('add-cart')
    }

    return {
      onAdd,
    }
  },
})
</script>
