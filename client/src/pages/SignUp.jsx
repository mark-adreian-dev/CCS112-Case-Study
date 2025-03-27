import React, { useState } from 'react';
import desktopImage from "../assets/login/login-desktop-image.png";
import mobileImage from "../assets/login/login-mobile-image.png";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate()
    const [fieldValue, setFieldValue] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      }
    );

    const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);
    const [isFieldNotEmpty, setIsFieldNotEmpty] = useState(false);
    const [isCharacterNumberValid, setIsCharacterNumberValid] = useState(false)
    const [isErrorOccured, setIsErrorOccured] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleFieldChange = (event) => {
        event.preventDefault();
        setFieldValue({
            ...fieldValue,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
       
        
        const timeDelay = 4000 //3 Seconds
        if(fieldValue.name === "" || fieldValue.email === "" || fieldValue.password === "" || fieldValue.passwordConfirmation === "") {
            
            setIsFieldNotEmpty(true)
            setTimeout(() => {
                setIsFieldNotEmpty(false)
            }, timeDelay)
        }
        else if(fieldValue.password !== fieldValue.passwordConfirmation) {
            setIsPasswordNotMatch(true)
            setTimeout(() => {
                setIsPasswordNotMatch(false)
            }, timeDelay)
        } 
        else if(fieldValue.password.length < 8) {
            setIsCharacterNumberValid(true)
            setTimeout(() => {
                setIsCharacterNumberValid(false)
            }, timeDelay)
        } else {
            setIsLoading(true)
            const body = {
                name: fieldValue.name,
                email: fieldValue.email,
                password: fieldValue.password,
                password_confirmation: fieldValue.passwordConfirmation
            }

            if(!isLoading) {
                axios.post("http://localhost:8000/api/register", body, {
                    headers: {
                        "Accept" : "application/json"
                    }
                })
                .then(response => {
                    console.log(response.data)
                    const data = response.data
                    localStorage.setItem("token", data.token)
                    navigate("/dashboard")
                    
                })
                .catch(err => {
                    const error_messages = err.response.data.errors
                    let error_message = ""

                    Object.keys(error_messages).forEach(key => {
                        error_message = `${error_message}${error_messages[key][0]}\n`
                    })

                    setFieldValue(prevState => {
                        return {
                            ...prevState,
                            error_message: error_message
                        }
                    })
                    setIsErrorOccured(true)
                    setTimeout(() => {
                        setIsErrorOccured(false)
                    }, timeDelay)
                    setIsLoading(false)       
                })
            }      
        } 
        
    }

    const cancelRegistration = (event) => {
        event.preventDefault()
        navigate("/login")
    }
    
    return (
        <>
        <div className={`toast toast-top toast-start w-full text-wrap z-50 m-0 p-14 desktop:w-[50%] transition-opacity duration-300 ease-in-out ${isPasswordNotMatch || isFieldNotEmpty || isErrorOccured || isCharacterNumberValid ? 'block' : 'hidden'}`}>
            <div className="alert alert-info bg-red-800 bg-none text-white">
                <span>{
                    isFieldNotEmpty ? "Do not leave empty fields" :
                    isPasswordNotMatch ? "Password does not match" : 
                    isCharacterNumberValid ? "Password must be atleast 8 characters" :
                    fieldValue.error_message
                }</span>
            </div>
        </div>
        <main className="desktop:flex desktop:flex-row-reverse">
            <figure className="w-full">
            <picture className="w-full ">
                <source media="(min-width: 1366px)" srcSet={desktopImage} />
                <img
                className="object-cover h-72 w-full desktop:h-screen"
                src={mobileImage}
                alt="Proejct Management Team"
                />
            </picture>
            </figure>
            
            <form className="p-8 font-famliy relative tablet:px-40 desktop:w-full desktop:flex desktop:flex-col desktop:justify-center desktop:p-20">
            <h1 className="text-heading-3 font-bold">Sign Up</h1>
            <p className="hidden">
                Manage your projects seamlessly and hassle free.
            </p>
            <div className="field-group mt-8">
                <TextBox
                    label="Fullname:"
                    name="name"
                    type="text"
                    value={fieldValue.name}
                    handleFieldChange={handleFieldChange}
                />
                <TextBox
                    label="Email:"
                    name="email"
                    type="email"
                    value={fieldValue.email}
                    handleFieldChange={handleFieldChange}
                />
                <TextBox
                    label="Password:"
                    name="password"
                    type="password"
                    value={fieldValue.password}
                    handleFieldChange={handleFieldChange}
                />
                <TextBox
                    label="Password Confirmation:"
                    name="passwordConfirmation"
                    type="password"
                    value={fieldValue.passwordConfirmation}
                    handleFieldChange={handleFieldChange}
                />
                <Button label={"Register"} style={`${isLoading ? '!bg-gray-300 !text-gray-500' : ''}`} className="" action={handleSubmit} />
                <Button label={"Cancel"} style={`bg-transparent border-primary border-[2px] !text-primary mt-2 hover:bg-cancel hover:border-cancel hover:!text-white`} className="mt-2" action={cancelRegistration} />
            </div>
            </form>
        </main>
        
        </>
    )
}

export default SignUp
