import React, { useContext } from 'react'
import { useLockBodyScroll } from "@uidotdev/usehooks";
import TextBox from './TextBox'
import Button from './Button'


const AddForm = ({ fields, title, onChangeHandler, context, modalAction, submitAction}) => {
    useLockBodyScroll();
    const { state } = useContext(context)
 
    return (
        <>
            <div className={`w-full h-full fixed top-0 left-0 z-[200] desktop:bg-[rgba(0,0,0,0.50)] desktop:flex`}>
                <div className="bg-white h-full flex justify-center items-start flex-col p-12 desktop:w-[600px] desktop:h-fit desktop:m-auto ">
                    <h3 className="font-bold text-heading-3 mb-12">{title}</h3>
                    <div className='w-full'>
                        {
                           
                            fields.map(field => {

                                return <TextBox 
                                    key={field.name} 
                                    label={field.label} 
                                    type={field.type} 
                                    name={field.name} 
                                    id={field.id}
                                    
                                    handleFieldChange={onChangeHandler} 
                                    value={state.addFormValues[field.name]}
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

export default AddForm
