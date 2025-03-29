import React, { useEffect, useReducer, useState } from 'react'
import { DashboardContext } from '../Context/DashboardContext.jsx'
import axios from 'axios'
import Header from '../components/Dashboard/Header.jsx'
import Tab from '../components/Dashboard/Tab.jsx'
import Button from '../components/Button.jsx'
import AddUserIcon from '../assets/dashboard/svg/add-user.svg'
import AccountTable from '../components/Dashboard/AccountTable.jsx'
import SearchBox from '../components/SearchBox.jsx'
import AddForm from '../components/AddForm.jsx'
import EditForm from '../components/EditForm.jsx'
import SideMenu from '../components/SideMenu.jsx'
import { useNavigate } from 'react-router'

const reducer = (state, action) => {

    if(action.type === "GET_USERS") {
        return { ...state, data: action.payload }
    }

    if(action.type === "SEARCH_USER") {
        return {
            ...state ,
            filteredData: state.data.filter(user => user.name.toLowerCase().includes(action.payload.toLowerCase())),
            searchQuery: action.payload
        }
    }

    if(action.type === "OPEN_ADD_ACCOUNT_MODAL") {
        return {...state, isAddAccountFormHidden: false}
    }

    if(action.type === "CLOSE_ADD_ACCOUNT_MODAL") {
        return {...state, isAddAccountFormHidden: true}
    }

    if(action.type === "OPEN_EDIT_ACCOUNT_MODAL") {
        return {...state, isEditAccountFormHidden: false}
    }

    if(action.type === "CLOSE_EDIT_ACCOUNT_MODAL") {
        return {...state, isEditAccountFormHidden: true}
    }

    if(action.type === "UPDATE_ADD_ACCOUNT_FORM_VALUES") {
        return {
            ...state, 
            addFormValues: {
                ...state.addFormValues,
                [action.payload.key]: action.payload.value
            }
        }
    }

    if(action.type === "UPDATE_EDIT_ACCOUNT_FORM_VALUES") {
        return {
            ...state, 
            editFormValues: {
                ...state.editFormValues,
                [action.payload.key]: action.payload.value
            }
        }
    }

    if(action.type === "SET_INITIAL_EDIT_FORM_VALUES") {

        return {
            ...state,
            editFormValues: {
                name: action.payload.name,
                email: action.payload.email,
                role: action.payload.role
            }
        }
    }

    if(action.type === "ADD_USER") {

        const body = action.payload 
        return {
            ...state,
            data: [...state.data, body],
            isAddAccountFormHidden: true,
        }
    }

    if(action.type === "DELETE_USER") {
        const removedAccount = action.payload

        const updatedData = state.data.filter(account => account.id !== removedAccount.id)

        return {
            ...state,
            data: updatedData,
            searchQuery: ""
        }
    }

    if(action.type === "SET_TARGET_USER_FORM_FIELD") {
        return {
            ...state,
            editFormValues: {
                ...state.editFormValues,
                [action.payload.key]: action.payload.valiue
            }
        }
    }

    if(action.type === "SET_TARGET_USER_DATA") {
        return {
            ...state,
            targetUserData: action.payload
        }
    }

    if(action.type === "UPDATE_USER_LIST") {
        const updatedAccount = action.payload
        const data = state.data
        data.forEach((account, index) => {
            if(account.id === updatedAccount.id) state.data[index] = updatedAccount
        });
        return {
            ...state,
            data: data

        }
    }

    if(action.type === "RESET_ADD_FORM") {
        return {
            ...state,
            addFormValues: {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            }
        }
    }
}

const initialState = {
    data: [],
    targetUserData: [],
    filteredData: [],
    searchQuery: "",
    isAddAccountFormHidden: true,
    isEditAccountFormHidden: true,
    
    addFormValues: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    },

    addFormFields: [
        {
            type: "text",
            id: "name-add-account",
            name: "name",
            label: "Fullname:",
        },
        {
            type: "email",
            id: "email-add-account",
            name: "email",
            label: "Email:",      
        },
        {
            type: "password",
            id: "password-add-account",
            name: "password",
            label: "password:",
        },
        {
            type: "password",
            id: "password-confirm-add-account",
            name: "password_confirmation",
            label: "Confirm Password:",
        }
    ],

    editFormValues: {
        name: "",
        email: "",
        role: ""
    },

    editFormFields: [
        {
            type: "text",
            id: "name-edit-account",
            name: "name",
            label: "Fullname:",
        },
        {
            type: "email",
            id: "email-edit-account",
            name: "email",
            label: "Email:",      
        }, 
        {
            type: "select",
            id: "select-edit-account",
            name: "role",
            options: ["Admin", "User"],
            label: "Account Permissions/Account Role:",
        }
    ],
}

