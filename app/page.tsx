import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import React from "react";

const IndexPage = () => {
  return (
    <div className="flex flex-1 flex-col w-screen h-screen items-center justify-center gap-4">
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>
      <p className="text-5xl">ECT Assignments • BCS-DS-613</p>
      <p className="text-3xl">Chitraksh Tarun • 1/22/FET/BCS/074</p>
    </div>
  );
};

export default IndexPage;
