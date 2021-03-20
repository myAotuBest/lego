<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <span class="label" v-if="value.text">{{ value.text }}</span>
      <div class="prop-component">
        <component
          v-if="value"
          :is="value.component"
          :[value.valueProp]="value.value"
          v-bind="value.extraProps"
          v-on="value.events"
        >
          <template v-if="value.options">
            <component
              :is="value.subComponent"
              v-for="(option, k) in value.options"
              :key="k"
              :value="option.value"
            >
              <render-vnode :vNode="option.text"></render-vnode>
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, VNode } from "vue"
import { reduce } from "lodash-es"
import { TextComponentProps } from "@/types/defaultProps"
import { mapPropsToForms, FormProps } from "@/types/propsMap.tsx"
import RenderVnode from "./RenderVnode"

export default defineComponent({
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true,
    },
  },
  emits: ["change"],
  components: {
    RenderVnode,
  },
  setup(props, context) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps
          const item = mapPropsToForms[newKey]
          if (item) {
            // 默认属性设置未 value 也可以自定义属性
            const {
              valueProp = "value",
              eventName = "change",
              initalTransform,
              afterTransform,
            } = item
            const newItem: FormProps = {
              ...item,
              valueProp,
              eventName,
              value: initalTransform ? initalTransform(value) : value,
              events: {
                [eventName]: (e: any) => {
                  context.emit("change", {
                    key,
                    value: afterTransform ? afterTransform(e) : e,
                  })
                },
              },
            }
            result[newKey] = newItem
          }
          return result
        },
        {} as { [key: string]: FormProps }
      )
    })

    return {
      finalProps,
    }
  },
})
</script>

<style>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}
</style>