function HomePage({
  bankroll,
  bets,
  setBets,
  setBankroll,
  history,
  setHistory,
}) {
  const handleWin = (index) => {
    const bet = bets[index];
    const winAmount = bet.amount * bet.odds;
    setBankroll((prev) => prev + winAmount);

    setHistory((prev) => [...prev, { ...bet, result: "win" }]);

    setBets(bets.filter((_, i) => i !== index));
  };

  const handleLose = (index) => {
    const bet = bets[index];
    setHistory((prev) => [...prev, { ...bet, result: "lose" }]);

    setBets(bets.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Bankroll: {bankroll.toFixed(2)} kr</h1>
      <h2>Aktive Væddemål</h2>

      {bets.length === 0 ? (
        <p>Ingen aktive væddemål</p>
      ) : (
        bets.map((bet, index) => (
          <div key={index} className="bet-item">
            <p>Indsats: {bet.amount.toFixed(2)} kr</p>
            <p>Odds: {bet.odds}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => handleWin(index)}>✅ Win</button>
              <button onClick={() => handleLose(index)}>❌ Lose</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HomePage;
