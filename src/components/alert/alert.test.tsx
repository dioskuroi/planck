import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Alert, { AlertProps } from './alert'

const getAlertElement = (props: AlertProps = {}) => {
  const Text = 'Test'
  const  { getByText } = render(<Alert { ...props }> { Text } </Alert>)
  return getByText(Text).parentElement?.parentElement
}

describe('test Alert component', () => {
  it('should render the correct default alert', () => {
    const element = getAlertElement()
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert')
    expect(element).not.toContainElement(element?.querySelector('.alert-title') as HTMLElement)
    expect(element?.querySelector('.alert-content')).toHaveTextContent('Test')
    fireEvent.click(element?.querySelector('.alert-close-btn')!)
    expect(element).not.toBeInTheDocument()
  })

  it('should render the correct component based on different props', () => {
    const title = 'test'
    const element = getAlertElement({ type: 'success', title, showClose: false })
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert-success')
    expect(element).toContainElement(element?.querySelector('.alert-title') as HTMLElement)
    expect(element?.querySelector('.alert-title')).toHaveTextContent(title)
    expect(element).not.toContainElement(element?.querySelector('.alert-close-btn') as HTMLElement)
  })
})