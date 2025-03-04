import logo from './logo.svg';
import './App.css';
import Navbar from'./navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from './create';
import Alldata from './alldata';
import Withdraw from './withdraw';
import Deposit from './deposit';
import {HashRouter,Routes,Route} from 'react-router-dom'
import userContext from './context';
import Homepage from './homepage';

export default function App() {
  return (
    <>
    <div id='home'>
    <Navbar></Navbar>
    <userContext.Provider 
    value={{'users':[]}}>
    <HashRouter>
      <Routes>
      <Route path='/homepage' element={<Homepage/>}></Route>        
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/deposit' element={<Deposit/>}></Route>
        <Route path='/withdraw' element={<Withdraw/>}></Route>
        <Route path='/alldata' element={<Alldata/>}></Route>
      </Routes>
    </HashRouter>
    </userContext.Provider>
    </div>
    </>

  );
}