const Dashboard = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const navigate = useNavigate()
    const [isUserVerified, setIsUserVerified] = useState(false)
    useEffect(() => {
   
        axios.get("http://localhost:8000/api/users", {
            headers: {
                "Accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setIsUserVerified(true)
            dispatch({ type: "GET_USERS", payload: response.data.data})
        })
        .catch(err => {
            if(err.status === 401) {
       
                navigate("/")
            }
        }) 
       
    }, [navigate])

    const handleSearchChange = (event) => {
        const searchQuery = event.target.value
        dispatch({ 
            type: "SEARCH_USER", 
            payload: searchQuery
        })
        
    }

    const handelAddAccountFormChange = (event) => {

        const target = event.target.name
        const value = event.target.value

        dispatch({
            type: "UPDATE_ADD_ACCOUNT_FORM_VALUES",
            payload: {
                key: target,
                value: value
            }
        })
    }

    const handelEditAccountFormChange = (event) => {

        const target = event.target.name
        const value = event.target.value

        dispatch({
            type: "UPDATE_EDIT_ACCOUNT_FORM_VALUES",
            payload: {
                key: target,
                value: value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const body = {
            name : state.addFormValues["name"],
            email : state.addFormValues["email"],
            password : state.addFormValues["password"],
            password_confirmation: state.addFormValues["password_confirmation"]
        }
        axios.post("http://localhost:8000/api/register", body, {
            headers: {
                "Accept" : "application/json",
            }
            
        }) 
        .then(response => {
            dispatch({ type: "ADD_USER", payload: response.data.data })
            dispatch({ type: "RESET_ADD_FORM" })
        }) 
    }
    
    const handleSubmitEdit = (event) => {
        event.preventDefault()

        const body = {
            name : state.editFormValues["name"],
            email : state.editFormValues["email"],
            role : state.editFormValues["role"], 
        }

        axios.put(`http://localhost:8000/api/users/${state.targetUserData.id}`, body, {
            headers: {
                "Accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
            
        }) 
        .then(response => {
            dispatch({ type: "UPDATE_USER_LIST", payload: response.data.data })
           
        }) 
        .then(() => {
            dispatch({ type: "CLOSE_EDIT_ACCOUNT_MODAL"})
        })
    }

    const handleAddModalDisplay = (event) => {
        event.preventDefault()
        if(state.isAddAccountFormHidden) dispatch({type: "OPEN_ADD_ACCOUNT_MODAL"})
        else dispatch({type: "CLOSE_ADD_ACCOUNT_MODAL"})
    }

    const handleEditModalDisplay = (event) => {
        event.preventDefault()
        if(state.isEditAccountFormHidden) dispatch({type: "OPEN_EDIT_ACCOUNT_MODAL"})
        else dispatch({type: "CLOSE_EDIT_ACCOUNT_MODAL"})
    }

    return (
        <>  
            <DashboardContext.Provider value={{ state, dispatch }}>
                <Header />
                <main className='px-4 desktop:flex'>
                    <SideMenu />
                    <div className='right desktop:w-full pt-6'>   
                        <h1 className='text-heading-3 font-bold mb-6'>Dashboard</h1>
                        <Tab isProjectTabActive={false} isAccountTabActive={true}>
                            <SearchBox onchange={handleSearchChange} value={state.searchQuery} style={`hidden desktop:block desktop:flex desktop:self-end`}/>
                        </Tab>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className='font-bold text-heading-3'>Accounts</h1>
                            <Button action={handleAddModalDisplay} label={
                                <div className='flex'>
                                    <img src={AddUserIcon} alt='add-account-icon' className='desktop:mr-2'/>
                                    <p className='hidden desktop:block'>Add Account</p>
                                </div>
                            }  style="bg-primary"/>
                        </div>
                        <SearchBox onchange={handleSearchChange} value={state.searchQuery} style={`desktop:hidden flex mb-4`}/>
                        
                        {
                            state.data.length === 0 && !isUserVerified ? 
                            <div className=' h-full p-16'>
                                <h1 className='text-heading-5 font-bold'>Loading...</h1>
                        
                                
                            </div> :
                            <AccountTable tableColumns={["Name", "Email", "Action"]} tableRows={state.searchQuery === "" ? state.data : state.filteredData}/>
                        }   
                        {
                            !state.isAddAccountFormHidden &&  <AddForm modalAction={handleAddModalDisplay} submitAction={handleSubmit} title={"Add Account"} onChangeHandler={handelAddAccountFormChange}  fields={state.addFormFields} context={DashboardContext}/>
                        }
                        {
                            !state.isEditAccountFormHidden && <EditForm modalAction={handleEditModalDisplay} submitAction={handleSubmitEdit} title={"Edit Account"} onChangeHandler={handelEditAccountFormChange} fields={state.editFormFields} context={DashboardContext}/>
                        }
                       
                        
                    
                    </div>
                    
                </main>     
            </DashboardContext.Provider>
        </>
    )
}

export default Dashboard
