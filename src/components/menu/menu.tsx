import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menu-item'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void

export interface MenuProps {
  defaultIndex?: string
  defaultOpenSubMenus?: string[]
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
}

interface IMenuContext {
  defaultOpenSubMenus?: string[]
  index: string
  onSelect?: SelectCallback
  menuMode?: MenuMode
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    defaultOpenSubMenus,
    className,
    mode,
    style,
    children,
    onSelect,
  } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('planck-menu', className, {
    [`menu-${mode}`]: mode,
  })
  const handleClick = (index: string) => {
    setActive(index)
    onSelect && onSelect(index)
  }

  const passedContext: IMenuContext = {
    defaultOpenSubMenus,
    index: currentActive ?? '0',
    onSelect: handleClick,
    menuMode: mode,
  }

  const renderChildren = () => {
    // React.children 提供了一系列操作 children 的方法，如 map、forEach 等
    // 使用 React.children.map 来进行遍历，不要直接使用 children.map
    // 因为你不知道 children 是不是一个数组
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 利用 React.cloneElement 来克隆一个元素并混入一些属性或者替代他的 children
        // React.cloneElement(Element, [props], [...children])
        // 注意：传入的 props 会和元素本身的 props 进行 Object.assign，而 children 则会代替原来元素的 children
        //      原始元素的 key 和 ref 都会被保留
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        )
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="menu-test">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  defaultOpenSubMenus: [],
  mode: 'horizontal',
}

export default Menu
