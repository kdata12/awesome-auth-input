import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type Ref,
  useMemo,
  useEffectEvent,
  useEffect,
} from "react";

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
  | { type: "NAVIGATE_NEXT"; index: number };

interface AuthCodeContextValue {
  dispatch: React.Dispatch<FieldUpdateAction>;
  value: string[];
  inputRefSetter: (ref: HTMLInputElement | null) => void;
  name?: string;
  hiddenInputRef: Ref<HTMLInputElement | null>;
  validation:
    | (typeof defaultPatternInputMap)[DefaultInputTypes]
    | ({ type: "custom" } & CustomValidation);
  type: "text" | "password";
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
}

type DefaultInputTypes = "alpha" | "alphanumeric" | "numeric";

const AuthCodeContext = createContext<AuthCodeContextValue | null>(null);

function useAuthCodeContext() {
  const value = useContext(AuthCodeContext);
  if (!value) {
    throw Error("AuthCodeField context value is undefined");
  }
  return value;
}

interface AuthCodeFieldProps {
  children: ReactNode;
  name?: string;
  validation?: ValidationPattern;
  autoSubmit?: boolean;
  onComplete?: (value: string) => void;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  type?: "text" | "password";
}

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

export function AuthCodeField({
  children,
  name,
  validation = { type: "numeric" },
  autoSubmit = true,
  onComplete,
  value: userValue,
  onValueChange: userOnValueChange,
  defaultValue,
  type = "text",
}: AuthCodeFieldProps) {
  const inputElements = useRef<Map<HTMLInputElement, true>>(new Map());

  const [value, setValue] = useControllableState<string[]>({
    value: userValue !== undefined ? Array.from(userValue) : undefined,
    defaultValue: defaultValue ? Array.from(defaultValue) : [],
    onValueChange: userOnValueChange
      ? (chars) => userOnValueChange(chars.join(""))
      : undefined,
  });

  const [focusedIndex, setFocusedIndex] = useState(0);

  const setRef = useCallback((ref: HTMLInputElement | null) => {
    if (ref) {
      if (!inputElements.current.has(ref)) {
        inputElements.current.set(ref, true);
      }
    }
  }, []);

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const getPattern = useCallback(() => {
    switch (validation.type) {
      case "alpha":
        return alphaRegex;
      case "alphanumeric":
        return alphaNumericRegex;
      case "numeric":
        return numericRegex;
      case "custom":
        return validation.regex;
      default:
        throw new Error("No validation pattern");
    }
  }, [validation.type]);

  const dispatch = useEffectEvent((action: FieldUpdateAction) => {
    // TODO: use an ordered dictionary instead
    const inputs = Array.from(inputElements.current.keys());
    switch (action.type) {
      case "TYPE_CHAR": {
        const { char, index: clickedIndex } = action;

        const isEditing = !!value[clickedIndex];
        const firstEmpty = Array.from({ length: inputs.length }).findIndex(
          (_, i) => !value[i]
        );

        const finalIndex =
          isEditing || firstEmpty === -1 ? clickedIndex : firstEmpty;

        const newValue = Array.from({ length: inputs.length }, (_, i) => {
          if (i === finalIndex) return char;
          return value[i] ?? "";
        });

        setValue(newValue);

        if (finalIndex < inputs.length - 1) {
          requestAnimationFrame(() => focusInput(inputs.at(finalIndex + 1)));
        } else {
          requestAnimationFrame(() => focusInput(inputs.at(finalIndex)));
        }
        return;
      }

      case "REMOVE_CHAR": {
        const { index } = action;
        const newValue = value.slice();
        newValue[index] = "";
        setValue(newValue);

        if (index != 0) {
          focusInput(inputs.at(index - 1));
        }
        return;
      }

      case "CLEAR_CHAR": {
        const { index } = action;
        const newValue = value.slice();
        newValue[index] = "";
        setValue(newValue);
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

        const pastedText = Array.from(value);
        const paddedInputs = Array(
          Math.max(0, totalInputLength - value.length)
        ).fill("");

        setValue([...pastedText, ...paddedInputs]);

        if (value.length === totalInputLength) {
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
        if (index < inputs.length - 1) {
          focusInput(inputs.at(index + 1));
        }
        return;
      }
    }
  });

  const valueLength = inputElements.current.size;

  useEffect(() => {
    const currentValue = value.join("");
    const isComplete =
      currentValue.length === valueLength &&
      value.every((v) => v !== "") &&
      valueLength > 0;

    if (!isComplete) return;

    onComplete?.(currentValue);

    if (autoSubmit) {
      hiddenInputRef.current?.form?.requestSubmit();
    }
  }, [value, valueLength, onComplete, autoSubmit]);

  const memoizedValue = useMemo(
    () => ({
      dispatch,
      value,
      inputRefSetter: setRef,
      name,
      hiddenInputRef,
      getPattern,
      validation:
        validation.type == "custom"
          ? validation
          : defaultPatternInputMap[validation.type],
      type,
      focusedIndex,
      setFocusedIndex,
    }),
    [value, focusedIndex]
  );

  return (
    <AuthCodeContext.Provider value={memoizedValue}>
      <div
        // Delegating all input's paste event this parent handler
        // because we want to control the paste for all inputs.
        onPaste={(event) => {
          event.preventDefault();
          const clipboardData = event.clipboardData;
          const pastedText = clipboardData.getData("text/plain");

          dispatch({ type: "PASTE", value: pastedText });
        }}
      >
        {children}
      </div>
    </AuthCodeContext.Provider>
  );
}

export function AuthCodeHiddenInput({ ref }: { ref?: Ref<HTMLInputElement> }) {
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
      id="otp"
      type="hidden"
      autoCapitalize="off"
      autoCorrect="off"
      autoSave="off"
      inputMode="numeric"
      autoComplete="one-time-code"
      required
    />
  );
}

