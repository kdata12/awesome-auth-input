import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useRef } from "react";
import { AuthCode } from "../src";
import "./AuthCode.css";

const meta: Meta<typeof AuthCode.Group> = {
  title: "AuthCode/Designs",
  component: AuthCode.Group,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Creative and visually striking design variations for the AuthCode component, showcasing different aesthetic styles and themes.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthCode.Group>;

/**
 * Neon Cyberpunk Design
 * Dark background with neon glow effects, vibrant accent colors
 */
export const NeonCyberpunk: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: function NeonCyberpunkStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
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
          minWidth: "600px",
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

        <AuthCode.Group
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
              <AuthCode.Input
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
        </AuthCode.Group>

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
  },
};

/**
 * Minimal Brutalist Design
 * Bold, chunky borders, high contrast, underline-only inputs with large typography
 */
export const Brutalist: Story = {
  render: function BrutalistStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 4);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          padding: "64px 48px",
          background: "#FFFEF0",
          border: "4px solid #000",
          boxShadow: "8px 8px 0 #000",
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              margin: "0 0 12px 0",
              color: "#000",
              fontSize: "32px",
              fontWeight: 900,
              fontFamily: "'Arial Black', 'Helvetica Bold', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "-1px",
            }}
          >
            PIN Code
          </h3>
          <p
            style={{
              margin: 0,
              color: "#666",
              fontSize: "14px",
              fontFamily: "'Courier New', monospace",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            4 digits required
          </p>
        </div>

        <AuthCode.Group
          ref={groupRef}
          value={value}
          onValueChange={handleValueChange}
          autoSubmit={false}
          style={{ display: "flex", gap: "24px" }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AuthCode.Input
                index={index}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                style={{
                  width: "80px",
                  height: "100px",
                  textAlign: "center",
                  fontSize: "64px",
                  fontWeight: 900,
                  fontFamily: "'Arial Black', 'Helvetica Bold', sans-serif",
                  border: "none",
                  borderBottom:
                    focusedIndex === index
                      ? "8px solid #000"
                      : "4px solid #000",
                  background: "transparent",
                  color: "#000",
                  outline: "none",
                  transition: "border-width 0.1s ease",
                  caretColor: "#000",
                }}
              />
              <span
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  fontFamily: "'Courier New', monospace",
                  color: value[index] ? "#000" : "#ccc",
                  fontWeight: 700,
                }}
              >
                {index + 1}
              </span>
            </div>
          ))}
        </AuthCode.Group>

        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={handleClear}
            className="brutalist-button"
            style={{
              padding: "16px 32px",
              border: "3px solid #000",
              background: "#fff",
              color: "#000",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 900,
              fontFamily: "'Arial Black', 'Helvetica Bold', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
              boxShadow: "4px 4px 0 #000",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(2px, 2px)";
              e.currentTarget.style.boxShadow = "2px 2px 0 #000";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "4px 4px 0 #000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "4px 4px 0 #000";
            }}
          >
            Clear
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "16px 32px",
              border: "3px solid #000",
              background: complete ? "#000" : "#ccc",
              color: complete ? "#FFFEF0" : "#888",
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "14px",
              fontWeight: 900,
              fontFamily: "'Arial Black', 'Helvetica Bold', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
              boxShadow: complete ? "4px 4px 0 #666" : "none",
            }}
            onMouseDown={(e) => {
              if (complete) {
                e.currentTarget.style.transform = "translate(2px, 2px)";
                e.currentTarget.style.boxShadow = "2px 2px 0 #666";
              }
            }}
            onMouseUp={(e) => {
              if (complete) {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "4px 4px 0 #666";
              }
            }}
            onMouseLeave={(e) => {
              if (complete) {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "4px 4px 0 #666";
              }
            }}
          >
            Submit →
          </button>
        </div>

        {complete && (
          <div
            style={{
              padding: "12px 24px",
              background: "#000",
              color: "#FFFEF0",
              fontSize: "18px",
              fontWeight: 900,
              fontFamily: "'Courier New', monospace",
              letterSpacing: "4px",
            }}
          >
            CODE: {value}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Retro Terminal / CRT Monitor Design
 * Nostalgic green phosphor display with scanlines, glow effects, and terminal aesthetic
 */
export const RetroTerminal: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: function RetroTerminalStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          padding: "48px 64px",
          background:
            "linear-gradient(180deg, #0a120a 0%, #061206 50%, #020502 100%)",
          borderRadius: "32px",
          position: "relative",
          overflow: "hidden",
          minWidth: "580px",
          border: "12px solid #1a1a1a",
          boxShadow: `
            inset 0 0 100px rgba(0, 255, 65, 0.03),
            inset 0 0 50px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(0, 0, 0, 0.8)
          `,
        }}
      >
        {/* Scanline overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.15) 2px,
              rgba(0, 0, 0, 0.15) 4px
            )`,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
        {/* Screen flicker effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        <div style={{ textAlign: "center", zIndex: 1 }}>
          <div
            style={{
              color: "#00ff41",
              fontSize: "12px",
              fontFamily: "'VT323', 'Courier New', monospace",
              letterSpacing: "3px",
              marginBottom: "8px",
              textShadow:
                "0 0 10px rgba(0, 255, 65, 0.8), 0 0 20px rgba(0, 255, 65, 0.4)",
              opacity: 0.7,
            }}
          >
            ████████████████████████████████
          </div>
          <h3
            style={{
              margin: "0 0 8px 0",
              color: "#00ff41",
              fontSize: "20px",
              fontWeight: 400,
              fontFamily: "'VT323', 'Courier New', monospace",
              textShadow:
                "0 0 10px rgba(0, 255, 65, 0.8), 0 0 30px rgba(0, 255, 65, 0.5)",
              letterSpacing: "4px",
            }}
          >
            ENTER ACCESS CODE
          </h3>
          <p
            style={{
              margin: 0,
              color: "#00ff41",
              fontSize: "14px",
              fontFamily: "'VT323', 'Courier New', monospace",
              textShadow: "0 0 8px rgba(0, 255, 65, 0.6)",
              opacity: 0.7,
              letterSpacing: "2px",
            }}
          >
            {">"} AWAITING INPUT...
          </p>
        </div>

        <AuthCode.Group
          ref={groupRef}
          value={value}
          onValueChange={handleValueChange}
          autoSubmit={false}
          style={{
            display: "flex",
            gap: "12px",
            padding: "20px 24px",
            background: "rgba(0, 255, 65, 0.02)",
            border: "1px solid rgba(0, 255, 65, 0.2)",
            borderRadius: "4px",
            zIndex: 1,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} style={{ position: "relative" }}>
              <AuthCode.Input
                index={index}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                style={{
                  width: "48px",
                  height: "64px",
                  textAlign: "center",
                  fontSize: "36px",
                  fontWeight: 400,
                  fontFamily: "'VT323', 'Courier New', monospace",
                  border: "2px solid rgba(0, 255, 65, 0.4)",
                  borderRadius: "2px",
                  background: "rgba(0, 20, 0, 0.8)",
                  color: "#00ff41",
                  outline: "none",
                  transition: "all 0.1s ease",
                  textShadow: value[index]
                    ? "0 0 10px rgba(0, 255, 65, 1), 0 0 20px rgba(0, 255, 65, 0.8), 0 0 30px rgba(0, 255, 65, 0.6)"
                    : "none",
                  boxShadow:
                    focusedIndex === index
                      ? "0 0 15px rgba(0, 255, 65, 0.5), inset 0 0 20px rgba(0, 255, 65, 0.1)"
                      : "inset 0 0 10px rgba(0, 0, 0, 0.5)",
                  caretColor: "#00ff41",
                }}
              />
              {/* Blinking cursor for focused empty input */}
              {focusedIndex === index && !value[index] && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "24px",
                    height: "4px",
                    background: "#00ff41",
                    boxShadow: "0 0 10px rgba(0, 255, 65, 0.8)",
                    animation: "blink 1s step-end infinite",
                  }}
                />
              )}
            </div>
          ))}
        </AuthCode.Group>

        <style>
          {`
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `}
        </style>

        <div style={{ display: "flex", gap: "16px", zIndex: 1 }}>
          <button
            onClick={handleClear}
            style={{
              padding: "12px 24px",
              border: "2px solid rgba(0, 255, 65, 0.5)",
              borderRadius: "2px",
              background: "rgba(0, 255, 65, 0.05)",
              color: "#00ff41",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 400,
              fontFamily: "'VT323', 'Courier New', monospace",
              letterSpacing: "2px",
              textShadow: "0 0 8px rgba(0, 255, 65, 0.6)",
              transition: "all 0.15s ease",
            }}
          >
            [CLEAR]
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "12px 24px",
              border: complete
                ? "2px solid #00ff41"
                : "2px solid rgba(0, 255, 65, 0.3)",
              borderRadius: "2px",
              background: complete ? "rgba(0, 255, 65, 0.15)" : "transparent",
              color: complete ? "#00ff41" : "rgba(0, 255, 65, 0.3)",
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "14px",
              fontWeight: 400,
              fontFamily: "'VT323', 'Courier New', monospace",
              letterSpacing: "2px",
              textShadow: complete ? "0 0 10px rgba(0, 255, 65, 0.8)" : "none",
              boxShadow: complete ? "0 0 20px rgba(0, 255, 65, 0.3)" : "none",
              transition: "all 0.15s ease",
            }}
          >
            [SUBMIT]
          </button>
        </div>

        {complete && (
          <div
            style={{
              color: "#00ff41",
              fontSize: "16px",
              fontFamily: "'VT323', 'Courier New', monospace",
              textShadow: "0 0 10px rgba(0, 255, 65, 0.8)",
              letterSpacing: "3px",
              zIndex: 1,
              padding: "12px 20px",
              background: "rgba(0, 255, 65, 0.05)",
              border: "1px solid rgba(0, 255, 65, 0.3)",
            }}
          >
            {">"} ACCESS GRANTED: {value}
          </div>
        )}

        <div
          style={{
            color: "#00ff41",
            fontSize: "12px",
            fontFamily: "'VT323', 'Courier New', monospace",
            letterSpacing: "3px",
            opacity: 0.5,
            textShadow: "0 0 8px rgba(0, 255, 65, 0.4)",
            zIndex: 1,
          }}
        >
          ████████████████████████████████
        </div>
      </div>
    );
  },
};

/**
 * Neumorphism / Soft UI Design
 * Modern soft extruded design with subtle shadows creating a "clay-like" plastic feel
 */
