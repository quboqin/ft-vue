<template>
  <div class="flex items-center justify-between bg-white rounded-md p-2">
    <div class="flex items-center justify-start">
      <p
        class="
          mdi mdi-credit-card-outline
          text-3xl text-center
          leading-none
          text-gray-500
        "
        v-if="isDefault"
      ></p>
      <div v-else></div>
      <div class="text-base font-semibold pl-2 text-gray-400">
        {{
          `${card.brand} ${card.country} ${card.expirationMonth} ${card.expirationYear}`
        }}
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Card } from 'quboqin-lib/lib/card'

export default defineComponent({
  name: 'CreditCardCell',
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
    isDefault: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
