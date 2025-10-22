import React from "react";

const Container = ({ backgroundImage, children }) => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: backgroundImage && `url(${backgroundImage})`}}
    >
      {children}
    </div>
  );
};

export default Container;