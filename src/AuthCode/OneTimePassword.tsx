import { createContext, useContext, useReducer, type ReactNode } from "react";

type FieldUpdateAction =
  | {
      type: "TYPE_CHAR";
      char: string;
      index: number;
    }
  | { type: "PASTE"; value: string }
  | { type: "REMOVE_CHAR"; index: number }

interface State {
  value: string[];
}

interface AuthCodeContextValue {
  dispatch: React.Dispatch<FieldUpdateAction>;
  state: State;
}

const AuthCodeContext = createContext<AuthCodeContextValue | null>(null);

function useAuthCodeContext() {
  const value = useContext(AuthCodeContext);
  if (!value) {
    throw Error("AuthCodeField context value is undefined");
  }
  return value;
}

function reducer(state: State, action: FieldUpdateAction): State {
  switch (action.type) {
    case "TYPE_CHAR": {
      const { char, index } = action;
      const newValue = state.value.slice();
      newValue[index] = char;

      return { value: newValue };
    }

    case "REMOVE_CHAR": {
      const { index } = action

      const newValue = state.value.slice();
      newValue[index] = "";

      // move focus to the previous char
      

      return {
        value: newValue
      }
    }

    default:
      return {
        value: [],
      };
  }
}

export function AuthCodeField({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { value: [] });
  return (
    <AuthCodeContext.Provider
      value={{
        dispatch: dispatch,
        state: state,
      }}
    >
      {children}
    </AuthCodeContext.Provider>
  );
}

export function AuthCodeInput({ index }: { index: number }) {
  const context = useAuthCodeContext();
  const { dispatch } = context;
  const value = context.state.value?.at(index) || "";
  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]"
      onKeyDown={(event) => {
        switch (event.key) {
          case "Backspace": {
            dispatch({ type: "REMOVE_CHAR", index });
            break;
          }
        }
        dispatch({ type: "TYPE_CHAR", char: event.key, index });
      }}
      value={value}
    />
  );
}

export { AuthCodeField as Root, AuthCodeInput as Input };
