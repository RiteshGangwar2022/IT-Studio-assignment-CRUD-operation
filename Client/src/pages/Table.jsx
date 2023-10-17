import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import UpdateModal from "./UpdateModal";
import ScheduleSendTwoToneIcon from "@mui/icons-material/ScheduleSendTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const table = {
  padding: "5px",
  marginLeft: "20px",
  marginTop: "5px",
  width: "95vw",
  height: "75vh",
  backgroundColor: "#eeeeee",
  borderRadius: "8px",
  overflow: "auto",
};

const bottom = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems:"center",
  width: "95vw",
  height: "9vh",
  backgroundColor: "#eeeeee",
  marginLeft: "20px",
  marginTop: "2px",
  padding: "4px",
  borderRadius: "8px",
};
const btnstyle = {
  height: "50px",
  width: "200px",
  padding: "8px",
  margin: "10px 100px",
};

const btn = {
  height: "35px",
  width: "100px",
  margin: "2px 2px",
  padding: "1px",
};

const Table = () => {
  const [users, setUsers] = useState([]);
  const [selectedusers, setselectedusers] = useState([]);

  const fetchdata = async () => {
    try {
      const res = await axios.get("https://itstudio.onrender.com/api/data");
      //console.log(res.data);
      setUsers(res.data);
      //console.log(users);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (userId) => {
    //console.log(userId)
    try {
      const response = await axios.delete(`https://itstudio.onrender.com/api/deleteuser/${userId}`);
       if(response.status===200){
        toast.success("User Deleted 👍!", {
          position: "top-center",
          autoClose: 3000,
        });
       }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = async (rowId) => {
    if (selectedusers.includes(rowId)) {
      setselectedusers(selectedusers.filter((id) => id !== rowId));
    } else {
      setselectedusers([...selectedusers, rowId]);
    }
  };

  const handleEmail = async () => {
    const data = users.filter((user) => selectedusers.includes(user._id));
     
     if(data.length===0){

        toast.error("Select some users 👎!", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
     }
   
    try {

      const response = await axios.post("https://itstudio.onrender.com/api/sendemail", data);
     

      if (response.status === 200) {
        setselectedusers([]);
        toast.success("Email send !", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error("Cannot send Email 👎!", {
          position: "top-center",
          autoClose: 3000,
        });
      }

    } catch (error) {
      console.error("Email sending failed:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [users]);

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#4db6ac" }}>User Data Table</h1>
      <div style={table}>
        <table id="customers">
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Hobbies</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="content">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>
                  <Checkbox
                    checked={selectedusers.includes(user._id)}
                    onChange={() => handleSelect(user._id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.hobbies}</td>
                <td id="action">
                  <UpdateModal user={user}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      style={btn}
                    >
                      <UpdateTwoToneIcon style={{ margin: "2px 4px" }} />
                      Update
                    </Button>
                  </UpdateModal>
                  <Button
                    type="submit"
                    color="error"
                    variant="contained"
                    style={btn}
                    onClick={() => handleDelete(user._id)}
                  >
                    <DeleteTwoToneIcon style={{ margin: "2px 4px" }} />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={bottom}>
        <Button
          type="submit"
          color="success"
          variant="contained"
          style={btnstyle}
          onClick={handleEmail}
        >
          <ScheduleSendTwoToneIcon style={{ margin: "2px 4px" }} />
          Send Email
        </Button>
        <NavLink to="/">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
          >
            <AddCircleTwoToneIcon style={{ margin: "2px 4px" }} />
            ADD New User
          </Button>
        </NavLink>
      </div>
       <ToastContainer/>
    </>
  );
};

export default Table;
