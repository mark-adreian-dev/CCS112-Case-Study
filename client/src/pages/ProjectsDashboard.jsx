import React from 'react'
import AddProjectIcon from '../assets/dashboard/svg/add-project.svg'
import Header from '../components/Dashboard/Header'
import Tab from '../components/Dashboard/Tab'
import Button from '../components/Button'

const ProjectsDashboard = () => {
  return (
    <>
        <Header />
        <main className='px-4'>
            <h1 className='text-heading-3 font-bold mb-6'>Dashboard</h1>
            <Tab isProjectTabActive={true} isAccountTabActive={false}/>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-bold text-heading-3'>Projects</h1>
                <Button label={
                    <div className='flex'>
                        <img src={AddProjectIcon} alt='add-account-icon' className='desktop:mr-2'/>
                        <p className='hidden desktop:block'>Add Account</p>
                    </div>
                }  className="w-fit"/>
            </div>
            <h1>Projects</h1>
            
            </main>
    </>
  )
}

export default ProjectsDashboard
