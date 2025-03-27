import React from 'react'

const TextBox = ({label, name, type, value, handleFieldChange}) => {
    return (
        <div className='input-field'>
            <label className='block text-body-S leading-line-height-L' htmlFor={label} >{label}</label>

            <input className='text-body-M leading-line-height-L text-placehoder-color px-4 py-3 bg-input-background w-full border-b-[1px] border-border-color mb-4' 
                   type={type} 
                   name={name} 
                   id={label} 
                   placeholder={label.replace(":", "")} 
                   value={value} 
                   onChange={handleFieldChange}
            />
        </div>
    )
}

export default TextBox
