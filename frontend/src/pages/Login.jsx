import React from "react";
import {
    FormControl,
    FormLabel,
    Button,
    Input,
  } from '@chakra-ui/react'
import { useRef } from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
export default ()=>{
    const navigate = useNavigate();
    const [form, setForm] = useState({email:"", password:""});
    const handleLogin = (e)=>{
        e.preventDefault();
        const {email, password} = form;
        fetch('https://acetericsoft.herokuapp.com/user/login',{
            method:"POST",
            body:JSON.stringify({email, password}),
            credentials:"include",
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            if(res.error){
                alert(res.message);
            }
            else{
                navigate("/dashboard");
            }
        }).catch(e=>{
            console.log("Error occurred", e.message);
        })
    }
    const handleChange = ({target:{value, name}})=>{
        setForm({
            ...form,
            [name]: value
        });
    }
    return <>
    <Button style={{backgroundColor:"black", color:"white"}} onClick={()=>navigate("/")}>Register</Button>
    <form onSubmit={handleLogin}>
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input onChange={handleChange} name="email" type='email' />
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input onChange={handleChange} name="password" type='password' />
        </FormControl>
        <FormControl>
            <Input style={{backgroundColor:"black", color:"white"}} type='submit' />
        </FormControl>
    </form>
    </>
}