import * as React from "react";
import { SavingsCalculatorForm, type CalculatorData } from "./SavingsCalculatorForm";
import { SavingsDisplay } from "./SavingsDisplay";
import { Card } from "@/components/ui/card"; // Import Card for consistent styling

export interface CalculationResult {
  totalSavings: number;
  percentageSavings: number;
  baselineAnnualCost: number;
  optimizedAnnualCost: number;
  costReduction: number;
  estimatedEfficiencyGain: number;
}

export const SavingsCalculator: React.FC = () => {
  const [result, setResult] = React.useState<CalculationResult | null>(null);

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
    // As per the user's example, hoursSpent (monthly) * hourlyRate ($50) is treated as an annual gain.
    const estimatedEfficiencyGain = (hoursSpent * 50); 

    // The total savings are the cost reduction plus the value of time saved.
    const costReduction = baselineAnnualCost - optimizedAnnualCost;
    const totalSavings = costReduction + estimatedEfficiencyGain;

    // Calculate the savings as a percentage of the original baseline cost.
    const percentageSavings =
      baselineAnnualCost > 0 ? (totalSavings / baselineAnnualCost) * 100 : 0;

    setResult({ 
        totalSavings: Math.max(0, totalSavings),
        percentageSavings: Math.max(0, percentageSavings),
        baselineAnnualCost: baselineAnnualCost,
        optimizedAnnualCost: optimizedAnnualCost,
        costReduction: costReduction,
        estimatedEfficiencyGain: estimatedEfficiencyGain,
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"> {/* Responsive grid */}
        <SavingsCalculatorForm onCalculate={handleCalculate} />
        {result && (
          <SavingsDisplay
            totalSavings={result.totalSavings}
            percentageSavings={result.percentageSavings}
            baselineAnnualCost={result.baselineAnnualCost}
            optimizedAnnualCost={result.optimizedAnnualCost}
            costReduction={result.costReduction}
            estimatedEfficiencyGain={result.estimatedEfficiencyGain}
          />
        )}
      </div>
    </div>
  );
};