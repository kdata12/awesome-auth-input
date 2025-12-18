import {
  type ReactNode,
  useState,
  useRef,
  createContext,
  useContext,
} from "react";

const AUTH_CODE = 123456;
const AUTH_CODE_LENGTH = AUTH_CODE.toString().length;

const SINGLE_DIGIT_REGEX = /^\d$/;

const getInitialState = (length: number) => {
  return Array(length).fill("");
};

const isValidCodePaste = (text: string, maxLength: number) => {
  const inputRegex = new RegExp(`^[0-9]{0,${maxLength}}$`);
  return inputRegex.test(text);
};

const createNewCode = (pastedText: string) => {
  return Array.from(pastedText).concat(
    pastedText.length < AUTH_CODE_LENGTH
      ? Array.from({ length: AUTH_CODE_LENGTH - pastedText.length }, () => "")
      : []
  );
};

const validateKeyPress = (key: string) => {
  const validKeyRegex = SINGLE_DIGIT_REGEX;
  return validKeyRegex.test(key);
};

export default function AuthCodeInput({
  onSubmit,
}: Readonly<{
  onSubmit: (code: string) => void;
}>) {
  const [code, setCode] = useState<string[]>(() =>
    getInitialState(AUTH_CODE_LENGTH)
  );

  // use to store all of the input refs for focus manipulation
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array.from({ length: AUTH_CODE_LENGTH }, () => null)
  );

  // add comment to say what does this
  const attachInputRefs =
    (index: number, ref: React.MutableRefObject<any[]>) =>
    (value: HTMLInputElement) => {
      ref.current[index] = value;
    };

  const handleInput =
    (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (index > code.length - 1) return;
      if (!inputRefs.current[index]) return;
      switch (event.key) {
        case "ArrowLeft": {
          focusPreviousInput(index);
          break;
        }
        case "ArrowRight": {
          focusNextInput(index);
          break;
        }
        case "Backspace": {
          event.preventDefault();
          handleBackSpace(index);
          break;
        }
        case "Tab": {
          if (!event.shiftKey) return;

          focusPreviousInput(index);
          break;
        }
        default: {
          // Handle digit input
          event.preventDefault();
          if (!validateKeyPress(event.key)) return;
          setCode((previousCode) => {
            const newCode = previousCode.slice();
            newCode[index] = event.key;
            return newCode;
          });
          focusNextInput(index);
        }
      }
    };

  const handleBackSpace = (index: number) => {
    // delete current input entry
    const newCode = code.slice();
    newCode[index] = "";

    // if last entry has a code
    if (index === code.length - 1 && code[index]) {
      setCode(newCode);
      return;
    }

    // delete previous input entry
    newCode[index - 1] = "";
    setCode(newCode);
    focusPreviousInput(index);
  };

  const focusNextInput = (index: number) => {
    inputRefs.current.at(index + 1)?.focus();
  };

  const focusPreviousInput = (index: number) => {
    inputRefs.current.at(index - 1)?.focus();
  };

  const focusInput = (index: number) => {
    inputRefs.current.at(index)?.focus();
  };

  const resetInput = () => {
    setCode(() => getInitialState(AUTH_CODE_LENGTH));
  };

  const handleCodePaste = (event: React.ClipboardEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData("text/plain");

    if (!isValidCodePaste(pastedText, AUTH_CODE_LENGTH)) {
      console.warn("invalid paste input");
      return;
    }

    const pastedCode = createNewCode(pastedText);

    const nextInputIndex =
      pastedText.length === AUTH_CODE_LENGTH
        ? pastedText.length - 1
        : pastedText.length;

    focusInput(nextInputIndex);

    setCode(pastedCode);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(code.join(""));
      }}
      onPaste={handleCodePaste}
      className="auth-form"
    >
      <div className="inputs">
        {code.map((value, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            onKeyDown={handleInput(index)}
            value={value}
            autoComplete="one-time-code"
            // autoFocus={index == 0}
            ref={attachInputRefs(index, inputRefs)}
          />
        ))}
      </div>
      <div className="actions">
        <button type="reset" onClick={resetInput}>
          Reset
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
