import React from "react";

const LoadingIcon = props => (
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
    <path d="M 12 2 a 10 10 0 1 0 6 2" />
  </svg>
);

export default LoadingIcon;
