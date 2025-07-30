import React from 'react'

const Label = ({htmlfor, children}) => {
  return (
    <label htmlFor={htmlfor}> {children} </label>
  )
}

export default Label