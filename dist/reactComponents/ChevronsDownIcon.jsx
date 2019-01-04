import React from "react";

const ChevronsDownIcon = props => (
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
    <polyline points="7 13 12 18 17 13" />
    <polyline points="7 6 12 11 17 6" />
  </svg>
);

export default ChevronsDownIcon;
