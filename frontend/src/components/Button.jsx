import React from 'react'

const Button = ({type, className, children, isDisabled = false}) => {
  return (
    <button type={type} className={className} disabled = {isDisabled}> {children} </button>
  )
}

export default Button