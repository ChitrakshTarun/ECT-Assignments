"use client";

import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Counter() {
  const [count, setCount] = useLocalStorage("counterValue", 0);

  return (
    <div className="container mx-auto py-8 px-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Counter App</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="text-7xl font-bold mb-8">{count}</div>

          <div className="flex gap-4">
            <Button onClick={() => setCount(count! - 1)} variant="outline" size="icon" className="h-12 w-12">
              <Minus className="h-6 w-6" />
            </Button>

            <Button onClick={() => setCount(count! + 1)} variant="outline" size="icon" className="h-12 w-12">
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => setCount(0)} variant="ghost" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
