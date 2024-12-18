import { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Alldata() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://back-end-server-qggz.onrender.com/data');
      setData(response.data);
    };
    fetchData();
  }, []);

  function handleDelete(index) {
    const deleteItem = data[index];
    axios.delete(`https://back-end-server-qggz.onrender.com/delete/${deleteItem._id}`).then(() => {
      alert(`Account ${deleteItem.id} Deleted from Database`);
      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
    });
  }

  return (
    <>
      <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Account Details</h2>
        <Table striped bordered hover responsive="sm" style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
          <thead style={{ backgroundColor: '#495057', color: 'white' }}>
            <tr>
              <th style={{ textAlign: 'center' }}>USER ID</th>
              <th style={{ textAlign: 'center' }}>NAME</th>
              <th style={{ textAlign: 'center' }}>EMAIL</th>
              <th style={{ textAlign: 'center' }}>BALANCE</th>
              <th style={{ textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td style={{ textAlign: 'center' }}>{item.id}</td>
                <td style={{ textAlign: 'center' }}>{item.name}</td>
                <td style={{ textAlign: 'center' }}>{item.email}</td>
                <td style={{ textAlign: 'center', color: '#495057' }}>${item.amount}</td>
                <td style={{ textAlign: 'center' }}>
                  <Button 
                    onClick={() => handleDelete(index)} 
                    style={{
                      backgroundColor: '#dc3545',
                      border: 'none',
                      padding: '5px 10px',
                      color: '#fff',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
