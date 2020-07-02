import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menu-item'
import SubMenu from './sub-menu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['3'],
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop 1</MenuItem>
      </SubMenu>
    </Menu>
  )
}
// 创建 SubMenu 元素 css，用于测试 SubMenu 是否可见
const createStyleFile = () => {
  const cssFile: string = `
    .planck-submenu {
      display: none;
    }

    .planck-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile

  return style
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement,
  xyzElement: HTMLElement,
  dropDownElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  // beforeEach 函数会在每个 case 开始前都会执行
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    // 将 css 元素加入到 container 中
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('menu-test')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
    xyzElement = wrapper.getByText('xyz')
    dropDownElement = wrapper.getByText('dropdown')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('planck-menu', 'menu-horizontal', 'test')
    expect(menuElement).toContainElement(activeElement)
    expect(menuElement).toContainElement(disabledElement)
    expect(menuElement).toContainElement(xyzElement)
    expect(menuElement).toContainElement(dropDownElement)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
    expect(xyzElement).not.toHaveClass('is-active')
  })
  it('click items should change active and call the right callback', () => {
    fireEvent.click(xyzElement)
    expect(xyzElement).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toBeCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toBeCalledWith('1')
  })
  it('should render vertical mode when mode set to vertical', () => {
    // 清除该 case 之前渲染的组件，这里清除了 beforeEach 中创建的 wrapper
    cleanup()
    const wrapper = render(generateMenu(testVerticalProps))
    const menuElement = wrapper.getByTestId('menu-test')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when hover on SubMenu', async () => {
    // 判断节点是否可见，注意需要用 queryByText 获取元素
    expect(wrapper.queryByText('drop 1')).not.toBeVisible()
    fireEvent.mouseEnter(dropDownElement)
    await wait(() => {
      expect(wrapper.getByText('drop 1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop 1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropDownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop 1')).not.toBeVisible()
    })
  })
  it('should show dropdown items when click on SubMenu', async () => {
    cleanup()
    const wrapper = render(generateMenu(testVerticalProps))
    wrapper.container.append(createStyleFile())
    const dropDownElement = wrapper.getByText('dropdown')
    expect(wrapper.queryByText('drop 1')).toBeVisible()
    fireEvent.click(dropDownElement)
    await wait(() => {
      expect(wrapper.getByText('drop 1')).not.toBeVisible()
    })
    fireEvent.click(dropDownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop 1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop 1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
  })
})
