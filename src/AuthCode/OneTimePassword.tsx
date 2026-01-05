import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type Ref,
  useMemo,
  useEffect,
  forwardRef,
} from "react";
import { flushSync } from "react-dom";

interface AuthCodeCustomField {
  /**
   * The child components, typically `<AuthCode.Input>` components.
   *
   * All `<AuthCode.Input>` components must be direct or nested children of `<AuthCode.Group>`.
   */
  children: ReactNode;
  /**
   * A string specifying a name for the input control. This name is submitted
   * along with the control's value when the form data is submitted.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name
   */
  name?: string;
  /**
   * Specifies what type of validation the user agent has to provide for each
   * character input. Allows "numeric", "alpha", "alphanumeric", or a custom
   * validation pattern with regex.
   *
   * @defaultValue `{ type: "numeric" }`
   *
   * @example
   * ```tsx
   * // Numeric only (default)
   * <AuthCode.Group validation={{ type: "numeric" }} />
   *
   * // Alphabetic only
   * <AuthCode.Group validation={{ type: "alpha" }} />
   *
   * // Custom validation
   * <AuthCode.Group
   *   validation={{
   *     type: "custom",
   *     regex: /^[A-Z]$/,
   *     pattern: "[A-Z]{1}",
   *     inputMode: "text"
   *   }}
   * />
   * ```
   */
  validation?: ValidationPattern;
  /**
   * Whether or not the component should attempt to automatically submit when
   * all fields are filled. If the field is associated with an HTML `form`
   * element, the form's `requestSubmit` method will be called.
   *
   * @defaultValue `true`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit
   */
  autoSubmit?: boolean;
  /**
   * When the `autoSubmit` prop is set to `true`, this callback will be fired
   * before attempting to submit the associated form. It will be called whether
   * or not a form is located, or if submission is not allowed.
   *
   * The callback receives the complete auth code value as a string.
   *
   * @example
   * ```tsx
   * <AuthCode.Group
   *   onComplete={(value) => {
   *     console.log('Code entered:', value);
   *     verifyCode(value);
   *   }}
   * />
   * ```
   */
  onComplete?: (value: string) => void;
  /**
   * The controlled value of the field. When provided, the component operates
   * in controlled mode. This string's value, if present, must match the total
   * number of `<AuthCode.Input>` components.
   *
   * @example
   * ```tsx
   * const [code, setCode] = useState('');
   * <AuthCode.Group value={code} onValueChange={setCode} />
   * ```
   */
  value?: string;
  /**
   * A callback fired whenever the field value changes. This callback is called
   * with the complete auth code value as a string.
   *
   * Use this prop together with `value` to create a controlled component.
   */
  onValueChange?: (value: string) => void;
  /**
   * The initial value of the uncontrolled field. When provided without `value`,
   * the component operates in uncontrolled mode.
   *
   * @example
   * ```tsx
   * <AuthCode.Group defaultValue="123" />
   * ```
   */
  defaultValue?: string;
  /**
   * The type of control to render. Allows "text" or "password".
   *
   * When set to "password", the input characters will be masked.
   *
   * @defaultValue `"text"`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#type
   */
  type?: "text" | "password";
  /**
   * Whether or not the input elements are disabled.
   *
   * When set to `true`, all `<AuthCode.Input>` components will be disabled
   * and users will not be able to interact with them.
   *
   * @defaultValue `false`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
   */
  disabled?: boolean;
}

interface AuthCodeFieldProps
  extends AuthCodeCustomField,
    Omit<React.ComponentProps<"div">, keyof AuthCodeCustomField> {}

