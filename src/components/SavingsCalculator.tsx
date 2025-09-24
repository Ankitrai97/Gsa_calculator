import * as React from "react";
import { SavingsCalculatorForm, type CalculatorData } from "./SavingsCalculatorForm";
import { SavingsDisplay } from "./SavingsDisplay";
import { UserDetailsForm } from "./UserDetailsForm"; // Import the new component
import { showSuccess, showError } from "@/utils/toast"; // Import toast utilities

export interface CalculationResult {
  totalSavings: number;
  percentageSavings: number;
  baselineAnnualCost: number;
  optimizedAnnualCost: number;
  costReduction: number;
  estimatedEfficiencyGain: number;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

export const SavingsCalculator: React.FC = () => {
  const [result, setResult] = React.useState<CalculationResult | null>(null);
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [userDetailsSubmitted, setUserDetailsSubmitted] = React.useState(false);

  const handleUserDetailsSubmit = (data: UserData) => {
    setUserData(data);
    setUserDetailsSubmitted(true);
  };

  const handleCalculate = async (data: CalculatorData) => {
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

    const calculatedResult: CalculationResult = {
        totalSavings: Math.max(0, totalSavings),
        percentageSavings: Math.max(0, percentageSavings),
        baselineAnnualCost: totalBaselineAnnualCost,
        optimizedAnnualCost: totalOptimizedAnnualCost,
        costReduction: costReductionFromOperations,
        estimatedEfficiencyGain: efficiencyGainFromBookkeeping,
    };

    setResult(calculatedResult);

    // Send data to n8n webhook
    if (userData) {
      try {
        const webhookData = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          ...calculatedResult, // Include all calculated results
        };

        const response = await fetch("https://narwhal-credible-jaguar.ngrok-free.app/webhook-test/Insta-Trigger", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        });

        if (response.ok) {
          showSuccess("User details and savings sent successfully!");
        } else {
          showError("Failed to send data to webhook.");
        }
      } catch (error) {
        console.error("Error sending data to webhook:", error);
        showError("An error occurred while sending data.");
      }
    }
  };

  return (
    <div className="w-full">
      {!userDetailsSubmitted ? (
        <UserDetailsForm onSubmit={handleUserDetailsSubmit} />
      ) : (
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
      )}
    </div>
  );
};