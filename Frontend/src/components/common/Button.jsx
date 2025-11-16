

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon: Icon, 
  className = '', 
  disabled = false,
  type = 'button',
  fullWidth = false 
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm hover:shadow-md',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 
        px-6 py-3 rounded-lg font-semibold 
        transition-all duration-200
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
        ${className}
      `}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export default Button;