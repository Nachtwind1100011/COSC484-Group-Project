import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

const buttonHoverStyle = {
  ":hover": {
    bgcolor: "#ffde6a",
  },
};

function NavBar(props) {
  return (
    <div className='navbar'>
      <Link to='/' className='nav-logo'>
        <div className='cap-icon'>
          <FontAwesomeIcon icon='graduation-cap' />
        </div>
        <div className='nav-pmp'>PMP</div>
      </Link>
      <div className='flex-div'></div>
      {props.status === "loggedIn" ? (
        <div className='link'>
          <NavLink
            to={"/search"}
            className={({ isActive }) =>
              "nav-bar-link" + (isActive ? " nav-bar-link-active" : "")
            }>
            Search
          </NavLink>
          <NavLink
            to={"/add"}
            className={({ isActive }) =>
              "nav-bar-link" + (isActive ? " nav-bar-link-active" : "")
            }>
            Add Professor
          </NavLink>
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
