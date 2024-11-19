// src/App.tsx
import React, { useState } from "react";
import FormGenerator from "./components/FormGenerator";

const App: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <FormGenerator />
    </div>
  );
};

export default App;
