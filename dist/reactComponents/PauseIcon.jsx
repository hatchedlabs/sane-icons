import React from "react";

const PauseIcon = props => (
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
    <rect x={6} y={4} width={4} height={16} />
    <rect x={14} y={4} width={4} height={16} />
  </svg>
);

export default PauseIcon;
