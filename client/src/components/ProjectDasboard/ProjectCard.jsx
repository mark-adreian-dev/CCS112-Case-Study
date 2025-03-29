import React from 'react'
import TrashIcon from '../../assets/dashboard/svg/trash.svg'
import Button from '../Button'
import EditIcon from '../../assets/dashboard/svg/edit.svg'

const ProjectCard = ({ status, title, description, handleDelete, handleUpdate}) => {

  return (
    <div className='border-[1px] border-border-color p-4 w-full flex flex-col justify-between h-[155px]'>
      <div className=''>
        <h3 className='text-body-M font-bold'>{title}</h3>
        <p className='text-body-XS text-placehoder-color'>{description}</p>
      </div>
      <div className='flex justify-between'>
        <div className={`badge rounded-full bg-border-color ${status === "pending" ? "text-white bg-placehoder-color" : status === "in progress" ? "text-black bg-inprogress" : "text-white bg-completed"} px-4 py-3`}>
          <p>{status}</p>
        </div>
        <div className='button-group'>
          <Button label={<img src={EditIcon} alt='edit-icon'/>} style={`border-2 border-primary bg-transparent mr-2`} action={handleUpdate}/>
          <Button label={<img src={TrashIcon} alt='trash-icon'/>} style={`border-2 border-cancel bg-cancel`} action={handleDelete}/>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
