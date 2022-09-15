import React from "react";
// import { convertArrayCards } from "../convertCards";

// const cards = convertArrayCards();

export const AddressText = ({ text }) => {
  return <>{text?.substring(0, 5) + "..." + text?.substring(36)}</>;
};

export const TransactionText = ({ text }) => {
  return (
    <>{(text?.substring(0, 7) || "") + "..." + text?.substring(40) || ""}</>
  );
};

export const formatDate = (d: Date | undefined): string =>
  d ? d.toLocaleDateString("en-US") : "";

export const formatTime = (d: Date | undefined): string =>
  d
    ? d.toLocaleTimeString(undefined, {
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
      })
    : "";
