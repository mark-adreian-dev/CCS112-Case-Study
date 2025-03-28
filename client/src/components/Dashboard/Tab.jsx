import React from 'react'
import { Link, useNavigate } from 'react-router'

const Tab = ({isAccountTabActive, isProjectTabActive, children}) => {
    const navigate = useNavigate()

    const handlePageRoute = (event) => {
        const target = event.target.outerText.toUpperCase()

        if(target === "ACCOUNTS" && isAccountTabActive) return
        else if(target === "PROJECTS" && isProjectTabActive) return
        else if (target === "ACCOUNTS") navigate("/dashboard")
        else if (target === "PROJECTS") navigate("/projects")
    }
    
    return (
        <nav className='mb-4'>
            <ul className="flex justify-between">
                <div className="flex">
                    <li className={`mr-6 ${isAccountTabActive ? 'border-b-2 border-tab' : ''}`} onClick={handlePageRoute}>
                        <button  className={`flex justify-start items-center h-12 ${isAccountTabActive ? 'text-tab' : ''}`}>
                            <p name='accounts'>Accounts</p>
                        </button>
                        
                    </li>
                    <li onClick={handlePageRoute} className={`${isProjectTabActive ? 'border-b-2 border-tab' : ''}`}>
                        <button className={`flex justify-start items-center h-12 ${isProjectTabActive ? 'text-tab' : ''}`}>
                            <p name='projects'>Projects</p>
                        </button>
                    </li>
                </div>
                
                <li className='self-end'>
                    {children}
                </li>
            </ul>
        </nav>
    )
}

export default Tab
