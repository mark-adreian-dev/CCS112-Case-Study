import React from 'react'

const Button = ({label, action, style}) => {
  return (
    <button className={`w-full px-3 py-2 bg-primary text-white text-body-S font-bold cursor-pointer ${style}`} onClick={action}>
      {label}
    </button>
  )
}

export default Button
