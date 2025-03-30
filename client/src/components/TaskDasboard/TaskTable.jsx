import React, { useContext } from 'react'
import { TaskDashboardContext } from '../../Context/TaskDashboardContex'
import axios from 'axios'
import ProfileImageIcon from '../../assets/dashboard/svg/user.svg'
import TrashIcon from '../../assets/dashboard/svg/trash.svg'
import Button from '../Button'
import EditIcon from '../../assets/dashboard/svg/edit.svg'


const AccountTable = ({tableColumns, tableRows}) => {

    const { state, dispatch, id } = useContext(TaskDashboardContext)

    const handleDelete = (task_id) => {
        axios.delete(`http://localhost:8000/api/projects/${id}/tasks/${task_id}`, {
            headers: {
                "Accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            const accountRemoved = response.data.data
            dispatch({ type: "DELETE_TASK", payload: accountRemoved})
            
        })
       
    }

    const handleModalDisplay = (task_id) => {
       
        if(state.isEditTaskFormHidden) {
            axios.get(`http://localhost:8000/api/projects/${id}/tasks/${task_id}`, {
                headers: {
                    "Accept" : "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                dispatch({ type: "SET_TARGET_TASK_DATA", payload: response.data.data})
                return response.data.data
            }) .then (response => {
           
                dispatch({ type: "SET_INITIAL_EDIT_FORM_VALUES", payload: {
                    title: response.title,
                    status: response.status
                }})
                dispatch({type: "OPEN_EDIT_TASK_MODAL"})
            })
            
        }
        else dispatch({type: "CLOSE_EDIT_TASK_MODAL"})
    }


    return (
        <table className='w-full border-[1px] border-[#DDE1E6]'>
            <thead className='bg-seperator'>
                <tr>
                    {
                        tableColumns.map(columnHead => {
                            return <th className={`${columnHead === "Status" && "hidden desktop:table-cell"} text-start px-3 py-4 font-normal`} key={columnHead}>{columnHead}</th>
                        })
                    }
                </tr>   
            </thead>
            <tbody>
                {
                    tableRows.length === 0 ? <tr><td><h1 className='text-heading-5 p-16 font-bold'>No Results Found</h1></td></tr> :
                    tableRows.map((list, index) => { 
                        return <tr key={index} className=''>
                            <td className='flex justify-start items-center px-3 py-2 w-fit'>
                               
                                <div>
                                    <h3 className='text-body-S font-bold'>{list.title}</h3>
                                </div>
                            </td>
                            <td className="w-fit hidden desktop:table-cell font-bold">
                                <div className={`badge rounded-full bg-border-color ${list.status === "pending" ? "text-white bg-placehoder-color" : list.status === "in progress" ? "text-black bg-inprogress" : "text-white bg-completed"} px-4 py-3`}>
                                    <p>{list.status}</p>
                                </div>
                            </td>
                            <td className='px-3 py-2'>
                                <div className='flex'>
                                    <Button label={<img src={EditIcon} alt='edit-icon'/>} style={`border-2 border-primary bg-transparent mr-2`} action={() => handleModalDisplay(list.id)}/>
                                    <Button label={<img src={TrashIcon} alt='trash-icon'/>} style={`border-2 border-cancel bg-cancel`} action={() => handleDelete(list.id)}/>
                                </div>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default AccountTable
