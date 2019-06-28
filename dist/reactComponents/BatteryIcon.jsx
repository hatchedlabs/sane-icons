import React from "react";

const BatteryIcon = props => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x={1} y={6} width={18} height={12} rx={2} ry={2} />
    <line x1={23} y1={13} x2={23} y2={11} />
  </svg>
);

export default BatteryIcon;
