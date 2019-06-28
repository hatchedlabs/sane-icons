import React from "react";

const ServerIcon = props => (
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
    <rect x={2} y={2} width={20} height={8} rx={2} ry={2} />
    <rect x={2} y={14} width={20} height={8} rx={2} ry={2} />
    <line x1={6} y1={6} x2={6} y2={6} />
    <line x1={6} y1={18} x2={6} y2={18} />
  </svg>
);

export default ServerIcon;
