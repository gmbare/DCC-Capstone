import React, { useEffect } from "react";
import { useContext, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const [returnUrl,setReturnUrl] = useState()
  const navigate = useNavigate();


useEffect(() => {

  if ((window.location.pathname != '/login') || returnUrl != window.location.pathname){
    setReturnUrl(window.location.pathname)
    console.log(returnUrl)
  }
}, [])

  return (
    <div className="navBar">
      {/* <ul>
        <li className="brand"> */}
          <Link to="/" style={{ textDecoration: "none", color: "white" }} className="brand_link">
            <img className="brand_image"src="/BareSkins.png" alt="/frontend/public/BareSkins.png"/><text className="brand_text">Bare Skins</text>
          
          </Link>
        {/* </li>
        <li> */}
          {user ? (
            <button onClick={() => {logoutUser(returnUrl)}} className="login_register_btn">Logout</button>
            // <button>Logout</button>
          ) : (
            <Link type="button" to="/login" state={{pastUrl:returnUrl}} className="login_register_btn"> Login or Register</Link>
          )}
        {/* </li>
      </ul> */}
    </div>
  );
};

export default Navbar;
