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
  | { type: "SUBMIT_CODE" };

interface AuthCodeContextValue {
  dispatch: React.Dispatch<FieldUpdateAction>;
  value: string[];
  inputRefSetter: (ref: HTMLInputElement | null) => void;
  name?: string;
  hiddenInputRef: Ref<HTMLInputElement | null>;
  validation:
    | (typeof defaultPatternInputMap)[DefaultInputTypes]
    | ({ type: "custom" } & CustomValidation);
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
}

export function AuthCodeField({
  children,
  name,
  validation = { type: "numeric" },
  autoSubmit = true,
  onComplete,
}: AuthCodeFieldProps) {
  const inputElements = useRef<Map<HTMLInputElement, true>>(new Map());
  const [value, setValue] = useState<string[]>([]);
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
        const { char, index } = action;
        const newValue = value.slice();
        newValue[index] = char;

        setValue(newValue);
        requestAnimationFrame(() => {
          inputs.at(index + 1)?.focus();
        });
        return;
      }

      case "REMOVE_CHAR": {
        const { index } = action;
        const newValue = value.slice();
        newValue[index] = "";
        setValue(newValue);

        if (index != 0) {
          inputs.at(index - 1)?.focus();
        }
        return;
      }

      case "SUBMIT_CODE": {
        // should the code be submitted when it is incomplete?
        const currentValue = value.join("");
        onComplete?.(currentValue);
        hiddenInputRef.current?.form?.requestSubmit();
        break;
      }

      case "PASTE": {
        const { value } = action;
        const totalInputLength = inputs.length;

        const pastedInputs = Array.from(value);
        const paddedInputs = Array(
          Math.max(0, totalInputLength - value.length)
        ).fill("");

        setValue([...pastedInputs, ...paddedInputs]);

        if (value.length === totalInputLength) {
          focusInput(inputs.at(-1));
        } else {
          focusInput(inputs.at(value.length));
        }
      }
    }
  });

  const focusInput = (element: HTMLInputElement | undefined) => {
    if (element === undefined) return;
    element.focus();
  };

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
    }),
    [value]
  );

  return (
    <AuthCodeContext.Provider value={memoizedValue}>
      <div
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
  const { dispatch, inputRefSetter, validation } = context;
  const value = context.value[index] || "";
  const memoizedRefs = useCallback(mergeRefs(inputRefSetter), [inputRefSetter]);

  return (
    <input
      type="text"
      key={index}
      ref={memoizedRefs}
      inputMode={validation.inputMode}
      pattern=""
      {...props}
      onChange={() => {}}
      onKeyDown={(event) => {
        switch (event.key) {
          case "Backspace": {
            dispatch({ type: "REMOVE_CHAR", index });
            break;
          }
          case "Enter": {
            dispatch({ type: "SUBMIT_CODE" });
            return;
          }
          case "ArrowLeft": {
            break;
          }
          case "ArrowRight": {
            break;
          }
          default:
            // TODO: use actual validation function
            dispatch({ type: "TYPE_CHAR", char: event.key, index });
        }
      }}
      value={value}
    />
  );
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

const numericRegex = RegExp(/^\d$/);
const alphaNumericRegex = RegExp(/^([a-zA-Z]|\d)$/);
const alphaRegex = RegExp(/^[a-zA-Z]$/);

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
    regexp: numericRegex,
    pattern: "[0-9]{1}",
    inputMode: "numeric",
  },
} as const;
