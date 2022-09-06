<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  inheritAttrs: false,
})
</script>

<script lang="ts" setup name="App" inheritAttrs="false">
const a = 1
</script>

<template>
  <div>
    hello world123
    {{ a }}
  </div>
</template>
