"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Hand, Calculator } from "lucide-react";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              Slot Machine
            </CardTitle>
            <CardDescription> Slot Machine game using React</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="italic">Features: Slot Machine implementation, Rules page, Local storage support</p>
          </CardContent>
          <CardFooter>
            <Link href="/assignments/slotmachine" className="w-full">
              <Button className="w-full">Open</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Counter App
            </CardTitle>
            <CardDescription>Counter app using React</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="italic">Features: Increment, Decrement, Reset count, Local storage support</p>
          </CardContent>
          <CardFooter>
            <Link href="/assignments/counter" className="w-full">
              <Button className="w-full">Open</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hand className="h-5 w-5" />
              Greeting Card
            </CardTitle>
            <CardDescription>Greeting card creating using React</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="italic">Features: Simple usage of props, Local storage support</p>
          </CardContent>
          <CardFooter>
            <Link href="/assignments/greeting" className="w-full">
              <Button className="w-full">Open</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
