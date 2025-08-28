import React from "react";

const Background = ({ backgroundImage, children }) => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none" }}
    >
      {children}
    </div>
  );
};

export default Background;