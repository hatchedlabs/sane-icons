import React from "react";

const TypeIcon = props => (
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
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1={9} y1={20} x2={15} y2={20} />
    <line x1={12} y1={4} x2={12} y2={20} />
  </svg>
);

export default TypeIcon;
