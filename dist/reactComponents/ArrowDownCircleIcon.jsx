import React from "react";

const ArrowDownCircleIcon = props => (
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
    <circle cx={12} cy={12} r={10} />
    <polyline points="8 12 12 16 16 12" />
    <line x1={12} y1={8} x2={12} y2={16} />
  </svg>
);

export default ArrowDownCircleIcon;
