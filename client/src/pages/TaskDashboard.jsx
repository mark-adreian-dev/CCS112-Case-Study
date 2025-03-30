import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import Header from '../components/Dashboard/Header.jsx'
import Tab from '../components/Dashboard/Tab.jsx'
import Button from '../components/Button.jsx'
import AddUserIcon from '../assets/dashboard/svg/add-user.svg'
import TaskTable from '../components/TaskDasboard/TaskTable.jsx'
import SearchBox from '../components/SearchBox.jsx'
import AddForm from '../components/AddForm.jsx'
import EditForm from '../components/EditForm.jsx'
import SideMenu from '../components/SideMenu.jsx'
import { useNavigate, useParams } from 'react-router'
import { TaskDashboardContext } from '../Context/TaskDashboardContex.jsx'

const reducer = (state, action) => {

    if(action.type === "GET_TASK") {
        return { ...state, data: action.payload }
    }

    if(action.type === "SEARCH_TASK") {
        return {
            ...state ,
            filteredData: state.data.filter(task => task.title.toLowerCase().includes(action.payload.toLowerCase())),
            searchQuery: action.payload
        }
    }

    if(action.type === "OPEN_ADD_TASK_MODAL") {
        return {...state, isAddTaskFormHidden: false}
    }

    if(action.type === "CLOSE_ADD_TASK_MODAL") {
        return {...state, isAddTaskFormHidden: true}
    }

    if(action.type === "OPEN_EDIT_TASK_MODAL") {
        return {...state, isEditTaskFormHidden: false}
    }

    if(action.type === "CLOSE_EDIT_TASK_MODAL") {
        return {...state, isEditTaskFormHidden: true}
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
                title: action.payload.title,
                status: action.payload.status
            }
        }
    }

    if(action.type === "ADD_TASK") {

        const body = action.payload 
        return {
            ...state,
            data: [...state.data, body],
            isAddTaskFormHidden: true,
        }
    }

    if(action.type === "DELETE_TASK") {
        const removedTask = action.payload

        const updatedData = state.data.filter(task => task.id !== removedTask.id)

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

    if(action.type === "SET_TARGET_TASK_DATA") {
        return {
            ...state,
            targetTaskData: action.payload
        }
    }

    if(action.type === "UPDATE_TASK_LIST") {
        const updatedTask = action.payload
        const data = state.data
        data.forEach((task, index) => {
            if(task.id === updatedTask.id) state.data[index] = updatedTask
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
                title: "",
            }
        }
    }
}

const initialState = {
    data: [],
    targetTaskData: [],
    filteredData: [],
    searchQuery: "",
    isAddTaskFormHidden: true,
    isEditTaskFormHidden: true,
    
    addFormValues: {
        title: "",
    },

    addFormFields: [
        {
            type: "text",
            id: "title-add-task",
            name: "title",
            label: "Task Title:",
        },
    ],

    editFormValues: {
        title: "",
        status: "",

    },

    editFormFields: [
        {
            type: "text",
            id: "title-edit-task",
            name: "title",
            label: "Task Title:",
        }, 
        {
            type: "select",
            id: "select-edit-task",
            name: "status",
            options: ["pending", "in progress", "completed"],
            label: "Task Status:",
        }
    ],
}

const TaskDashboard = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const navigate = useNavigate()
    const [isUserVerified, setIsUserVerified] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/projects/${id}/tasks`, {
            headers: {
                "Accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setIsUserVerified(true)
            dispatch({ type: "GET_TASK", payload: response.data.data})
        })
        .catch(err => {
            if(err.status === 401) {
       
                navigate("/")
            }
        }) 
       
    }, [navigate, id])
    

    const handleSearchChange = (event) => {
        const searchQuery = event.target.value
        dispatch({ 
            type: "SEARCH_TASK", 
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
            title : state.addFormValues["title"],
            status : "pending"
        }
        axios.post(`http://localhost:8000/api/projects/${id}/tasks`, body, {
            headers: {
                "Accept" : "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
            
        }) 
        .then(response => {
            dispatch({ type: "ADD_TASK", payload: response.data.data })
            dispatch({ type: "RESET_ADD_FORM" })
        }) 
    }
    
    const handleSubmitEdit = (event) => {
        event.preventDefault()

        const body = {
            title : state.editFormValues["title"],
            status : state.editFormValues["status"],
        }

        axios.put(`http://127.0.0.1:8000/api/projects/${id}/tasks/${state.targetTaskData.id}`, body, {
            headers: {
                "Accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
            
        }) 
        .then(response => {
            dispatch({ type: "UPDATE_TASK_LIST", payload: response.data.data })
           
        }) 
        .then(() => {
            dispatch({ type: "CLOSE_EDIT_TASK_MODAL"})
        })
    }

    const handleAddModalDisplay = (event) => {
        event.preventDefault()
        if(state.isAddTaskFormHidden) dispatch({type: "OPEN_ADD_TASK_MODAL"})
        else dispatch({type: "CLOSE_ADD_TASK_MODAL"})
    }

    const handleEditModalDisplay = (event) => {
        event.preventDefault()
        if(state.isEditTaskFormHidden) dispatch({type: "OPEN_EDIT_TASK_MODAL"})
        else dispatch({type: "CLOSE_EDIT_TASK_MODAL"})
    }

    return (
        <>  
            <TaskDashboardContext.Provider value={{ state, dispatch, id }}>
                <Header />
                <main className='px-4 desktop:flex'>
                    <SideMenu />
                    <div className='right desktop:w-full pt-6'>   
                        <h1 className='text-heading-3 font-bold mb-6'>Dashboard</h1>
                        <Tab isProjectTabActive={true} isAccountTabActive={false}>
                            <SearchBox onchange={handleSearchChange} value={state.searchQuery} style={`hidden desktop:block desktop:flex desktop:self-end`}/>
                        </Tab>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className='font-bold text-heading-3'>Task</h1>
                            <Button action={handleAddModalDisplay} label={
                                <div className='flex'>
                                    <img src={AddUserIcon} alt='add-account-icon' className='desktop:mr-2'/>
                                    <p className='hidden desktop:block'>Add Task</p>
                                </div>
                            }  style="bg-primary"/>
                        </div>
                        <SearchBox onchange={handleSearchChange} value={state.searchQuery} style={`desktop:hidden flex mb-4`}/>
                        
                        {
                            state.data.length === 0 && !isUserVerified ? 
                            <div className=' h-full p-16'>
                                <h1 className='text-heading-5 font-bold'>Loading...</h1>
                            </div> :
                            <TaskTable tableColumns={["Task Title", "Status", "Action"]} tableRows={state.searchQuery === "" ? state.data : state.filteredData}/>
                        }   
                        {
                            !state.isAddTaskFormHidden &&  <AddForm modalAction={handleAddModalDisplay} submitAction={handleSubmit} title={"Add Task"} onChangeHandler={handelAddAccountFormChange}  fields={state.addFormFields} context={TaskDashboardContext}/>
                        }
                        {
                            !state.isEditTaskFormHidden && <EditForm modalAction={handleEditModalDisplay} submitAction={handleSubmitEdit} title={"Edit Account"} onChangeHandler={handelEditAccountFormChange} fields={state.editFormFields} context={TaskDashboardContext}/>
                        }
                       
                        
                    
                    </div>
                    
                </main>     
            </TaskDashboardContext.Provider>
        </>
    )
}

export default TaskDashboard
