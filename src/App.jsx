import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ChatPage from "./ChatPage.jsx";
import HistoryPage from "./HistoryPage.jsx";
import FeedbackPage from "./FeedbackPage.jsx";

import "./App.css";
import "./Modal.css";

export default function App() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
  localStorage.setItem("botHistory", JSON.stringify(history));
}, [history]);

useEffect(() => {
  const saved = localStorage.getItem("botHistory");
  if (saved) {
    setHistory(JSON.parse(saved));
  }
}, []);


  return (
    <Router>
      <header className="cypress-header">
        <h1>Bot AI</h1>
      </header>
      <div className="app-shell">

        {/* Mac-style top strip */}
        <div className="app-top-accent"></div>

        <div className="app-main">

          {/* LEFT SIDEBAR */}
          <aside className="app-sidebar">

            <Link to="/" className="sidebar-newchat">
  <img
    src="/logo.png"
    alt="logo"
    className="sidebar-icon"
  />

  <span className="sidebar-text">New Chat</span>

  {/* Extra icon just after the text */}
  <img
    src="newChat.png"   // ← replace with your icon file
    alt="edit-icon"
    className="sidebar-extra-icon"
  />
</Link>


            <Link to="/history" className="sidebar-pill">
              Past Conversations
            </Link>

          </aside>

          {/* RIGHT SIDE — FULL WIDTH */}
          <main className="app-stage">

            {/* Bot AI title inside stage */}
            <div className="stage-header">
              <h1>Bot AI</h1>
            </div>

            {/* ROUTES */}
            <Routes>
              <Route
                path="/"
                element={<ChatPage history={history} setHistory={setHistory} />}
              />
              <Route path="/history" element={<HistoryPage history={history} />} />
              <Route path="/feedback" element={<FeedbackPage history={history} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
