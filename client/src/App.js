import Navbar from "./components/Navbar";
import "./app.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        await axios
          .get("/auth/login/success")
          .then((response) => {
            if (response.status === 200) return response.data;
            throw new Error("Authentication failed");
          })
          .then((filteredResponse) => {
            setUser(filteredResponse.user);
          })
          .catch((error) => console.log("Error occured:", error));
      } catch (err) {
        console.log("No Success");
      }
    };

    getUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
