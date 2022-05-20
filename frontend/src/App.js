// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage/LandingPage';
// import Calendar from './components/Calendar/Calendar';
import Studio from './components/Studio/Studio';
import ArtistPage from './components/ArtistPage/Artist';
import Schedule from './components/Schedule/Schedule';
import Navbar from './components/Navbar/Navbar';
import QueryPageBottom from './components/QueryPageBottom/QueryPageBottom';
import QueryPage from './components/QueryPage/QueryPage';
// import PrivateRoute from "./utils/PrivateRoute";


function App() {
  return (
    <div className="App">
      <Navbar/>
    <Routes>
      <Route
        path="/studio/:studio_id"
        element={
          // <PrivateRoute>
            <Studio/>
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
      <Route
      path=":studioId/artist/:artistId"
      element={<ArtistPage/>}
      />
      <Route
      path=":studioId/artist/:artistId/schedule"
      element={<Schedule/>}
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