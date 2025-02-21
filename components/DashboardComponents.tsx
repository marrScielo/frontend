"use client";
import React from "react";
import DashboardResumen from "./DashboardResumen";
import DashboardCitas from "./DashboardCitas";

export default function DashboardComponents() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 pt-24">
        <div className="w-3/4 ml-8">
          <DashboardResumen />
        </div>
        <div className="-ml-28 ">
          <DashboardCitas />
        </div>
      </div>
    </>
  );
}
