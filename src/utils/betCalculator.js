export function calculateDailyBets(bankroll, oddsList, dailyRiskPercent = 75) {
  const totalRisk = bankroll * (dailyRiskPercent / 100);

  // Lav vægt: Jo lavere odds, jo større indsats
  const weights = oddsList.map((odds) => 1 / odds); // Invers odds = høj odds får lav vægt
  const weightSum = weights.reduce((a, b) => a + b, 0);

  return oddsList.map((odds, index) => {
    const weight = weights[index];
    const betSize = (weight / weightSum) * totalRisk; // Fordeler 75% af bankroll
    return {
      odds,
      betSize,
    };
  });
}
