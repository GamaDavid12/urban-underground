const Button = ({
  text,
  variant = "contained",
  className,
  icon,
  iconSide = "left",
  children,
  ...props
}) => {
  const variants = {
    based: `flex w-full justify-center font-bold items-center border-[#FFCA1E] border rounded-md p-2 max-h-40 p3 gap-x-2 cursor-pointer  ${
      iconSide == "rigth" && "flex-row-reverse"
    }`,
    icon: "bg-inherit !w-auto border-none text-[#FFCA1E] text-2xl cursor-pointer transition-colors duration-[0.2s] hover:text-white",
    outlined:
      "bg-inherit text-[#FFCA1E] transition-colors duration-[0.2s] hover:text-white",
    contained: "bg-[#FFCA1E] text-gray-950 hover:bg-[#FFCA1E]",
    cancel: "bg-red-500 border-red-500",
    pay: "bg-green-500 border-green-500",
    grey: "border-neutral-700 bg-neutral-700 text-white hover:bg-inherit hover:text-[#FFCA1E] hover:border-inherit",
    gradient:
      "bg-linear-65 from-[#FFCA1E] to-black  border-none transition-colors duration-[0.5s] hover:from-[#FFCA1E] hover:to-[#FFCA1E] hover:text-black",
  };

  return (
    <button
      className={`${className} ${variants.based} ${variants[variant]}`}
      {...props}
    >
      {icon}
      {text}
      {children}
    </button>
  );
};

export default Button;