const AuthCodeField = forwardRef<HTMLDivElement, AuthCodeFieldProps>(
  function AuthCodeField(
    {
      children,
      name,
      validation = { type: "numeric" },
      autoSubmit = true,
      onComplete,
      value: userValue,
      onValueChange: userOnValueChange,
      defaultValue,
      type = "text",
      disabled = false,
      ...divProps
    }: AuthCodeFieldProps,
    forwardedRef
  ) {
    const inputElements = useRef<Map<HTMLInputElement, true>>(new Map());
    const [value, setValue] = useControllableState<string[]>({
      value: userValue !== undefined ? Array.from(userValue) : undefined,
      defaultValue: defaultValue ? Array.from(defaultValue) : [],
      onValueChange: userOnValueChange
        ? (chars) => userOnValueChange(chars.join(""))
        : undefined,
    });

    const validationConfig =
      validation.type == "custom"
        ? validation
        : defaultPatternInputMap[validation.type];

    const [focusedIndex, setFocusedIndex] = useState(0);
    const [inputCount, setInputCount] = useState(0);

    const registerInputRef = useCallback((ref: HTMLInputElement | null) => {
      if (ref) {
        if (!inputElements.current.has(ref)) {
          inputElements.current.set(ref, true);
          setInputCount(inputElements.current.size);
        }
      }
    }, []);

    const validateChar = useCallback(
      (char: string): boolean => {
        if (!char) return true;

        const regex = validationConfig.regex;
        return regex.test(char);
      },
      [validationConfig]
    );

    const validateString = useCallback(
      (str: string): string => {
        return Array.from(str)
          .filter((char) => validateChar(char))
          .join("");
      },
      [validateChar]
    );

    const hiddenInputRef = useRef<HTMLInputElement | null>(null);

    // consider removing useEffectEvent
    const dispatch = (action: FieldUpdateAction) => {
      // use an ordered dictionary instead?
      const inputs = Array.from(inputElements.current.keys());
      switch (action.type) {
        case "TYPE_CHAR": {
          const { char, index: targetIndex } = action;

          if (!validateChar(char)) return;

          const hasExistingValue = !!value[targetIndex];
          const firstEmptyIndex = Array.from({
            length: inputs.length,
          }).findIndex((_, i) => !value[i]);

          const insertionIndex =
            hasExistingValue || firstEmptyIndex === -1
              ? targetIndex
              : firstEmptyIndex;

          const newValue = Array.from({ length: inputs.length }, (_, i) => {
            if (i === insertionIndex) return char;
            return value[i] ?? "";
          });

          flushSync(() => {
            setValue(newValue);
          });

          if (insertionIndex < inputs.length - 1) {
            requestAnimationFrame(() =>
              focusInput(inputs.at(insertionIndex + 1))
            );
          } else {
            requestAnimationFrame(() => {
              focusInput(inputs.at(insertionIndex));
            });
          }
          return;
        }

        case "REMOVE_CHAR": {
          const { index } = action;
          const totalInputLength = inputs.length;

          // Remove character and shift remaining values left
          const leftPortion = value.slice(0, index);
          const rightPortion = value.slice(index + 1);
          const compacted = leftPortion.concat(rightPortion);
          const emptySlots = Array(
            Math.max(0, totalInputLength - compacted.length)
          ).fill("");

          flushSync(() => setValue(compacted.concat(emptySlots)));

          if (index != 0) {
            focusInput(inputs.at(index - 1));
          } else {
            // index is 0
            focusInput(inputs.at(0));
          }
          return;
        }

        case "CLEAR_CHAR": {
          const { index } = action;
          const newValue = value.slice();
          newValue[index] = "";
          flushSync(() => setValue(newValue));
          return;
        }

        case "SUBMIT_CODE": {
          const currentValue = value.join("");
          onComplete?.(currentValue);
          hiddenInputRef.current?.form?.requestSubmit();
          break;
        }

        case "PASTE": {
          const { value } = action;
          const totalInputLength = inputs.length;

          const validatedValue = validateString(value);
          if (validatedValue.length === 0) return;

          const pastedCharacters = Array.from(value).slice(0, inputs.length);
          const emptySlots = Array(
            Math.max(0, totalInputLength - value.length)
          ).fill("");

          flushSync(() => setValue([...pastedCharacters, ...emptySlots]));

          if (pastedCharacters.length === totalInputLength) {
            focusInput(inputs.at(-1));
          } else {
            focusInput(inputs.at(value.length));
          }
          return;
        }
        case "NAVIGATE_PREVIOUS": {
          const { index } = action;
          if (index > 0) {
            focusInput(inputs.at(index - 1));
          }
          return;
        }

        case "NAVIGATE_NEXT": {
          const { index } = action;
          if (value[index] && index < inputs.length - 1) {
            focusInput(inputs.at(index + 1));
            return;
          }

          const firstEmpty = Array.from({ length: inputs.length }).findIndex(
            (_, i) => !value[i]
          );

          // BUG: if a value was deleted in the middle of a sequence, then we would
          // not be able to navigate to the right side of the sequence

          focusInput(inputs.at(firstEmpty));
          return;
        }

        case "CLEAR_ALL": {
          flushSync(() => setValue([]));
          focusInput(inputs.at(0));
          return;
        }
      }
    };

    useEffect(() => {
      const concatenatedValue = value.join("");
      const isCodeFullyEntered =
        concatenatedValue.length === inputCount &&
        value.every((v) => v !== "") &&
        inputCount > 0;

      if (!isCodeFullyEntered) return;

      onComplete?.(concatenatedValue);

      if (autoSubmit) {
        hiddenInputRef.current?.form?.requestSubmit();
      }
    }, [value, inputCount, onComplete, autoSubmit]);

    const contextValue = useMemo(
      () => ({
        dispatch,
        value,
        registerInputRef,
        name,
        hiddenInputRef,
        validation: validationConfig,
        type,
        focusedIndex,
        setFocusedIndex,
        disabled,
        inputCount,
        inputElements: inputElements.current,
      }),
      [value, focusedIndex, disabled, name, type, inputCount]
    );

    return (
      <AuthCodeContext.Provider value={contextValue}>
        <div
          // Delegating all input's paste event this parent handler
          // because we want to control the paste for all inputs.
          ref={forwardedRef}
          onPaste={(event) => {
            event.preventDefault();
            const clipboardData = event.clipboardData;
            const pastedText = clipboardData.getData("text/plain");

            dispatch({ type: "PASTE", value: pastedText });
          }}
          {...divProps}
        >
          <AuthCodeHiddenInput />
          {children}
        </div>
      </AuthCodeContext.Provider>
    );
  }
);

