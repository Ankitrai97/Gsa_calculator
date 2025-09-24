import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { type CalculationResult } from "./SavingsCalculator";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const SavingsCharts: React.FC<CalculationResult> = ({
  baselineAnnualCost,
  optimizedAnnualCost,
  costReduction,
  estimatedEfficiencyGain,
}) => {
  const costComparisonData = [
    { name: "Current Annual Cost", value: baselineAnnualCost },
    { name: "Annual Cost with Savings", value: optimizedAnnualCost },
  ];

  const savingsBreakdownData = [
    { name: "Cost Reduction", value: costReduction },
    { name: "Efficiency Gain", value: estimatedEfficiencyGain },
  ];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="w-full mt-8 grid gap-4 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Annual Cost Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={costComparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="value" name="Cost" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Savings Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}> {/* Added margin */}
              <Pie
                data={savingsBreakdownData}
                cx="50%"
                cy="50%"
                innerRadius={60} // Added innerRadius for donut chart
                outerRadius={90} // Increased outerRadius
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false} // Keep labelLine false to avoid lines
              >
                {savingsBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};