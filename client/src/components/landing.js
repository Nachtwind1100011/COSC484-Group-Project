import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AuthContext from "./auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const containedStyle = {
  textDecoration: "none",
};

const textStyle = {
  textDecoration: "none",
  color: "#ffde6a",
};

const buttonStyle = {
  "&.MuiButton-root": {
    minWidth: "325px",
    flexGrow: 1,
  },
  "&.MuiButton-text": {
    fontWeight: "700",
    color: "#ffde6a",
  },
  "&.MuiButton-contained": {
    backgroundColor: "#ffde6a",
  },
  "&.MuiButton-contained:hover": {
    bgcolor: "black",
  },
  "&.MuiButton-text:hover": {
    bgcolor: "inherit",
    color: "black",
  },
};

function Landing() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className='landing'>
      <div className='landing-top'></div>
      <div className='landing-content'>
        <div className='landing-logo'>
          <div className='landing-logo-sec logo-init'>
            <FontAwesomeIcon icon='graduation-cap' />
            <span>P</span>
            <span>M</span>
            <span>P</span>
          </div>
          <div className='landing-logo-sec logo-full'>
            <div className='logo-full-line'>
              <span>P</span>
              <span>I</span>
              <span>C</span>
              <span>K</span>
            </div>
            <div className='logo-full-line'>
              <span>M</span>
              <span>Y</span>
            </div>
            <div className='logo-full-line'>
              <span>P</span>
              <span>R</span>
              <span>O</span>
              <span>F</span>
              <span>E</span>
              <span>S</span>
              <span>S</span>
              <span>O</span>
              <span>R</span>
            </div>
          </div>
        </div>
        <div className='landing-slogan'>
          Stop choosing your classes like you are playing the lottery and let us
          help you pick the professor that's just right for you!
        </div>
        <div className='landing-links'>
          <Link to={loggedIn ? "/search" : "/signup"} style={containedStyle}>
            <Button variant='contained' sx={buttonStyle}>
              {loggedIn ? "Start Searching" : "Sign Up"}
            </Button>
          </Link>
          {!loggedIn && (
            <Link to='/login' style={textStyle} color='#ffde6a'>
              <Button variant='text' sx={buttonStyle}>
                Log In
              </Button>
            </Link>
          )}
          <div className='flex-div landing-links-flex'></div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