export const Neumorphism: Story = {
  render: function NeumorphismStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const bgColor = "#e0e5ec";
    const shadowLight = "#ffffff";
    const shadowDark = "#a3b1c6";
    const accentColor = "#6d5dfc";

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          padding: "48px 56px",
          background: bgColor,
          borderRadius: "40px",
          boxShadow: `
            20px 20px 60px ${shadowDark},
            -20px -20px 60px ${shadowLight}
          `,
          minWidth: "520px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              margin: "0 0 8px 0",
              color: "#566074",
              fontSize: "22px",
              fontWeight: 600,
              fontFamily:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            Verification Code
          </h3>
          <p
            style={{
              margin: 0,
              color: "#8a94a6",
              fontSize: "14px",
              fontFamily:
                "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Enter the 6-digit code we sent you
          </p>
        </div>

        <AuthCode.Group
          ref={groupRef}
          value={value}
          onValueChange={handleValueChange}
          autoSubmit={false}
          style={{
            display: "flex",
            gap: "14px",
            padding: "24px 28px",
            background: bgColor,
            borderRadius: "24px",
            boxShadow: `
              inset 8px 8px 16px ${shadowDark},
              inset -8px -8px 16px ${shadowLight}
            `,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <AuthCode.Input
              key={index}
              index={index}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              style={{
                width: "52px",
                height: "64px",
                textAlign: "center",
                fontSize: "28px",
                fontWeight: 600,
                fontFamily:
                  "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                border: "none",
                borderRadius: "16px",
                background: bgColor,
                color: focusedIndex === index ? accentColor : "#566074",
                outline: "none",
                transition: "all 0.2s ease",
                boxShadow:
                  focusedIndex === index
                    ? `inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`
                    : `6px 6px 12px ${shadowDark}, -6px -6px 12px ${shadowLight}`,
                caretColor: accentColor,
              }}
            />
          ))}
        </AuthCode.Group>

        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={handleClear}
            style={{
              padding: "14px 28px",
              border: "none",
              borderRadius: "14px",
              background: bgColor,
              color: "#8a94a6",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily:
                "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              transition: "all 0.2s ease",
              boxShadow: `6px 6px 12px ${shadowDark}, -6px -6px 12px ${shadowLight}`,
            }}
          >
            Clear
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "14px 32px",
              border: "none",
              borderRadius: "14px",
              background: complete
                ? `linear-gradient(145deg, #7c6cff, #5e4ee6)`
                : bgColor,
              color: complete ? "#ffffff" : "#b0b8c6",
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily:
                "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              transition: "all 0.2s ease",
              boxShadow: complete
                ? `6px 6px 12px ${shadowDark}, -6px -6px 12px ${shadowLight}, inset 0 0 0 rgba(0,0,0,0)`
                : `inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`,
            }}
          >
            Verify
          </button>
        </div>

        {complete && (
          <div
            style={{
              padding: "14px 24px",
              background: bgColor,
              borderRadius: "14px",
              boxShadow: `
                inset 4px 4px 8px ${shadowDark},
                inset -4px -4px 8px ${shadowLight}
              `,
              color: "#4ade80",
              fontSize: "15px",
              fontWeight: 600,
              fontFamily:
                "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 8px rgba(74, 222, 128, 0.6)",
              }}
            />
            Verified: {value}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Split-Flap Display / Mechanical Board Design
 * Airport/train station departure board aesthetic with 3D flap cards
 */
export const SplitFlapDisplay: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: function SplitFlapStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          padding: "40px 48px",
          background: "linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%)",
          borderRadius: "8px",
          border: "4px solid #3d3d3d",
          boxShadow: `
            inset 0 2px 0 rgba(255,255,255,0.1),
            0 10px 40px rgba(0,0,0,0.5)
          `,
          minWidth: "600px",
        }}
      >
        {/* Header panel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "12px 24px",
            background: "linear-gradient(180deg, #1f1f1f 0%, #141414 100%)",
            borderRadius: "4px",
            border: "2px solid #3d3d3d",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {/* Status LED */}
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: complete
                ? "radial-gradient(circle at 30% 30%, #4ade80, #16a34a)"
                : "radial-gradient(circle at 30% 30%, #fbbf24, #d97706)",
              boxShadow: complete
                ? "0 0 10px rgba(74, 222, 128, 0.6)"
                : "0 0 10px rgba(251, 191, 36, 0.6)",
              border: "1px solid rgba(0,0,0,0.3)",
            }}
          />
          <span
            style={{
              color: "#fbbf24",
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: "'Roboto Condensed', 'Arial Narrow', sans-serif",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            {complete ? "Code Accepted" : "Enter Boarding Code"}
          </span>
        </div>

        {/* Main display housing */}
        <div
          style={{
            background: "linear-gradient(180deg, #0f0f0f 0%, #000000 100%)",
            padding: "20px 24px",
            borderRadius: "4px",
            border: "3px solid #2a2a2a",
            boxShadow: `
              inset 0 0 30px rgba(0,0,0,0.8),
              0 4px 20px rgba(0,0,0,0.4)
            `,
          }}
        >
          <AuthCode.Group
            ref={groupRef}
            value={value}
            onValueChange={handleValueChange}
            autoSubmit={false}
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <React.Fragment key={index}>
                <div
                  style={{
                    position: "relative",
                    perspective: "200px",
                  }}
                >
                  {/* Flap card container */}
                  <div
                    style={{
                      position: "relative",
                      width: "56px",
                      height: "76px",
                      background:
                        "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 49%, #0a0a0a 51%, #141414 100%)",
                      borderRadius: "4px",
                      border: "2px solid #2a2a2a",
                      boxShadow: `
                        inset 0 1px 0 rgba(255,255,255,0.05),
                        0 4px 8px rgba(0,0,0,0.4)
                      `,
                      overflow: "hidden",
                    }}
                  >
                    {/* Split line */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        right: 0,
                        height: "2px",
                        background:
                          "linear-gradient(90deg, #0a0a0a, #1a1a1a, #0a0a0a)",
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
                      }}
                    />
                    {/* Left hinge */}
                    <div
                      style={{
                        position: "absolute",
                        left: "-3px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "6px",
                        height: "10px",
                        background: "linear-gradient(90deg, #3d3d3d, #2a2a2a)",
                        borderRadius: "2px",
                        zIndex: 3,
                      }}
                    />
                    {/* Right hinge */}
                    <div
                      style={{
                        position: "absolute",
                        right: "-3px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "6px",
                        height: "10px",
                        background: "linear-gradient(90deg, #2a2a2a, #3d3d3d)",
                        borderRadius: "2px",
                        zIndex: 3,
                      }}
                    />
                    <AuthCode.Input
                      index={index}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => setFocusedIndex(null)}
                      style={{
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: 700,
                        fontFamily: "'Roboto Mono', 'Courier New', monospace",
                        border: "none",
                        background: "transparent",
                        color: "#fbbf24",
                        outline: "none",
                        caretColor: "#fbbf24",
                        textShadow: value[index]
                          ? "0 0 10px rgba(251, 191, 36, 0.4)"
                          : "none",
                        position: "relative",
                        zIndex: 1,
                      }}
                    />
                  </div>
                  {/* Focus indicator */}
                  {focusedIndex === index && (
                    <div
                      style={{
                        position: "absolute",
                        inset: "-4px",
                        border: "2px solid #fbbf24",
                        borderRadius: "6px",
                        boxShadow: "0 0 15px rgba(251, 191, 36, 0.3)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
                {/* Separator after third digit */}
                {index === 2 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0 4px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        background:
                          "radial-gradient(circle at 30% 30%, #4a4a4a, #2a2a2a)",
                        borderRadius: "50%",
                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </AuthCode.Group>
        </div>

        {/* Control buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            padding: "16px 24px",
            background: "linear-gradient(180deg, #1f1f1f 0%, #141414 100%)",
            borderRadius: "4px",
            border: "2px solid #3d3d3d",
          }}
        >
          <button
            onClick={handleClear}
            style={{
              padding: "12px 24px",
              border: "2px solid #4a4a4a",
              borderRadius: "4px",
              background: "linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%)",
              color: "#999",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: "'Roboto Condensed', 'Arial Narrow', sans-serif",
              letterSpacing: "2px",
              textTransform: "uppercase",
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              transition: "all 0.15s ease",
            }}
          >
            Reset
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "12px 32px",
              border: complete ? "2px solid #16a34a" : "2px solid #4a4a4a",
              borderRadius: "4px",
              background: complete
                ? "linear-gradient(180deg, #16a34a 0%, #15803d 100%)"
                : "linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%)",
              color: complete ? "#fff" : "#666",
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: "'Roboto Condensed', 'Arial Narrow', sans-serif",
              letterSpacing: "2px",
              textTransform: "uppercase",
              boxShadow: complete
                ? "0 2px 10px rgba(22, 163, 74, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
                : "inset 0 2px 4px rgba(0,0,0,0.3)",
              transition: "all 0.15s ease",
            }}
          >
            Confirm
          </button>
        </div>

        {/* Completion display */}
        {complete && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 20px",
              background: "linear-gradient(180deg, #0f0f0f 0%, #000000 100%)",
              border: "2px solid #16a34a",
              borderRadius: "4px",
              boxShadow: "0 0 20px rgba(22, 163, 74, 0.2)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 8px rgba(74, 222, 128, 0.8)",
              }}
            />
            <span
              style={{
                color: "#4ade80",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "'Roboto Mono', monospace",
                letterSpacing: "4px",
              }}
            >
              GATE: {value}
            </span>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Brag Book / Fresh Mint Design
 * Clean, modern aesthetic with mint green tones, serif italic typography, and gold sparkle accents
 */
export const BragBook: Story = {
  render: function BragBookStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const mintBg = "#b8d8d0";
    const darkTeal = "#2d4a47";
    const sageTeal = "#4a7c6f";
    const gold = "#d4a853";
    const cream = "#fefefe";

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    const Sparkle = ({ style }: { style?: React.CSSProperties }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={style}>
        <path
          d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z"
          fill={gold}
        />
      </svg>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          padding: "56px 64px",
          background: mintBg,
          borderRadius: "24px",
          minWidth: "540px",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Sparkle style={{ width: "20px", height: "20px" }} />
            <span
              style={{
                color: sageTeal,
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Verification
            </span>
            <Sparkle style={{ width: "20px", height: "20px" }} />
          </div>
          <h3
            style={{
              margin: "0",
              color: darkTeal,
              fontSize: "28px",
              fontWeight: 400,
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontStyle: "italic",
            }}
          >
            Let's hear you{" "}
            <span style={{ color: sageTeal, fontWeight: 600 }}>BRAG</span>
          </h3>
        </div>

        {/* Card container */}
        <div
          style={{
            background: cream,
            borderRadius: "20px",
            padding: "36px 40px",
            boxShadow: "0 4px 24px rgba(45, 74, 71, 0.08)",
          }}
        >
          <p
            style={{
              margin: "0 0 24px 0",
              color: "#6b8f87",
              fontSize: "15px",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              textAlign: "center",
            }}
          >
            Enter your 6-digit verification code
          </p>

          <AuthCode.Group
            ref={groupRef}
            value={value}
            onValueChange={handleValueChange}
            autoSubmit={false}
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <React.Fragment key={index}>
                <AuthCode.Input
                  index={index}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  style={{
                    width: "52px",
                    height: "60px",
                    textAlign: "center",
                    fontSize: "26px",
                    fontWeight: 500,
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    border:
                      focusedIndex === index
                        ? `2px solid ${sageTeal}`
                        : "2px solid #d4e4e0",
                    borderRadius: "12px",
                    background: focusedIndex === index ? "#f0f7f5" : "#f8fafa",
                    color: darkTeal,
                    outline: "none",
                    transition: "all 0.2s ease",
                    boxShadow:
                      focusedIndex === index
                        ? `0 0 0 3px rgba(74, 124, 111, 0.15)`
                        : "none",
                    caretColor: sageTeal,
                  }}
                />
                {index === 2 && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#c4d4d0",
                      fontSize: "24px",
                      fontWeight: 300,
                      padding: "0 4px",
                    }}
                  >
                    –
                  </span>
                )}
              </React.Fragment>
            ))}
          </AuthCode.Group>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handleClear}
            style={{
              padding: "14px 28px",
              border: `1.5px solid ${darkTeal}`,
              borderRadius: "10px",
              background: cream,
              color: darkTeal,
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              transition: "all 0.2s ease",
            }}
          >
            Clear
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "14px 36px",
              border: "none",
              borderRadius: "10px",
              background: complete ? darkTeal : "#8faba6",
              color: cream,
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              transition: "all 0.2s ease",
              boxShadow: complete
                ? "0 4px 12px rgba(45, 74, 71, 0.25)"
                : "none",
            }}
          >
            Verify Code
          </button>
        </div>

        {/* Success state */}
        {complete && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 24px",
              background: cream,
              borderRadius: "12px",
              boxShadow: "0 2px 12px rgba(45, 74, 71, 0.1)",
            }}
          >
            <Sparkle style={{ width: "18px", height: "18px" }} />
            <span
              style={{
                color: darkTeal,
                fontSize: "15px",
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontStyle: "italic",
              }}
            >
              Verified:{" "}
              <span
                style={{
                  fontWeight: 600,
                  fontStyle: "normal",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  letterSpacing: "2px",
                }}
              >
                {value}
              </span>
            </span>
            <Sparkle style={{ width: "18px", height: "18px" }} />
          </div>
        )}

        {/* Decorative footer text */}
        <p
          style={{
            margin: 0,
            color: sageTeal,
            fontSize: "13px",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            opacity: 0.7,
          }}
        >
          Celebrate your wins ✨
        </p>
      </div>
    );
  },
};

/**
 * Stranger Things Theme
 * 80s horror aesthetic with flickering lights, red neon glow, and Upside Down vibes
 */
