import React from "react";

const VoicemailIcon = props => (
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
    <circle cx={5.5} cy={11.5} r={4.5} />
    <circle cx={18.5} cy={11.5} r={4.5} />
    <line x1={5.5} y1={16} x2={18.5} y2={16} />
  </svg>
);

export default VoicemailIcon;
