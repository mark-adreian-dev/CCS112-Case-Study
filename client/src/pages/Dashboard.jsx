import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import Header from '../components/Dashboard/Header.jsx'
import Tab from '../components/Dashboard/Tab.jsx'
import Button from '../components/Button.jsx'
import AddUserIcon from '../assets/dashboard/svg/add-user.svg'
import AccountTable from '../components/Dashboard/AccountTable.jsx'
import SearchBox from '../components/SearchBox.jsx'
import Form from '../components/Form.jsx'

const reducer = (state, action) => {
    switch(action.type) {
        case "SET_USERS":
            return { ...state, data: action.payload}
        case "SEARCH_USER":
            return { ...state, filteredData: action.payload.filterdData, query: action.payload.query}
        default:
            return;
    }
}

const initialState = {
    data: [],
    query: "",
    filteredData: []
}

const openForm = formName => {
    document.querySelector(`#${formName}`).showModal()
}


const Dashboard = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        try{
            axios.get("http://localhost:8000/api/users", {
                headers: {
                    "Accept" : "application/json",
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => dispatch({ type: "SET_USERS", payload: response.data.data}))
        } catch (err) {
            console.log(err)
        }
    }, [])

    const handleSearchChange = (event) => {
        
        const filteredData = state.query !== "" ? state.data.filter(user => user.name.toLowerCase().includes(event.target.value.toLowerCase()) && event.target.value !== "") : []
        dispatch({
            type: "SEARCH_USER",
            payload: {
                filterdData: filteredData,
                query: event.target.value
            }

        })  
    }

    return (
        <>  
            <Header />
            <main className='px-4 pb-8'>
                <h1 className='text-heading-3 font-bold mb-6'>Dashboard</h1>
                <Tab isProjectTabActive={false} isAccountTabActive={true}>
                    <SearchBox onchange={handleSearchChange} value={state.query}/>
                </Tab>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className='font-bold text-heading-3'>Accounts</h1>
                    <Button action={() => openForm("add_account_form")} label={
                        <div className='flex'>
                            <img src={AddUserIcon} alt='add-account-icon' className='desktop:mr-2'/>
                            <p className='hidden desktop:block'>Add Account</p>
                        </div>
                    }  style="bg-primary"/>
                </div>
                {
                    state.data.length === 0 ? <h1>Loading...</h1> :
                    <AccountTable tableColumns={["Name", "Email", "Action"]} tableRows={state.query === "" ? state.data : state.filteredData}/>
                    
                }
               
             </main>
             <Form api={"hdawd"} formName={"add_account_form"} title={"Add Account"} fields={[]}/>
            
        </>
    )

}

export default Dashboard
