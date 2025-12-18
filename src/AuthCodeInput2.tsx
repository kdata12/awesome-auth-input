import { useState, useRef } from "react";
import "./AuthCodeInput2.css"; // Import the standard CSS

const AUTH_CODE_LENGTH = 6;

export default function AuthCodeInput({
  onSubmit,
}: {
  onSubmit: (code: string) => void;
}) {
  const [code, setCode] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow numbers (optional)
    if (!/^\d*$/.test(value)) return;

    if (value.length <= AUTH_CODE_LENGTH) {
      setCode(value);
      if (value.length === AUTH_CODE_LENGTH) {
        onSubmit(value);
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="auth-input-container" onClick={handleClick}>
      <input
        ref={inputRef}
        value={code}
        onChange={handleChange}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        className="auth-hidden-input"
        autoComplete="one-time-code"
        inputMode="numeric"
        maxLength={AUTH_CODE_LENGTH}
        type="text"
      />

      <div className="auth-slots-container">
        {Array.from({ length: AUTH_CODE_LENGTH }).map((_, index) => {
          const char = code[index] || "";

          // Logic to highlight the "current" box where the next number will appear
          // OR highlight the last box if the code is full
          const isFocused =
            code.length === index ||
            (code.length === AUTH_CODE_LENGTH &&
              index === AUTH_CODE_LENGTH - 1);

          const showCaret = isFocused && isInputFocused;

          return (
            <div
              key={index}
              className={`auth-slot ${isFocused ? "active" : ""}`}
            >
              {char}
              {showCaret && (
                <span className={`auth-caret ${!char ? "empty" : ""}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
