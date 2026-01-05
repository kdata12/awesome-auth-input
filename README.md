# awesome-auth-input

A headless, accessible, and fully-typed React component for OTP/auth code inputs with support for numeric, alphabetic, and custom validation patterns.

Storybook: https://awesome-auth-input.vercel.app/

## Features

- **Headless** - Bring your own styles, no CSS included
- **Accessible** - Full keyboard navigation, screen reader support, ARIA labels
- **Flexible validation** - Numeric, alphabetic, alphanumeric, or custom regex patterns
- **Controlled & uncontrolled** - Works both ways
- **Auto-submit** - Optional auto-submit when all fields are filled
- **Form integration** - Hidden input for native form submission
- **Password mode** - Mask input characters
- **Paste & copy support** - Paste codes directly and copy complete values
- **Smart input behavior** - Intelligent focus management and character insertion
- **TypeScript** - Fully typed with exported types
- **Tree-shakeable** - Individual component exports for optimized bundles
- **Zero dependencies** - Only React as a peer dependency

## Installation

```bash
npm install awesome-auth-input
```

```bash
yarn add awesome-auth-input
```

```bash
pnpm add awesome-auth-input
```

## Quick Start

```tsx
import { AuthCode } from 'awesome-auth-input';

function OTPInput() {
  return (
    <AuthCode.Group onComplete={(code) => console.log('Code:', code)}>
      <AuthCode.Input index={0} />
      <AuthCode.Input index={1} />
      <AuthCode.Input index={2} />
      <AuthCode.Input index={3} />
      <AuthCode.Input index={4} />
      <AuthCode.Input index={5} />
    </AuthCode.Group>
  );
}
```

## API Reference

### `<AuthCode.Group>`

The root component that manages state and validation for auth code inputs.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The `<AuthCode.Input>` components |
| `name` | `string` | - | Name attribute for form submission |
| `validation` | `ValidationPattern` | `{ type: "numeric" }` | Validation pattern for input characters |
| `autoSubmit` | `boolean` | `true` | Auto-submit the form when all fields are filled |
| `onComplete` | `(value: string) => void` | - | Callback when all fields are filled |
| `value` | `string` | - | Controlled value |
| `onValueChange` | `(value: string) => void` | - | Callback when value changes |
| `defaultValue` | `string` | - | Initial value for uncontrolled mode |
| `type` | `"text" \| "password"` | `"text"` | Input type (text shows, password masks) |
| `disabled` | `boolean` | `false` | Disable all inputs |

Plus all standard `div` props (className, style, etc.)

### `<AuthCode.Input>`

Individual input field for a single character. Must be used within `<AuthCode.Group>`.

| Prop | Type | Description |
|------|------|-------------|
| `index` | `number` | **Required.** Position of this input (0-based) |

Plus most standard `input` props (className, style, onKeyDown, etc.)

### `<AuthCode.HiddenInput>`

Hidden input that contains the complete auth code value for form submission. This component is automatically rendered by `<AuthCode.Group>`, but you can render it manually for advanced use cases.

```tsx
<AuthCode.Group>
  <AuthCode.HiddenInput />
  <AuthCode.Input index={0} />
  <AuthCode.Input index={1} />
</AuthCode.Group>
```

### Validation Patterns

```tsx
// Numeric only (default)
<AuthCode.Group validation={{ type: "numeric" }} />

// Alphabetic only (a-z, A-Z)
<AuthCode.Group validation={{ type: "alpha" }} />

// Alphanumeric (letters and numbers)
<AuthCode.Group validation={{ type: "alphanumeric" }} />

// Custom validation with regex
<AuthCode.Group
  validation={{
    type: "custom",
    regex: /^[A-Z]$/,        // Validation regex
    pattern: "[A-Z]{1}",      // HTML pattern attribute
    inputMode: "text"         // Virtual keyboard hint
  }}
/>
```

## Examples

### Controlled Component

```tsx
import { useState } from 'react';
import { AuthCode } from 'awesome-auth-input';

function ControlledOTP() {
  const [code, setCode] = useState('');

  return (
    <>
      <AuthCode.Group
        value={code}
        onValueChange={setCode}
        onComplete={(value) => verifyCode(value)}
      >
        <AuthCode.Input index={0} />
        <AuthCode.Input index={1} />
        <AuthCode.Input index={2} />
        <AuthCode.Input index={3} />
      </AuthCode.Group>
      <button onClick={() => setCode('')}>Clear</button>
    </>
  );
}
```

### Form Integration

