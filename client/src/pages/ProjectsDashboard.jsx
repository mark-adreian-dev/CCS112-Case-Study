import React, { useEffect, useReducer, useState } from 'react'
import AddProjectIcon from '../assets/dashboard/svg/add-project.svg'
import Header from '../components/Dashboard/Header'
import Tab from '../components/Dashboard/Tab'
import Button from '../components/Button'
import axios from 'axios'
import SideMenu from '../components/SideMenu'
import SearchBox from '../components/SearchBox'
import { useNavigate } from 'react-router'
import ProjectCard from '../components/ProjectDasboard/ProjectCard'
import AddForm from '../components/AddForm'
import { ProjectDashboardContext } from '../Context/ProjectDashboardContext'
import EditForm from '../components/EditForm'




const reducer = (state, action) => {

    if(action.type ==="GET_PROJECTS")  {
      return {...state, data: action.payload}
    }
      
    if(action.type === "SEARCH_USER") {
        return {
            ...state ,
            filteredData: state.data.filter(project => project.title.toLowerCase().includes(action.payload.toLowerCase())),
            searchQuery: action.payload
        }
    }

    if(action.type === "OPEN_ADD_PROJECT_MODAL") {
      console.log("opening")
        return {...state, isAddProjectFormHidden: false}
    }

    if(action.type === "CLOSE_ADD_PROJECT_MODAL") {
      console.log("vlosing")
        return {...state, isAddProjectFormHidden: true}
    }

    if(action.type === "OPEN_EDIT_PROJECT_MODAL") {
      return {...state, isEditProjectFormHidden: false}
    }

    if(action.type === "CLOSE_EDIT_PROJECT_MODAL") {
        return {...state, isEditProjectFormHidden: true}
    }

    if(action.type === "UPDATE_ADD_PROJECT_FORM_VALUES") {
      return {
          ...state, 
          addFormValues: {
              ...state.addFormValues,
              [action.payload.key]: action.payload.value
          }
      }
    }

    if(action.type === "UPDATE_EDIT_PROJECT_FORM_VALUES") {
      return {
          ...state, 
          editFormValues: {
              ...state.editFormValues,
              [action.payload.key]: action.payload.value
          }
      }
    }
    if(action.type === "ADD_PROJECT") {

      const body = action.payload 
      return {
          ...state,
          data: [...state.data, body],
          isAddprojectFormHidden: true,
      }
    }

    if(action.type === "RESET_ADD_PROJECT_FORM") {
      return {
          ...state,
          addProjectFormValues: {
            title: "",
              description: "",
        
          }
      }
    }

    if(action.type === "SET_TARGET_PROJECT_DATA") {
      return {
          ...state,
          targetProjectData: action.payload
      }
    }

    if(action.type === "SET_INITIAL_EDIT_FORM_VALUES") {

      return {
          ...state,
          editFormValues: {
              title: action.payload.title,
              description: action.payload.description,
              status: action.payload.status
          }
      }
    }

    if(action.type === "UPDATE_PROJECT_LIST") {
      const updatedProject = action.payload
      const data = state.data
      data.forEach((project, index) => {
          if(project.id === updatedProject.id) state.data[index] = updatedProject
      });
      return {
          ...state,
          data: data

      }
  }
  if(action.type === "DELETE_PROJECT") {
    const removedProjectId = action.payload
    const updatedData = state.data.filter(project => project.id !== removedProjectId)

    return {
        ...state,
        data: updatedData,
        searchQuery: ""
    }
  }
}

const initialState = {
  data: [],
  filteredData: [],
  targetProjectData: [],
  searchQuery: "",
  isAddProjectFormHidden: true,
  isEditProjectFormHidden: true,
  addFormValues: {
      title: "",
      description: "",
  },
  addFormFields: [
    {
        type: "text",
        id: "title-project",
        name: "title",
        label: "Project Title:",
    },
    
    {
      type: "textarea",
      id: "description-project",
      name: "description",
      label: "Description:",
    },
  ],

  editFormValues: {
    title: "",
    description: "",
    status: ""
  },

  editFormFields: [
    {
        type: "text",
        id: "title-project",
        name: "title",
        label: "Project Title:",
    },
    
    {
      type: "textarea",
      id: "description-project",
      name: "description",
      label: "Description:",
    },

    {
      type: "select",
      id: "select-edit-project",
      name: "status",
      options: ["pending", "in progress", "completed"],
      label: "Project status:",
    }
  ],


}


