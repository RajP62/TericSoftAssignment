import React from 'react';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {Heading, Image, Button} from "@chakra-ui/react";
export default ()=>{
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState({picture:"", name:"", email:""}); 
    const {picture, name, email} = userDetail;
    console.log(picture, name, email)
    useEffect(()=>{
        fetch("https://acetericsoft.herokuapp.com/user/", {credentials:"include"}).then(res=>res.json()).then(res=>{
            if(res.error){
                fetch("https://acetericsoft.herokuapp.com/user/refresh", {credentials:"include"}).then(res=>res.json()).then(res=>{
                    if(res.error){
                        navigate("/login");
                    }
                })
            }
            else{
                setUserDetail(res.user);
            }
        })
    },[]);

    const handleLogout = ()=>{
        fetch("https://acetericsoft.herokuapp.com/user/logout",{credentials:"include"}).then(res=>res.json()).then(res=>{
             if(res.error){
                fetch("https://acetericsoft.herokuapp.com/user/refresh", {credentials:"include"}).then(res=>res.json()).then(res=>{
                    if(res.error){
                        navigate("/login");
                    }
                    else{
                        fetch("https://acetericsoft.herokuapp.com/user/logout", {credentials:"include"}).then(res=>res.json()).then(res=>{
                        navigate("/login");
                        }).catch(e=>{
                            navigate("/login");
                        })
                    }
                });
             }
             else{
                navigate("/login");
             }
        }).catch(e=>{
            navigate("/login");
        })
    }
    return <>
    <h1 style={{textAlign:"center"}}>Note : Chrome hides the images for security purpose that is why image is loading if the same is done with s3 or some other storage it will definitely work</h1>
    <Button onClick={handleLogout}>Logout</Button>
    <hr></hr>
    <Heading style={{textAlign:"center", color:"blue"}}>Hello User</Heading>
    <div style={{display:"flex", justifyContent:"center"}}>
    <img src={userDetail.picture}></img>
    </div>
    <Heading style={{textAlign:"center"}}>Name is {userDetail.name}</Heading>
    <Heading style={{textAlign:"center"}}>Email is {userDetail.email}</Heading>
    </>
}