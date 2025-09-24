import { SavingsCalculatorForm, type CalculatorData } from "@/components/SavingsCalculatorForm";
import { SavingsResult } from "@/components/SavingsResult";
import { MadeWithDyad } from "@/components/made-with-dyad";
import * as React from "react";

interface SavingsResultData {
  totalSavings: number;
  percentageSavings: number;
}

const Index = () => {
  const [savingsResult, setSavingsResult] = React.useState<SavingsResultData | null>(null);

  const handleCalculate = (data: CalculatorData) => {
    // Estimate hidden duplication costs (25% of salary)
    const duplicationCosts = (data.monthlyCost * 12) * 0.25;

    // Use actual penalty input or an industry average of $3,500/year
    const penaltyRisk = data.penaltyFees || 3500;

    // Estimate efficiency loss at an average of $25/hour
    const efficiencyLoss = (data.hoursSpent * 25) * 12;

    // Estimate software cost optimization (12.5% of spend)
    const softwareOptimization = (data.softwareSpend * 12) * 0.125;

    // Calculate total potential savings
    const totalSavings = duplicationCosts + penaltyRisk + efficiencyLoss - softwareOptimization;

    // Calculate current spend to determine the savings percentage
    const currentAnnualSpend = (data.monthlyCost * 12) + penaltyRisk + (data.softwareSpend * 12) + efficiencyLoss;
    
    const percentageSavings = currentAnnualSpend > 0 ? (totalSavings / currentAnnualSpend) * 100 : 0;

    setSavingsResult({
      totalSavings: Math.max(0, totalSavings), // Ensure savings are not negative
      percentageSavings: Math.max(0, percentageSavings),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <SavingsCalculatorForm onCalculate={handleCalculate} />
        {savingsResult && (
          <SavingsResult
            totalSavings={savingsResult.totalSavings}
            percentageSavings={savingsResult.percentageSavings}
          />
        )}
      </div>
      <div className="absolute bottom-0 w-full">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;