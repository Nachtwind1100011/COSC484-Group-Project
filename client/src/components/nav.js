import React, {useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AuthContext from "./auth/authContext";

const linkStyle = {
  textDecoration: "none",
  color: "#606060",
};

const buttonHoverStyle = {
  ":hover": {
    bgcolor: "#ffde6a",
  },
};

function NavBar(props) {

  //access the context if the user is logged in or not
  const {loggedIn} = useContext(AuthContext);
  
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <div className='cap-icon'>
          <FontAwesomeIcon icon='graduation-cap' />
        </div>
        <div className='nav-pmp'>PMP</div>
      </div>
      <div className='flex-div'></div>
      {loggedIn === true ? (
        <div className='link'>
          <Link to='/search' style={linkStyle}>
            Search
          </Link>
          <Link to='/add' style={linkStyle}>
            Add Professor
          </Link>
          <div>Sign Out</div>
        </div>
      ) : props.status === "login" ? (
        <div className='link'>
          <div>New to PMP?</div>
          <Link to='/signup' style={linkStyle}>
            <Button variant='contained' sx={buttonHoverStyle}>
              Sign Up
            </Button>
          </Link>
        </div>
      ) : (
        <div className='link'>
          <div>Already have an account?</div>
          <Link to='/login' style={linkStyle}>
            <Button variant='contained' sx={buttonHoverStyle}>
              Log In
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
