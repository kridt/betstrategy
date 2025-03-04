import { useState } from "react";
import { calculateDailyBets } from "../utils/betCalculator";

function NewBetPage({ bankroll, setBets }) {
  const [oddsList, setOddsList] = useState([]);
  const [inputOdds, setInputOdds] = useState("");
  const [calculatedBets, setCalculatedBets] = useState([]);

  function addOdds() {
    if (inputOdds) {
      setOddsList([...oddsList, parseFloat(inputOdds)]);
      setInputOdds("");
    }
  }

  function calculateBets() {
    const bets = calculateDailyBets(bankroll, oddsList);
    setCalculatedBets(bets);
  }

  function placeAllBets() {
    setBets((prev) => [
      ...prev,
      ...calculatedBets.map((bet) => ({ odds: bet.odds, amount: bet.betSize })),
    ]);
    setOddsList([]);
    setCalculatedBets([]);
  }

  return (
    <div>
      <h1>Dagens Væddemål</h1>

      <input
        type="number"
        value={inputOdds}
        onChange={(e) => setInputOdds(e.target.value)}
        placeholder="Indtast odds"
      />
      <button onClick={addOdds}>Tilføj Odds</button>

      <h2>Valgte Odds</h2>
      {oddsList.length === 0 ? (
        <p>Ingen odds tilføjet endnu.</p>
      ) : (
        <ul>
          {oddsList.map((odds, index) => (
            <li key={index}>Odds: {odds}</li>
          ))}
        </ul>
      )}

      {oddsList.length > 0 && (
        <button onClick={calculateBets}>Beregn Fordeling</button>
      )}

      {calculatedBets.length > 0 && (
        <div>
          <h2>Fordelte Indsatser (75% af Bankroll)</h2>
          <ul>
            {calculatedBets.map((bet, index) => (
              <li key={index}>
                Odds: {bet.odds} – Indsats: {bet.betSize.toFixed(2)} kr
              </li>
            ))}
          </ul>
          <button onClick={placeAllBets}>Placér Alle Væddemål</button>
        </div>
      )}
    </div>
  );
}

export default NewBetPage;
