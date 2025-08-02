import React from 'react'

const Button = ({type, className, children, handleClick , isDisabled = false}) => {
  return (
    <button onClick={handleClick} type={type} className={className} disabled = {isDisabled}> {children} </button>
  )
}

export default Button