const AuthCodeHiddenInput = forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "ref">
>(function AuthCodeHiddenInput(props, ref) {
  const context = useAuthCodeContext();
  const { name, value, hiddenInputRef } = context;
  const memoizedRefs = useCallback(mergeRefs(ref, hiddenInputRef), [
    ref,
    hiddenInputRef,
  ]);
  return (
    <input
      ref={memoizedRefs}
      name={name}
      value={value.join("")}
      autoCapitalize="off"
      autoCorrect="off"
      autoSave="off"
      inputMode="numeric"
      autoComplete="one-time-code"
      required
      {...props}
      type="hidden"
    />
  );
});

/**
 * Input component for entering a single character of the auth code.
 *
 * **Must be used within `<AuthCode.Group>`**
 *
 * @example
 *
 * <AuthCode.Group>
 *   <AuthCode.Input index={0} />
 *   <AuthCode.Input index={1} />
 * </AuthCode.Group>
 *  */
export function AuthCodeInput({ index, ...props }: AuthCodeInputProps) {
  const context = useAuthCodeContext();
  const {
    dispatch,
    registerInputRef,
    validation,
    focusedIndex,
    setFocusedIndex,
    disabled,
    inputCount,
  } = context;

  const currentCharacter = context.value[index] || "";
  const firstEmptyIndex = Array.from({ length: inputCount }).findIndex(
    (_, i) => !context.value[i]
  );
  const nextEmptyOrLastIndex =
    firstEmptyIndex === -1 ? inputCount - 1 : firstEmptyIndex;
  const mergedInputRef = useCallback(mergeRefs(registerInputRef), [
    registerInputRef,
  ]);
  return (
    <input
      type={context.type}
      tabIndex={index === focusedIndex ? 0 : -1}
      ref={mergedInputRef}
      inputMode={validation.inputMode}
      pattern={validation.pattern}
      aria-label={`One Time Password Character ${
        index + 1
      } out of ${inputCount}`}
      disabled={disabled}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      // Disable password managers
      data-1p-ignore // 1Password
      data-lpignore="true" // LastPass
      data-form-type="other" // Generic password managers
      data-bwignore="true" // Bitwarden
      {...props}
      onPointerDown={(event) => {
        // A click/touch on an input can cause the input to be out of selection so
        // we must prevent that default action and keep the input selected
        // in order to have a singular value
        event.preventDefault();
        const focusTargetIndex = Math.min(index, nextEmptyOrLastIndex);
        const focusTargetElement = Array.from(context.inputElements.keys())[
          focusTargetIndex
        ];
        focusInput(focusTargetElement);
      }}
      onFocus={(event) => {
        // select entire input instead of just focus
        event.target.select();
        setFocusedIndex(index);
      }}
      onInput={(event) => {
        const newInputValue = event.currentTarget.value;

        // Only treat as paste if it's an actual paste operation or truly long input
        // Single character duplicates (like "11" from typing "1" on "1") should go through onChange
        const browserInputType = (event.nativeEvent as InputEvent).inputType;
        const isPasteOperation =
          browserInputType === "insertFromPaste" ||
          browserInputType === "insertFromDrop";
        const isLongInput = newInputValue.length > 2;

        if (isPasteOperation || isLongInput) {
          event.preventDefault();
          dispatch({ type: "PASTE", value: newInputValue });
        }
      }}
      onChange={(event) => {
        const newInputValue = event.target.value;
        console.log("changing at index: ", index);
        // check if value is valid against pattern
        if (event.target.validity.patternMismatch) return;
        dispatch({ type: "TYPE_CHAR", char: newInputValue, index });
      }}
      onKeyDown={mergeEventHandlers(props.onKeyDown, (event) => {
        // onKeyDown describes the intent of the user's key(s) presses
        if (event.metaKey && event.key == "c") return;

        if (
          isUndoShortcut(event) ||
          isCopyShortcut(event) ||
          isRedoShortcut(event)
        ) {
          event.preventDefault();
          return;
        }

        if ((event.metaKey || event.ctrlKey) && event.key === "Backspace") {
          dispatch({ type: "CLEAR_ALL" });
          return;
        }

        switch (event.key) {
          case "Delete":
          case "Backspace": {
            event.preventDefault();
            dispatch({ type: "REMOVE_CHAR", index });
            return;
          }

          case "Enter": {
            dispatch({ type: "SUBMIT_CODE" });
            return;
          }

          case "ArrowLeft": {
            event.preventDefault();
            dispatch({ type: "NAVIGATE_PREVIOUS", index });
            return;
          }
          case "ArrowRight": {
            event.preventDefault();
            dispatch({ type: "NAVIGATE_NEXT", index });
            return;
          }

          // Prevents up and down movements from unselecting
          case "ArrowUp":
          case "ArrowDown": {
            event.preventDefault();
            return;
          }

          default:
            if (event.key === currentCharacter) {
              // this is essentially focusing the next input
              dispatch({ type: "TYPE_CHAR", char: currentCharacter, index });
              return;
            }

            if (event.metaKey || event.ctrlKey) {
              return;
            }

            const hasValue = !!event.currentTarget.value;
            const isFullySelected =
              event.currentTarget.selectionStart === 0 &&
              event.currentTarget.selectionEnd != null &&
              event.currentTarget.selectionEnd > 0;

            // When input has value and is fully selected, validate the incoming key
            // to prevent selection loss from invalid keystrokes
            if (hasValue && isFullySelected) {
              // Only validate printable single characters (ignore modifiers, arrows, etc.)
              if (event.key.length === 1) {
                const isValid = validation.regex.test(event.key);
                if (!isValid) {
                  event.preventDefault();
                  return;
                }
              }
            }
        }
      })}
      value={currentCharacter}
    />
  );
}

