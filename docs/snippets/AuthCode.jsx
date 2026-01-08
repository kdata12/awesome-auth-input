// This module is not a real implementation of AuthCode but it is written
// for the purpose of rendering demos in the mintlify docs

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";

export const World = () => {
  return <div>World</div>;
};

// =================================================
// INTERNAL CONFIG (exported for Mintlify MDX scope resolution)
// =================================================

export const numericRegex = /^\d$/;
export const alphaNumericRegex = /^[a-zA-Z\d]$/;
export const alphaRegex = /^[a-zA-Z]$/;

export const defaultPatternInputMap = {
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
};

// =================================================
// CONTEXT
// =================================================

export const AuthCodeContext = createContext(null);

export const useAuthCodeContext = () => {
  const value = useContext(AuthCodeContext);
  if (!value) {
    throw new Error(
      "[awesome-auth-input] <AuthCode.Input> must be used within <AuthCode.Group>."
    );
  }
  return value;
};

// =================================================
// HELPERS (exported for Mintlify MDX scope resolution)
// =================================================

export const mergeEventHandlers = (currentHandler, nextHandler) => (event) => {
  currentHandler?.(event);
  if (!event.defaultPrevented) {
    nextHandler?.(event);
  }
};

export const mergeRefs =
  (...refs) =>
  (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    });
  };

export const focusInput = (element) => {
  if (!element || element.disabled) return;
  if (element.ownerDocument.activeElement === element) {
    element.select();
  } else {
    element.focus();
  }
};

