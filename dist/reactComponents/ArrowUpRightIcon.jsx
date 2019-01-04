import React from "react";

const ArrowUpRightIcon = props => (
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
    <line x1={7} y1={17} x2={17} y2={7} />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export default ArrowUpRightIcon;