// =================================================
// CONTEXT
// =================================================

const AuthCodeContext = createContext<AuthCodeContextValue | null>(null);

function useAuthCodeContext() {
  const value = useContext(AuthCodeContext);
  if (!value) {
    throw new Error(
      "\n[awesome-auth-input] <AuthCode.Input> must be used within <AuthCode.Group>.\n\n" +
        "Make sure all <AuthCode.Input> components are children of <AuthCode.Group>:\n\n" +
        "Example:\n" +
        "  <AuthCode.Group>\n" +
        "    <AuthCode.Input index={0} />\n" +
        "    <AuthCode.Input index={1} />\n" +
        "  </AuthCode.Group>\n"
    );
  }
  return value;
}

// =================================================
// HELPERS & HOOKS
// =================================================

function mergeEventHandlers<E extends { defaultPrevented: boolean }>(
  currentHandler?: (event: E) => void,
  nextHandler?: (event: E) => void
) {
  return (event: E) => {
    currentHandler?.(event);

    if (!event.defaultPrevented) {
      nextHandler?.(event);
    }
  };
}

function isUndoShortcut(event: React.KeyboardEvent<HTMLInputElement>): boolean {
  return (event.metaKey || event.ctrlKey) && event.key === "z";
}

function isRedoShortcut(event: React.KeyboardEvent<HTMLInputElement>): boolean {
  return (
    (event.metaKey || event.ctrlKey) &&
    (event.key === "y" || (event.shiftKey && event.key === "z"))
  );
}

