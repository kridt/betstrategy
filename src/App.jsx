import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import NewBetPage from "./pages/NewBetPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import { saveData, loadData } from "./utils/db.js";
import "./index.css";

function App() {
  const [bankroll, setBankroll] = useState(null); // Starter med null, så vi kan loade fra IndexedDB
  const [bets, setBets] = useState([]);
  const [history, setHistory] = useState([]);
  const [startBankroll, setStartBankroll] = useState(10000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFromDB() {
      const savedBankroll = await loadData("bankroll");
      const savedBets = await loadData("bets");
      const savedHistory = await loadData("history");
      const savedStartBankroll = await loadData("startBankroll");

      setBankroll(savedBankroll ?? 10000);
      setStartBankroll(savedStartBankroll ?? 10000);
      setBets(savedBets ?? []);
      setHistory(savedHistory ?? []);
      setLoading(false);
    }

    loadFromDB();
  }, []);

  // Gem data hver gang der sker ændringer
  useEffect(() => {
    if (bankroll !== null) {
      saveData("bankroll", bankroll);
      saveData("bets", bets);
      saveData("history", history);
      saveData("startBankroll", startBankroll);
    }
  }, [bankroll, bets, history, startBankroll]);

  if (loading) {
    return (
      <div className="container">
        <p>Indlæser data...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="container">
        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  bankroll={bankroll}
                  bets={bets}
                  setBets={setBets}
                  setBankroll={setBankroll}
                  history={history}
                  setHistory={setHistory}
                />
              }
            />
            <Route
              path="/new-bet"
              element={<NewBetPage bankroll={bankroll} setBets={setBets} />}
            />
            <Route
              path="/settings"
              element={
                <SettingsPage
                  bankroll={bankroll}
                  setBankroll={setBankroll}
                  setBets={setBets}
                  setHistory={setHistory}
                  startBankroll={startBankroll}
                  setStartBankroll={setStartBankroll}
                />
              }
            />
            <Route
              path="/history"
              element={
                <HistoryPage
                  history={history}
                  bankroll={bankroll}
                  startBankroll={startBankroll}
                />
              }
            />
          </Routes>
        </div>

        <nav className="navbar">
          <Link to="/">🏠 Hjem</Link>
          <Link to="/new-bet">➕ Nyt Bet</Link>
          <Link to="/settings">⚙️ Settings</Link>
          <Link to="/history">📊 Historik</Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