export const useControllableState = ({
  defaultValue,
  onValueChange,
  value,
}) => {
  const [internalState, setInternalState] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalState;

  const setState = useCallback(
    (newValue) => {
      if (!isControlled) {
        setInternalState(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  return [currentValue, setState];
};

// =================================================
// HIDDEN INPUT (Arrow function component)
// =================================================

export const AuthCodeHiddenInput = (props) => {
  const context = useAuthCodeContext();
  const { name, value, hiddenInputRef } = context;

  return (
    <input
      ref={hiddenInputRef}
      name={name}
      value={value.join("")}
      autoCapitalize="off"
      autoCorrect="off"
      autoSave="off"
      inputMode="numeric"
      autoComplete="one-time-code"
      required
      readOnly
      {...props}
      type="hidden"
    />
  );
};

// =================================================
// INPUT (Arrow function component)
// =================================================

export const AuthCodeInput = ({ index, ...props }) => {
  const context = useAuthCodeContext();
  const {
    dispatch,
    registerInputRef,
    validation,
    focusedIndex,
    setFocusedIndex,
    disabled,
    inputCount,
    inputElements,
  } = context;

  const currentCharacter = context.value[index] || "";
  const firstEmptyIndex = Array.from({ length: inputCount }).findIndex(
    (_, i) => !context.value[i]
  );
  const nextEmptyOrLastIndex =
    firstEmptyIndex === -1 ? inputCount - 1 : firstEmptyIndex;
  const inputRef = useRef(null);
  const mergedInputRef = useCallback(mergeRefs(registerInputRef, inputRef), [
    registerInputRef,
  ]);

  const inputPosition = inputRef.current
    ? (inputElements.get(inputRef.current) ?? 0) + 1
    : index + 1;

  return (
    <input
      type={context.type}
      tabIndex={index === focusedIndex ? 0 : -1}
      ref={mergedInputRef}
      inputMode={validation.inputMode}
      pattern={validation.pattern}
      aria-label={`One Time Password Character ${inputPosition} out of ${inputCount}`}
      disabled={disabled}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      data-1p-ignore
      data-lpignore="true"
      data-bwignore="true"
      data-form-type="other"
      {...props}
      onPointerDown={(event) => {
        event.preventDefault();
        const focusTargetIndex = Math.min(index, nextEmptyOrLastIndex);
        const focusTargetElement = Array.from(context.inputElements.keys())[
          focusTargetIndex
        ];
        focusInput(focusTargetElement);
      }}
      onFocus={(event) => {
        event.target.select();
        setFocusedIndex(index);
      }}
      onInput={(event) => {
        const newInputValue = event.currentTarget.value;
        const browserInputType = event.nativeEvent.inputType;
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
        if (event.target.validity.patternMismatch) return;
        dispatch({ type: "TYPE_CHAR", char: newInputValue, index });
      }}
      onKeyDown={mergeEventHandlers(props.onKeyDown, (event) => {
        if (event.metaKey && event.key === "c") return;
        if ((event.metaKey || event.ctrlKey) && event.key === "z") {
          event.preventDefault();
          return;
        }
        if ((event.metaKey || event.ctrlKey) && event.key === "Backspace") {
          dispatch({ type: "CLEAR_ALL" });
          return;
        }

        switch (event.key) {
          case "Delete":
          case "Backspace":
            event.preventDefault();
            dispatch({ type: "REMOVE_CHAR", index });
            return;
          case "Enter":
            dispatch({ type: "SUBMIT_CODE" });
            return;
          case "ArrowLeft":
            event.preventDefault();
            dispatch({ type: "NAVIGATE_PREVIOUS", index });
            return;
          case "ArrowRight":
            event.preventDefault();
            dispatch({ type: "NAVIGATE_NEXT", index });
            return;
          case "ArrowUp":
          case "ArrowDown":
            event.preventDefault();
            return;
          default:
            if (event.key === currentCharacter) {
              dispatch({ type: "TYPE_CHAR", char: currentCharacter, index });
              return;
            }
            if (event.metaKey || event.ctrlKey) return;

            const hasValue = !!event.currentTarget.value;
            const isFullySelected =
              event.currentTarget.selectionStart === 0 &&
              event.currentTarget.selectionEnd != null &&
              event.currentTarget.selectionEnd > 0;

            if (hasValue && isFullySelected && event.key.length === 1) {
              const isValid = validation.regex.test(event.key);
              if (!isValid) {
                event.preventDefault();
              }
            }
        }
      })}
      value={currentCharacter}
    />
  );
};

// =================================================
// GROUP (Arrow function component)
// =================================================

export const AuthCodeGroup = ({
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
}) => {
  const inputElements = useRef(new Map());
  const [value, setValue] = useControllableState({
    value: userValue !== undefined ? Array.from(userValue) : undefined,
    defaultValue: defaultValue ? Array.from(defaultValue) : [],
    onValueChange: userOnValueChange
      ? (chars) => userOnValueChange(chars.join(""))
      : undefined,
  });

  const validationConfig =
    validation.type === "custom"
      ? validation
      : defaultPatternInputMap[validation.type];

  const [focusedIndex, setFocusedIndex] = useState(0);
  const [inputCount, setInputCount] = useState(0);

  const registerInputRef = useCallback((ref) => {
    if (ref && !inputElements.current.has(ref)) {
      const position = inputElements.current.size;
      inputElements.current.set(ref, position);
      setInputCount(inputElements.current.size);
    }
  }, []);

  const validateChar = useCallback(
    (char) => !char || validationConfig.regex.test(char),
    [validationConfig]
  );

  const validateString = useCallback(
    (str) =>
      Array.from(str)
        .filter((char) => validateChar(char))
        .join(""),
    [validateChar]
  );

  const hiddenInputRef = useRef(null);

  const dispatch = useCallback(
    (action) => {
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

          const newValue = Array.from({ length: inputs.length }, (_, i) =>
            i === insertionIndex ? char : value[i] ?? ""
          );

          setValue(newValue);

          setTimeout(() => {
            if (insertionIndex < inputs.length - 1) {
              focusInput(inputs[insertionIndex + 1]);
            } else {
              focusInput(inputs[insertionIndex]);
            }
          }, 0);
          return;
        }

        case "REMOVE_CHAR": {
          const { index } = action;
          const totalInputLength = inputs.length;
          const leftPortion = value.slice(0, index);
          const rightPortion = value.slice(index + 1);
          const compacted = leftPortion.concat(rightPortion);
          const emptySlots = Array(
            Math.max(0, totalInputLength - compacted.length)
          ).fill("");

          setValue(compacted.concat(emptySlots));

          setTimeout(() => {
            focusInput(inputs[index !== 0 ? index - 1 : 0]);
          }, 0);
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
          const { value: pastedValue } = action;
          const totalInputLength = inputs.length;
          const validatedValue = validateString(pastedValue);
          if (validatedValue.length === 0) return;

          const pastedCharacters = Array.from(pastedValue).slice(
            0,
            inputs.length
          );
          const emptySlots = Array(
            Math.max(0, totalInputLength - pastedValue.length)
          ).fill("");

          setValue([...pastedCharacters, ...emptySlots]);

          setTimeout(() => {
            if (pastedCharacters.length === totalInputLength) {
              focusInput(inputs[inputs.length - 1]);
            } else {
              focusInput(inputs[pastedValue.length]);
            }
          }, 0);
          return;
        }

        case "NAVIGATE_PREVIOUS": {
          const { index } = action;
          if (index > 0) focusInput(inputs[index - 1]);
          return;
        }

        case "NAVIGATE_NEXT": {
          const { index } = action;
          if (value[index] && index < inputs.length - 1) {
            focusInput(inputs[index + 1]);
            return;
          }
          const firstEmpty = Array.from({ length: inputs.length }).findIndex(
            (_, i) => !value[i]
          );
          focusInput(inputs[firstEmpty]);
          return;
        }

        case "CLEAR_ALL": {
          setValue([]);
          setTimeout(() => {
            focusInput(inputs[0]);
          }, 0);
          return;
        }
      }
    },
    [value, setValue, validateChar, validateString, onComplete]
  );

  const concatenatedValue = useMemo(() => value.join(""), [value]);

  useEffect(() => {
    if (value.length === 0) setFocusedIndex(0);
  }, [value]);

  useEffect(() => {
    const isCodeFullyEntered =
      concatenatedValue.length === inputCount &&
      value.every((v) => v !== "") &&
      inputCount > 0;

    if (!isCodeFullyEntered) return;

    onComplete?.(concatenatedValue);
    if (autoSubmit) {
      hiddenInputRef.current?.form?.requestSubmit();
    }
  }, [concatenatedValue, onComplete, inputCount, autoSubmit]);

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
    [
      dispatch,
      value,
      registerInputRef,
      name,
      validationConfig,
      type,
      focusedIndex,
      disabled,
      inputCount,
    ]
  );

  return (
    <AuthCodeContext.Provider value={contextValue}>
      <div
        onPaste={(event) => {
          event.preventDefault();
          const pastedText = event.clipboardData.getData("text/plain");
          dispatch({ type: "PASTE", value: pastedText });
        }}
        {...divProps}
        onCopy={mergeEventHandlers(divProps.onCopy, (event) => {
          event.preventDefault();
          event.clipboardData.setData("text/plain", value.join(""));
        })}
      >
        <AuthCodeHiddenInput />
        {children}
      </div>
    </AuthCodeContext.Provider>
  );
};
