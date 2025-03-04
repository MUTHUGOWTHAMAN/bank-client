import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

export default function Alldata() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://bank-server-pg0r.onrender.com/data");
      setData(response.data);
    };
    fetchData();
  }, []);

  function handleDelete(index) {
    const deleteItem = data[index];
    axios.delete(`https://bank-server-pg0r.onrender.com/delete/${deleteItem._id}`).then(() => {
      alert(`Account ${deleteItem.id} Deleted from Database`);
      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
    });
  }

  function handleEdit(item) {
    setEditData({ ...item });
    setShowModal(true);
  }

  function handleSave() {
    axios
      .put(`https://bank-server-pg0r.onrender.com/update/${editData._id}`, editData)
      .then(() => {
        alert(`Account ${editData.id} Updated Successfully!`);
        setData(
          data.map((item) =>
            item._id === editData._id ? editData : item
          )
        );
        setShowModal(false);
      })
      .catch((error) => console.error("Error updating data:", error));
  }

  return (
    <>
      <div
        style={{
          padding: "20px",
          background: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
          Account Details
        </h2>
        <Table striped bordered hover responsive="sm" style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)" }}>
          <thead style={{ backgroundColor: "#495057", color: "white" }}>
            <tr>
              <th style={{ textAlign: "center" }}>USER ID</th>
              <th style={{ textAlign: "center" }}>NAME</th>
              <th style={{ textAlign: "center" }}>EMAIL</th>
              <th style={{ textAlign: "center" }}>BALANCE</th>
              <th style={{ textAlign: "center" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td style={{ textAlign: "center" }}>{item.id}</td>
                <td style={{ textAlign: "center" }}>{item.name}</td>
                <td style={{ textAlign: "center" }}>{item.email}</td>
                <td style={{ textAlign: "center", color: "#495057" }}>${item.amount}</td>
                <td style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => handleEdit(item)}
                    style={{
                      backgroundColor: "#007bff",
                      border: "none",
                      padding: "5px 10px",
                      marginRight: "5px",
                      color: "#fff",
                      borderRadius: "4px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(index)}
                    style={{
                      backgroundColor: "#dc3545",
                      border: "none",
                      padding: "5px 10px",
                      color: "#fff",
                      borderRadius: "4px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Update Account Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editData && (
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Balance</Form.Label>
                <Form.Control
                  type="number"
                  value={editData.amount}
                  onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
