import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonType, ButtonSize, ButtonProps } from './button'

// @testing-library/react 用于测试用例中使用 react 组件
// @testing-library/jest-dom 增加了许多针对 dom 的断言

let index = 0

const getButtonElement = (props: ButtonProps = {}) => {
  // 渲染组件
  const Text = `Test${index}`
  index++
  const { getByText } = render(<Button { ...props }>{ Text }</Button>)
  // 根据元素中的文本获取元素
  return getByText(Text)
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const defaultProps: ButtonProps = { onClick: jest.fn(), className: 'custom' }
    const element = getButtonElement(defaultProps)
    // 判断元素是否存在于文档中
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('BUTTON')
    expect(element).toHaveClass('btn', 'btn-default', 'custom')
    expect(element).not.toBeDisabled()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    const element = getButtonElement({ btnType: ButtonType.Primary, size: ButtonSize.Large})
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn', `btn-${ButtonType.Primary}`, `btn-${ButtonSize.Large}`)
  })

  it('should render a link when btnType equals link and href is provided', () => {
    const href = "https://www.baidu.com"
    const element = getButtonElement({ btnType: ButtonType.Link, href })
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('A')
    expect(element).toHaveClass('btn', `btn-${ButtonType.Link}`)
    expect(element).toHaveAttribute('href', href)
  })

  it('should render disabled button when disalbed set to true', () => {
    const buttonProps: ButtonProps = { disabled: true, onClick: jest.fn() }
    const buttonElement = getButtonElement(buttonProps)
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toBeDisabled()
    fireEvent.click(buttonElement)
    expect(buttonProps.onClick).not.toHaveBeenCalled()

    const anchorProps: ButtonProps = { btnType: ButtonType.Link, disabled: true, onClick: jest.fn() }
    const anchorElement = getButtonElement(anchorProps)
    expect(anchorElement).toBeInTheDocument()
    expect(anchorElement).toHaveClass('disabled')
    fireEvent.click(anchorElement)
    expect(anchorProps.onClick).not.toHaveBeenCalled()
  })
})