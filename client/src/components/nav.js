import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
// import AuthContext from "./auth/authContext";

const buttonHoverStyle = {
  ":hover": {
    bgcolor: "#ffde6a",
  },
};

function NavBar(props) {
  //access the context if the user is logged in or not
  // const { loggedIn } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <div className='cap-icon'>
          <FontAwesomeIcon icon='graduation-cap' />
        </div>
        <div className='nav-pmp'>PMP</div>
      </div>
      <div className='flex-div'></div>
      {props.status === "loggedIn" ? (
        <div className='link'>
          <Link to='/search' className='nav-bar-link'>
            Search
          </Link>
          <Link to='/add' className='nav-bar-link'>
            Add Professor
          </Link>
          <div className='nav-bar-link'>Sign Out</div>
        </div>
      ) : props.status === "login" ? (
        <div className='link'>
          <div>New to PMP?</div>
          <Link to='/signup' className='nav-bar-link'>
            <Button variant='contained' sx={buttonHoverStyle}>
              Sign Up
            </Button>
          </Link>
        </div>
      ) : (
        <div className='link'>
          <div>Already have an account?</div>
          <Link to='/login' className='nav-bar-link'>
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
