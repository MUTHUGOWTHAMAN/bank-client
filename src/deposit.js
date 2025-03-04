import { useContext,useState} from "react";
import userContext from "./context.js";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import deposit from './deposit.jpg';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useEffect} from "react";

export default function Deposit(){
  
const [dep,setDep]=useState(0)
const [userId,setUserId]=useState();
const [data,setData]=useState([])


useEffect(()=>{
   const fetchdata=async()=>{
      await axios.get('https://bank-server-pg0r.onrender.com/data').then((item)=>{setData(item.data)})
   };fetchdata()
},[]);

let updateData;
function handleClick(e) {
  e.preventDefault();
  const user = data.find(item => item.id === Number(userId));
  if (user) {
    const updatedAmount = Number(user.amount) + Number(dep);
    axios.put(`https://bank-server-pg0r.onrender.com/update/${user._id}`, { amount: updatedAmount })
      .then(() => {
        alert(`Rs.${dep} Amount Credited to Your Account`);
        // Optionally update local state to reflect the new balance
      });
  } else {
    alert("User not found with the provided ID.");
  }
}

    return(
    <>
<br/><br/>

<Card id="carddep">
      <Card.Body>
      {/* <Card.Img variant="top" src="bank" /> */}
        <Card.Text>
        <h1>Deposit</h1>
        <Form onSubmit={handleClick} className="container">
      <Form.Group controlId="userId">
        <Form.Label>Enter Account Number</Form.Label>
        <Form.Control type="number" id="input" placeholder="Enter account number" onChange={(e) => setUserId(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="dep">
        <Form.Label>Enter Deposit Amount</Form.Label>
        <Form.Control type="number" id="input" placeholder="Enter deposit amount" onChange={(e) => setDep(e.target.value)} />
      </Form.Group><br/>
      <Button variant="primary" type="submit">Deposit</Button>
    </Form>
        </Card.Text>
      </Card.Body>
    </Card>

    <img id="dept" src={deposit} height='350px' width='450px'></img>

   

    </>
    )
    
    
    }