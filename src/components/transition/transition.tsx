import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-bottom'
  | 'zoom-in-left'
  | 'zoom-in-right'

interface TransitionProps {
  animation?: AnimationName
  // 防止子元素上有 transition 属性
  wrapper?: boolean
}

const Transition: React.FC<TransitionProps & CSSTransitionProps> = (props) => {
  const { classNames, animation, children, wrapper, ...restProps } = props

  return (
    <CSSTransition classNames={classNames ?? animation} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  appear: true,
  // 组件消失自动卸载组件，不需要手动修改 display 的值
  unmountOnExit: true,
}

export default Transition
