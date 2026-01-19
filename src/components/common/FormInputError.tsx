import React, { useEffect, useState } from "react";

interface FormInputErrorProps {
  message?: string;
}

export const FormInputError: React.FC<FormInputErrorProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [message]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        height: visible ? "auto" : 0,
        overflow: "hidden",
      }}
      className="text-red-500 text-xs mt-1"
    >
      {message}
    </div>
  );
};
