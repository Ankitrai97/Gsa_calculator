import * as React from "react";
import { SavingsResult } from "./SavingsResult";
import { SavingsCharts } from "./SavingsCharts"; // New component to be created
import { type CalculationResult } from "./SavingsCalculator"; // Import the interface

export const SavingsDisplay: React.FC<CalculationResult> = (props) => {
  return (
    <div className="w-full">
      <SavingsResult {...props} />
      <SavingsCharts {...props} />
    </div>
  );
};