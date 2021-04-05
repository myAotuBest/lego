import { mount, VueWrapper } from '@vue/test-utils'
import rgbHex from 'rgb-hex'
import ColorPicker from '@/components/ColorPicker.vue'
const defaultColors = ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', '']
let wrapper: VueWrapper<any>

describe("ColorPick Component", () => {
    beforeAll(() => {
        wrapper = mount(ColorPicker, {
            props: {
                value: '#ffffff'
            }
        })
    })
    it("should render the correct interface", () => {
        expect(wrapper.find('input').exists()).toBeTruthy()
        const input = wrapper.get('input').element
        expect(input.type).toBe('color')
        expect(input.value).toBe('#ffffff')
        // 测试右侧是否有颜色的列表
        expect(wrapper.findAll('.picked-color-list li').length).toBe(defaultColors.length)
        // 测试第一个元素的css backgroundColor属性是否相等对应的颜色
        const firstItem: HTMLElement = wrapper.get('li:first-child div').element as HTMLElement
        expect('#' + rgbHex(firstItem.style.backgroundColor)).toBe(defaultColors[0])
        // 测试最后一个元素的css 是否有特殊的类名
        const lastItem: HTMLElement = wrapper.get('li:last-child div').element as HTMLElement
        expect(lastItem.classList.contains('transparent-back')).toBeTruthy()
    })

    it("should send the correct event when change input", async () => {
        // 测试 input 修改后是否发送对应的事件和值
        const color = '#ffffff'
        const input = wrapper.get('input')
        await input.setValue(color)
        expect(wrapper.emitted()).toHaveProperty('change')
        const events = wrapper.emitted('change') || []
        expect(events[0]).toEqual([color])
    })
    it('should send the correct event when clicking the color list', async () => {
        // 测试点击右侧列表是否发送对应的值
        const firstItem = wrapper.get('li:first-child div')
        firstItem.trigger('click')
        const events = wrapper.emitted('change') || []
        expect(events[0]).toEqual([defaultColors[0]])
    })
})