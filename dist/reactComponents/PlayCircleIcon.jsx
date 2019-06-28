import React from "react";

const PlayCircleIcon = props => (
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
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

export default PlayCircleIcon;
