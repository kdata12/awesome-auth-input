import React, { useState, useRef } from "react";
import { AuthCodeInput, AuthCodeGroup } from "./AuthCode.jsx";

export const AuthCodeDemo = ({
  digits = 6,
  validation = "numeric",
  type = "text",
  showValue = true,
}) => {
  const [value, setValue] = useState("");
  const [complete, setComplete] = useState(false);
  const groupRef = useRef(null);

  const handleComplete = (code) => {
    setComplete(true);
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
    setComplete(newValue.length === digits);
  };

  const handleClear = () => {
    setValue("");
    setComplete(false);
    // Focus first input after clear
    const firstInput = groupRef.current?.querySelector(
      "input:not([type=hidden])"
    );
    firstInput?.focus();
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
      <AuthCodeGroup
        ref={groupRef}
        validation={{ type: validation }}
        type={type}
        value={value}
        onValueChange={handleValueChange}
        onComplete={handleComplete}
        autoSubmit={false}
        style={{ display: "flex", gap: "8px" }}
      >
        {Array.from({ length: digits }).map((_, index) => (
          <AuthCodeInput
            key={index}
            index={index}
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
      </AuthCodeGroup>

      {showValue && (
        <div
          style={{ fontFamily: "monospace", color: "#666", fontSize: "14px" }}
        >
          Value: "{value}"
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
};

export const AuthCodeFormDemo = () => {
  const [submitted, setSubmitted] = useState(null);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(value);
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
      <AuthCodeGroup
        name="otp"
        value={value}
        onValueChange={setValue}
        autoSubmit={false}
        style={{ display: "flex", gap: "8px" }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <AuthCodeInput
            key={index}
            index={index}
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
      </AuthCodeGroup>

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
};

/**
 * Neon Cyberpunk
 * Dark background with neon glow effects, vibrant accent colors
 */
export const NeonCyberpunkDemo = () => {
  const [value, setValue] = useState("");
  const [complete, setComplete] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const groupRef = useRef(null);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    setComplete(newValue.length === 6);
  };

  const handleClear = () => {
    setValue("");
    setComplete(false);
    const firstInput = groupRef.current?.querySelector(
      "input:not([type=hidden])"
    );
    firstInput?.focus();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
        padding: "48px",
        background: "linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%)",
        borderRadius: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid lines background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          opacity: 0.5,
        }}
      />

      <div style={{ textAlign: "center", zIndex: 1 }}>
        <h3
          style={{
            margin: "0 0 8px 0",
            color: "#00fff5",
            fontSize: "24px",
            fontWeight: 700,
            fontFamily: "'Courier New', monospace",
            textShadow:
              "0 0 20px rgba(0, 255, 245, 0.5), 0 0 40px rgba(0, 255, 245, 0.3)",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Access Code
        </h3>
        <p
          style={{
            margin: 0,
            color: "#ff00ff",
            fontSize: "12px",
            fontFamily: "'Courier New', monospace",
            textShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
            letterSpacing: "2px",
          }}
        >
          // ENTER VERIFICATION SEQUENCE
        </p>
      </div>

      <AuthCodeGroup
        ref={groupRef}
        value={value}
        onValueChange={handleValueChange}
        autoSubmit={false}
        style={{
          display: "flex",
          gap: "8px",
          padding: "24px",
          background: "rgba(0, 255, 245, 0.03)",
          border: "1px solid rgba(0, 255, 245, 0.2)",
          borderRadius: "4px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Corner accents */}
        <div
          style={{
            position: "absolute",
            top: "-1px",
            left: "-1px",
            width: "20px",
            height: "20px",
            borderTop: "2px solid #00fff5",
            borderLeft: "2px solid #00fff5",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-1px",
            right: "-1px",
            width: "20px",
            height: "20px",
            borderTop: "2px solid #00fff5",
            borderRight: "2px solid #00fff5",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-1px",
            left: "-1px",
            width: "20px",
            height: "20px",
            borderBottom: "2px solid #ff00ff",
            borderLeft: "2px solid #ff00ff",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-1px",
            right: "-1px",
            width: "20px",
            height: "20px",
            borderBottom: "2px solid #ff00ff",
            borderRight: "2px solid #ff00ff",
          }}
        />

        {Array.from({ length: 6 }).map((_, index) => (
          <React.Fragment key={index}>
            <AuthCodeInput
              index={index}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              style={{
                width: "56px",
                height: "72px",
                textAlign: "center",
                fontSize: "32px",
                fontWeight: 700,
                fontFamily: "'Courier New', monospace",
                border:
                  focusedIndex === index
                    ? "2px solid #00fff5"
                    : "2px solid rgba(0, 255, 245, 0.3)",
                borderRadius: "0",
                background:
                  focusedIndex === index
                    ? "rgba(0, 255, 245, 0.1)"
                    : "rgba(0, 0, 0, 0.5)",
                color: value[index] ? "#00fff5" : "rgba(0, 255, 245, 0.3)",
                outline: "none",
                transition: "all 0.15s ease",
                boxShadow:
                  focusedIndex === index
                    ? "0 0 20px rgba(0, 255, 245, 0.4), inset 0 0 20px rgba(0, 255, 245, 0.1)"
                    : "none",
                textShadow: value[index]
                  ? "0 0 10px rgba(0, 255, 245, 0.8)"
                  : "none",
              }}
            />
            {index === 2 && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#ff00ff",
                  fontSize: "24px",
                  fontFamily: "'Courier New', monospace",
                  textShadow: "0 0 10px rgba(255, 0, 255, 0.8)",
                  padding: "0 4px",
                }}
              >
                —
              </span>
            )}
          </React.Fragment>
        ))}
      </AuthCodeGroup>

      <div style={{ display: "flex", gap: "16px", zIndex: 1 }}>
        <button
          onClick={handleClear}
          style={{
            padding: "14px 28px",
            border: "1px solid rgba(255, 0, 255, 0.5)",
            borderRadius: "0",
            background: "transparent",
            color: "#ff00ff",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "'Courier New', monospace",
            letterSpacing: "2px",
            textTransform: "uppercase",
            transition: "all 0.2s ease",
            textShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
          }}
        >
          [RESET]
        </button>
        <button
          disabled={!complete}
          style={{
            padding: "14px 28px",
            border: complete
              ? "1px solid #00fff5"
              : "1px solid rgba(0, 255, 245, 0.3)",
            borderRadius: "0",
            background: complete ? "rgba(0, 255, 245, 0.1)" : "transparent",
            color: complete ? "#00fff5" : "rgba(0, 255, 245, 0.3)",
            cursor: complete ? "pointer" : "not-allowed",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "'Courier New', monospace",
            letterSpacing: "2px",
            textTransform: "uppercase",
            transition: "all 0.2s ease",
            textShadow: complete ? "0 0 10px rgba(0, 255, 245, 0.5)" : "none",
            boxShadow: complete ? "0 0 20px rgba(0, 255, 245, 0.3)" : "none",
          }}
        >
          [EXECUTE]
        </button>
      </div>

      {complete && (
        <div
          style={{
            color: "#00ff00",
            fontSize: "14px",
            fontFamily: "'Courier New', monospace",
            textShadow: "0 0 10px rgba(0, 255, 0, 0.8)",
            letterSpacing: "2px",
            zIndex: 1,
          }}
        >
          {">"} SEQUENCE VALIDATED: {value}
        </div>
      )}
    </div>
  );
};
