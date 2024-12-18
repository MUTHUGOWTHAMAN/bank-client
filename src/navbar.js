import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Navbar(){
    return(<>
 
  <Nav as="uls">
  <Nav.Item as="lis">
        <Nav.Link href="#/homepage" id="li2">Home</Nav.Link>
      </Nav.Item>
  <Nav.Item as="lis">
        <Nav.Link href="#/create" id="li2">New Account</Nav.Link>
      </Nav.Item>
      <Nav.Item as="lis">
        <Nav.Link href="#/deposit" id="li2">Deposit</Nav.Link>
      </Nav.Item>
      <Nav.Item as="lis">
        <Nav.Link href="#/withdraw" id="li2">WithDraw</Nav.Link>
      </Nav.Item>
      <Nav.Item as="lis">
        <Nav.Link href="#/alldata" id="li2">Account Details</Nav.Link>
      </Nav.Item>
    </Nav>


    </>)
}