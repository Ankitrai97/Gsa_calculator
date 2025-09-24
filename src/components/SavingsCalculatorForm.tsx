import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  employees: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Must be a non-negative number." }).int({ message: "Must be a whole number." })
  ),
  monthlyCost: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Must be a non-negative number." })
  ),
  penaltyFees: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Must be a non-negative number." })
  ),
  softwareSpend: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Must be a non-negative number." })
  ),
  hoursSpent: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Must be a non-negative number." })
  ),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export type CalculatorData = z.infer<typeof formSchema>;

interface SavingsCalculatorFormProps {
  onCalculate: (data: CalculatorData) => void;
}

export const SavingsCalculatorForm: React.FC<SavingsCalculatorFormProps> = ({ onCalculate }) => {
  const form = useForm<CalculatorData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employees: "",
      monthlyCost: "",
      penaltyFees: "",
      softwareSpend: "",
      hoursSpent: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">CPA Savings Tool</CardTitle>
        <CardDescription>
          Estimate how much your business could save by optimizing its accounting and back-office operations.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="employees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="employees">Number of employees in accounting/finance</FormLabel>
                    <FormControl>
                      <Input id="employees" type="number" placeholder="e.g., 2" {...field} onChange={(e) => field.onChange(e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="monthlyCost">Average monthly salary per accountant</FormLabel>
                    <FormControl>
                      <Input id="monthlyCost" type="number" placeholder="e.g., 4000" {...field} onChange={(e) => field.onChange(e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="penaltyFees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="penaltyFees">Average annual compliance/penalty fees</FormLabel>
                    <FormControl>
                      <Input id="penaltyFees" type="number" placeholder="e.g., 1500" {...field} onChange={(e) => field.onChange(e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="softwareSpend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="softwareSpend">Monthly spend on accounting software/tools</FormLabel>
                    <FormControl>
                      <Input id="softwareSpend" type="number" placeholder="e.g., 300" {...field} onChange={(e) => field.onChange(e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hoursSpent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="hoursSpent">Estimated hours/month on bookkeeping</FormLabel>
                    <FormControl>
                      <Input id="hoursSpent" type="number" placeholder="e.g., 40" {...field} onChange={(e) => field.onChange(e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Your details</h3>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Calculate Savings</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};