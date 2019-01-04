import React from "react";

const TabletIcon = props => (
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
    <rect
      x={4}
      y={2}
      width={16}
      height={20}
      rx={2}
      ry={2}
      transform="rotate(180 12 12)"
    />
    <line x1={12} y1={18} x2={12} y2={18} />
  </svg>
);

export default TabletIcon;
