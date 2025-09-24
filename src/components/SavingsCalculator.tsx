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

    // Calculate the core operational annual cost (excluding bookkeeping hours for now)
    const coreOperationalAnnualCost =
      (employees * monthlyCost * 12) + // Annual salary costs
      (softwareSpend * 12) +           // Annual software costs
      penaltyFees;                     // Annual penalty fees

    // Calculate the annual cost associated with bookkeeping hours
    const annualBookkeepingCost = hoursSpent * 50; // Assuming $50/hour annual value

    // Total baseline annual cost (including all current expenditures)
    const totalBaselineAnnualCost = coreOperationalAnnualCost + annualBookkeepingCost;

    // Savings from core operational costs (25% reduction)
    const costReductionFromOperations = coreOperationalAnnualCost * 0.25;

    // Savings from efficiency (100% elimination of bookkeeping hours cost)
    const efficiencyGainFromBookkeeping = annualBookkeepingCost;

    // Total savings is the sum of operational cost reduction and bookkeeping efficiency gain
    const totalSavings = costReductionFromOperations + efficiencyGainFromBookkeeping;

    // Optimized annual cost
    const totalOptimizedAnnualCost = totalBaselineAnnualCost - totalSavings;

    // Calculate the savings as a percentage of the original total baseline cost.
    const percentageSavings =
      totalBaselineAnnualCost > 0 ? (totalSavings / totalBaselineAnnualCost) * 100 : 0;

    setResult({ 
        totalSavings: Math.max(0, totalSavings),
        percentageSavings: Math.max(0, percentageSavings),
        baselineAnnualCost: totalBaselineAnnualCost,
        optimizedAnnualCost: totalOptimizedAnnualCost,
        costReduction: costReductionFromOperations, // Used for the pie chart breakdown
        estimatedEfficiencyGain: efficiencyGainFromBookkeeping, // Used for the pie chart breakdown
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
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