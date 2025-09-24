import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface CalculatorData {
  employees: number;
  monthlyCost: number;
  penaltyFees: number;
  softwareSpend: number;
  hoursSpent: number;
}

interface SavingsCalculatorFormProps {
  onCalculate: (data: CalculatorData) => void;
}

export const SavingsCalculatorForm: React.FC<SavingsCalculatorFormProps> = ({ onCalculate }) => {
  const [employees, setEmployees] = React.useState("");
  const [monthlyCost, setMonthlyCost] = React.useState("");
  const [penaltyFees, setPenaltyFees] = React.useState("");
  const [softwareSpend, setSoftwareSpend] = React.useState("");
  const [hoursSpent, setHoursSpent] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      employees: Number(employees) || 0,
      monthlyCost: Number(monthlyCost) || 0,
      penaltyFees: Number(penaltyFees) || 0,
      softwareSpend: Number(softwareSpend) || 0,
      hoursSpent: Number(hoursSpent) || 0,
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">CPA Savings Tool</CardTitle>
        <CardDescription>
          Estimate how much your business could save by optimizing its accounting and back-office operations.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="employees">Number of employees in accounting/finance</Label>
              <Input id="employees" type="number" placeholder="e.g., 2" value={employees} onChange={(e) => setEmployees(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="monthlyCost">Monthly cost of in-house accountant(s)</Label>
              <Input id="monthlyCost" type="number" placeholder="e.g., 8000" value={monthlyCost} onChange={(e) => setMonthlyCost(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="penaltyFees">Average annual compliance/penalty fees</Label>
              <Input id="penaltyFees" type="number" placeholder="e.g., 1500" value={penaltyFees} onChange={(e) => setPenaltyFees(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="softwareSpend">Monthly spend on accounting software/tools</Label>
              <Input id="softwareSpend" type="number" placeholder="e.g., 300" value={softwareSpend} onChange={(e) => setSoftwareSpend(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="hoursSpent">Estimated hours/month on bookkeeping</Label>
              <Input id="hoursSpent" type="number" placeholder="e.g., 40" value={hoursSpent} onChange={(e) => setHoursSpent(e.target.value)} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Calculate Savings</Button>
        </CardFooter>
      </form>
    </Card>
  );
};