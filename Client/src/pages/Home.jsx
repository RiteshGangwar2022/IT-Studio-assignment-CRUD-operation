import React from "react";
import Form from "./Form";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';




const btn = {
  width: "350px",
  height: "50px",
  marginTop: "25px",
};
const home = {
  display: "flex",
  flexDirection: "column",
  position:"relative",
  padding: "8px",
  justifyContent:"center",
  alignItems:"center",
  marginBottom:"200px"
};

const main={
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundImage:"url('https://wallpapercave.com/wp/wp6056738.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height:"100vh",
    width:"100vw"
};

const Home = () => {
  return (
    <div style={main}>
      <div style={home}>
        <Form>
          <Button type="submit" color="primary" variant="contained" style={btn}>
            <AddCircleTwoToneIcon style={{margin:"2px 4px"}}/>
            Add New User
          </Button>
        </Form>
        <NavLink to="/data">
          <Button type="submit" color="error" variant="contained" style={btn}>
            <RemoveRedEyeTwoToneIcon  style={{margin:"2px 4px"}}/>
            View Data
          </Button>
        </NavLink>
      </div> 
    </div>
  );
};

export default Home;
