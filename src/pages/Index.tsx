import { SavingsCalculatorForm, type CalculatorData } from "@/components/SavingsCalculatorForm";
import { MadeWithDyad } from "@/components/made-with-dyad";
import * as React from "react";

const Index = () => {
  const handleCalculate = (data: CalculatorData) => {
    console.log("Calculating savings with data:", data);
    // Calculation logic will go here in the next step
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <SavingsCalculatorForm onCalculate={handleCalculate} />
      </div>
      <div className="absolute bottom-0 w-full">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;