const ProjectsDashboard = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isUserVerified, setIsUserVerified] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:8000/api/projects", {
      headers: {
        "Accept" : "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      setIsUserVerified(true)
      dispatch({ type: "GET_PROJECTS", payload: response.data.data})
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

  const handelAddProjectFormChange = (event) => {

    const target = event.target.name
    const value = event.target.value
    dispatch({
        type: "UPDATE_ADD_PROJECT_FORM_VALUES",
        payload: {
            key: target,
            value: value
        }
    })
  }

  const handelEditProjectFormChange = (event) => {

    const target = event.target.name
    const value = event.target.value

    dispatch({
        type: "UPDATE_EDIT_PROJECT_FORM_VALUES",
        payload: {
            key: target,
            value: value
        }
    })
  }

  const handleEditModalDisplay = (event, project_id) => {
    event.preventDefault()
    if(state.isEditProjectFormHidden) {
      axios.get(`http://localhost:8000/api/projects/${project_id}`, {
          headers: {
              "Accept" : "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      })
      .then(response => {
          dispatch({ type: "SET_TARGET_PROJECT_DATA", payload: response.data.data})
          return response.data.data
      }) .then (response => {
     
          dispatch({ type: "SET_INITIAL_EDIT_FORM_VALUES", payload: {
              title: response.title,
              description: response.description,
              status: response.status
          }})
          dispatch({type: "OPEN_EDIT_PROJECT_MODAL"})
      })
      
  }
  else dispatch({type: "CLOSE_EDIT_PROJECT_MODAL"})
  }

  const handleAddModalDisplay = (event) => {

      event.preventDefault()
      if(state.isAddProjectFormHidden) dispatch({type: "OPEN_ADD_PROJECT_MODAL"})
      else dispatch({type: "CLOSE_ADD_PROJECT_MODAL"})
  }

  const handleAddSubmit = (event) => {
    event.preventDefault()

    const body = {
        title : state.addFormValues["title"],
        description : state.addFormValues["description"],
        status: "pending"
    }

    console.log(body)
    axios.post("http://localhost:8000/api/projects", body, {
        headers: {
            "Accept" : "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
        
    }) 
    .then(response => {
        dispatch({ type: "ADD_PROJECT", payload: response.data.data })
        dispatch({ type: "RESET_ADD_PROJECT_FORM" })
        dispatch({ type: "CLOSE_ADD_PROJECT_MODAL" })
       
    }) 
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()

        const body = {
            title : state.editFormValues["title"],
            description : state.editFormValues["description"],
            status : state.editFormValues["status"], 
        }

        axios.put(`http://127.0.0.1:8000/api/projects/${state.targetProjectData.id}`, body, {
            headers: {
                "Accept" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        }) 
        .then(response => {
            dispatch({ type: "UPDATE_PROJECT_LIST", payload: response.data.data })
           
        }) 
        .then(() => {
            dispatch({ type: "CLOSE_EDIT_PROJECT_MODAL"})
        })
  }

  const handleDelete = (project_id) => {
    axios.delete(`http://127.0.0.1:8000/api/projects/${project_id}`, {
        headers: {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
        const projectRemoved = response.data.data
        console.log(projectRemoved)
        dispatch({ type: "DELETE_PROJECT", payload: Number(projectRemoved)})
        
    })
   
}

  return (
    <>
      <ProjectDashboardContext.Provider value={{state, dispatch}}>
      <Header />
        <main className='px-4 desktop:flex'>
          <SideMenu />
         
          <div className='right w-full pt-6'>
            <h1 className='text-heading-3 font-bold mb-6'>Dashboard</h1>
            <Tab isProjectTabActive={true} isAccountTabActive={false}>
              <SearchBox onchange={handleSearchChange} value={state.searchQuery} style={`hidden desktop:block desktop:flex desktop:self-end`}/>
            </Tab>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-bold text-heading-3'>Projects</h1>
                <Button label={
                    <div className='flex'>
                        <img src={AddProjectIcon} alt='add-account-icon' className='desktop:mr-2'/>
                        <p className='hidden desktop:block'>Add Project</p>
                    </div>
                }  className="w-fit" style={`bg-primary`} action={handleAddModalDisplay}/>
            </div>
            <SearchBox onchange={handleSearchChange} value={state.searchQuery} style={`desktop:hidden flex mb-4`}/>
            <div className='desktop:grid desktop:grid-cols-3 desktop:gap-2'>
                {
                state.data.length === 0 && !isUserVerified  ?  
                  <div className=' h-full p-16'>
                    <h1 className='text-heading-5 font-bold'>Loading...</h1>
                  </div>
                : state.searchQuery === "" ? 
            
                state.data.map(project => {
                    return <ProjectCard key={project.id} status={project.status} title={project.title} description={project.description} handleDelete={() => {handleDelete(project.id)}} handleUpdate={(event) => handleEditModalDisplay(event, project.id)}/>
                  }
                ):

                state.filteredData.map(project => {
                    return <ProjectCard key={project.id} status={project.status} title={project.title} description={project.description} handleDelete={() => {handleDelete(project.id)}} handleUpdate={(event) => handleEditModalDisplay(event, project.id)}/>
                  }
                )
              } 
                
            </div>

            {
              !state.isAddProjectFormHidden && <AddForm submitAction={handleAddSubmit} modalAction={handleAddModalDisplay} title={"Add Project"} onChangeHandler={handelAddProjectFormChange}  fields={state.addFormFields} context={ProjectDashboardContext}/>
            }
            {
              !state.isEditProjectFormHidden && <EditForm submitAction={handleEditSubmit} modalAction={handleEditModalDisplay} title={"Edit Project"} onChangeHandler={handelEditProjectFormChange}  fields={state.editFormFields} context={ProjectDashboardContext}/>
            }
          </div>
        </main>
      </ProjectDashboardContext.Provider>
        
    </> 
  )
}

export default ProjectsDashboard
