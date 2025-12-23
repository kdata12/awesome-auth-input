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
          type: "numeric",
        }}
        onComplete={(value) => {
          console.log("submitting with oncomplete value: ", value);
        }} // auto submit: true, doesn't submit to form but will call this function instead
      >
        <AuthCode.Input
          index={0}
          onKeyDown={(event) => {
            console.log("asd");
          }}
        />
        <AuthCode.Input index={1} />
        <AuthCode.Input index={2} />
        <AuthCode.Input index={3} />
        <AuthCode.HiddenInput />
      </AuthCode.Group>
      <AuthCode.Input index={4} />
    </div>
  );
}

export default App;