export const StrangerThings: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: function StrangerThingsStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    // Christmas light colors
    const lightColors = ["#ff0000", "#ffff00", "#00ff00", "#0088ff", "#ff00ff"];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          padding: "48px 56px",
          background:
            "linear-gradient(180deg, #0a0a0a 0%, #1a0a0a 50%, #0a0808 100%)",
          borderRadius: "0",
          position: "relative",
          overflow: "hidden",
          minWidth: "580px",
          border: "4px solid #2a1515",
        }}
      >
        {/* Flickering overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)",
            pointerEvents: "none",
            animation: "flicker 4s infinite",
          }}
        />

        {/* Christmas lights wire */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            right: "20px",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "12px",
                height: "16px",
                background: lightColors[i % lightColors.length],
                borderRadius: "0 0 6px 6px",
                boxShadow: `0 0 15px ${
                  lightColors[i % lightColors.length]
                }, 0 0 30px ${lightColors[i % lightColors.length]}`,
                animation: `bulbFlicker ${1.5 + i * 0.2}s infinite`,
                opacity: 0.9,
              }}
            />
          ))}
        </div>

        <style>
          {`
            @keyframes flicker {
              0%, 100% { opacity: 1; }
              41% { opacity: 1; }
              42% { opacity: 0.8; }
              43% { opacity: 1; }
              45% { opacity: 0.7; }
              46% { opacity: 1; }
            }
            @keyframes bulbFlicker {
              0%, 100% { opacity: 0.9; }
              50% { opacity: 0.4; }
              52% { opacity: 0.9; }
              54% { opacity: 0.5; }
              56% { opacity: 0.9; }
            }
            @keyframes textGlow {
              0%, 100% { text-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 60px #ff0000; }
              50% { text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000; }
            }
          `}
        </style>

        <div style={{ textAlign: "center", zIndex: 1, marginTop: "24px" }}>
          <h3
            style={{
              margin: "0 0 8px 0",
              color: "#ff0000",
              fontSize: "32px",
              fontWeight: 400,
              fontFamily: "'ITC Benguiat', 'Times New Roman', serif",
              letterSpacing: "6px",
              textTransform: "uppercase",
              textShadow:
                "0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 60px #ff0000, 0 0 80px #ff3333",
              animation: "textGlow 3s infinite",
            }}
          >
            The Code
          </h3>
          <p
            style={{
              margin: 0,
              color: "#cc4444",
              fontSize: "13px",
              fontFamily: "'Courier New', monospace",
              letterSpacing: "3px",
              textTransform: "uppercase",
              opacity: 0.8,
            }}
          >
            Enter the Upside Down
          </p>
        </div>

        <AuthCode.Group
          ref={groupRef}
          value={value}
          onValueChange={handleValueChange}
          autoSubmit={false}
          style={{
            display: "flex",
            gap: "16px",
            padding: "28px 32px",
            background: "rgba(20, 5, 5, 0.8)",
            border: "2px solid #3a1515",
            zIndex: 1,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              style={{
                position: "relative",
              }}
            >
              <AuthCode.Input
                index={index}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                style={{
                  width: "52px",
                  height: "68px",
                  textAlign: "center",
                  fontSize: "36px",
                  fontWeight: 400,
                  fontFamily: "'ITC Benguiat', 'Times New Roman', serif",
                  border:
                    focusedIndex === index
                      ? "2px solid #ff0000"
                      : "2px solid #4a2020",
                  borderRadius: "0",
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "#ff0000",
                  outline: "none",
                  transition: "all 0.2s ease",
                  textShadow: value[index]
                    ? "0 0 10px #ff0000, 0 0 20px #ff0000"
                    : "none",
                  boxShadow:
                    focusedIndex === index
                      ? "0 0 20px rgba(255, 0, 0, 0.4), inset 0 0 15px rgba(255, 0, 0, 0.1)"
                      : "inset 0 0 10px rgba(0, 0, 0, 0.5)",
                  caretColor: "#ff0000",
                }}
              />
              {/* Light bulb above each input */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "8px",
                  height: "10px",
                  background: value[index]
                    ? lightColors[index % lightColors.length]
                    : "#333",
                  borderRadius: "0 0 4px 4px",
                  boxShadow: value[index]
                    ? `0 0 10px ${
                        lightColors[index % lightColors.length]
                      }, 0 0 20px ${lightColors[index % lightColors.length]}`
                    : "none",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
          ))}
        </AuthCode.Group>

        <div style={{ display: "flex", gap: "16px", zIndex: 1 }}>
          <button
            onClick={handleClear}
            style={{
              padding: "14px 28px",
              border: "2px solid #4a2020",
              borderRadius: "0",
              background: "rgba(20, 5, 5, 0.8)",
              color: "#cc4444",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 400,
              fontFamily: "'Courier New', monospace",
              letterSpacing: "2px",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}
          >
            Clear
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "14px 28px",
              border: complete ? "2px solid #ff0000" : "2px solid #4a2020",
              borderRadius: "0",
              background: complete
                ? "rgba(255, 0, 0, 0.15)"
                : "rgba(20, 5, 5, 0.8)",
              color: complete ? "#ff0000" : "#4a2020",
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "13px",
              fontWeight: 400,
              fontFamily: "'Courier New', monospace",
              letterSpacing: "2px",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
              textShadow: complete ? "0 0 10px #ff0000" : "none",
              boxShadow: complete ? "0 0 20px rgba(255, 0, 0, 0.3)" : "none",
            }}
          >
            Enter
          </button>
        </div>

        {complete && (
          <div
            style={{
              color: "#ff0000",
              fontSize: "16px",
              fontFamily: "'ITC Benguiat', 'Times New Roman', serif",
              letterSpacing: "4px",
              textTransform: "uppercase",
              textShadow: "0 0 15px #ff0000, 0 0 30px #ff0000",
              zIndex: 1,
              padding: "12px 24px",
              background: "rgba(255, 0, 0, 0.1)",
              border: "1px solid #ff0000",
            }}
          >
            The Gate Opens: {value}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Windows 98 Theme
 * Classic Windows 98 UI with gray 3D borders, blue title bar, and chunky beveled buttons
 */
export const Windows98: Story = {
  render: function Windows98Story() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    const win98Gray = "#c0c0c0";
    const win98DarkGray = "#808080";
    const win98LightGray = "#dfdfdf";
    const win98Blue = "#000080";
    const win98ActiveBlue = "#0a246a";

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: win98Gray,
          border: `2px solid`,
          borderColor: `${win98LightGray} ${win98DarkGray} ${win98DarkGray} ${win98LightGray}`,
          boxShadow: `
            inset 1px 1px 0 #fff,
            inset -1px -1px 0 #000
          `,
          minWidth: "420px",
          fontFamily: "'MS Sans Serif', 'Segoe UI', Tahoma, sans-serif",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: `linear-gradient(90deg, ${win98ActiveBlue} 0%, ${win98Blue} 100%)`,
            padding: "3px 4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {/* Window icon */}
            <div
              style={{
                width: "16px",
                height: "16px",
                background: "#c0c0c0",
                border: "1px solid #808080",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
              }}
            >
              🔐
            </div>
            <span
              style={{
                color: "#fff",
                fontSize: "11px",
                fontWeight: 700,
                fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
              }}
            >
              Enter Security Code
            </span>
          </div>
          <div style={{ display: "flex", gap: "2px" }}>
            {/* Window buttons */}
            {["_", "□", "×"].map((btn, i) => (
              <button
                key={i}
                style={{
                  width: "16px",
                  height: "14px",
                  background: win98Gray,
                  border: `1px solid`,
                  borderColor: `${win98LightGray} ${win98DarkGray} ${win98DarkGray} ${win98LightGray}`,
                  fontSize: "9px",
                  fontWeight: 700,
                  fontFamily: "Marlett, sans-serif",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Info section */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            {/* Key icon */}
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "#ffff00",
                border: "2px solid #808000",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                flexShrink: 0,
              }}
            >
              🔑
            </div>
            <div>
              <p
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "11px",
                  color: "#000",
                }}
              >
                Please enter your 6-digit security code to continue.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "11px",
                  color: "#000",
                }}
              >
                This code was sent to your registered device.
              </p>
            </div>
          </div>

          {/* Input group */}
          <div
            style={{
              background: "#fff",
              border: `2px solid`,
              borderColor: `${win98DarkGray} ${win98LightGray} ${win98LightGray} ${win98DarkGray}`,
              padding: "12px",
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "11px",
                color: "#000",
              }}
            >
              Security Code:
            </p>
            <AuthCode.Group
              ref={groupRef}
              value={value}
              onValueChange={handleValueChange}
              autoSubmit={false}
              style={{
                display: "flex",
                gap: "6px",
              }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <AuthCode.Input
                  key={index}
                  index={index}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  style={{
                    width: "36px",
                    height: "24px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: 400,
                    fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                    border: `2px solid`,
                    borderColor:
                      focusedIndex === index
                        ? `${win98DarkGray} ${win98LightGray} ${win98LightGray} ${win98DarkGray}`
                        : `${win98DarkGray} ${win98LightGray} ${win98LightGray} ${win98DarkGray}`,
                    background: "#fff",
                    color: "#000",
                    outline:
                      focusedIndex === index ? "1px dotted #000" : "none",
                    outlineOffset: "-4px",
                  }}
                />
              ))}
            </AuthCode.Group>
          </div>

          {/* Status bar simulation */}
          {complete && (
            <div
              style={{
                background: "#ffffcc",
                border: "1px solid #808000",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "14px" }}>✓</span>
              <span style={{ fontSize: "11px", color: "#000" }}>
                Code accepted: {value}
              </span>
            </div>
          )}

          {/* Button row */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "6px",
            }}
          >
            <button
              onClick={handleClear}
              style={{
                minWidth: "75px",
                padding: "4px 12px",
                background: win98Gray,
                border: `2px solid`,
                borderColor: `${win98LightGray} ${win98DarkGray} ${win98DarkGray} ${win98LightGray}`,
                fontSize: "11px",
                fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                cursor: "pointer",
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderColor = `${win98DarkGray} ${win98LightGray} ${win98LightGray} ${win98DarkGray}`;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderColor = `${win98LightGray} ${win98DarkGray} ${win98DarkGray} ${win98LightGray}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${win98LightGray} ${win98DarkGray} ${win98DarkGray} ${win98LightGray}`;
              }}
            >
              Clear
            </button>
            <button
              disabled={!complete}
              style={{
                minWidth: "75px",
                padding: "4px 12px",
                background: win98Gray,
                border: `2px solid`,
                borderColor: complete
                  ? `${win98LightGray} ${win98DarkGray} ${win98DarkGray} ${win98LightGray}`
                  : `${win98Gray} ${win98Gray} ${win98Gray} ${win98Gray}`,
                fontSize: "11px",
                fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                cursor: complete ? "pointer" : "not-allowed",
                color: complete ? "#000" : "#808080",
              }}
            >
              OK
            </button>
            <button
              style={{
                minWidth: "75px",
                padding: "4px 12px",
                background: win98Gray,
                border: `2px solid`,
                borderColor: `${win98LightGray} ${win98DarkGray} ${win98DarkGray} ${win98LightGray}`,
                fontSize: "11px",
                fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div
          style={{
            background: win98Gray,
            borderTop: `1px solid ${win98DarkGray}`,
            padding: "2px 4px",
            fontSize: "11px",
            color: "#000",
            display: "flex",
            gap: "8px",
          }}
        >
          <span
            style={{
              flex: 1,
              border: `1px solid`,
              borderColor: `${win98DarkGray} ${win98LightGray} ${win98LightGray} ${win98DarkGray}`,
              padding: "1px 4px",
            }}
          >
            {complete ? "Ready" : "Waiting for input..."}
          </span>
          <span
            style={{
              border: `1px solid`,
              borderColor: `${win98DarkGray} ${win98LightGray} ${win98LightGray} ${win98DarkGray}`,
              padding: "1px 8px",
            }}
          >
            {value.length}/6
          </span>
        </div>
      </div>
    );
  },
};

/**
 * Arcade / Retro Gaming Theme
 * 8-bit pixel art aesthetic with scanlines, neon colors, and arcade cabinet styling
 */
