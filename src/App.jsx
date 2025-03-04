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
</Router>;
