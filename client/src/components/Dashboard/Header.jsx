import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'

import gear from '../../assets/dashboard/svg/gear.svg'
import menu from '../../assets/dashboard/svg/menu.svg'
import folderIcon from '../../assets/dashboard/svg/project.svg';
import accountIcon from '../../assets/dashboard/svg/accounts.svg';
import LogoutIcon from '../../assets/dashboard/svg/logout.svg';

const Header = () => {
  const navigate = useNavigate()
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  const handleLogout = () => {
    console.log(localStorage.getItem("token"))
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
       <header className='desktop:hidden px-4 py-4 w-full'>
        <nav className='flex justify-between'>
          <div className='flex items-center'>
            <img src={gear} alt='logo' className='mr-1'/>
            <h1 className='text-body-M font-bold'>Project Management System</h1>
          </div>
          <img src={menu} alt='logo' className='relative z-30' onClick={handleMenuClick}/>
        </nav>
        <div className={`absolute top-0 left-0 z-20 w-64 h-screen transition-transform duration-300 ease-in-out bg-white ${isMenuVisible ? 'translate-x-0' : 'translate-x-[-100%]' }`} >
          <h2 className='text-heading-3 font-bold font-sans px-8 pt-8'>Menu</h2>
          <nav className='mt-8'>
            <ul>
              <li className='hover:bg-border-color px-8'>
                <Link to={"/dashboard"} className='flex py-4'>
                  <img src={accountIcon} alt='folder-icon' className='mr-2'/>
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className='hover:bg-border-color px-8'>
                <Link to={"/projects"} className='flex py-4'>
                  <img src={folderIcon} alt='folder-icon' className='mr-2'/>
                  <p>Projects</p>
                </Link>
              </li>

              <li className='hover:bg-border-color px-8' onClick={handleLogout}>
                <div className='flex py-4'>
                    <img src={LogoutIcon} alt='logout-icon' className='mr-2'/>
                    <p>Logout</p>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div onClick={handleMenuClick} className={`absolute z-[2] top-0 left-0 overlay w-screen h-full transition-opacity duration-300 ease-in-out bg-black ${isMenuVisible ? "opacity-40" : "opacity-0 hidden"}`}></div>
      </header>
       
    </>
   

    
  )
}

export default Header
