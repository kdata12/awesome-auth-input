/**
 * awesome-auth-input
 * A headless, accessible React component for OTP/auth code inputs
 */

import {
  Group,
  Input,
  HiddenInput,
} from "./AuthCode/OneTimePassword";

export type {
  AuthCodeGroupProps,
  AuthCodeInputProps,
  ValidationPattern,
  CustomValidation,
} from "./AuthCode/OneTimePassword";

/**
 * AuthCode - A compound component for OTP/auth code inputs
 *
 * @example
 * ```tsx
 * <AuthCode.Group onComplete={(code) => console.log(code)}>
 *   <AuthCode.Input index={0} />
 *   <AuthCode.Input index={1} />
 *   <AuthCode.Input index={2} />
 *   <AuthCode.Input index={3} />
 * </AuthCode.Group>
 * ```
 */
const AuthCode = {
  /**
   * The root component that manages state and validation for auth code inputs.
   * All `<AuthCode.Input>` components must be children of this component.
   */
  Group,
  /**
   * Individual input field for a single character of the auth code.
   * Must be used within `<AuthCode.Group>`.
   */
  Input,
  /**
   * Hidden input that contains the full auth code value for form submission.
   * Automatically rendered by Group, but can be customized if needed.
   */
  HiddenInput,
};

export { AuthCode };

// Also export individual components for tree-shaking
export { Group as AuthCodeGroup, Input as AuthCodeInput, HiddenInput as AuthCodeHiddenInput };

