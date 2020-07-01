import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children: React.ReactNode
  href?: string
}
// react 内部封装了 html 元素本身自带的属性，
// 如 button 元素为  React.ButtonHTMLAttributes<HTMLElement>
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    disabled,
    size,
    btnType,
    children,
    href,
    ...rest
  } = props
  // 利用 classNames 插件能够轻松的设置类名
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a 
        className={ classes }
        href={ href }
        // 利用扩展运算符能直接将属性集合一次性放入元素中
        { ...rest }>
        { children }
      </a>
    )
  } else {
    return (
      <button
        className={ classes }
        disabled={ disabled }
        { ...rest }>
        { children }
      </button>
    )
  }
}
// 设置默认属性
Button.defaultProps = {
  btnType: ButtonType.Default,
  disabled: false
}

export default Button