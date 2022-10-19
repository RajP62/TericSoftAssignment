import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {Button, FormControl, FormLabel, Input, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,} from "@chakra-ui/react";
import { useState } from "react";
export default ()=>{
    const navigate = useNavigate();
    const [form, setForm] = useState({height: 0, weight: 0});
    const [bmi, setBmi] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(()=>{
        fetch("https://acetericsoft.herokuapp.com/bmi/history", {
            credentials: "include"
        }).then(res=>res.json()).then(res=>{
            console.log("res", res);
            if(res.error){
                navigate("/login");
            }
            setHistory(res.history);
        }).catch(e=>{
            console.log(e.message);
        })
    }, [bmi])
    useEffect(()=>{
        fetch("https://acetericsoft.herokuapp.com/check", {
            credentials:"include",
        }).then(res=>res.json()).then(res=>{
        if(res.error){
            fetch("https://acetericsoft.herokuapp.com/user/refresh",{credentials:"include"}).then(res=>res.json()).then(res=>{
            if(res.error){
                navigate("/login");
            }
            })
            .catch(e=>{
                navigate("/login");
            })
        }
        }).catch(e=>{
            console.log(e.message);
        })
    }, []);

    const handleChange = ({target:{value, name}})=>{
        setForm({
            ...form,
            [name]: value
        });
    }
    const handleSubmit = (e)=>{
        const {height, weight} = form;
        console.log(height, weight)
        e.preventDefault();
        fetch('https://acetericsoft.herokuapp.com/bmi/calculate', {
            method:"POST",
            body:JSON.stringify({height, weight}),
            credentials:"include",
            headers:{
                'Content-type': "application/json"
            }
        }).then(res=>res.json()).then(res=>{
            setBmi(res.bmi);
        }).catch(e=>{
            console.log(e.message);
        })
    }
    return <>
    <Button style={{backgroundColor:"black", color:"white"}} onClick={()=>navigate("/profile")}>Profile</Button>
   {bmi? <h1 style={{fontStyle:"italic"}}>Bmi is {bmi}</h1> : null}
    <form onSubmit={handleSubmit}>
    <FormControl>
            <FormLabel>Height</FormLabel>
            <Input onChange={handleChange} name="height" type='number' />
    </FormControl>
    <FormControl>
        <FormLabel>Weight</FormLabel>
        <Input onChange={handleChange} name="weight" type='number' />
    </FormControl>
    <FormControl>
    <Input type="submit"></Input>
    </FormControl>
    </form>
    <TableContainer>
  <Table variant='simple'>
  <TableCaption>History of calculation</TableCaption>
    <Thead>
      <Tr>
        <Th>Height</Th>
        <Th>Width</Th>
        <Th>BMI</Th>
      </Tr>
    </Thead>
    <Tbody>
    {history.map(({height, weight, bmi})=>{
        return <Tr key={uuidv4()}>
        <Td>{height}</Td>
        <Td>{weight}</Td>
        <Td>{bmi}</Td>
      </Tr>
    })}
    </Tbody>
  </Table>
</TableContainer>
   
    </>
}