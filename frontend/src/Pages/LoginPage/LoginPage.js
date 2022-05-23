import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link,useLocation } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const location = useLocation()
  const {pastUrl} = location.state
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { email: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset, setPastUrl] = useCustomForm(
    defaultValues,
    loginUser
  );



  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  useEffect(() => {
    setPastUrl(pastUrl)
  }, [])

  return (
    <div className="container loginpage_container">
      <form className="form" onSubmit={(e) => {handleSubmit(e,pastUrl)}}>
        <label htmlFor="email" className="test">
          <h3>Email:<br/>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          /></h3>
        </label>
        <label htmlFor="password" className="test">
         <h3> Password:{" "}
        <br/>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          /></h3> 
        </label>
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
        <Link to="/register">Click to register!</Link>
        <br/>
        <button className="large_button">Login!</button>
      </form>
    </div>
  );
};

export default LoginPage;
