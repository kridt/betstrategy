function HistoryPage({ history, bankroll, startBankroll }) {
  const totalBets = history.length;

  const wins = history.filter((bet) => bet.result === "win");
  const losses = history.filter((bet) => bet.result === "lose");

  const winRate = totalBets > 0 ? (wins.length / totalBets) * 100 : 0;

  const averageOdds =
    totalBets > 0
      ? (history.reduce((sum, bet) => sum + bet.odds, 0) / totalBets).toFixed(2)
      : 0;

  const totalProfit = bankroll - startBankroll;
  // Fixet: Realtids profit i stedet for fejlberegning

  return (
    <div>
      <h1>Historik & Statistik</h1>
      <p>
        <strong>Antal væddemål:</strong> {totalBets}
      </p>
      <p>
        <strong>Win rate:</strong> {winRate.toFixed(2)}%
      </p>
      <p>
        <strong>Gennemsnitsodds:</strong> {averageOdds}
      </p>
      <p>
        <strong>Total profit:</strong> {totalProfit.toFixed(2)} kr
      </p>

      <h2>Afgjorte væddemål</h2>
      {history.length === 0 ? (
        <p>Ingen afgjorte væddemål endnu</p>
      ) : (
        history.map((bet, index) => (
          <div
            key={index}
            className="bet-item"
            style={{
              borderColor: bet.result === "win" ? "limegreen" : "red",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <p>Odds: {bet.odds}</p>
            <p>Indsats: {bet.amount.toFixed(2)} kr</p>
            <p
              style={{
                color: bet.result === "win" ? "limegreen" : "red",
                fontWeight: "bold",
              }}
            >
              Resultat: {bet.result.toUpperCase()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoryPage;
