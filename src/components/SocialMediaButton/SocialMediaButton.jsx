import React from "react";
import clsx from "clsx";

const variants = {
  outline: "border border-gray-400 text-gray-200 hover:bg-gray-700",
  filled: "bg-yellow-500 text-black hover:bg-yellow-600",
  ghost: "text-gray-300 hover:text-white hover:bg-gray-800",
};

const SocialMediaButton = ({ 
  icon: Icon, 
  socialMediaPath = "#", 
  variant = "outline", 
  className 
}) => {
  return (
    <a
      href={socialMediaPath}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "flex items-center justify-center w-10 h-10 rounded-full transition-transform transform hover:scale-110",
        variants[variant],
        className
      )}
    >
      <Icon size={20} />
    </a>
  );
};

export default SocialMediaButton;