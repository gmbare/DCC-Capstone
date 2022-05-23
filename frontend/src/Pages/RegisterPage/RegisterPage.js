import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import "./RegisterPage.css"

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = { name: "", email: "", password: "", isAdmin: false };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="container registerpage_container">
      <form className="form registerpage_container" onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <br/>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <br/>
          Email:{" "}
          <br/>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <br/>
          Password:{" "}
        <br/>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <button>Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
