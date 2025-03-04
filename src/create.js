import { useContext,useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import userContext from "./context.js";
import Form from 'react-bootstrap/Form';
import create from './create.png';
import Card from 'react-bootstrap/Card';
import './App.css'
import axios from 'axios'


export default function Create(){
    const ctx=useContext(userContext);
    let [userData,setUserData]=useState([]);
    let [name,setName]=useState();
    let [email,setEmail]=useState();
    let [password,setPassword]=useState();
    let [amount,setAmount]=useState(0);
    let[accountNo,setAccountNo]=useState();
    function handleSubmit(e){
        e.preventDefault();
        let data={id:accountNo,name:name,email:email,password:password,amount:amount};
        axios.post('https://bank-server-pg0r.onrender.com/create',data)
        alert("Your New Account Created SuccessFully");
       
      }
   useEffect(()=>{

   ctx.users=[...ctx.users,...userData]
   setUserData([]);
  
   },[userData])
    
    
return(
<>
  <div><br/><br/>
   <Card id="cardcre">
      <Card.Body>
        <h2>Create Account</h2>
        <Card.Text>
        <Form onSubmit={handleSubmit} className="container">
      <Form.Group controlId="accountNo">
        <Form.Label>Enter Your Account Number</Form.Label>
        <Form.Control type="number" id="input" placeholder="Enter account number" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="name">
        <Form.Label>Enter Your Name</Form.Label>
        <Form.Control type="text" id="input" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Enter Your Email</Form.Label>
        <Form.Control type="email" id="input" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Enter Your Password</Form.Label>
        <Form.Control type="password" id="input" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="amount">
        <Form.Label>Enter Your First Deposit</Form.Label>
        <Form.Control type="number" id="input" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </Form.Group><br/>
      <Button variant="primary" type="submit">Create</Button>
    </Form>

        </Card.Text>
      </Card.Body>
    </Card>

    <img id="cre" src={create} height='250px' width='350x'></img>

  </div>

</>
)


}