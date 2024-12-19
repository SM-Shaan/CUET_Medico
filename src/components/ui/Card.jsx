const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;