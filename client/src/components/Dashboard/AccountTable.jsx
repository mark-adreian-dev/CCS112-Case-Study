import React, { useContext } from 'react'
import { DashboardContext } from '../../Context/DashboardContext'
import axios from 'axios'
import ProfileImageIcon from '../../assets/dashboard/svg/user.svg'
import TrashIcon from '../../assets/dashboard/svg/trash.svg'
import Button from '../Button'
import EditIcon from '../../assets/dashboard/svg/edit.svg'


const AccountTable = ({tableColumns, tableRows}) => {

    const { state, dispatch } = useContext(DashboardContext)

    const handleDelete = (account_id) => {
        axios.delete(`http://127.0.0.1:8000/api/users/${account_id}`, {
            headers: {
                "Accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            const accountRemoved = response.data.data
            dispatch({ type: "DELETE_USER", payload: accountRemoved})
            
        })
       
    }

    const handleModalDisplay = (account_id) => {
       
        if(state.isEditAccountFormHidden) {
            axios.get(`http://127.0.0.1:8000/api/users/${account_id}`, {
                headers: {
                    "Accept" : "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                dispatch({ type: "SET_TARGET_USER_DATA", payload: response.data.data})
                return response.data.data
            }) .then (response => {
           
                dispatch({ type: "SET_INITIAL_EDIT_FORM_VALUES", payload: {
                    name: response.name,
                    email: response.email,
                    role: response.role
                }})
                dispatch({type: "OPEN_EDIT_ACCOUNT_MODAL"})
            })
            
        }
        else dispatch({type: "CLOSE_EDIT_ACCOUNT_MODAL"})
    }


    return (
        <table className='w-full border-[1px] border-[#DDE1E6]'>
            <thead className='bg-seperator'>
                <tr>
                    {
                        tableColumns.map(columnHead => {
                            return <th className={`${columnHead === "Email" && "hidden desktop:table-cell"} text-start px-3 py-4 font-normal`} key={columnHead}>{columnHead}</th>
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
                                <img src={ProfileImageIcon} alt='profile-icon' />
                                <div>
                                    <h3 className='text-body-S font-bold'>{list.name}</h3>
                                    <p className='text-placehoder-color'>{list.role}</p>
                                </div>
                            </td>
                            <td className="w-fit hidden desktop:table-cell font-bold">
                                <p className='text-body-S'>{list.email}</p>
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
