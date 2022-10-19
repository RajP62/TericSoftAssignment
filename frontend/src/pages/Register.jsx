import React from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button
  } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom';
export default () => {
    const navigate = useNavigate();
    return<>
    <Button onClick={()=> navigate("/login")} style={{backgroundColor:"black", color:"white"}}>Go To Login</Button>
     <form target="__blank" action="https://acetericsoft.herokuapp.com/user" method="post" encType="multipart/form-data">
        <FormControl>
            <FormLabel>Image</FormLabel>
            <Input name="image" type="file"></Input>
        </FormControl>
        <FormControl>
            <FormLabel>Username</FormLabel>
            <Input name="name" type='name' />
        </FormControl>
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input name="email" type='email' />
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password" type='password' />
        </FormControl>
        <FormControl>
            <Input style={{backgroundColor:"black", color:"white"}} type='submit' />
        </FormControl>
        </form>
        </>
}