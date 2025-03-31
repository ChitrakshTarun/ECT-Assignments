"use client";

import type React from "react";
import { MousePointerClick } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MouseTracker() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect();
      setCanvasDimensions({ width, height });
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - canvasDimensions.width / 2;
        const y = rect.bottom - e.clientY - canvasDimensions.height / 2;
        setPosition({ x, y });
      }
    },
    [canvasDimensions]
  );

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <MousePointerClick className="h-5 w-5" />
            Event Handling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-justify mb-4">
            <p className="text-lg font-medium">Move your mouse inside the plane to demonstrate MouseEvent events.</p>
            <p className="text-lg font-medium">Mouse Position X: {position.x.toFixed(2)}</p>
            <p className="text-lg font-medium">Mouse Position Y: {position.y.toFixed(2)}</p>
          </div>

          <div
            ref={canvasRef}
            className="h-[400px] border-2 border-dashed border-muted-foreground rounded-md relative bg-muted/30"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-muted-foreground/50" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
