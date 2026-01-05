import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AuthCode } from "../src";
import "./AuthCode.css";

const meta: Meta<typeof AuthCode.Group> = {
  title: "Components/AuthCode",
  component: AuthCode.Group,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A headless, accessible React component for OTP/auth code inputs with support for numeric, alphabetic, and custom validation patterns.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    validation: {
      control: "select",
      options: ["numeric", "alpha", "alphanumeric"],
      mapping: {
        numeric: { type: "numeric" },
        alpha: { type: "alpha" },
        alphanumeric: { type: "alphanumeric" },
      },
      description: "Validation pattern for input characters",
    },
    type: {
      control: "select",
      options: ["text", "password"],
      description: "Input type - text shows characters, password masks them",
    },
    autoSubmit: {
      control: "boolean",
      description: "Whether to auto-submit the form when all fields are filled",
    },
    disabled: {
      control: "boolean",
      description: "Whether all inputs are disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthCode.Group>;

/**
 * Basic 6-digit OTP input with numeric validation (default).
 */
export const Default: Story = {
  render: (args) => (
    <AuthCode.Group
      {...args}
      className="auth-code-group"
      onComplete={(value) => console.log("Code entered:", value)}
    >
      <AuthCode.Input index={0} className="auth-code-input" />
      <AuthCode.Input index={1} className="auth-code-input" />
      <AuthCode.Input index={2} className="auth-code-input" />
      <AuthCode.Input index={3} className="auth-code-input" />
      <AuthCode.Input index={4} className="auth-code-input" />
      <AuthCode.Input index={5} className="auth-code-input" />
    </AuthCode.Group>
  ),
};

/**
 * 4-digit PIN code input.
 */
export const FourDigitPIN: Story = {
  render: (args) => (
    <AuthCode.Group
      {...args}
      className="auth-code-group"
      onComplete={(value) => console.log("PIN entered:", value)}
    >
      <AuthCode.Input index={0} className="auth-code-input" />
      <AuthCode.Input index={1} className="auth-code-input" />
      <AuthCode.Input index={2} className="auth-code-input" />
      <AuthCode.Input index={3} className="auth-code-input" />
    </AuthCode.Group>
  ),
};

/**
 * Alphabetic validation - only letters allowed.
 */
export const AlphabeticValidation: Story = {
  render: (args) => (
    <AuthCode.Group
      {...args}
      className="auth-code-group"
      validation={{ type: "alpha" }}
      onComplete={(value) => console.log("Alpha code entered:", value)}
    >
      <AuthCode.Input index={0} className="auth-code-input" />
      <AuthCode.Input index={1} className="auth-code-input" />
      <AuthCode.Input index={2} className="auth-code-input" />
      <AuthCode.Input index={3} className="auth-code-input" />
    </AuthCode.Group>
  ),
};

/**
 * Alphanumeric validation - letters and numbers allowed.
 */
export const AlphanumericValidation: Story = {
  render: (args) => (
    <AuthCode.Group
      {...args}
      className="auth-code-group"
      validation={{ type: "alphanumeric" }}
      onComplete={(value) => console.log("Alphanumeric code entered:", value)}
    >
      <AuthCode.Input index={0} className="auth-code-input" />
      <AuthCode.Input index={1} className="auth-code-input" />
      <AuthCode.Input index={2} className="auth-code-input" />
      <AuthCode.Input index={3} className="auth-code-input" />
      <AuthCode.Input index={4} className="auth-code-input" />
      <AuthCode.Input index={5} className="auth-code-input" />
    </AuthCode.Group>
  ),
};

/**
 * Custom validation with regex - only uppercase letters.
 */
export const CustomValidation: Story = {
  render: (args) => (
    <AuthCode.Group
      {...args}
      className="auth-code-group"
      validation={{
        type: "custom",
        regex: /^[A-Z]$/,
        pattern: "[A-Z]{1}",
        inputMode: "text",
      }}
      onComplete={(value) => console.log("Custom code entered:", value)}
    >
      <AuthCode.Input index={0} className="auth-code-input" />
      <AuthCode.Input index={1} className="auth-code-input" />
      <AuthCode.Input index={2} className="auth-code-input" />
      <AuthCode.Input index={3} className="auth-code-input" />
    </AuthCode.Group>
  ),
};

/**
 * Password/masked input mode - characters are hidden.
 */
export const PasswordMode: Story = {
  render: (args) => (
    <AuthCode.Group
      {...args}
      className="auth-code-group"
      type="password"
      onComplete={(value) => console.log("Password entered:", value)}
    >
      <AuthCode.Input index={0} className="auth-code-input" />
      <AuthCode.Input index={1} className="auth-code-input" />
      <AuthCode.Input index={2} className="auth-code-input" />
      <AuthCode.Input index={3} className="auth-code-input" />
    </AuthCode.Group>
  ),
};

/**
 * Disabled state - all inputs are disabled.
 */
export const Disabled: Story = {
  render: (args) => (
    <AuthCode.Group
      {...args}
      className="auth-code-group"
      disabled
      defaultValue="1234"
    >
      <AuthCode.Input index={0} className="auth-code-input" />
      <AuthCode.Input index={1} className="auth-code-input" />
      <AuthCode.Input index={2} className="auth-code-input" />
      <AuthCode.Input index={3} className="auth-code-input" />
    </AuthCode.Group>
  ),
};

/**
 * Controlled component - value is managed externally.
 */
export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = useState("");

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
          {...args}
          className="auth-code-group"
          value={value}
          onValueChange={setValue}
          onComplete={(v) => console.log("Complete:", v)}
        >
          <AuthCode.Input index={0} className="auth-code-input" />
          <AuthCode.Input index={1} className="auth-code-input" />
          <AuthCode.Input index={2} className="auth-code-input" />
          <AuthCode.Input index={3} className="auth-code-input" />
          <AuthCode.Input index={4} className="auth-code-input" />
          <AuthCode.Input index={5} className="auth-code-input" />
        </AuthCode.Group>
        <div style={{ fontFamily: "monospace", color: "#666" }}>
          Current value: "{value}"
        </div>
        <button
          onClick={() => setValue("")}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>
    );
  },
};

