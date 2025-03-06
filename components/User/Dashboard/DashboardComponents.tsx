"use client";
import React from "react";
import DashboardResumen from "./DashboardResumen";
import VirtualizedTable from "./DashboardCitas";

export default function DashboardComponents() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 pt-12">
        <div className="w-4/6 ml-8">
          <DashboardResumen />
        </div>
        <div className="-ml-40 ">
          <VirtualizedTable/>
        </div>
      </div>
    </>
  );
}