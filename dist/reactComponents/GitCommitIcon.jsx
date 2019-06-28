import React from "react";

const GitCommitIcon = props => (
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
    <circle cx={12} cy={12} r={4} />
    <line x1={1.05} y1={12} x2={7} y2={12} />
    <line x1={17.01} y1={12} x2={22.96} y2={12} />
  </svg>
);

export default GitCommitIcon;
