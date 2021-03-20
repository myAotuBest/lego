<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: yellow">
        <div class="sidebar-container">
          <components-list
            :list="defaultTextTemplates"
            @onItemClick="addItem"
          />
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <edit-wrapper
              v-for="component in components"
              @setActive="setActive"
              :key="component.id"
              class="preview"
              :id="component.id"
              :active="component.id === currentElement?.id"
            >
              <component :is="component.name" v-bind="component.props">
              </component>
              <span @click="removeComponent(component.id)">删除</span>
            </edit-wrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        width="300"
        style="background: #fff"
        class="settings-panel"
      >
        组件属性
        <props-table
          v-if="currentElement && currentElement.props"
          :props="currentElement.props"
          @change="handChange"
        />
        <pre>
        {{ currentElement && currentElement.props }}
        </pre>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useStore } from "vuex"
import LText from "@/components/lText/lText.vue"
import ComponentsList from "@/components/ComponentsList.vue"
import EditWrapper from "@/components/EditWrapper.vue"
import PropsTable from "@/components/PropsTable.vue"

import { GlobalDataProps } from "../store/index"
import { ComponentData } from "@/store/editor"
import { defaultTextTemplates } from "@/mock/defaultTextTemplates"
export default defineComponent({
  components: {
    LText,
    ComponentsList,
    EditWrapper,
    PropsTable,
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const components = computed(() => store.state.editor.components)
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    )
    const addItem = (data: any) => {
      store.commit("addComponent", data)
    }
    const setActive = (id: string) => {
      store.commit("setActive", id)
    }
    const removeComponent = (id: string) => {
      store.commit("removeComponent", id)
    }
    const handChange = (e: any) => {
      store.commit("updateComponent", e)
    }
    return {
      components,
      currentElement,
      defaultTextTemplates,
      addItem,
      removeComponent,
      setActive,
      handChange,
    }
  },
})
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
.preview {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>