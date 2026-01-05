"use client";

import React, { useState } from "react";

// Note: In Mintlify, you'll need to configure the component to import from the built package
// For local development, this imports from the source
// import { AuthCode } from "awesome-auth-input";

// Inline implementation for Mintlify docs
// This is a simplified demo version for documentation purposes

interface AuthCodeDemoProps {
  digits?: number;
  validation?: "numeric" | "alpha" | "alphanumeric";
  type?: "text" | "password";
  showValue?: boolean;
}

export function AuthCodeDemo({
  digits = 6,
  validation = "numeric",
  type = "text",
  showValue = true,
}: AuthCodeDemoProps) {
  const [values, setValues] = useState<string[]>(Array(digits).fill(""));
  const [complete, setComplete] = useState(false);

  const getPattern = () => {
    switch (validation) {
      case "alpha":
        return /^[a-zA-Z]$/;
      case "alphanumeric":
        return /^[a-zA-Z0-9]$/;
      default:
        return /^[0-9]$/;
    }
  };

  const handleChange = (index: number, value: string) => {
    const pattern = getPattern();
    const char = value.slice(-1);

    if (char && !pattern.test(char)) return;

    const newValues = [...values];
    newValues[index] = char;
    setValues(newValues);

    // Check if complete
    const isComplete =
      newValues.every((v) => v !== "") && newValues.length === digits;
    setComplete(isComplete);

    // Auto-focus next input
    if (char && index < digits - 1) {
      const nextInput = document.getElementById(`demo-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const prevInput = document.getElementById(`demo-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleClear = () => {
    setValues(Array(digits).fill(""));
    setComplete(false);
    document.getElementById("demo-input-0")?.focus();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        {Array.from({ length: digits }).map((_, index) => (
          <input
            key={index}
            id={`demo-input-${index}`}
            type={type}
            value={values[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            style={{
              width: "48px",
              height: "56px",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "ui-monospace, monospace",
              border: "2px solid #d1d5db",
              borderRadius: "8px",
              background: "#fff",
              color: "#1f2937",
              outline: "none",
              transition: "border-color 0.15s, box-shadow 0.15s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#0070f3";
              e.target.style.boxShadow = "0 0 0 3px rgba(0, 112, 243, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
              e.target.style.boxShadow = "none";
            }}
          />
        ))}
      </div>

      {showValue && (
        <div
          style={{ fontFamily: "monospace", color: "#666", fontSize: "14px" }}
        >
          Value: "{values.join("")}"
          {complete && (
            <span style={{ color: "#22c55e", marginLeft: "8px" }}>
              ✓ Complete
            </span>
          )}
        </div>
      )}

      <button
        onClick={handleClear}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          background: "#fff",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Clear
      </button>
    </div>
  );
}

export function AuthCodeFormDemo() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [values, setValues] = useState<string[]>(Array(6).fill(""));

  const handleChange = (index: number, value: string) => {
    const char = value.slice(-1);
    if (char && !/^[0-9]$/.test(char)) return;

    const newValues = [...values];
    newValues[index] = char;
    setValues(newValues);

    if (char && index < 5) {
      const nextInput = document.getElementById(`form-demo-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(values.join(""));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            id={`form-demo-input-${index}`}
            type="text"
            value={values[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            maxLength={1}
            style={{
              width: "48px",
              height: "56px",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "ui-monospace, monospace",
              border: "2px solid #d1d5db",
              borderRadius: "8px",
              background: "#fff",
              color: "#1f2937",
              outline: "none",
            }}
          />
        ))}
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 24px",
          borderRadius: "6px",
          border: "none",
          background: "#0070f3",
          color: "white",
          cursor: "pointer",
          fontWeight: 500,
          fontSize: "14px",
        }}
      >
        Submit
      </button>

      {submitted && (
        <div style={{ fontFamily: "monospace", color: "#22c55e" }}>
          Submitted: {submitted}
        </div>
      )}
    </form>
  );
}
