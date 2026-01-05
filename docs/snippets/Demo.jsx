import React, { useState, useRef } from "react";
import { AuthCode } from "awesome-auth-input";

// Mintlify requires arrow function syntax for snippets
// The function keyword is not supported

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
      <AuthCode.Group
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
          <AuthCode.Input
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
      </AuthCode.Group>

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
      <AuthCode.Group
        name="otp"
        value={value}
        onValueChange={setValue}
        autoSubmit={false}
        style={{ display: "flex", gap: "8px" }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <AuthCode.Input
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
      </AuthCode.Group>

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

// =============================================================================
// CREATIVE DEMO DESIGNS
// =============================================================================

/**
 * Design 1: Glassmorphism / Frosted Glass
 * Semi-transparent backgrounds with blur, soft shadows, light/airy aesthetic
 */
export const GlassmorphismDemo = () => {
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
        gap: "24px",
        padding: "48px",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        borderRadius: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating orbs for depth */}
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          top: "-50px",
          right: "-50px",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "150px",
          height: "150px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "50%",
          bottom: "-30px",
          left: "-30px",
          filter: "blur(30px)",
        }}
      />

      <div
        style={{
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h3
          style={{
            margin: "0 0 8px 0",
            color: "white",
            fontSize: "20px",
            fontWeight: 600,
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          Enter verification code
        </h3>
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.8)",
            fontSize: "14px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          We sent a code to your email
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
          padding: "24px 32px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
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
              fontWeight: 700,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              border: "none",
              borderRadius: "16px",
              background:
                focusedIndex === index
                  ? "rgba(255, 255, 255, 0.5)"
                  : "rgba(255, 255, 255, 0.25)",
              color: "#1a1a2e",
              outline: "none",
              transition: "all 0.2s ease",
              boxShadow:
                focusedIndex === index
                  ? "0 0 0 3px rgba(255,255,255,0.5), 0 4px 20px rgba(0,0,0,0.1)"
                  : "0 2px 10px rgba(0,0,0,0.05)",
              transform: focusedIndex === index ? "scale(1.05)" : "scale(1)",
            }}
          />
        ))}
      </AuthCode.Group>

      <div style={{ display: "flex", gap: "12px", zIndex: 1 }}>
        <button
          onClick={handleClear}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "system-ui, -apple-system, sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          Clear
        </button>
        <button
          disabled={!complete}
          style={{
            padding: "12px 32px",
            borderRadius: "12px",
            border: "none",
            background: complete
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(255, 255, 255, 0.3)",
            color: complete ? "#764ba2" : "rgba(255,255,255,0.5)",
            cursor: complete ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "system-ui, -apple-system, sans-serif",
            transition: "all 0.2s ease",
            boxShadow: complete ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
          }}
        >
          Verify Code
        </button>
      </div>

      {complete && (
        <div
          style={{
            color: "white",
            fontSize: "14px",
            fontFamily: "ui-monospace, monospace",
            background: "rgba(255,255,255,0.2)",
            padding: "8px 16px",
            borderRadius: "8px",
            zIndex: 1,
          }}
        >
          ✨ Code: {value}
        </div>
      )}
    </div>
  );
};

/**
 * Design 2: Neon Cyberpunk
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
};

/**
 * Design 3: Minimal Brutalist
 * Bold, chunky borders, high contrast, underline-only inputs with large typography
 */
export const BrutalistDemo = () => {
  const [value, setValue] = useState("");
  const [complete, setComplete] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const groupRef = useRef(null);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    setComplete(newValue.length === 4);
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
                  focusedIndex === index ? "8px solid #000" : "4px solid #000",
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
};