/**
 * Form integration - works with native HTML forms.
 */
export const FormIntegration: Story = {
  render: function FormStory(args) {
    const [submitted, setSubmitted] = useState<string | null>(null);

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          setSubmitted(formData.get("otp") as string);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <AuthCode.Group
          {...args}
          className="auth-code-group"
          name="otp"
          autoSubmit
          onComplete={(value) => console.log("Code complete:", value)}
        >
          <AuthCode.Input index={0} className="auth-code-input" />
          <AuthCode.Input index={1} className="auth-code-input" />
          <AuthCode.Input index={2} className="auth-code-input" />
          <AuthCode.Input index={3} className="auth-code-input" />
          <AuthCode.Input index={4} className="auth-code-input" />
          <AuthCode.Input index={5} className="auth-code-input" />
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
          }}
        >
          Submit
        </button>

        {submitted && (
          <div style={{ fontFamily: "monospace", color: "#22c55e" }}>
            Submitted code: {submitted}
          </div>
        )}
      </form>
    );
  },
};

/**
 * With separator - visual grouping of digits.
 */
export const WithSeparator: Story = {
  render: (args) => (
    <AuthCode.Group
      {...args}
      className="auth-code-group"
      onComplete={(value) => console.log("Code entered:", value)}
    >
      <AuthCode.Input index={0} className="auth-code-input" />
      <AuthCode.Input index={1} className="auth-code-input" />
      <AuthCode.Input index={2} className="auth-code-input" />
      <span className="auth-code-separator">-</span>
      <AuthCode.Input index={3} className="auth-code-input" />
      <AuthCode.Input index={4} className="auth-code-input" />
      <AuthCode.Input index={5} className="auth-code-input" />
    </AuthCode.Group>
  ),
};

/**
 * Copy functionality - demonstrates copying the entire code value.
 * Enter some digits and use Cmd+C (Mac) or Ctrl+C (Windows/Linux) to copy.
 */
export const CopyValue: Story = {
  render: function CopyStory(args) {
    const [copyValue, setCopyValue] = useState("");
    const [lastCopied, setLastCopied] = useState<string>("");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>
            Enter a code and press{" "}
            <kbd
              style={{
                padding: "2px 6px",
                background: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontFamily: "monospace",
              }}
            >
              Cmd+C
            </kbd>{" "}
            or{" "}
            <kbd
              style={{
                padding: "2px 6px",
                background: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontFamily: "monospace",
              }}
            >
              Ctrl+C
            </kbd>{" "}
            to copy
          </p>
        </div>

        <AuthCode.Group
          {...args}
          className="auth-code-group"
          value={copyValue}
          // Won't need this onValueChange in production - this is just show the copied value in storybook
          onValueChange={setCopyValue}
          defaultValue="123456"
          onCopy={() => {
            setLastCopied(copyValue);
          }}
        >
          <AuthCode.Input index={0} className="auth-code-input" />
          <AuthCode.Input index={1} className="auth-code-input" />
          <AuthCode.Input index={2} className="auth-code-input" />
          <AuthCode.Input index={3} className="auth-code-input" />
          <AuthCode.Input index={4} className="auth-code-input" />
          <AuthCode.Input index={5} className="auth-code-input" />
        </AuthCode.Group>

        <div
          style={{ fontFamily: "monospace", color: "#666", minHeight: "20px" }}
        >
          Current value: "{copyValue}"
        </div>

        {lastCopied && (
          <div
            style={{
              padding: "12px 16px",
              background: "#22c55e20",
              border: "1px solid #22c55e",
              borderRadius: "6px",
              color: "#15803d",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
          >
            ✓ Copied to clipboard: <strong>{lastCopied}</strong>
          </div>
        )}
      </div>
    );
  },
};
