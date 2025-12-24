import React from "react";

export default function Button({
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

  const styles =
    variant === "ghost"
      ? "bg-transparent hover:bg-slate-800/60 text-slate-100 border border-slate-800"
      : variant === "danger"
        ? "bg-rose-600 hover:bg-rose-500 text-white"
        : "bg-indigo-600 hover:bg-indigo-500 text-white";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
