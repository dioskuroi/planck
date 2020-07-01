import React, { useState, useCallback } from 'react'
import classNames from 'classnames'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
  className?: string
  title?: string
  showClose?: boolean
  type?: AlertType
  children?: React.ReactNode
}

const Alert: React.FC<AlertProps> = (props) => {
  const [ hidden, setHidden ] = useState(false)
  const closeAlert = useCallback(() => {
    setHidden(true)
  }, [])
  const {
    className,
    title,
    showClose,
    type,
    children
  } = props
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type
  })
  return (
    <>
      { !hidden && 
        <div 
          className={ classes }>
          <div className="alert-left">
            { title && <div className="alert-title"> { title } </div> }
            <div className="alert-content"> { children } </div>
          </div>
          <div className="alert-right">
            { showClose && 
                <span 
                  className="alert-close-btn"
                  onClick={ closeAlert }>
                  关闭
                </span> 
            }
          </div>
        </div>
      }
    </>
  )
}

Alert.defaultProps = {
  type: 'default',
  showClose: true
}

export default Alert