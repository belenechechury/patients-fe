import React from "react";

interface LoadingPageProps {
  message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ message = "Cargando, espere por favor..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-500 mb-4"></div>
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};

export default LoadingPage;
