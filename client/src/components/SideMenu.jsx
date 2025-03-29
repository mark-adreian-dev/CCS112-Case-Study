import React from 'react'
import GearIcon from '../assets/dashboard/svg/gear.svg'
import Accounts from '../assets/dashboard/svg/accounts.svg'
import FolderIcon from '../assets/dashboard/svg/project.svg'
import LogoutIcon from '../assets/dashboard/svg/logout.svg'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'

const SideMenu = () => {
const navigate = useNavigate()
 const handleLogout = () => {
    axios.post("http://localhost:8000/api/logout", {},  {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        console.log(response)
        alert(response.data.message)
      })
      .then(()=> navigate("/"))
 }
  return (
    <>
        <div className='left desktop:w-fit px-4 py-6 hidden desktop:block'>
            <aside className='flex flex-col'>
                <div className='flex items-center'>
                    <img  className='w-[66px] h-[66px] mr-2' src={GearIcon} alt='gear-icon'/>
                    <p className='text-[20px] font-bold leading-line-height-S'>Project Management System</p>
                </div>
                <ul className='mt-16'>
                    <li>
                        <Link to={"/dashboard"} className='flex py-4'>
                            <img src={Accounts} alt='accounts-icon' className='mr-2'/>
                            <p>Accounts</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/projects"} className='flex py-4'>
                            <img src={FolderIcon} alt='folder-icon' className='mr-2'/>
                            <p>Projects</p>
                        </Link>
                    </li>
                    <li onClick={handleLogout}>
                        <div className='flex py-4'>
                            <img src={LogoutIcon} alt='logout-icon' className='mr-2'/>
                            <p>Logout</p>
                        </div>
                    </li>
                </ul>
            </aside>
        </div> 
    </>
  )
}

export default SideMenu
