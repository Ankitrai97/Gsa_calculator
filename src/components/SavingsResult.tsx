import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SavingsResultProps {
  totalSavings: number;
  percentageSavings: number;
}

export const SavingsResult: React.FC<SavingsResultProps> = ({ totalSavings, percentageSavings }) => {
  const formattedSavings = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalSavings);

  return (
    <Card className="w-full max-w-lg mx-auto mt-8 animate-fade-in">
      <CardHeader className="text-center">
        <CardDescription>ESTIMATED ANNUAL SAVINGS</CardDescription>
        <CardTitle className="text-4xl font-bold text-green-600">{formattedSavings}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-lg">
          That's a potential saving of{" "}
          <span className="font-semibold">{percentageSavings.toFixed(1)}%</span>{" "}
          on your current spend.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Most businesses save between 25–40% by streamlining back-office operations.
        </p>
        <Button asChild className="mt-6 w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
          <a href="https://cal.com/subrahmanyagsa/30min" target="_blank" rel="noopener noreferrer">
            Book a Free Consultation
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};