<template>
  <div
    class="edit-wrapper"
    @click="onItemClick(id)"
    :class="{ active: active }"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["set-active"],
  setup(props, context) {
    const onItemClick = (id: string) => {
      context.emit("set-active", id)
    }
    return {
      onItemClick,
    }
  },
})
</script>