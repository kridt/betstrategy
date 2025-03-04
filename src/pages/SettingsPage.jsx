import { useState, useEffect } from "react";
import { clearAllData, saveData } from "../utils/db";

function SettingsPage({
  bankroll,
  setBankroll,
  setBets,
  setHistory,
  setStartBankroll,
  startBankroll,
}) {
  const [newBankroll, setNewBankroll] = useState(bankroll);
  const [newStartBankroll, setNewStartBankroll] = useState(startBankroll);

  // Sørg for at formularen viser de nyeste værdier når settings siden åbnes
  useEffect(() => {
    setNewBankroll(bankroll);
    setNewStartBankroll(startBankroll);
  }, [bankroll, startBankroll]);

  const handleSave = async () => {
    setBankroll(parseFloat(newBankroll));
    setStartBankroll(parseFloat(newStartBankroll));

    // Gem begge dele i IndexedDB
    await saveData("bankroll", parseFloat(newBankroll));
    await saveData("startBankroll", parseFloat(newStartBankroll));

    alert("Bankroll og Start Bankroll opdateret!");
  };

  const resetAll = async () => {
    if (window.confirm("Er du sikker på, at du vil nulstille alt data?")) {
      await clearAllData();
      const startValue = 10000; // Default hvis man resetter
      setBankroll(startValue);
      setStartBankroll(startValue);
      setBets([]);
      setHistory([]);

      // Gem start bankroll i IndexedDB
      await saveData("startBankroll", startValue);

      alert("Alt data er nulstillet!");
    }
  };

  return (
    <div>
      <h1>Indstillinger</h1>

      <div className="bet-item">
        <label>Ændr Nuværende Bankroll:</label>
        <input
          type="number"
          value={newBankroll}
          onChange={(e) => setNewBankroll(e.target.value)}
        />
      </div>

      <div className="bet-item">
        <label>Ændr Start Bankroll:</label>
        <input
          type="number"
          value={newStartBankroll}
          onChange={(e) => setNewStartBankroll(e.target.value)}
        />
      </div>

      <button onClick={handleSave}>💾 Gem Indstillinger</button>

      <div className="bet-item">
        <h2>System</h2>
        <button
          onClick={resetAll}
          style={{ backgroundColor: "red", color: "white" }}
        >
          🗑️ Nulstil Alt Data
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
