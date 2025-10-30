import * as React from "react";
import { SavingsCalculatorForm, type CalculatorData } from "./SavingsCalculatorForm";
import { SavingsDisplay } from "./SavingsDisplay";
import { showSuccess, showError } from "@/utils/toast"; // Import toast utilities

export interface CalculationResult {
  totalSavings: number;
  percentageSavings: number;
  baselineAnnualCost: number;
  optimizedAnnualCost: number;
  costReduction: number;
  estimatedEfficiencyGain: number;
}

// Function to submit data to Google Sheets
const submitToGoogleSheets = async (formData: any) => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwgc2GKGcqNWAuKX65bd_Oj9ugHv0Z4_t6eNY4-UQ4erq3eTacPd1_vH8DNwo87hlpS/exec';

  try {
    // Using 'no-cors' mode means we cannot read the response,
    // but it's necessary for cross-origin requests to Google Apps Script.
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(formData)
    });

    // Since we use no-cors, we assume success if no network error occurred.
    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
};

export const SavingsCalculator: React.FC = () => {
  const [result, setResult] = React.useState<CalculationResult | null>(null);

  const handleCalculate = async (data: CalculatorData) => {
    const { employees, monthlyCost, penaltyFees, softwareSpend, hoursSpent, firstName, lastName, email } = data;

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

    const calculatedResult: CalculationResult = {
        totalSavings: Math.max(0, totalSavings),
        percentageSavings: Math.max(0, percentageSavings),
        baselineAnnualCost: totalBaselineAnnualCost,
        optimizedAnnualCost: totalOptimizedAnnualCost,
        costReduction: costReductionFromOperations,
        estimatedEfficiencyGain: efficiencyGainFromBookkeeping,
    };

    setResult(calculatedResult);

    // Send data to Google Sheets
    try {
      const submissionData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        ...calculatedResult, // Include all calculated results
      };

      const success = await submitToGoogleSheets(submissionData);

      if (success) {
        showSuccess("Success!");
      } else {
        showError("Failed");
      }
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
      showError("An error occurred while sending data to Google Sheets.");
    }
  };

  return (
    <div className="w-full">
      <div className={`grid grid-cols-1 gap-8 items-start ${result ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
        <div className={result ? '' : 'mx-auto w-full max-w-lg'}>
          <SavingsCalculatorForm onCalculate={handleCalculate} />
        </div>
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