import React, { useState } from "react";
import axios from 'axios';

import desktopImage from "../assets/login/login-desktop-image.png";
import mobileImage from "../assets/login/login-mobile-image.png";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate()
  const [fieldValue, setFieldValue] = useState({
    email: "",
    password: "",
  });

  const [isNotifVisible, setIsNotifVisible] = useState(false);

  const handleFieldChange = (event) => {
    event.preventDefault();
    setFieldValue({
      ...fieldValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://127.0.0.1:8000/api/login", fieldValue) 
    .then (response =>{
      const data = response.data

      if(data.error_code === "UNAUTHORIZED") {
        setIsNotifVisible(true)
        setTimeout(()=> {
          setIsNotifVisible(false)
        }, 3000)
      } else {
        localStorage.setItem("token", data.token);
        navigate("/dashboard")
      }
    })
  };

  return (
    <>
      <div className={`toast toast-top toast-start w-full m-0 p-14 ${isNotifVisible ? 'block' : 'hidden'} desktop:w-[49%] desktop:translate-x-full`}>
        <div className="alert alert-info bg-red-800 bg-none text-white">
          <span>Invalid Login Credentials</span>
        </div>
      </div>
      <main className="desktop:flex">
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
          <h1 className="text-heading-3 font-bold">Log In</h1>
          <p className="hidden">
            Manage your projects seamlessly and hassle free.
          </p>
          <div className="field-group mt-8">
            <TextBox
              label="Email Address:"
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
            <Button label={"Log In"} action={handleSubmit} style={'w-full bg-primary'}/>
          </div>
          <hr className="w-full border-input-background border-b-[1px] my-8" />
          <div className="w-full flex justify-center items-center">
            <Link
              to={"/register"}
              className="text-primary text-body-S leading-line-height-"
            >
              No account yet? Sign Up
            </Link>
          </div>
        </form>
      </main>
      
    </>
  );
};

export default Login;
