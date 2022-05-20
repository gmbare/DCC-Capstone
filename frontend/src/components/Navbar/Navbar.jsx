import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
//   const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <img className="brand_image"src="/BareSkins.png" alt="/frontend/public/BareSkins.png" />
          Bare Skins
          </Link>
        </li>
        <li>
          {/* {user ? (
            // <button onClick={logoutUser}>Logout</button>
            <button>Logout</button>
          ) : (
            <button onClick={() => navigate("/")}>Home</button>
          )} */}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
