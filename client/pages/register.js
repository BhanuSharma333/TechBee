import {useState} from "react";
import axios from "axios";   //for axios post request
import { toast } from 'react-toastify';//for the toast notoifications
import { ConsoleSqlOutlined, SyncOutlined } from "@ant-design/icons";
import Link from "next";
const Register=()=>{
    const [name,setName]=useState('');//For User Name by default our atate is empty string

    const [email,setEmail]=useState('');//For Email

    const [password,setPassword]=useState('');//For Password

    const [loading,setLoading]=useState(false);//For loading first false then true then false

    // console.log("Testing env",process.env.NEXT_PUBLIC_API);
    const handleSubmit = async (e) =>{
    e.preventDefault();//So that our browser doesnt reload when form is submitted
    // console.table({name ,email,password});
    try {
        setLoading(true);
        const { data } = await axios.post(`/api/register`, {
          name,email, password,
        });
        // console.log("REGISTER RESPONSE", data);
        toast.success("Registration successful. Please login.");
        setLoading(false);

      } catch (err) {
        toast.error(err.response.data);
        setLoading(false)
      }
    

    };
    return (
    <>
    <h1 className="jumbotron  text-center bg-primary square">Register</h1>
    
    <div className="container col-md-4 offset-md-4 pb-5">

        <form onSubmit={handleSubmit}>

            <input 
            type="text" 
            className="form-control mb-4 p-3" 
            value={name} 
            onChange={(e)=> setName(e.target.value) } 
            placeholder="Enter name"  
            required  
            />

            <input 
            type="email" 
            className="form-control mb-4 p-3" 
            value={email} 
            onChange={(e)=> setEmail(e.target.value) } 
            placeholder="Enter email"  
            required  
            />

            <input 
            type="password" 
            className="form-control mb-4 p-3" 
            value={password} 
            onChange={(e)=> setPassword(e.target.value) } 
            placeholder="Enter password"  
            required  
            />
            
           <button type="submit" 
           className="btn btn-block btn-primary col-12" 
           disabled={!name || !email || !password || loading}>
           
           {loading ? <SyncOutlined spin /> : "Submit"}
           
           </button>
        </form>
    </div>
    </>
    
    );
    
    
    
    }
    export default Register;