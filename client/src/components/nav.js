import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

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
          <Link to='/search' style={linkStyle}>
            Search
          </Link>
          <Link to='/add' style={linkStyle}>
            Add Professor
          </Link>
          <div>Sign out</div>
        </div>
      ) : props.status === "login" ? (
        <div className='link'>
          <div>New to PMP?</div>
          <Link to='/signup' style={linkStyle}>
            <Button variant='contained' sx={buttonHoverStyle}>
              Sign up
            </Button>
          </Link>
        </div>
      ) : (
        <div className='link'>
          <div>Already have an account?</div>
          <Link to='/login' style={linkStyle}>
            <Button variant='contained' sx={buttonHoverStyle}>
              Sign in
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
