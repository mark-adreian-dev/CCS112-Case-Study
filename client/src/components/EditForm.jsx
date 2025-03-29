import React, { useContext } from 'react'
import TextBox from './TextBox'
import Button from './Button'
import { useLockBodyScroll } from '@uidotdev/usehooks'

const EditForm = ({ fields, title, onChangeHandler, submitAction, modalAction, context}) => {
    useLockBodyScroll()
    const { state } = useContext(context)
    
    
    return (
        <>
            <div className={`w-screen h-screen fixed top-0 left-0 z-[200] desktop:bg-[rgba(0,0,0,0.50)] desktop:flex`}>
                <div className="bg-white h-full flex justify-center items-start flex-col p-12 desktop:w-[600px] desktop:h-fit desktop:m-auto">
                    <h3 className="font-bold text-heading-3 mb-12">{title}</h3>
                    <div className='w-full'>
                        {
                            fields.map(field => {
                                return field.type === "select" ? <div key={field.id} className='w-full'>
                                    <select className='w-full outline-none h-12 border-b-[1px] border-border-color px-4 py-2 mb-6' defaultValue={state.editFormValues[field.name]}  name={field.name} onChange={onChangeHandler}>
                                        {field.options.map(option => {
                                            return <option key={option} value={option}>{option}</option> 
                                         
                                        })}
                                    </select>
                                    
                                </div>
                                : <TextBox 
                                    key={field.id} 
                                    label={field.label} 
                                    type={field.type} 
                                    name={field.name} 
                                    
                                    handleFieldChange={onChangeHandler} 
                                    value={state.editFormValues[field.name]}
                                />
                            })
                        }

                        <Button label={title} style={"bg-primary w-full mb-2"} action={submitAction}/>
                        <Button action={modalAction} label={"Cancel"} style={"border-2 border-primary !text-primary hover:!text-white hover:bg-cancel hover:border-cancel w-full"}/>
                    </div>  
                </div>
            </div>
        </>
    )
}

export default EditForm