export const RetroArcade: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: function RetroArcadeStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 4);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          padding: "40px 48px",
          background: "linear-gradient(180deg, #1a0a2e 0%, #0f0518 100%)",
          borderRadius: "8px",
          position: "relative",
          overflow: "hidden",
          minWidth: "480px",
          border: "6px solid #2d1b4e",
          boxShadow:
            "0 0 40px rgba(138, 43, 226, 0.3), inset 0 0 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            )`,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* Stars background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(1px 1px at 20% 30%, #fff 1px, transparent 0),
              radial-gradient(1px 1px at 40% 70%, #fff 1px, transparent 0),
              radial-gradient(1px 1px at 60% 20%, #fff 1px, transparent 0),
              radial-gradient(1px 1px at 80% 60%, #fff 1px, transparent 0),
              radial-gradient(1px 1px at 10% 80%, #fff 1px, transparent 0),
              radial-gradient(1px 1px at 90% 40%, #fff 1px, transparent 0)
            `,
            opacity: 0.4,
          }}
        />

        <style>
          {`
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
            @keyframes rainbow {
              0% { color: #ff0000; text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000; }
              16% { color: #ff8800; text-shadow: 0 0 10px #ff8800, 0 0 20px #ff8800; }
              33% { color: #ffff00; text-shadow: 0 0 10px #ffff00, 0 0 20px #ffff00; }
              50% { color: #00ff00; text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00; }
              66% { color: #00ffff; text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff; }
              83% { color: #ff00ff; text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff; }
              100% { color: #ff0000; text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000; }
            }
          `}
        </style>

        {/* Header */}
        <div style={{ textAlign: "center", zIndex: 1 }}>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              color: "#ffff00",
              marginBottom: "8px",
              letterSpacing: "2px",
            }}
          >
            ★ HIGH SCORE: 999999 ★
          </div>
          <h3
            style={{
              margin: "0 0 8px 0",
              fontSize: "20px",
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              animation: "rainbow 3s linear infinite",
              letterSpacing: "2px",
            }}
          >
            ENTER CODE
          </h3>
          <div
            style={{
              fontSize: "10px",
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              color: "#00ffff",
              animation: "blink 1s step-end infinite",
            }}
          >
            INSERT COIN TO CONTINUE
          </div>
        </div>

        {/* Game screen border */}
        <div
          style={{
            background: "#000",
            padding: "16px 20px",
            border: "4px solid #4a2c7a",
            borderRadius: "4px",
            boxShadow: "inset 0 0 30px rgba(138, 43, 226, 0.2)",
            zIndex: 1,
          }}
        >
          <AuthCode.Group
            ref={groupRef}
            value={value}
            onValueChange={handleValueChange}
            autoSubmit={false}
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            {Array.from({ length: 4 }).map((_, index) => {
              const colors = ["#ff0000", "#ffff00", "#00ff00", "#00ffff"];
              const inputColor = colors[index];
              return (
                <div
                  key={index}
                  style={{
                    position: "relative",
                  }}
                >
                  <AuthCode.Input
                    index={index}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    style={{
                      width: "56px",
                      height: "72px",
                      textAlign: "center",
                      fontSize: "32px",
                      fontWeight: 400,
                      fontFamily: "'Press Start 2P', 'Courier New', monospace",
                      border: `3px solid ${
                        focusedIndex === index ? inputColor : "#4a2c7a"
                      }`,
                      borderRadius: "0",
                      background: "#0a0a1a",
                      color: inputColor,
                      outline: "none",
                      transition: "all 0.1s ease",
                      textShadow: value[index]
                        ? `0 0 10px ${inputColor}, 0 0 20px ${inputColor}`
                        : "none",
                      boxShadow:
                        focusedIndex === index
                          ? `0 0 15px ${inputColor}, inset 0 0 10px rgba(138, 43, 226, 0.2)`
                          : "inset 0 0 10px rgba(0, 0, 0, 0.5)",
                      caretColor: inputColor,
                      imageRendering: "pixelated",
                    }}
                  />
                  {/* Pixel corner decorations */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-2px",
                      left: "-2px",
                      width: "6px",
                      height: "6px",
                      background: inputColor,
                      opacity: value[index] ? 1 : 0.3,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-2px",
                      width: "6px",
                      height: "6px",
                      background: inputColor,
                      opacity: value[index] ? 1 : 0.3,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: "-2px",
                      width: "6px",
                      height: "6px",
                      background: inputColor,
                      opacity: value[index] ? 1 : 0.3,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      right: "-2px",
                      width: "6px",
                      height: "6px",
                      background: inputColor,
                      opacity: value[index] ? 1 : 0.3,
                    }}
                  />
                </div>
              );
            })}
          </AuthCode.Group>
        </div>

        {/* Lives/Credits display */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            fontSize: "10px",
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            color: "#fff",
            zIndex: 1,
          }}
        >
          <span>
            LIVES:{" "}
            <span style={{ color: "#ff0000" }}>
              {"♥".repeat(3 - Math.floor(value.length / 2))}
              {"♡".repeat(Math.floor(value.length / 2))}
            </span>
          </span>
          <span>
            CREDIT: <span style={{ color: "#ffff00" }}>{value.length}</span>/4
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "16px", zIndex: 1 }}>
          <button
            onClick={handleClear}
            style={{
              padding: "12px 20px",
              border: "3px solid #ff0000",
              borderRadius: "0",
              background: "#1a0a1a",
              color: "#ff0000",
              cursor: "pointer",
              fontSize: "10px",
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              textTransform: "uppercase",
              boxShadow: "0 4px 0 #800000",
              transition: "all 0.1s ease",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(2px)";
              e.currentTarget.style.boxShadow = "0 2px 0 #800000";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 0 #800000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 0 #800000";
            }}
          >
            RESET
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "12px 24px",
              border: `3px solid ${complete ? "#00ff00" : "#4a2c7a"}`,
              borderRadius: "0",
              background: complete ? "#0a1a0a" : "#1a0a1a",
              color: complete ? "#00ff00" : "#4a2c7a",
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "10px",
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              textTransform: "uppercase",
              boxShadow: complete ? "0 4px 0 #008000" : "none",
              textShadow: complete ? "0 0 10px #00ff00" : "none",
              transition: "all 0.1s ease",
            }}
          >
            START
          </button>
        </div>

        {/* Win message */}
        {complete && (
          <div
            style={{
              fontSize: "12px",
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              color: "#ffff00",
              textShadow: "0 0 10px #ffff00, 0 0 20px #ffff00",
              animation: "blink 0.5s step-end infinite",
              zIndex: 1,
              padding: "12px 20px",
              background: "rgba(0, 0, 0, 0.5)",
              border: "2px solid #ffff00",
            }}
          >
            ★ PLAYER 1 READY ★
            <br />
            <span style={{ fontSize: "10px", color: "#00ff00" }}>
              CODE: {value}
            </span>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Fallout / Pip-Boy Theme
 * Retro-futuristic terminal aesthetic with green phosphor CRT display and Vault-Tec styling
 */
export const Fallout: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: function FalloutStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const pipBoyGreen = "#14ff00";
    const pipBoyDarkGreen = "#0a8f00";
    const pipBoyBg = "#0a1a0a";

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          padding: "32px 40px",
          background: `linear-gradient(180deg, ${pipBoyBg} 0%, #051505 100%)`,
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
          minWidth: "520px",
          border: `4px solid ${pipBoyDarkGreen}`,
          boxShadow: `
            inset 0 0 80px rgba(20, 255, 0, 0.05),
            inset 0 0 40px rgba(0, 0, 0, 0.8),
            0 0 30px rgba(20, 255, 0, 0.2)
          `,
        }}
      >
        {/* Scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.2) 2px,
              rgba(0, 0, 0, 0.2) 4px
            )`,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* CRT curvature overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 90%, rgba(0, 0, 0, 0.6) 100%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Screen flicker */}
        <style>
          {`
            @keyframes pipboyFlicker {
              0%, 100% { opacity: 1; }
              92% { opacity: 1; }
              93% { opacity: 0.8; }
              94% { opacity: 1; }
            }
            @keyframes cursorBlink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `}
        </style>

        {/* Header - Vault-Tec style */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: `1px solid ${pipBoyDarkGreen}`,
            paddingBottom: "12px",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Vault Boy simplified icon */}
            <div
              style={{
                width: "40px",
                height: "40px",
                border: `2px solid ${pipBoyGreen}`,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                boxShadow: `0 0 10px rgba(20, 255, 0, 0.3)`,
              }}
            >
              👍
            </div>
            <div>
              <div
                style={{
                  color: pipBoyGreen,
                  fontSize: "16px",
                  fontWeight: 700,
                  fontFamily: "'Share Tech Mono', 'Courier New', monospace",
                  letterSpacing: "2px",
                  textShadow: `0 0 10px ${pipBoyGreen}`,
                }}
              >
                VAULT-TEC
              </div>
              <div
                style={{
                  color: pipBoyGreen,
                  fontSize: "10px",
                  fontFamily: "'Share Tech Mono', 'Courier New', monospace",
                  opacity: 0.7,
                }}
              >
                TERMINAL v2.77
              </div>
            </div>
          </div>
          <div
            style={{
              color: pipBoyGreen,
              fontSize: "11px",
              fontFamily: "'Share Tech Mono', 'Courier New', monospace",
              textAlign: "right",
              opacity: 0.8,
            }}
          >
            <div>VAULT 111</div>
            <div>SEC-LEVEL: ALPHA</div>
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            width: "100%",
            zIndex: 1,
            animation: "pipboyFlicker 8s infinite",
          }}
        >
          <div
            style={{
              color: pipBoyGreen,
              fontSize: "12px",
              fontFamily: "'Share Tech Mono', 'Courier New', monospace",
              marginBottom: "16px",
              textShadow: `0 0 8px rgba(20, 255, 0, 0.5)`,
              lineHeight: 1.6,
            }}
          >
            <div>{">"} SECURITY PROTOCOL INITIATED</div>
            <div>{">"} ENTER AUTHORIZATION CODE:</div>
            <div style={{ opacity: 0.6, fontSize: "10px", marginTop: "8px" }}>
              [WARNING: UNAUTHORIZED ACCESS WILL RESULT IN VAULT LOCKDOWN]
            </div>
          </div>

          <AuthCode.Group
            ref={groupRef}
            value={value}
            onValueChange={handleValueChange}
            autoSubmit={false}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              padding: "20px",
              background: "rgba(0, 0, 0, 0.4)",
              border: `1px solid ${pipBoyDarkGreen}`,
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} style={{ position: "relative" }}>
                <AuthCode.Input
                  index={index}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  style={{
                    width: "48px",
                    height: "60px",
                    textAlign: "center",
                    fontSize: "32px",
                    fontWeight: 400,
                    fontFamily: "'Share Tech Mono', 'Courier New', monospace",
                    border: `2px solid ${
                      focusedIndex === index ? pipBoyGreen : pipBoyDarkGreen
                    }`,
                    borderRadius: "0",
                    background: "rgba(0, 20, 0, 0.6)",
                    color: pipBoyGreen,
                    outline: "none",
                    transition: "all 0.15s ease",
                    textShadow: value[index]
                      ? `0 0 10px ${pipBoyGreen}, 0 0 20px ${pipBoyGreen}`
                      : "none",
                    boxShadow:
                      focusedIndex === index
                        ? `0 0 15px rgba(20, 255, 0, 0.4), inset 0 0 15px rgba(20, 255, 0, 0.1)`
                        : "inset 0 0 10px rgba(0, 0, 0, 0.5)",
                    caretColor: pipBoyGreen,
                  }}
                />
                {/* Blinking cursor for empty focused input */}
                {focusedIndex === index && !value[index] && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "20px",
                      height: "3px",
                      background: pipBoyGreen,
                      boxShadow: `0 0 8px ${pipBoyGreen}`,
                      animation: "cursorBlink 1s step-end infinite",
                    }}
                  />
                )}
              </div>
            ))}
          </AuthCode.Group>

          {/* S.P.E.C.I.A.L. style stats display */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "4px",
              marginTop: "16px",
              padding: "8px",
              background: "rgba(0, 0, 0, 0.3)",
              border: `1px solid ${pipBoyDarkGreen}`,
            }}
          >
            {["S", "E", "C", "U", "R", "E"].map((letter, i) => (
              <div
                key={i}
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    i < value.length
                      ? `rgba(20, 255, 0, 0.2)`
                      : "rgba(0, 0, 0, 0.3)",
                  border: `1px solid ${
                    i < value.length ? pipBoyGreen : pipBoyDarkGreen
                  }`,
                  color: i < value.length ? pipBoyGreen : pipBoyDarkGreen,
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "'Share Tech Mono', 'Courier New', monospace",
                  textShadow:
                    i < value.length ? `0 0 8px ${pipBoyGreen}` : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            zIndex: 1,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleClear}
            style={{
              padding: "10px 24px",
              border: `2px solid ${pipBoyDarkGreen}`,
              borderRadius: "0",
              background: "rgba(0, 20, 0, 0.6)",
              color: pipBoyGreen,
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 400,
              fontFamily: "'Share Tech Mono', 'Courier New', monospace",
              letterSpacing: "1px",
              textTransform: "uppercase",
              transition: "all 0.15s ease",
              textShadow: `0 0 5px rgba(20, 255, 0, 0.5)`,
            }}
          >
            [CLEAR]
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "10px 24px",
              border: `2px solid ${complete ? pipBoyGreen : pipBoyDarkGreen}`,
              borderRadius: "0",
              background: complete
                ? "rgba(20, 255, 0, 0.15)"
                : "rgba(0, 20, 0, 0.6)",
              color: complete ? pipBoyGreen : pipBoyDarkGreen,
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "12px",
              fontWeight: 400,
              fontFamily: "'Share Tech Mono', 'Courier New', monospace",
              letterSpacing: "1px",
              textTransform: "uppercase",
              transition: "all 0.15s ease",
              textShadow: complete ? `0 0 10px ${pipBoyGreen}` : "none",
              boxShadow: complete ? `0 0 15px rgba(20, 255, 0, 0.3)` : "none",
            }}
          >
            [SUBMIT]
          </button>
        </div>

        {/* Success message */}
        {complete && (
          <div
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "rgba(20, 255, 0, 0.1)",
              border: `1px solid ${pipBoyGreen}`,
              zIndex: 1,
            }}
          >
            <div
              style={{
                color: pipBoyGreen,
                fontSize: "12px",
                fontFamily: "'Share Tech Mono', 'Courier New', monospace",
                textShadow: `0 0 10px ${pipBoyGreen}`,
                lineHeight: 1.6,
              }}
            >
              <div>{">"} ACCESS CODE ACCEPTED</div>
              <div>
                {">"} AUTHORIZATION: {value}
              </div>
              <div>{">"} WELCOME, VAULT DWELLER</div>
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "10px",
                  opacity: 0.7,
                }}
              >
                [LOADING VAULT SYSTEMS...]
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            width: "100%",
            borderTop: `1px solid ${pipBoyDarkGreen}`,
            paddingTop: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              color: pipBoyGreen,
              fontSize: "9px",
              fontFamily: "'Share Tech Mono', 'Courier New', monospace",
              opacity: 0.6,
            }}
          >
            ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL
          </div>
          <div
            style={{
              color: pipBoyGreen,
              fontSize: "9px",
              fontFamily: "'Share Tech Mono', 'Courier New', monospace",
              opacity: 0.6,
            }}
          >
            ☢ RADIATION: NORMAL
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Holographic Sci-Fi Interface
 * Futuristic holographic UI inspired by Iron Man's JARVIS and Minority Report
 */
