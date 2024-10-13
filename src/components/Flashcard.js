import React, { useState } from "react";

export const Flashcard = ({ frontText, backText }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      onClick={handleFlip}
      style={{
        width: "300px",
        height: "200px",
        border: "1px solid black",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      {isFlipped ? (
        <div>{backText}</div>
      ) : (
        <div>{frontText}</div>
      )}
    </div>
  );
};
