import React from "react";

const AnchorIcon = props => (
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
    <circle cx={12} cy={5} r={3} />
    <line x1={12} y1={22} x2={12} y2={8} />
    <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
  </svg>
);

export default AnchorIcon;
