import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import AuthCode from "./AuthCode";

function App() {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <AuthCode.Group
        ref={ref}
        className="Root"
        name="otp"
        validation={{
          type: "numeric",
        }}
        onComplete={(value) => {
          console.log("submitting with oncomplete value: ", value);
        }}
      >
        <AuthCode.Input index={0} />
        <AuthCode.Input index={1} />
        <AuthCode.Input index={2} />
        <AuthCode.Input index={3} />
        <AuthCode.Input index={4} />
      </AuthCode.Group>
    </div>
  );
}

export default App;
