import React from "react";

const SmartphoneIcon = props => (
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
    <rect x={6} y={2} width={12} height={20} rx={2} ry={2} />
    <line x1={12} y1={18} x2={12} y2={18} />
  </svg>
);

export default SmartphoneIcon;