export const HolographicSciFi: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: function HolographicSciFiStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const cyan = "#00d4ff";
    const magenta = "#ff00ff";
    const electricBlue = "#0066ff";

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          padding: "48px 56px",
          background:
            "linear-gradient(180deg, #0a0a12 0%, #0d0d1a 50%, #05050a 100%)",
          borderRadius: "4px",
          position: "relative",
          overflow: "hidden",
          minWidth: "580px",
          border: "1px solid rgba(0, 212, 255, 0.3)",
          boxShadow: `
            0 0 60px rgba(0, 212, 255, 0.1),
            inset 0 0 80px rgba(0, 212, 255, 0.03)
          `,
        }}
      >
        {/* Hexagonal grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(30deg, transparent 49.5%, rgba(0, 212, 255, 0.03) 50%, rgba(0, 212, 255, 0.03) 50.5%, transparent 51%),
              linear-gradient(150deg, transparent 49.5%, rgba(0, 212, 255, 0.03) 50%, rgba(0, 212, 255, 0.03) 50.5%, transparent 51%),
              linear-gradient(90deg, transparent 49.5%, rgba(0, 212, 255, 0.03) 50%, rgba(0, 212, 255, 0.03) 50.5%, transparent 51%)
            `,
            backgroundSize: "60px 100px",
            opacity: 0.6,
          }}
        />

        {/* Scanning line animation */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${cyan}, transparent)`,
            animation: "holoScanLine 3s linear infinite",
            boxShadow: `0 0 20px ${cyan}, 0 0 40px ${cyan}`,
            zIndex: 5,
          }}
        />

        {/* Corner accents */}
        {[
          {
            top: 0,
            left: 0,
            borderTop: `2px solid ${cyan}`,
            borderLeft: `2px solid ${cyan}`,
          },
          {
            top: 0,
            right: 0,
            borderTop: `2px solid ${magenta}`,
            borderRight: `2px solid ${magenta}`,
          },
          {
            bottom: 0,
            left: 0,
            borderBottom: `2px solid ${magenta}`,
            borderLeft: `2px solid ${magenta}`,
          },
          {
            bottom: 0,
            right: 0,
            borderBottom: `2px solid ${cyan}`,
            borderRight: `2px solid ${cyan}`,
          },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "30px",
              height: "30px",
              ...pos,
            }}
          />
        ))}

        <style>
          {`
            @keyframes holoScanLine {
              0% { transform: translateY(0); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { transform: translateY(400px); opacity: 0; }
            }
            @keyframes holoGlow {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; }
            }
            @keyframes iridescent {
              0% { border-color: ${cyan}; box-shadow: 0 0 20px rgba(0, 212, 255, 0.5), inset 0 0 15px rgba(0, 212, 255, 0.1); }
              33% { border-color: ${electricBlue}; box-shadow: 0 0 20px rgba(0, 102, 255, 0.5), inset 0 0 15px rgba(0, 102, 255, 0.1); }
              66% { border-color: ${magenta}; box-shadow: 0 0 20px rgba(255, 0, 255, 0.5), inset 0 0 15px rgba(255, 0, 255, 0.1); }
              100% { border-color: ${cyan}; box-shadow: 0 0 20px rgba(0, 212, 255, 0.5), inset 0 0 15px rgba(0, 212, 255, 0.1); }
            }
            @keyframes holoPulse {
              0%, 100% { transform: scale(1); opacity: 0.7; }
              50% { transform: scale(1.2); opacity: 1; }
            }
          `}
        </style>

        {/* Header */}
        <div style={{ textAlign: "center", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            {/* Status indicator */}
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: complete ? "#00ff88" : cyan,
                boxShadow: `0 0 10px ${complete ? "#00ff88" : cyan}`,
                animation: "holoPulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                color: cyan,
                fontSize: "11px",
                fontFamily: "'Orbitron', 'Rajdhani', monospace",
                letterSpacing: "4px",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              BIOMETRIC VERIFICATION
            </span>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: complete ? "#00ff88" : cyan,
                boxShadow: `0 0 10px ${complete ? "#00ff88" : cyan}`,
                animation: "holoPulse 2s ease-in-out infinite",
              }}
            />
          </div>
          <h3
            style={{
              margin: "0 0 4px 0",
              color: "#fff",
              fontSize: "22px",
              fontWeight: 300,
              fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
              letterSpacing: "8px",
              textTransform: "uppercase",
              textShadow: `0 0 30px ${cyan}`,
              animation: "holoGlow 2s ease-in-out infinite",
            }}
          >
            AUTHORIZATION
          </h3>
          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "11px",
              fontFamily: "'Rajdhani', 'Share Tech Mono', monospace",
              letterSpacing: "2px",
            }}
          >
            ENTER 6-DIGIT SECURITY CODE
          </p>
        </div>

        {/* Holographic projection container */}
        <div
          style={{
            position: "relative",
            padding: "32px 40px",
            background:
              "linear-gradient(180deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 0, 255, 0.03) 100%)",
            border: "1px solid rgba(0, 212, 255, 0.2)",
            zIndex: 1,
          }}
        >
          {/* Projection base glow */}
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              height: "20px",
              background: `radial-gradient(ellipse, rgba(0, 212, 255, 0.3) 0%, transparent 70%)`,
              filter: "blur(8px)",
            }}
          />

          <AuthCode.Group
            ref={groupRef}
            value={value}
            onValueChange={handleValueChange}
            autoSubmit={false}
            style={{
              display: "flex",
              gap: "14px",
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} style={{ position: "relative" }}>
                <AuthCode.Input
                  index={index}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  style={{
                    width: "52px",
                    height: "68px",
                    textAlign: "center",
                    fontSize: "28px",
                    fontWeight: 300,
                    fontFamily: "'Orbitron', 'Rajdhani', monospace",
                    border:
                      focusedIndex === index
                        ? `2px solid ${cyan}`
                        : "1px solid rgba(0, 212, 255, 0.3)",
                    borderRadius: "2px",
                    background: "rgba(0, 20, 40, 0.6)",
                    color: "#fff",
                    outline: "none",
                    transition: "all 0.3s ease",
                    animation:
                      focusedIndex === index
                        ? "iridescent 3s linear infinite"
                        : "none",
                    textShadow: value[index] ? `0 0 15px ${cyan}` : "none",
                    caretColor: cyan,
                    letterSpacing: "2px",
                  }}
                />
                {/* Index indicator */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "9px",
                    fontFamily: "'Rajdhani', monospace",
                    color: value[index] ? cyan : "rgba(0, 212, 255, 0.3)",
                    letterSpacing: "1px",
                  }}
                >
                  0{index + 1}
                </div>
              </div>
            ))}
          </AuthCode.Group>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "2px",
            background: "rgba(0, 212, 255, 0.1)",
            zIndex: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(value.length / 6) * 100}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${cyan}, ${magenta})`,
              boxShadow: `0 0 10px ${cyan}`,
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "16px", zIndex: 1 }}>
          <button
            onClick={handleClear}
            style={{
              padding: "12px 28px",
              border: `1px solid rgba(255, 0, 255, 0.4)`,
              borderRadius: "2px",
              background: "rgba(255, 0, 255, 0.05)",
              color: magenta,
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: 500,
              fontFamily: "'Rajdhani', 'Share Tech Mono', monospace",
              letterSpacing: "3px",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}
          >
            RESET
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "12px 32px",
              border: complete
                ? `1px solid ${cyan}`
                : "1px solid rgba(0, 212, 255, 0.2)",
              borderRadius: "2px",
              background: complete
                ? `linear-gradient(180deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 102, 255, 0.1) 100%)`
                : "rgba(0, 212, 255, 0.02)",
              color: complete ? "#fff" : "rgba(0, 212, 255, 0.3)",
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "11px",
              fontWeight: 500,
              fontFamily: "'Rajdhani', 'Share Tech Mono', monospace",
              letterSpacing: "3px",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
              textShadow: complete ? `0 0 10px ${cyan}` : "none",
              boxShadow: complete ? `0 0 20px rgba(0, 212, 255, 0.3)` : "none",
            }}
          >
            AUTHENTICATE
          </button>
        </div>

        {/* Success state */}
        {complete && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "16px 28px",
              background:
                "linear-gradient(180deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.02) 100%)",
              border: "1px solid rgba(0, 255, 136, 0.3)",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#00ff88",
                  boxShadow: "0 0 15px #00ff88",
                }}
              />
              <span
                style={{
                  color: "#00ff88",
                  fontSize: "12px",
                  fontFamily: "'Orbitron', monospace",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  textShadow: "0 0 15px rgba(0, 255, 136, 0.8)",
                }}
              >
                ACCESS GRANTED
              </span>
            </div>
            <span
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "10px",
                fontFamily: "'Rajdhani', monospace",
                letterSpacing: "6px",
              }}
            >
              CODE: {value}
            </span>
          </div>
        )}

        {/* Footer status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            color: "rgba(0, 212, 255, 0.4)",
            fontSize: "9px",
            fontFamily: "'Rajdhani', monospace",
            letterSpacing: "2px",
            zIndex: 1,
          }}
        >
          <span>SYS.AUTH.v4.2.1</span>
          <span>ENCRYPTED CONNECTION</span>
          <span>{value.length}/6 DIGITS</span>
        </div>
      </div>
    );
  },
};

/**
 * Handwritten Sketchbook Design
 * Warm, organic aesthetic with paper textures, hand-drawn styling, and notebook feel
 */
export const HandwrittenSketchbook: Story = {
  render: function HandwrittenSketchbookStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const cream = "#faf8f0";
    const graphite = "#3a3a3a";
    const softRed = "#c75c5c";
    const kraftBrown = "#b8976b";
    const pencilGray = "#6b6b6b";

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          padding: "48px 56px",
          background: `
            linear-gradient(90deg, transparent 0px, transparent 3px, rgba(200, 180, 160, 0.1) 3px, rgba(200, 180, 160, 0.1) 4px, transparent 4px),
            linear-gradient(${cream} 0%, #f5f0e6 100%)
          `,
          backgroundSize: "24px 100%, 100% 100%",
          borderRadius: "4px",
          position: "relative",
          minWidth: "520px",
          boxShadow: `
            0 2px 8px rgba(0, 0, 0, 0.1),
            0 8px 24px rgba(0, 0, 0, 0.08),
            inset 0 0 60px rgba(200, 180, 160, 0.1)
          `,
          border: "1px solid #e8e0d0",
        }}
      >
        {/* Paper texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(180, 140, 100, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(180, 140, 100, 0.02) 0%, transparent 40%)
            `,
            pointerEvents: "none",
          }}
        />

        {/* Coffee ring stain - subtle decoration */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "30px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "2px solid rgba(180, 140, 100, 0.08)",
            background:
              "radial-gradient(circle, transparent 60%, rgba(180, 140, 100, 0.03) 100%)",
            opacity: 0.7,
          }}
        />

        {/* Washi tape accent */}
        <div
          style={{
            position: "absolute",
            top: "-8px",
            left: "40px",
            width: "80px",
            height: "28px",
            background: `linear-gradient(135deg, 
              rgba(199, 92, 92, 0.7) 0%, 
              rgba(199, 92, 92, 0.6) 50%,
              rgba(199, 92, 92, 0.7) 100%)`,
            transform: "rotate(-3deg)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />

        {/* Header */}
        <div style={{ textAlign: "center", zIndex: 1, marginTop: "8px" }}>
          <h3
            style={{
              margin: "0 0 8px 0",
              color: graphite,
              fontSize: "26px",
              fontWeight: 400,
              fontFamily: "'Caveat', 'Patrick Hand', cursive, serif",
              letterSpacing: "1px",
              transform: "rotate(-1deg)",
            }}
          >
            verification code
          </h3>
          <p
            style={{
              margin: 0,
              color: pencilGray,
              fontSize: "14px",
              fontFamily: "'Caveat', 'Patrick Hand', cursive, serif",
              fontStyle: "italic",
            }}
          >
            (write the 6 digits here)
          </p>
          {/* Underline scribble */}
          <svg
            width="180"
            height="12"
            viewBox="0 0 180 12"
            style={{ marginTop: "4px" }}
          >
            <path
              d="M5 8 Q 30 4, 60 7 T 120 6 T 175 8"
              stroke={pencilGray}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Input area - notebook style */}
        <div
          style={{
            position: "relative",
            padding: "32px 36px 40px",
            background: "rgba(255, 255, 255, 0.5)",
            border: `2px dashed ${kraftBrown}`,
            borderRadius: "4px",
            zIndex: 1,
          }}
        >
          {/* Sketch corner decorations */}
          {[
            { top: "-4px", left: "-4px", transform: "rotate(0deg)" },
            { top: "-4px", right: "-4px", transform: "rotate(90deg)" },
            { bottom: "-4px", left: "-4px", transform: "rotate(-90deg)" },
            { bottom: "-4px", right: "-4px", transform: "rotate(180deg)" },
          ].map((pos, i) => (
            <svg
              key={i}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              style={{
                position: "absolute",
                ...pos,
              }}
            >
              <path
                d="M2 18 L2 4 Q3 2, 6 2 L18 2"
                stroke={kraftBrown}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          ))}

          <AuthCode.Group
            ref={groupRef}
            value={value}
            onValueChange={handleValueChange}
            autoSubmit={false}
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <AuthCode.Input
                  index={index}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  style={{
                    width: "48px",
                    height: "56px",
                    textAlign: "center",
                    fontSize: "32px",
                    fontWeight: 400,
                    fontFamily: "'Caveat', 'Patrick Hand', cursive",
                    border: "none",
                    borderBottom:
                      focusedIndex === index
                        ? `3px solid ${softRed}`
                        : `2px solid ${graphite}`,
                    borderRadius: "0",
                    background: "transparent",
                    color: graphite,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    caretColor: softRed,
                  }}
                />
                {/* Small numbering below */}
                <span
                  style={{
                    marginTop: "6px",
                    fontSize: "11px",
                    fontFamily: "'Caveat', cursive",
                    color: value[index] ? softRed : "rgba(107, 107, 107, 0.4)",
                    fontStyle: "italic",
                  }}
                >
                  {index + 1}.
                </span>
              </div>
            ))}
          </AuthCode.Group>

          {/* Arrow pointing to inputs */}
          <svg
            width="40"
            height="30"
            viewBox="0 0 40 30"
            style={{
              position: "absolute",
              top: "8px",
              left: "-35px",
              transform: "rotate(10deg)",
            }}
          >
            <path
              d="M5 25 Q 15 10, 35 8 M28 4 L35 8 L30 14"
              stroke={softRed}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Buttons styled as handwritten labels */}
        <div style={{ display: "flex", gap: "20px", zIndex: 1 }}>
          <button
            onClick={handleClear}
            style={{
              padding: "10px 24px",
              border: `2px solid ${kraftBrown}`,
              borderRadius: "4px",
              background: "rgba(255, 255, 255, 0.6)",
              color: kraftBrown,
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: 400,
              fontFamily: "'Caveat', 'Patrick Hand', cursive",
              transform: "rotate(-1deg)",
              transition: "all 0.2s ease",
              boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            start over
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "10px 28px",
              border: complete ? `2px solid ${softRed}` : `2px solid #ccc`,
              borderRadius: "4px",
              background: complete
                ? `linear-gradient(135deg, ${softRed} 0%, #a84848 100%)`
                : "rgba(200, 200, 200, 0.3)",
              color: complete ? "#fff" : "#aaa",
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "16px",
              fontWeight: 400,
              fontFamily: "'Caveat', 'Patrick Hand', cursive",
              transform: "rotate(1deg)",
              transition: "all 0.2s ease",
              boxShadow: complete ? "2px 3px 0 rgba(0, 0, 0, 0.15)" : "none",
            }}
          >
            check it!
          </button>
        </div>

        {/* Success state - sticky note style */}
        {complete && (
          <div
            style={{
              position: "relative",
              padding: "16px 24px",
              background: "linear-gradient(135deg, #ffffa5 0%, #fff59d 100%)",
              boxShadow: `
                2px 3px 8px rgba(0, 0, 0, 0.12),
                inset 0 -2px 4px rgba(0, 0, 0, 0.03)
              `,
              transform: "rotate(2deg)",
              zIndex: 1,
            }}
          >
            {/* Tape on top */}
            <div
              style={{
                position: "absolute",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "50px",
                height: "18px",
                background: "rgba(200, 200, 200, 0.6)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  color: graphite,
                  fontSize: "18px",
                  fontFamily: "'Caveat', cursive",
                  display: "block",
                }}
              >
                Yes! That's right
              </span>
              <span
                style={{
                  color: softRed,
                  fontSize: "22px",
                  fontFamily: "'Caveat', cursive",
                  fontWeight: 700,
                  letterSpacing: "4px",
                }}
              >
                {value}
              </span>
              {/* Checkmark doodle */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                  position: "absolute",
                  bottom: "8px",
                  right: "12px",
                }}
              >
                <path
                  d="M4 12 L10 18 L20 6"
                  stroke="#4a9c4a"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Footer - pencil scribble */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: pencilGray,
            fontSize: "13px",
            fontFamily: "'Caveat', cursive",
            opacity: 0.6,
            zIndex: 1,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M2 14 L12 4 L14 2 M10 6 L12 4"
              stroke={pencilGray}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <span style={{ fontStyle: "italic" }}>
            {value.length === 0
              ? "waiting for you to write..."
              : `${value.length} of 6 digits`}
          </span>
        </div>
      </div>
    );
  },
};

