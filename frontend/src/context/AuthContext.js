import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const BASE_URL = "http://localhost:3001/api/users";
  const decodedUser = localStorage.getItem("token");
  const decodedToken = decodedUser ? jwtDecode(decodedUser) : null;
  const [user, setUser] = useState(() => decodedToken);
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();
  

  const registerUser = async (registerData) => {
    const myData = new FormData();
    console.log(registerData)
    myData.append('name', registerData.name)
    myData.append('email', registerData.email)
      myData.append('password', registerData.password)
        myData.append('isAdmin',registerData.isAdmin)
    try {
      let response = await axios.post(`${BASE_URL}/register`, registerData);
      if (response.status === 200) {
        let token = response.headers["x-auth-token"];
        localStorage.setItem("token", JSON.stringify(token));
        setUser(jwtDecode(token));
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (loginData, navigateUrl) => {
    try {
      let response = await axios.post(`${BASE_URL}/login`, loginData);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data));
        setUser(jwtDecode(response.data));
        setIsServerError(false);
        if (navigateUrl) navigate(navigateUrl);
        else navigate("/")
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error.message);
      setIsServerError(true);
    }
  };

  const logoutUser = async (navigateUrl) => {
    if (user) {
      console.log(user)
      let response = await axios.post(`${BASE_URL}/logout`, user);
      localStorage.removeItem("token");
      setUser(null);
      if (navigateUrl) navigate(navigateUrl);
      else navigate("/")
    }
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

    