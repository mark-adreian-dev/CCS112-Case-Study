import React from 'react'
import ProfileImageIcon from '../../assets/dashboard/svg/user.svg'
import Button from '../Button'
import EditIcon from '../../assets/dashboard/svg/edit.svg'
import TrashIcon from '../../assets/dashboard/svg/trash.svg'

const AccountTable = ({tableColumns, tableRows}) => {
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
                                <Button label={<img src={EditIcon} alt='edit-icon'/>} style={`border-2 border-primary bg-transparent mr-1 `}/>
                                <Button label={<img src={TrashIcon} alt='trash-icon'/>} style={`border-2 bg-cancel`}/>
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
