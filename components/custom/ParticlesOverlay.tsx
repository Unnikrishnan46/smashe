"use client"
import React from "react";

function ParticlesOverlay() {
  return (
    <div className="bg-animation fixed z-[10999] pointer-events-none">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="stars4"></div>
    </div>
  );
}

export default ParticlesOverlay;
