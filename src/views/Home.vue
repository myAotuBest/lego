<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <h1>{{ a }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import HelloWorld from "@/components/HelloWorld.vue" // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    const a = ref<number>(1)
    return {
      a,
    }
  },
})
</script>
