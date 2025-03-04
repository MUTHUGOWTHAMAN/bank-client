import { useContext,useState } from "react";
import userContext from "./context.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import deposite from './deposite.jpg';
import axios from "axios";
import { useEffect } from "react";

export default function Withdraw(){
    
  const [withdraw,setWithdraw]=useState(0);
  const [userId,setUserId]=useState();
  const [data,setData]=useState([])
  useEffect(()=>{
      const fetchdata=async()=>{
         await axios.get('https://bank-server-pg0r.onrender.com/data').then((item)=>{setData(item.data)})
      };fetchdata()
   },[]);


  function handleClick(e){
      e.preventDefault();
     for(let i=0;i<data.length;i++){
          if(data[i].id === Number(userId)){
              if(data[i].amount>0){
                  data[i].amount=Number(data[i].amount)-Number(withdraw);
                  let updateData={amount:data[i].amount};
                 let url=`https://bank-server-pg0r.onrender.com/update/${data[i]._id}`
                  axios.put(url,updateData);
                  alert(`Rs.${withdraw} Amount Withdraw on Your Account`)
              }
              else{
                  alert("YOUR ACCOUNT BALANCE 0 SO YOU CAN'T WITHDRAW");
              }
            
          }
       }
   }
    
    return(
    <>
    <br/><br/>
        <Card id="cardwith">
      <Card.Body>
        <h1>Withdraw</h1>
        <Card.Text>
        <Form  onSubmit={handleClick}  >
      <h5>Withdraw Your Amount Here</h5><hr></hr>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label id="label"  >Account No:</Form.Label>
        <Form.Control type="number"  id="input" onChange={(e)=>{setUserId(e.target.value)}}  />
        <Form.Label id="label" >Withdraw Amount:</Form.Label>
        <Form.Control type="number" id="input" onChange={(e)=>{setWithdraw(e.target.value)}}/><br/>
        <Button type="submit" id="submitbtn" variant="danger" >Withdraw</Button>
        <Button type="reset" id="resetbtn" variant="primary">Reset</Button>
        </Form.Group>
        </Form>
        </Card.Text>
      </Card.Body>
    </Card>
    <img id="withd" src={deposite} height='350px' width='450px'></img>

    </>

    )
    
    
    }