// Ghibli color palette (defined outside component to prevent recreation)
const ghibliColors = {
  skyBlue: "#87CEEB",
  sunsetPink: "#FFB7C5",
  forestGreen: "#4A7C59",
  earthBrown: "#8B7355",
  warmCream: "#FFF8E7",
  spiritBlack: "#2D2D2D",
};

// Soot Sprite component (defined outside to prevent animation reset on re-render)
const SootSprite = ({
  size,
  top,
  left,
  delay,
  duration,
}: {
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      width: size,
      height: size,
      zIndex: 2,
      animation: `ghibliFloat ${duration}s ease-in-out ${delay}s infinite`,
    }}
  >
    {/* Main body */}
    <div
      style={{
        width: "100%",
        height: "100%",
        background: ghibliColors.spiritBlack,
        borderRadius: "50%",
        position: "relative",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      {/* Fuzzy effect */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: size * 0.15,
            height: size * 0.15,
            background: ghibliColors.spiritBlack,
            borderRadius: "50%",
            top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 12)}%`,
            left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 12)}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      {/* Eyes */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "25%",
          width: size * 0.22,
          height: size * 0.22,
          background: "white",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "30%",
            width: "40%",
            height: "40%",
            background: ghibliColors.spiritBlack,
            borderRadius: "50%",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "35%",
          right: "25%",
          width: size * 0.22,
          height: size * 0.22,
          background: "white",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "30%",
            width: "40%",
            height: "40%",
            background: ghibliColors.spiritBlack,
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  </div>
);

// Dust particle component (defined outside to prevent animation reset)
const GhibliDustParticle = ({
  size,
  top,
  left,
  delay,
}: {
  size: number;
  top: string;
  left: string;
  delay: number;
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      width: size,
      height: size,
      background: `radial-gradient(circle, rgba(255,248,231,0.9) 0%, rgba(255,248,231,0) 70%)`,
      borderRadius: "50%",
      animation: `ghibliSparkle 3s ease-in-out ${delay}s infinite`,
      pointerEvents: "none",
    }}
  />
);

// Leaf component (defined outside to prevent animation reset)
const GhibliLeaf = ({
  top,
  left,
  rotation,
  delay,
  size,
}: {
  top: string;
  left: string;
  rotation: number;
  delay: number;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{
      position: "absolute",
      top,
      left,
      transform: `rotate(${rotation}deg)`,
      animation: `ghibliLeafFloat 8s ease-in-out ${delay}s infinite`,
      opacity: 0.7,
    }}
  >
    <path
      d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.17 20 14.5 16.17 15.5 14C17 11.5 19 10 21 10C21 10 21 4 17 8Z"
      fill={ghibliColors.forestGreen}
      opacity="0.8"
    />
  </svg>
);

/**
 * Studio Ghibli / Enchanted Forest Design
 * Whimsical, nature-inspired aesthetic with floating soot sprites,
 * dreamy gradients, and magical forest elements
 */
export const StudioGhibli: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: function StudioGhibliStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    // Destructure colors for easier use
    const { skyBlue, sunsetPink, forestGreen, earthBrown, warmCream } =
      ghibliColors;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          padding: "60px 50px",
          background: `linear-gradient(180deg,
            ${skyBlue} 0%,
            ${sunsetPink} 40%,
            #FFD4A3 70%,
            ${warmCream} 100%)`,
          borderRadius: "32px",
          position: "relative",
          overflow: "hidden",
          minWidth: "520px",
          minHeight: "400px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* CSS Keyframes */}
        <style>
          {`
            @keyframes ghibliFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              25% { transform: translateY(-8px) rotate(3deg); }
              50% { transform: translateY(-4px) rotate(-2deg); }
              75% { transform: translateY(-10px) rotate(2deg); }
            }
            @keyframes ghibliSparkle {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.5); }
            }
            @keyframes ghibliLeafFloat {
              0%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
              50% { transform: translateY(-15px) rotate(calc(var(--rotation, 0deg) + 10deg)); }
            }
            @keyframes ghibliPulse {
              0%, 100% { box-shadow: 0 0 20px rgba(255,183,197,0.3); }
              50% { box-shadow: 0 0 35px rgba(255,183,197,0.6); }
            }
            @keyframes ghibliSuccess {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
          `}
        </style>

        {/* Clouds */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "5%",
            width: "120px",
            height: "40px",
            background: "rgba(255,255,255,0.8)",
            borderRadius: "40px",
            filter: "blur(2px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-15px",
              left: "20px",
              width: "50px",
              height: "50px",
              background: "rgba(255,255,255,0.8)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-25px",
              left: "50px",
              width: "60px",
              height: "60px",
              background: "rgba(255,255,255,0.8)",
              borderRadius: "50%",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "10%",
            width: "90px",
            height: "30px",
            background: "rgba(255,255,255,0.7)",
            borderRadius: "30px",
            filter: "blur(2px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-12px",
              left: "15px",
              width: "35px",
              height: "35px",
              background: "rgba(255,255,255,0.7)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-18px",
              left: "40px",
              width: "45px",
              height: "45px",
              background: "rgba(255,255,255,0.7)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Distant forest silhouette */}
        <svg
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "80px",
            opacity: 0.15,
          }}
          viewBox="0 0 520 80"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80 L0 50 Q30 30, 60 45 Q90 20, 120 40 Q150 15, 180 35 Q210 25, 240 45 Q270 20, 300 38 Q330 28, 360 42 Q390 18, 420 40 Q450 30, 480 48 Q510 35, 520 45 L520 80 Z"
            fill={forestGreen}
          />
        </svg>

        {/* Grass at bottom */}
        <svg
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "40px",
          }}
          viewBox="0 0 520 40"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40 L0 30 Q10 20, 20 28 Q30 15, 40 25 Q50 12, 60 22 Q70 18, 80 28 Q90 10, 100 24 Q110 16, 120 26 Q130 8, 140 22 Q150 14, 160 25 Q170 12, 180 24 Q190 18, 200 28 Q210 10, 220 22 Q230 15, 240 26 Q250 12, 260 24 Q270 8, 280 22 Q290 16, 300 28 Q310 14, 320 24 Q330 10, 340 26 Q350 18, 360 25 Q370 12, 380 24 Q390 16, 400 28 Q410 8, 420 22 Q430 14, 440 26 Q450 18, 460 24 Q470 12, 480 28 Q490 16, 500 25 Q510 20, 520 30 L520 40 Z"
            fill={forestGreen}
            opacity="0.4"
          />
        </svg>

        {/* Soot Sprites */}
        <SootSprite size={28} top="12%" left="8%" delay={0} duration={4} />
        <SootSprite size={22} top="25%" left="85%" delay={0.5} duration={5} />
        <SootSprite size={18} top="65%" left="5%" delay={1} duration={4.5} />
        <SootSprite size={24} top="70%" left="90%" delay={1.5} duration={5.5} />
        <SootSprite size={20} top="45%" left="92%" delay={2} duration={4} />

        {/* Dust particles */}
        <GhibliDustParticle size={8} top="20%" left="25%" delay={0} />
        <GhibliDustParticle size={6} top="35%" left="75%" delay={0.5} />
        <GhibliDustParticle size={10} top="55%" left="15%" delay={1} />
        <GhibliDustParticle size={7} top="40%" left="85%" delay={1.5} />
        <GhibliDustParticle size={9} top="15%" left="60%" delay={2} />
        <GhibliDustParticle size={5} top="60%" left="70%" delay={2.5} />

        {/* Floating leaves */}
        <GhibliLeaf top="18%" left="70%" rotation={-30} delay={0} size={24} />
        <GhibliLeaf top="50%" left="3%" rotation={45} delay={1} size={20} />
        <GhibliLeaf top="75%" left="80%" rotation={-60} delay={2} size={18} />

        {/* Title */}
        <div
          style={{
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <h3
            style={{
              margin: "0 0 8px 0",
              color: earthBrown,
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "'Quicksand', 'Comic Sans MS', cursive, sans-serif",
              textShadow: "0 2px 4px rgba(255,255,255,0.5)",
              letterSpacing: "1px",
            }}
          >
            Enter the Magic Code
          </h3>
          <p
            style={{
              margin: 0,
              color: forestGreen,
              fontSize: "14px",
              fontFamily: "'Quicksand', sans-serif",
              opacity: 0.9,
            }}
          >
            The spirits await your secret passage
          </p>
        </div>

        {/* Main input container - like a wooden sign */}
        <div
          style={{
            position: "relative",
            padding: "8px",
            background: `linear-gradient(145deg, ${earthBrown} 0%, #6B5344 100%)`,
            borderRadius: "20px",
            boxShadow: `
              0 8px 32px rgba(107, 83, 68, 0.4),
              inset 0 2px 4px rgba(255,255,255,0.1),
              inset 0 -2px 4px rgba(0,0,0,0.2)
            `,
            zIndex: 10,
          }}
        >
          {/* Wood grain texture overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "20px",
              background: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 30px,
                rgba(0,0,0,0.03) 30px,
                rgba(0,0,0,0.03) 32px
              )`,
              pointerEvents: "none",
            }}
          />

          <AuthCode.Group
            ref={groupRef}
            value={value}
            onValueChange={handleValueChange}
            autoSubmit={false}
            style={{
              display: "flex",
              gap: "10px",
              padding: "20px 24px",
              background: warmCream,
              borderRadius: "14px",
              boxShadow: "inset 0 2px 8px rgba(107,83,68,0.15)",
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <AuthCode.Input
                key={index}
                index={index}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                style={{
                  width: "48px",
                  height: "58px",
                  textAlign: "center",
                  fontSize: "26px",
                  fontWeight: 600,
                  fontFamily: "'Quicksand', 'Comic Sans MS', cursive",
                  border: `3px solid ${
                    focusedIndex === index ? sunsetPink : "transparent"
                  }`,
                  borderRadius: "12px",
                  background:
                    value[index] !== undefined
                      ? `linear-gradient(180deg, rgba(135,206,235,0.2) 0%, rgba(255,183,197,0.2) 100%)`
                      : "rgba(255,255,255,0.8)",
                  color: forestGreen,
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow:
                    focusedIndex === index
                      ? `0 0 20px rgba(255,183,197,0.5), 0 4px 12px rgba(0,0,0,0.1)`
                      : "0 2px 8px rgba(0,0,0,0.08)",
                  transform:
                    focusedIndex === index ? "translateY(-3px)" : "none",
                  animation:
                    focusedIndex === index ? "ghibliPulse 2s infinite" : "none",
                }}
              />
            ))}
          </AuthCode.Group>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "16px", zIndex: 10 }}>
          <button
            onClick={handleClear}
            style={{
              padding: "12px 24px",
              borderRadius: "25px",
              border: `2px solid ${earthBrown}`,
              background: "rgba(255,248,231,0.9)",
              color: earthBrown,
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "'Quicksand', sans-serif",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            Clear
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "12px 32px",
              borderRadius: "25px",
              border: "none",
              background: complete
                ? `linear-gradient(135deg, ${forestGreen} 0%, #3D6B4A 100%)`
                : "rgba(139,115,85,0.3)",
              color: complete ? warmCream : "rgba(139,115,85,0.6)",
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "'Quicksand', sans-serif",
              transition: "all 0.3s ease",
              boxShadow: complete
                ? "0 4px 16px rgba(74,124,89,0.4)"
                : "none",
              animation: complete ? "ghibliSuccess 0.5s ease" : "none",
            }}
            onMouseOver={(e) => {
              if (complete) {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(74,124,89,0.5)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = complete
                ? "0 4px 16px rgba(74,124,89,0.4)"
                : "none";
            }}
          >
            Enter the Forest
          </button>
        </div>

        {/* Status message */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: forestGreen,
            fontSize: "13px",
            fontFamily: "'Quicksand', sans-serif",
            opacity: 0.8,
            zIndex: 10,
          }}
        >
          {complete ? (
            <>
              <span style={{ fontSize: "18px" }}>*</span>
              <span style={{ fontStyle: "italic" }}>
                The spirits have accepted your offering
              </span>
              <span style={{ fontSize: "18px" }}>*</span>
            </>
          ) : (
            <span style={{ fontStyle: "italic" }}>
              {value.length === 0
                ? "Touch the ancient runes to begin..."
                : `${value.length} of 6 mystical symbols entered`}
            </span>
          )}
        </div>
      </div>
    );
  },
};