interface AuthCodeInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> {
  index: number;
}

export function AuthCodeInput({ index, ...props }: AuthCodeInputProps) {
  const context = useAuthCodeContext();
  const {
    dispatch,
    inputRefSetter,
    validation,
    focusedIndex,
    setFocusedIndex,
  } = context;
  const value = context.value[index] || "";
  const memoizedRefs = useCallback(mergeRefs(inputRefSetter), [inputRefSetter]);
  return (
    <input
      type={context.type}
      key={index}
      tabIndex={index === focusedIndex ? 0 : -1}
      ref={memoizedRefs}
      inputMode={validation.inputMode}
      pattern={validation.pattern}
      {...props}
      onPointerDown={(event) => {
        // A click/touch on an input can cause the input to be out of selection so
        // we must prevent that default action and keep the input selected
        // in order to having a singular value
        event.preventDefault();
        event.currentTarget.select();
      }}
      onFocus={(event) => {
        // select entire input instead of just focus
        event.target.select();
        setFocusedIndex(index);
      }}
      onChange={(event) => {
        const newValue = event.target.value;
        // check if value is valid against pattern
        if (event.target.validity.patternMismatch) return;
        dispatch({ type: "TYPE_CHAR", char: newValue, index });
      }}
      onKeyDown={(event) => {
        // onKeyDown describes the intent of the user's key(s) presses
        if (event.metaKey && event.key == "c") return;

        if (
          isUndoShortcut(event) ||
          isCopyShortcut(event) ||
          isRedoShortcut(event)
        ) {
          event.preventDefault();
        }

        switch (event.key) {
          case "Backspace": {
            event.preventDefault();
            dispatch({ type: "REMOVE_CHAR", index });
            return;
          }

          case "Delete": {
            event.preventDefault();
            dispatch({ type: "CLEAR_CHAR", index });
            return;
          }
          case "Enter": {
            dispatch({ type: "SUBMIT_CODE" });
            return;
          }

          // left and right navigation should not move caret
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
          default:
            // TODO: use actual validation function
            if (event.key === value) {
              dispatch({ type: "TYPE_CHAR", char: value, index });
              return;
            }
        }
      }}
      value={value}
    />
  );
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
function mergeRefs<T = any>(
  ...refSetter: MergedRef<T>[]
): React.RefCallback<T> {
  return function (node) {
    refSetter.forEach((ref) => {
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
  // ownerDocument property keeps
  if (element.ownerDocument.activeElement === element) {
    element.select();
  } else {
    element.focus();
  }
};

export {
  AuthCodeField as Group,
  AuthCodeInput as Input,
  AuthCodeHiddenInput as HiddenInput,
};

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
