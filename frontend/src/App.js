// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage/LandingPage';
import Calendar from './components/Calendar/Calendar';
import QueryPageBottom from './components/QueryPageBottom/QueryPageBottom';
import QueryPage from './components/QueryPage/QueryPage';
// import PrivateRoute from "./utils/PrivateRoute";


function App() {
  return (
    <div className="App">
    <Routes>
      <Route
        path="/Scheduling"
        element={
          // <PrivateRoute>
            <Calendar/>
          // </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          // <PrivateRoute>
            <LandingPage/>
          // </PrivateRoute>
        }
      />
      <Route
      path="query/:zip_code"
      element={<QueryPage/>}
      />
    </Routes>
    </div>
  );
}

export default App;




{/* <header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>
  Edit <code>src/App.js</code> and save to reload.
</p>
<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React
</a>
</header> */}