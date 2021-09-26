<template>
  <div class="flex items-center justify-between bg-white rounded-md p-2">
    <div class="flex items-center justify-start w-7/12">
      <p
        class="
          mdi mdi-map-marker-radius-outline
          text-3xl text-center
          leading-none
          text-gray-500
        "
        v-if="isDefault"
      ></p>
      <div v-else></div>
      <div class="text-left pl-2">
        <div class="text-base font-semibold">
          {{ `${firstName} ${lastName}` }}
        </div>
        <div class="text-xs text-gray-400">
          {{ address.street }}
        </div>
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

import { Address } from 'quboqin-lib/lib/address'

export default defineComponent({
  name: 'AddressCell',
  props: {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    address: {
      type: Object as PropType<Address>,
      required: true,
    },
    isDefault: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