```tsx
import { AuthCode } from 'awesome-auth-input';

function OTPForm() {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      console.log('OTP:', formData.get('otp'));
    }}>
      <AuthCode.Group name="otp" autoSubmit>
        <AuthCode.Input index={0} />
        <AuthCode.Input index={1} />
        <AuthCode.Input index={2} />
        <AuthCode.Input index={3} />
        <AuthCode.Input index={4} />
        <AuthCode.Input index={5} />
      </AuthCode.Group>
      <button type="submit">Verify</button>
    </form>
  );
}
```

### Password/PIN Mode

```tsx
<AuthCode.Group type="password">
  <AuthCode.Input index={0} />
  <AuthCode.Input index={1} />
  <AuthCode.Input index={2} />
  <AuthCode.Input index={3} />
</AuthCode.Group>
```

### With Separator

```tsx
<AuthCode.Group>
  <AuthCode.Input index={0} />
  <AuthCode.Input index={1} />
  <AuthCode.Input index={2} />
  <span className="separator">-</span>
  <AuthCode.Input index={3} />
  <AuthCode.Input index={4} />
  <AuthCode.Input index={5} />
</AuthCode.Group>
```

### Disabled State

```tsx
<AuthCode.Group disabled={isVerifying}>
  <AuthCode.Input index={0} />
  <AuthCode.Input index={1} />
  <AuthCode.Input index={2} />
  <AuthCode.Input index={3} />
</AuthCode.Group>
```

### Custom Styling

The component is completely unstyled. Add your own CSS:

```css
.otp-group {
  display: flex;
  gap: 8px;
}

.otp-input {
  width: 48px;
  height: 56px;
  text-align: center;
  font-size: 24px;
  border: 2px solid #ccc;
  border-radius: 8px;
}

.otp-input:focus {
  outline: none;
  border-color: #0070f3;
  box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.15);
}

.otp-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f5f5f5;
}
```

```tsx
<AuthCode.Group className="otp-group">
  <AuthCode.Input index={0} className="otp-input" />
  <AuthCode.Input index={1} className="otp-input" />
  {/* ... */}
</AuthCode.Group>
```

## Advanced Features

### Smart Focus Management

The component intelligently manages focus to provide a smooth user experience:

- **Auto-advance**: Automatically moves to the next input when a character is entered
- **Smart clicking**: Clicking any input focuses the first empty field (or current field if all are filled)
- **Roving tabindex**: Only the current input is in the tab order for better keyboard navigation

### Password Manager Protection

The component includes data attributes to prevent password managers from interfering:

```tsx
// Automatically applied to all inputs
data-1p-ignore         // 1Password
data-lpignore="true"   // LastPass  
data-bwignore="true"   // Bitwarden
data-form-type="other" // Generic managers
```

### Intelligent Paste Handling

Paste operations are smartly detected and handled:

- Detects clipboard paste vs. manual typing
- Validates pasted content against the validation pattern
- Auto-fills all fields from the paste position
- Handles both short and long pasted values

### Copy Support

Copy the entire auth code with Ctrl/Cmd+C:

```tsx
<AuthCode.Group onComplete={(code) => console.log('Code:', code)}>
  {/* Ctrl/Cmd+C copies the complete code */}
  <AuthCode.Input index={0} />
  <AuthCode.Input index={1} />
  <AuthCode.Input index={2} />
  <AuthCode.Input index={3} />
</AuthCode.Group>
```

## TypeScript

Types are exported for your convenience:

```tsx
import type {
  AuthCodeGroupProps,
  AuthCodeInputProps,
  ValidationPattern,
  CustomValidation,
} from 'awesome-auth-input';
```

## Tree-Shaking

For optimized bundle sizes, you can import individual components:

```tsx
// Compound component (recommended)
import { AuthCode } from 'awesome-auth-input';

// Individual components for tree-shaking
import { 
  AuthCodeGroup, 
  AuthCodeInput, 
  AuthCodeHiddenInput 
} from 'awesome-auth-input';

// Use them directly
<AuthCodeGroup onComplete={(code) => console.log(code)}>
  <AuthCodeInput index={0} />
  <AuthCodeInput index={1} />
</AuthCodeGroup>
```

## Keyboard Navigation

- **Arrow Left/Right** - Navigate between inputs
- **Backspace/Delete** - Delete current character and move to previous
- **Ctrl/Cmd + Backspace** - Clear all inputs
- **Enter** - Submit the form
- **Ctrl/Cmd + C** - Copy complete code to clipboard
- **Ctrl/Cmd + V** - Paste code from clipboard (auto-fills all fields)

## Accessibility

- Proper ARIA labels for each input (e.g., "One Time Password Character 1 out of 6")
- Focus management with roving tabindex
- Screen reader announcements for better UX
- Full keyboard navigation support
- Works with password managers (disabled with data attributes to prevent conflicts)
- Auto-complete hints for mobile devices (`autocomplete="one-time-code"` on hidden input)

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers with virtual keyboards

## License

MIT
