import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "../";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="app-main">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
