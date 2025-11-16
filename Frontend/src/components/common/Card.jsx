
const Card = ({ 
  children, 
  title, 
  subtitle,
  icon: Icon,
  className = '',
  hover = false,
  onClick,
  padding = 'default'
}) => {
  const paddingStyles = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };

  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl shadow-md 
        ${hover ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {/* Card Header */}
      {(title || Icon) && (
        <div className="mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="flex-shrink-0">
                <Icon size={24} className="text-blue-600" />
              </div>
            )}
            <div className="flex-1">
              {title && (
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Card Content */}
      <div>{children}</div>
    </div>
  );
};

export default Card;