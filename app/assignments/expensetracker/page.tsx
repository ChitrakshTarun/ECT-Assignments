"use client";

import { v4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Trash2, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

export default function ExpenseTracker() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenseList", []);

  if (expenses === null) {
    return <p className="text-center py-4">Loading...</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!category) {
      setError("Please select a category");
      return;
    }

    const newExpense: Expense = {
      id: v4(),
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleString(),
    };

    setExpenses((prev) => [...prev, newExpense]);
    setAmount("");
    setCategory("");
  };

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <IndianRupee className="h-5 w-5" />
            Expense Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="10"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Food", "Transportation", "Entertainment", "Utilities", "Shopping", "Other"].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full">
              Add Expense
            </Button>
          </form>

          <div className="space-y-2 mt-4">
            {expenses.length === 0 ? (
              <></>
            ) : (
              expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{expense.category}</div>
                    <div className="text-sm text-muted-foreground">Created on {expense.date}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">₹{expense.amount.toFixed(2)}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(expense.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <span className="font-medium">Total Expenses:</span>
            <span className="font-bold text-lg">₹ {expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
