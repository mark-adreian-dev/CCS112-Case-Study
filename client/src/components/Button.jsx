import React from 'react'

const Button = ({label, action, style}) => {
  return (
    <button className={`px-3 py-2 text-white text-body-S font-bold cursor-pointer ${style}`} onClick={action}>
      {label}
    </button>
  )
}

export default Button
