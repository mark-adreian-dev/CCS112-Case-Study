import React from 'react'
import TextBox from './TextBox'
import Button from './Button'

const Form = ({ api, formName, fields, title}) => {
  
  
    return (
        <>
            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
           
            <dialog id={formName} className="modal ">
                <div className="!bg-white desktop:modal-box p-32">
                    <h3 className="font-bold text-heading-3">{title}</h3>
                    <p className="py-4">Click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Cancel</button>
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Form
