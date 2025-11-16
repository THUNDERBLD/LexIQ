

const LoadingSpinner = ({ 
  size = 'medium', 
  text = '', 
  fullScreen = false,
  color = 'blue' 
}) => {
  const sizes = {
    small: 'h-8 w-8 border-2',
    medium: 'h-16 w-16 border-4',
    large: 'h-24 w-24 border-4',
  };

  const colors = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    gray: 'border-gray-600',
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl',
  };

  const spinnerElement = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`
          animate-spin rounded-full 
          border-t-transparent
          ${sizes[size]} 
          ${colors[color]}
        `}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className={`font-semibold text-gray-700 ${textSizes[size]}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};

// Alternative dot-based loader
export const DotsLoader = ({ color = 'blue' }) => {
  const dotColors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    gray: 'bg-gray-600',
  };

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`h-3 w-3 rounded-full ${dotColors[color]} animate-bounce`}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
};

// Skeleton loader for content
export const SkeletonLoader = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;