// JJK color palette (defined outside component to prevent recreation)
const jjkColors = {
  cursedPurple: "#8B5CF6",
  lapseBlue: "#0EA5E9",
  reversalRed: "#EF4444",
  hollowPurple: "#A855F7",
  domainBlack: "#050508",
  infinityBlue: "#38BDF8",
  boneWhite: "#FAFAF9",
  voidBlack: "#09090B",
};

// Floating energy orb (Red or Blue)
const EnergyOrb = ({
  color,
  size,
  position,
  delay,
  converge,
}: {
  color: string;
  size: number;
  position: "left" | "right";
  delay: number;
  converge: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      [position]: converge ? "50%" : "8%",
      transform: `translate(${position === "left" ? (converge ? "50%" : "0") : (converge ? "-50%" : "0")}, -50%)`,
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle at 30% 30%, ${color}90, ${color} 50%, transparent 70%)`,
      boxShadow: `
        0 0 ${size * 0.5}px ${color},
        0 0 ${size}px ${color}80,
        0 0 ${size * 1.5}px ${color}60,
        inset 0 0 ${size * 0.3}px ${color}
      `,
      animation: converge
        ? "none"
        : `jjkOrbFloat 3s ease-in-out ${delay}s infinite, jjkOrbPulse 2s ease-in-out ${delay}s infinite`,
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      opacity: converge ? 0 : 1,
      zIndex: 5,
    }}
  />
);

// Hollow Purple void sphere
const HollowPurpleVoid = ({ active }: { active: boolean }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: active ? 180 : 0,
      height: active ? 180 : 0,
      borderRadius: "50%",
      background: active
        ? `radial-gradient(circle at center,
            #000 0%,
            #1a0a2e 20%,
            ${jjkColors.hollowPurple}80 40%,
            ${jjkColors.hollowPurple}40 60%,
            transparent 70%
          )`
        : "transparent",
      boxShadow: active
        ? `
          0 0 60px ${jjkColors.hollowPurple},
          0 0 120px ${jjkColors.hollowPurple}80,
          0 0 180px ${jjkColors.hollowPurple}60,
          0 0 240px ${jjkColors.hollowPurple}40,
          inset 0 0 60px #000,
          inset 0 0 80px ${jjkColors.hollowPurple}40
        `
        : "none",
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      animation: active ? "jjkHollowPulse 2s ease-in-out infinite" : "none",
      zIndex: 15,
      pointerEvents: "none",
    }}
  >
    {/* Inner void */}
    {active && (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          background: "radial-gradient(circle, #000 0%, #0a0014 50%, transparent 100%)",
          boxShadow: "inset 0 0 30px #000",
        }}
      />
    )}
  </div>
);

// Distortion ring effect
const DistortionRing = ({
  size,
  delay,
  active,
}: {
  size: number;
  delay: number;
  active: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: active ? size : 0,
      height: active ? size : 0,
      borderRadius: "50%",
      border: `2px solid ${jjkColors.hollowPurple}60`,
      boxShadow: `0 0 20px ${jjkColors.hollowPurple}40`,
      transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      animation: active ? `jjkDistortionExpand 2s ease-out ${delay}s infinite` : "none",
      opacity: active ? 0.6 : 0,
      pointerEvents: "none",
    }}
  />
);

// Energy stream between orbs
const EnergyStream = ({
  fromColor,
  toColor,
  active,
}: {
  fromColor: string;
  toColor: string;
  active: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "15%",
      right: "15%",
      height: active ? "4px" : "0px",
      transform: "translateY(-50%)",
      background: `linear-gradient(90deg, ${fromColor} 0%, ${jjkColors.hollowPurple} 50%, ${toColor} 100%)`,
      boxShadow: active
        ? `0 0 20px ${jjkColors.hollowPurple}, 0 0 40px ${jjkColors.hollowPurple}80`
        : "none",
      borderRadius: "4px",
      transition: "all 0.4s ease",
      opacity: active ? 1 : 0,
      animation: active ? "jjkStreamPulse 0.5s ease-in-out infinite" : "none",
      zIndex: 4,
    }}
  />
);

/**
 * Jujutsu Kaisen / Hollow Purple Design
 * Features Gojo's Hollow Purple technique - the fusion of
 * Cursed Technique Lapse: Blue and Cursed Technique Reversal: Red
 */
export const JujutsuKaisen: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: function JujutsuKaisenStory() {
    const [value, setValue] = useState("");
    const [complete, setComplete] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setComplete(newValue.length === 6);
    };

    const handleClear = () => {
      setValue("");
      setComplete(false);
      const firstInput = groupRef.current?.querySelector(
        "input:not([type=hidden])"
      ) as HTMLInputElement | null;
      firstInput?.focus();
    };

    const {
      lapseBlue,
      reversalRed,
      hollowPurple,
      domainBlack,
      infinityBlue,
      boneWhite,
      voidBlack,
    } = jjkColors;

    // Progress determines convergence animation
    const progress = value.length / 6;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          padding: "70px 60px",
          background: complete
            ? `radial-gradient(ellipse at center, ${hollowPurple}30 0%, ${voidBlack} 40%, #000 100%)`
            : `radial-gradient(ellipse at center, #0c0c12 0%, ${domainBlack} 50%, #000 100%)`,
          borderRadius: "24px",
          position: "relative",
          overflow: "hidden",
          minWidth: "600px",
          minHeight: "500px",
          boxShadow: complete
            ? `0 0 100px ${hollowPurple}60, inset 0 0 150px ${voidBlack}`
            : `0 0 40px ${hollowPurple}20, inset 0 0 100px ${domainBlack}`,
          border: `1px solid ${complete ? hollowPurple : hollowPurple + "30"}`,
          transition: "all 0.8s ease",
        }}
      >
        {/* CSS Keyframes */}
        <style>
          {`
            @keyframes jjkOrbFloat {
              0%, 100% { transform: translateY(-50%) scale(1); }
              50% { transform: translateY(-55%) scale(1.1); }
            }
            @keyframes jjkOrbPulse {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; }
            }
            @keyframes jjkHollowPulse {
              0%, 100% {
                transform: translate(-50%, -50%) scale(1);
                filter: brightness(1);
              }
              50% {
                transform: translate(-50%, -50%) scale(1.05);
                filter: brightness(1.2);
              }
            }
            @keyframes jjkDistortionExpand {
              0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
              100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
            }
            @keyframes jjkStreamPulse {
              0%, 100% { opacity: 0.8; filter: blur(1px); }
              50% { opacity: 1; filter: blur(0px); }
            }
            @keyframes jjkVoidSpin {
              from { transform: translate(-50%, -50%) rotate(0deg); }
              to { transform: translate(-50%, -50%) rotate(360deg); }
            }
            @keyframes jjkParticlePull {
              0% { opacity: 1; transform: translate(var(--tx), var(--ty)) scale(1); }
              100% { opacity: 0; transform: translate(0, 0) scale(0); }
            }
            @keyframes jjkInputGlow {
              0%, 100% { box-shadow: 0 0 15px var(--glow-color); }
              50% { box-shadow: 0 0 30px var(--glow-color), 0 0 45px var(--glow-color); }
            }
            @keyframes jjkTechniqueReveal {
              0% { opacity: 0; transform: translateY(10px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>

        {/* Void spiral pattern (visible on complete) */}
        {complete && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "400px",
              height: "400px",
              transform: "translate(-50%, -50%)",
              background: `conic-gradient(
                from 0deg at 50% 50%,
                transparent 0deg,
                ${hollowPurple}10 30deg,
                transparent 60deg,
                ${hollowPurple}15 90deg,
                transparent 120deg,
                ${hollowPurple}10 150deg,
                transparent 180deg,
                ${hollowPurple}15 210deg,
                transparent 240deg,
                ${hollowPurple}10 270deg,
                transparent 300deg,
                ${hollowPurple}15 330deg,
                transparent 360deg
              )`,
              borderRadius: "50%",
              animation: "jjkVoidSpin 10s linear infinite",
              opacity: 0.5,
            }}
          />
        )}

        {/* Grid distortion lines */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: complete ? 0.3 : 0.1,
            transition: "opacity 0.5s ease",
          }}
          viewBox="0 0 600 500"
          preserveAspectRatio="none"
        >
          {/* Horizontal lines that curve toward center when complete */}
          {Array.from({ length: 15 }).map((_, i) => {
            const y = (i + 1) * (500 / 16);
            const curve = complete ? 30 * Math.sin((i / 14) * Math.PI) : 0;
            return (
              <path
                key={`h${i}`}
                d={`M 0 ${y} Q 300 ${y + curve}, 600 ${y}`}
                stroke={hollowPurple}
                strokeWidth="0.5"
                fill="none"
                style={{ transition: "all 0.8s ease" }}
              />
            );
          })}
          {/* Vertical lines */}
          {Array.from({ length: 19 }).map((_, i) => {
            const x = (i + 1) * (600 / 20);
            const curve = complete ? 25 * Math.sin((i / 18) * Math.PI) : 0;
            return (
              <path
                key={`v${i}`}
                d={`M ${x} 0 Q ${x + curve} 250, ${x} 500`}
                stroke={hollowPurple}
                strokeWidth="0.5"
                fill="none"
                style={{ transition: "all 0.8s ease" }}
              />
            );
          })}
        </svg>

        {/* Red Orb (Reversal Red - Left) */}
        <EnergyOrb
          color={reversalRed}
          size={70 - progress * 20}
          position="left"
          delay={0}
          converge={complete}
        />

        {/* Blue Orb (Lapse Blue - Right) */}
        <EnergyOrb
          color={lapseBlue}
          size={70 - progress * 20}
          position="right"
          delay={0.5}
          converge={complete}
        />

        {/* Energy stream between orbs */}
        <EnergyStream
          fromColor={reversalRed}
          toColor={lapseBlue}
          active={complete}
        />

        {/* Hollow Purple Void (appears on complete) */}
        <HollowPurpleVoid active={complete} />

        {/* Distortion rings */}
        <DistortionRing size={200} delay={0} active={complete} />
        <DistortionRing size={260} delay={0.2} active={complete} />
        <DistortionRing size={320} delay={0.4} active={complete} />

        {/* Title */}
        <div
          style={{
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <h3
            style={{
              margin: "0 0 8px 0",
              color: complete ? hollowPurple : boneWhite,
              fontSize: "32px",
              fontWeight: 900,
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "10px",
              textShadow: complete
                ? `0 0 40px ${hollowPurple}, 0 0 80px ${hollowPurple}80`
                : `0 0 20px ${hollowPurple}60`,
              transition: "all 0.5s ease",
            }}
          >
            {complete ? "Hollow Purple" : "Cursed Technique"}
          </h3>
          <p
            style={{
              margin: 0,
              color: complete ? boneWhite : infinityBlue,
              fontSize: "12px",
              fontFamily: "'Rajdhani', 'Segoe UI', sans-serif",
              letterSpacing: "6px",
              textTransform: "uppercase",
              opacity: 0.9,
              animation: complete ? "jjkTechniqueReveal 0.5s ease" : "none",
            }}
          >
            {complete ? "Imaginary Technique: Purple" : "Lapse Blue + Reversal Red"}
          </p>
        </div>

        {/* Progress indicator orbs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            zIndex: 20,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background:
                  i < value.length
                    ? i < 3
                      ? reversalRed
                      : lapseBlue
                    : `${hollowPurple}30`,
                boxShadow:
                  i < value.length
                    ? `0 0 10px ${i < 3 ? reversalRed : lapseBlue}`
                    : "none",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Main input container */}
        <div
          style={{
            position: "relative",
            padding: "3px",
            background: complete
              ? `linear-gradient(90deg, ${reversalRed} 0%, ${hollowPurple} 50%, ${lapseBlue} 100%)`
              : `linear-gradient(90deg, ${reversalRed}60 0%, ${hollowPurple}40 50%, ${lapseBlue}60 100%)`,
            borderRadius: "16px",
            zIndex: 20,
            boxShadow: complete
              ? `0 0 40px ${hollowPurple}80`
              : "none",
            transition: "all 0.5s ease",
          }}
        >
          <div
            style={{
              background: `linear-gradient(180deg, #0a0a0f 0%, ${voidBlack} 100%)`,
              borderRadius: "13px",
              padding: "24px 28px",
            }}
          >
            <AuthCode.Group
              ref={groupRef}
              value={value}
              onValueChange={handleValueChange}
              autoSubmit={false}
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              {Array.from({ length: 6 }).map((_, index) => {
                const isRed = index < 3;
                const activeColor = isRed ? reversalRed : lapseBlue;
                const hasValue = value[index] !== undefined;
                const isFocused = focusedIndex === index;

                return (
                  <AuthCode.Input
                    key={index}
                    index={index}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    style={{
                      width: "50px",
                      height: "62px",
                      textAlign: "center",
                      fontSize: "26px",
                      fontWeight: 700,
                      fontFamily: "'Rajdhani', 'Consolas', monospace",
                      border: `2px solid ${
                        isFocused
                          ? activeColor
                          : hasValue
                            ? `${activeColor}80`
                            : `${hollowPurple}30`
                      }`,
                      borderRadius: "10px",
                      background: hasValue
                        ? `linear-gradient(180deg, ${activeColor}15 0%, ${voidBlack} 100%)`
                        : `linear-gradient(180deg, #0f0f14 0%, ${voidBlack} 100%)`,
                      color: isFocused ? activeColor : hasValue ? activeColor : hollowPurple,
                      outline: "none",
                      transition: "all 0.3s ease",
                      boxShadow: isFocused
                        ? `0 0 25px ${activeColor}80, inset 0 0 15px ${activeColor}20`
                        : hasValue
                          ? `0 0 15px ${activeColor}30`
                          : "none",
                      textShadow: hasValue ? `0 0 8px ${activeColor}` : "none",
                      // @ts-expect-error CSS custom property
                      "--glow-color": activeColor,
                      animation: isFocused ? "jjkInputGlow 1.5s ease-in-out infinite" : "none",
                    }}
                  />
                );
              })}
            </AuthCode.Group>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "16px", zIndex: 20 }}>
          <button
            onClick={handleClear}
            style={{
              padding: "12px 28px",
              borderRadius: "8px",
              border: `1px solid ${reversalRed}60`,
              background: "transparent",
              color: reversalRed,
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'Rajdhani', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "2px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = `0 0 20px ${reversalRed}50, inset 0 0 20px ${reversalRed}20`;
              e.currentTarget.style.borderColor = reversalRed;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = `${reversalRed}60`;
            }}
          >
            Reversal
          </button>
          <button
            disabled={!complete}
            style={{
              padding: "12px 36px",
              borderRadius: "8px",
              border: "none",
              background: complete
                ? `linear-gradient(90deg, ${reversalRed} 0%, ${hollowPurple} 50%, ${lapseBlue} 100%)`
                : `${hollowPurple}30`,
              color: complete ? boneWhite : `${boneWhite}40`,
              cursor: complete ? "pointer" : "not-allowed",
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: "'Rajdhani', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "3px",
              transition: "all 0.3s ease",
              boxShadow: complete
                ? `0 0 30px ${hollowPurple}80`
                : "none",
            }}
            onMouseOver={(e) => {
              if (complete) {
                e.currentTarget.style.boxShadow = `0 0 50px ${hollowPurple}, 0 0 80px ${hollowPurple}60`;
                e.currentTarget.style.transform = "scale(1.05)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = complete
                ? `0 0 30px ${hollowPurple}80`
                : "none";
            }}
          >
            Collapse
          </button>
        </div>

        {/* Status message */}
        <div
          style={{
            color: complete ? hollowPurple : infinityBlue,
            fontSize: "12px",
            fontFamily: "'Rajdhani', sans-serif",
            letterSpacing: "3px",
            textTransform: "uppercase",
            zIndex: 20,
            textShadow: `0 0 10px ${complete ? hollowPurple : infinityBlue}60`,
          }}
        >
          {complete ? (
            <span style={{ animation: "jjkTechniqueReveal 0.5s ease" }}>
              Convergence Complete - Reality Collapses
            </span>
          ) : (
            <span style={{ opacity: 0.8 }}>
              {value.length === 0
                ? "Red: Divergence | Blue: Convergence"
                : value.length < 3
                  ? `Reversal Red: ${value.length}/3 charged`
                  : `Lapse Blue: ${value.length - 3}/3 charged`}
            </span>
          )}
        </div>
      </div>
    );
  },
};
