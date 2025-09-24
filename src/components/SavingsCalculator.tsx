import * as React from "react";
import { SavingsCalculatorForm, type CalculatorData } from "./SavingsCalculatorForm";
import { SavingsResult } from "./SavingsResult";

export const SavingsCalculator: React.FC = () => {
  const [result, setResult] = React.useState<{
    totalSavings: number;
    percentageSavings: number;
  } | null>(null);

  const handleCalculate = (data: CalculatorData) => {
    const { employees, monthlyCost, penaltyFees, softwareSpend, hoursSpent } = data;

    // Calculate the total annual cost before any optimizations.
    const baselineAnnualCost =
      (employees * monthlyCost * 12) + // Annual salary costs
      (softwareSpend * 12) +           // Annual software costs
      penaltyFees;                     // Annual penalty fees

    // Assume a baseline saving of 25% on total costs through optimization.
    const optimizedAnnualCost = baselineAnnualCost * 0.75;
    
    // Calculate the value of time saved, assuming a value of $50/hour.
    // hoursSpent is already considered a monthly figure, so we calculate the monthly value
    // and then annualize it.
    const estimatedEfficiencyGain = (hoursSpent * 50); // Monthly efficiency gain

    // The total savings are the cost reduction plus the value of time saved.
    const totalSavings = (baselineAnnualCost - optimizedAnnualCost) + estimatedEfficiencyGain;

    // Calculate the savings as a percentage of the original baseline cost.
    const percentageSavings =
      baselineAnnualCost > 0 ? (totalSavings / baselineAnnualCost) * 100 : 0;

    setResult({ 
        totalSavings: Math.max(0, totalSavings),
        percentageSavings: Math.max(0, percentageSavings)
    });
  };

  return (
    <div className="w-full">
      <SavingsCalculatorForm onCalculate={handleCalculate} />
      {result && (
        <SavingsResult
          totalSavings={result.totalSavings}
          percentageSavings={result.percentageSavings}
        />
      )}
    </div>
  );
};