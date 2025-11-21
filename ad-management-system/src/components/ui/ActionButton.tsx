import React from "react";
import { twMerge } from "tailwind-merge";

export const ActionButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <button className={twMerge(className)}>{children}</button>;
};
