"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dices, Coins } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "🍉", "7️⃣", "💰"];

export default function SlotMachine() {
  const [coins, setCoins] = useLocalStorage("slotMachineCoins", 100);
  const [reels, setReels] = useState<Array<(typeof SYMBOLS)[number] | "❓">>(["❓", "❓", "❓"]);
  const [message, setMessage] = useState<string>("");
  const [spinning, setSpinning] = useState<boolean>(false);

  const spin = () => {
    if (coins < 10) {
      setMessage("Not enough coins!");
      return;
    }

    setCoins(coins - 10);
    setMessage("Spinning...");
    setSpinning(true);

    const spinInterval = setInterval(() => {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      const finalReels = [
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ];

      setReels(finalReels);
      setSpinning(false);

      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        const winAmount = finalReels[0] === "💰" ? 500 : finalReels[0] === "7️⃣" ? 200 : 100;
        setCoins((coins) => coins + winAmount);
        setMessage(`JACKPOT! You won ${winAmount} coins!`);
      } else if (
        finalReels[0] === finalReels[1] ||
        finalReels[1] === finalReels[2] ||
        finalReels[0] === finalReels[2]
      ) {
        setCoins((coins) => coins + 20);
        setMessage("You won 20 coins!");
      } else {
        setMessage("Try again!");
      }
    }, 1500);
  };

  const resetCoins = () => {
    setCoins(100);
    setMessage("Coins reset to 100");
  };

  return (
    <div className="relative container mx-auto py-8 px-4 max-w-md">
      <Card className="relative">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <Dices className="h-6 w-6" />
            Slot Machine
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <Coins className="h-5 w-5" />
            <span className="text-xl font-bold">{coins} coins</span>
          </div>

          <div className="flex justify-center mb-6">
            <div className="grid grid-cols-3 gap-2">
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  className="w-20 h-20 flex items-center justify-center text-4xl bg-muted rounded-lg border-2 border-primary"
                >
                  {symbol}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-4">
            <p className="text-lg">{message || "Spin the slot machine to play"}</p>
            <p className="text-sm text-muted-foreground mt-2">Cost: 10 coins per spin</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={spin} disabled={spinning || coins < 10} className="w-full" size="lg">
            {spinning ? "Spinning..." : "Spin (10 coins)"}
          </Button>
          <Button onClick={resetCoins} variant="outline" className="w-full">
            Reset Coins
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