function isCopyShortcut(event: React.KeyboardEvent<HTMLInputElement>): boolean {
  return (event.metaKey || event.ctrlKey) && event.key === "c";
}

type MergedRef<T> = Ref<T> | undefined | null;
function mergeRefs<T = any>(...refs: MergedRef<T>[]): React.RefCallback<T> {
  return function (node) {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    });
  };
}

const focusInput = (element: HTMLInputElement | undefined) => {
  if (!element) return;
  if (element.disabled) return;
  // ownerDocument is the opened 'window' that owns the element
  // e.g. popups or a browser-in-browser
  if (element.ownerDocument.activeElement === element) {
    element.select();
  } else {
    element.focus();
  }
};

function useControllableState<T>({
  defaultValue,
  onValueChange,
  value,
}: {
  defaultValue: T;
  onValueChange?: (value: T) => void;
  value?: T;
}): [T, (newValue: T) => void] {
  const [internalState, setInternalState] = useState<T>(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalState;

  const setState = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalState(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  return [currentValue, setState];
}

// =================================================
// INTERNAL TYPES & CONFIG
// =================================================

type InputMode = "text" | "numeric" | "none";

type ValidationPattern =
  | ({ type: "custom" } & CustomValidation)
  | { type: "alpha" }
  | { type: "alphanumeric" }
  | { type: "numeric" };

type CustomValidation = {
  regex: RegExp;
  pattern: string;
  inputMode: InputMode;
};

interface AuthCodeInputProps
  extends Omit<
    React.ComponentProps<"input">,
    | "value"
    | "placeholder"
    | "disabled"
    | "autoComplete"
    | "defaultValue"
    | "type"
  > {
  index: number;
}

interface AuthCodeContextValue {
  dispatch: React.Dispatch<FieldUpdateAction>;
  value: string[];
  registerInputRef: (ref: HTMLInputElement | null) => void;
  name?: string;
  hiddenInputRef: Ref<HTMLInputElement | null>;
  validation:
    | (typeof defaultPatternInputMap)[DefaultInputTypes]
    | ({ type: "custom" } & CustomValidation);
  type: "text" | "password";
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  disabled: boolean;
  inputCount: number;
  inputElements: Map<HTMLInputElement, true>;
}

type DefaultInputTypes = "alpha" | "alphanumeric" | "numeric";

const numericRegex = /^\d$/;
const alphaNumericRegex = /^[a-zA-Z\d]$/;
const alphaRegex = /^[a-zA-Z]$/;

const defaultPatternInputMap = {
  alpha: {
    type: "alpha",
    regex: alphaRegex,
    pattern: "[a-zA-Z]{1}",
    inputMode: "text",
  },
  alphanumeric: {
    type: "alphanumeric",
    regex: alphaNumericRegex,
    pattern: "[a-zA-Z0-9]{1}",
    inputMode: "text",
  },
  numeric: {
    type: "numeric",
    regex: numericRegex,
    pattern: "[0-9]{1}",
    inputMode: "numeric",
  },
} as const;

type FieldUpdateAction =
  | {
      type: "TYPE_CHAR";
      char: string;
      index: number;
    }
  | { type: "PASTE"; value: string }
  | { type: "REMOVE_CHAR"; index: number }
  | { type: "SUBMIT_CODE" }
  | { type: "CLEAR_CHAR"; index: number }
  | { type: "NAVIGATE_PREVIOUS"; index: number }
  | { type: "NAVIGATE_NEXT"; index: number }
  | { type: "CLEAR_ALL" }

// =================================================
// EXPORTS
// =================================================

export {
  AuthCodeField as Group,
  AuthCodeInput as Input,
  AuthCodeHiddenInput as HiddenInput,
};

export type {
  AuthCodeFieldProps as AuthCodeGroupProps,
  AuthCodeInputProps,
  ValidationPattern,
  CustomValidation,
};
