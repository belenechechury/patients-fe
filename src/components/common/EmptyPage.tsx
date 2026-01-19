import React from "react";

interface EmptyPageProps {
  message?: string;
}

const EmptyPage: React.FC<EmptyPageProps> = ({ message = "No hay resultados." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center p-4">
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};

export default EmptyPage;
