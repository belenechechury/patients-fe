import React, { useState, useEffect } from "react";

interface LoadingPageProps {
  message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ message = "Loading" }) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-500 mb-4"></div>
      <p className="text-gray-500 text-lg">
        {message}, please wait
        {Array(dots)
          .fill(".")
          .join("")}
      </p>
    </div>
  );
};

export default LoadingPage;
