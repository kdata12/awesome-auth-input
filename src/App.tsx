import React, { useState } from "react";
import "./App.css";
import AuthCode from "./AuthCode";

function App() {
  const [value, setValue] = useState("");
  return (
    <div>
      <AuthCode.Group
        name="otp"
        value={value}
        onValueChange={setValue}
        validation={{
          type: "custom",
          inputMode: "text",
          pattern: "[0-9]",
          regex: /^[0-9]$/,
        }}
        onComplete={(value) => {
          console.log("submitting with oncomplete value: ", value);
        }} // auto submit: true, doesn't submit to form but will call this function instead
      >
        <AuthCode.Input index={0} />
        <AuthCode.Input index={1} />
        <AuthCode.Input index={2} />
        <AuthCode.Input index={3} />
        <AuthCode.Input index={4} />
        <AuthCode.HiddenInput />
      </AuthCode.Group>
    </div>
  );
}

export default App;
