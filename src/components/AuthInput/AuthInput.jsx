import React, { useState } from "react";
import { Icon } from "@iconify/react";

const AuthInput = ({ 
  placeholder,
  onChange,
  type = "text",
  color = "text-white",
  icon,
  iconSide = "left",
  iconSize = "w-5 h-5",
  className = "",
  value,
  label,
  error,
  required = false,
  disabled = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Determinar la posición del icono
  const hasLeftIcon = icon && iconSide === "left";
  const hasRightIcon = icon && iconSide === "right";
  const hasPasswordToggle = type === 'password';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-white/80 mb-2 text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Icono izquierdo */}
        {hasLeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
            <span className={`text-white/50 ${iconSize}`}>{icon}</span>
          </div>
        )}
        
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full bg-black/50 border border-white/20 hover:border-gray-500 placeholder:text-white/50 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 transition-colors
            ${hasLeftIcon ? 'pl-10' : 'pl-3'}
            ${hasRightIcon || hasPasswordToggle ? 'pr-10' : 'pr-3'}
            ${error 
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-white/20'
            }
            ${color}
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-black/50'}
            ${className}
          `}
          {...props}
        />
        
        {/* Icono derecho */}
        {hasRightIcon && !hasPasswordToggle && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center pointer-events-none">
            <span className={`text-white/50 ${iconSize}`}>{icon}</span>
          </div>
        )}
        
        {/* Toggle de contraseña */}
        {hasPasswordToggle && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-3">
            <button
              type="button"
              className="text-white/70 hover:text-white focus:outline-none flex items-center justify-center w-6 h-6 leading-none p-0"
              onClick={togglePasswordVisibility}
            >
              <Icon
                icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
                inline={false}
                className={`${iconSize} block -translate-y-[9px]`}
              />
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default AuthInput;