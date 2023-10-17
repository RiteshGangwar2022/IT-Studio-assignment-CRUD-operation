import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 50,
  p: 4,
};

const textinp = {
  margin: "8px",
  width: "98%",
  borderRadius: "5px",
  overflow: "hidden",
};

const btnstyle = {
  margin: "10px 5px",
  height: "45px",
  width: "100%",
  padding:"0px"
};

export default function KeepMountedModal({ children }) {
  const [open, setOpen] = React.useState(false);
  const [name, setname] = React.useState("");
  const [email, setemail] = React.useState("");
  const [phone, setphone] = React.useState("");
  const [hobbies, sethobies] = React.useState("");
  const [data, setdata] = React.useState([]);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent default behaviour of form ,so that it don't refresh page

    if (name === "" || email === "" || phone === "" || hobbies === "") {
      toast.error("Fill all the data properly 👎!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Enter a valid email address 👎!', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      toast.error('Enter a valid 10-digit phone number 👎!', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }


    try {
      const res = await axios.post("https://itstudio.onrender.com/register", {
        name,
        email,
        phone,
        hobbies,
      });

      setdata(res.data);
      setname("");
      setphone("");
      setemail("");
      sethobies("");
      navigate("/");
      toast.success("User Added 👍!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <form method="post" style={{overflow:"hidden"}}>
            <TextField
              placeholder="Enter Name"
              fullWidth
              required
              style={textinp}
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <Divider />
            <TextField
              placeholder="Enter Phone Number"
              fullWidth
              required
              style={textinp}
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />
            <Divider />
            <TextField
              placeholder="Enter Email"
              fullWidth
              required
              style={textinp}
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <Divider />
            <TextField
              placeholder="Enter hobbies"
              fullWidth
              required
              style={textinp}
              value={hobbies}
              onChange={(e) => sethobies(e.target.value)}
            />
            <Divider />
            <Divider />
            <Button
              type="submit"
              color="success"
              variant="contained"
              style={btnstyle}
              onClick={handleSubmit}
            >
              ADD
            </Button>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
