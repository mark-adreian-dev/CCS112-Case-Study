import React from 'react'

const TextBox = ({label, name, type, value, handleFieldChange, id}) => {
    return (
        <div className='input-field'>
            <label className='block text-body-S leading-line-height-L' htmlFor={id} >{label}</label>

            {
                type !== "textarea" ?
                <input className='outline-none text-body-M leading-line-height-L text-placehoder-color px-4 py-3 bg-input-background w-full border-b-[1px] border-border-color mb-4' 
                   type={type} 
                   name={name} 
                   id={id} 
                   placeholder={label.replace(":", "")} 
                   value={value} 
                   onChange={handleFieldChange}
                /> : 
                <textarea id={id} name={name} rows={4} cols={50} value={value} onChange={handleFieldChange} placeholder='Description' className='w-full p-4 outline-none bg-input-background mb-4 border-b-[1px] border-border-color'></textarea>
            }
        </div>
    )
}

export default TextBox
